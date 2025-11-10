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
        
    def authenticate(self, username, api_key):
        """Authenticate with Kaggle API"""
        try:
            self.api = KaggleApi()
            self.api.username = username
            self.api.key = api_key
            self.api.authenticate()
            logger.info("Successfully authenticated with Kaggle API")
            return True
        except Exception as e:
            logger.error(f"Kaggle authentication failed: {e}")
            return False
    
    def download_dataset(self):
        """Download dataset from Kaggle"""
        if not self.api:
            logger.error("Not authenticated with Kaggle")
            return False
        
        try:
            logger.info(f"Downloading dataset: {self.dataset_name}")
            self.api.dataset_download_files(
                self.dataset_name,
                path=self.data_dir,
                unzip=True
            )
            logger.info("Dataset downloaded successfully")
            return True
        except Exception as e:
            logger.error(f"Dataset download failed: {e}")
            return False
    
    def extract_dataset(self, zip_path):
        """Extract ZIP file if needed"""
        try:
            if zip_path.exists():
                with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                    zip_ref.extractall(self.data_dir)
                logger.info(f"Extracted dataset from {zip_path}")
                return True
        except Exception as e:
            logger.error(f"Extraction failed: {e}")
            return False
    
    def get_dataset_info(self):
        """Get information about the dataset structure"""
        try:
            dataset_path = self.data_dir
            if not dataset_path.exists():
                return None
            
            info = {
                "total_files": len(list(dataset_path.rglob("*"))),
                "directories": [d.name for d in dataset_path.iterdir() if d.is_dir()],
                "images_by_class": self._count_images_by_class()
            }
            return info
        except Exception as e:
            logger.error(f"Error getting dataset info: {e}")
            return None
    
    def _count_images_by_class(self):
        """Count images in each class directory"""
        counts = {}
        dataset_path = self.data_dir
        
        for class_dir in dataset_path.iterdir():
            if class_dir.is_dir():
                image_count = len(list(class_dir.glob("*.jpg"))) + len(list(class_dir.glob("*.png")))
                if image_count > 0:
                    counts[class_dir.name] = image_count
        
        return counts


if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    
    handler = DatasetHandler()
    
    kaggle_user = os.getenv("KAGGLE_USERNAME", "")
    kaggle_key = os.getenv("KAGGLE_KEY", "")
    
    if handler.authenticate(kaggle_user, kaggle_key):
        if handler.download_dataset():
            info = handler.get_dataset_info()
            print("Dataset Info:", json.dumps(info, indent=2))
