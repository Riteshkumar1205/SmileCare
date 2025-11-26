import os
import zipfile
from pathlib import Path
import json
import logging
from kaggle.api.kaggle_api_extended import KaggleApi

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatasetHandler:
    def __init__(self, dataset_name="salmansajid05/oral-diseases"):
        self.dataset_name = dataset_name
        self.data_dir = Path("./data")
        self.data_dir.mkdir(exist_ok=True)
        self.api = None

    # ----------------------------------------------------------------------
    def authenticate(self, username=None, api_key=None):
        """
        Authenticate Kaggle API.
        Works both in local VS Code and Google Colab.
        If username/api_key not provided → try environment variables.
        """
        try:
            username = username or os.getenv("KAGGLE_USERNAME")
            api_key = api_key or os.getenv("KAGGLE_KEY")

            if not username or not api_key:
                logger.error("Kaggle username or key missing.")
                return False

            self.api = KaggleApi()
            self.api.username = username
            self.api.key = api_key
            self.api.authenticate()

            logger.info("Successfully authenticated with Kaggle API")
            return True

        except Exception as e:
            logger.error(f"Kaggle authentication failed: {e}")
            return False

    # ----------------------------------------------------------------------
    def download_dataset(self):
        """Download & unzip Kaggle dataset into ./data folder."""
        if not self.api:
            logger.error("Not authenticated with Kaggle. Run authenticate() first.")
            return False

        try:
            # Clean old data folder if needed
            if any(self.data_dir.iterdir()):
                logger.info("Cleaning existing data directory...")
                for item in self.data_dir.iterdir():
                    if item.is_file():
                        item.unlink()
                    else:
                        for f in item.rglob("*"):
                            if f.is_file():
                                f.unlink()
                        item.rmdir()

            logger.info(f"Downloading dataset: {self.dataset_name}")

            # Download ZIP file
            zip_path = self.data_dir / "dataset.zip"
            self.api.dataset_download_files(
                self.dataset_name,
                path=self.data_dir,
                unzip=False
            )

            # Kaggle downloads as: dataset_name.zip
            downloaded_zip = list(self.data_dir.glob("*.zip"))[0]
            logger.info(f"Downloaded ZIP: {downloaded_zip}")

            # Extract files
            with zipfile.ZipFile(downloaded_zip, "r") as zip_ref:
                zip_ref.extractall(self.data_dir)

            logger.info("Dataset extracted successfully!")

            # Remove downloaded ZIP to avoid clutter
            downloaded_zip.unlink(missing_ok=True)

            # Fix nested folder issue:
            self._flatten_if_nested()

            return True

        except Exception as e:
            logger.error(f"Dataset download failed: {e}")
            return False

    # ----------------------------------------------------------------------
    def _flatten_if_nested(self):
        """
        Kaggle sometimes extracts dataset like:
        ./data/oral-diseases/oral-diseases/class_folders

        This function flattens nested folders to:
        ./data/class_folders
        """
        entries = list(self.data_dir.iterdir())
        if len(entries) == 1 and entries[0].is_dir():
            inner = entries[0]
            logger.info(f"Fixing nested folder structure: moving {inner} contents...")
            for item in inner.iterdir():
                item.rename(self.data_dir / item.name)
            inner.rmdir()

    # ----------------------------------------------------------------------
    def get_dataset_info(self):
        """Get dataset summary: classes + file count"""
        try:
            dataset_path = self.data_dir
            if not dataset_path.exists():
                return None

            class_dirs = [d for d in dataset_path.iterdir() if d.is_dir()]

            info = {
                "total_files": len(list(dataset_path.rglob("*.*"))),
                "directories": [d.name for d in class_dirs],
                "images_by_class": self._count_images_by_class()
            }
            return info

        except Exception as e:
            logger.error(f"Error getting dataset info: {e}")
            return None

    # ----------------------------------------------------------------------
    def _count_images_by_class(self):
        """Count images inside each class folder."""
        counts = {}
        for class_dir in self.data_dir.iterdir():
            if class_dir.is_dir():
                num = len(list(class_dir.glob("*.jpg"))) + len(list(class_dir.glob("*.png")))
                if num > 0:
                    counts[class_dir.name] = num
        return counts

# --------------------------------------------------------------------------
if __name__ == "__main__":
    handler = DatasetHandler()

    kaggle_user = os.getenv("KAGGLE_USERNAME", "")
    kaggle_key = os.getenv("KAGGLE_KEY", "")

    if handler.authenticate(kaggle_user, kaggle_key):
        if handler.download_dataset():
            print("Dataset Info:")
            print(json.dumps(handler.get_dataset_info(), indent=2))
