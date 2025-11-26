# ml_service/test_model.py
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import InputLayer as TFInputLayer


class PatchedInputLayer(TFInputLayer):
    def __init__(self, *args, **kwargs):
        if "batch_shape" in kwargs and "batch_input_shape" not in kwargs:
            kwargs["batch_input_shape"] = kwargs.pop("batch_shape")
        super().__init__(*args, **kwargs)


path = os.path.join("models", "teeth_classifier.h5")
print("🔍 Checking:", path)

try:
    model = load_model(
        path,
        compile=False,
        custom_objects={"InputLayer": PatchedInputLayer},
    )
    print("\n✅ MODEL LOADED SUCCESSFULLY!")
except Exception as e:
    print("\n❌ ERROR LOADING MODEL:\n", e)
