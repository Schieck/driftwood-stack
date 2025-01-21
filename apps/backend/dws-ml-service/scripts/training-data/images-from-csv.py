import csv
from openai import OpenAI
import requests
import os
from time import sleep

# Initialize OpenAI client
client = OpenAI(api_key='YOUR_API_KEY')

# Specify your CSV file path and output folder
csv_file_path = 'driftwood_dataset.csv'
output_folder = 'generated_images'

# Function to generate an image from a prompt
def generate_image(prompt, output_path):
    try:
        response = client.images.generate(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response.data[0].url
        image_data = requests.get(image_url).content
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'wb') as f:
            f.write(image_data)
        print(f"Image saved to {output_path}")
    except Exception as e:
        print(f"Error generating image for prompt '{prompt}': {e}")

# Read prompts from CSV and generate images
def process_csv(csv_file_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    with open(csv_file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            prompt = row['image_prompt']
            image_name = os.path.basename(row['image_path'])
            output_path = os.path.join(output_folder, image_name)
            generate_image(prompt, output_path)
            sleep(1)  # To avoid hitting rate limits

# Process the CSV file and save images to the specified folder
process_csv(csv_file_path, output_folder)
