import os
from PIL import Image

def compress_images(directory, quality=85):
    if not os.path.exists(directory):
        print(f"Error: Directory '{directory}' does not exist.")
        return

    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            print(f"Processing file: {file_path}")  # Add this line
            try:
                with Image.open(file_path) as img:
                    img_format = img.format
                    if img_format in ["JPEG", "JPG", "PNG"]:
                        output_path = os.path.join(root, file)
                        img.save(output_path, optimize=True, quality=quality)
                        print(f"Compressed: {file_path}")
            except Exception as e:
                print(f"Skipping file '{file}': {e}")


# Directory containing the images
directory = "./generated_images"

# Compress images with quality level 85
compress_images(directory, quality=85)