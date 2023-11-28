import numpy as np
import json

# Specify the file path to the .npy file
file_path = "./pred_masks.npy"

# Load the .npy file
data = np.load(file_path)
# Now you can work with the data, which is loaded into a NumPy array
for i in range(6):
    # Get data for the current image
    image_data = data[i]

    # Convert the image data to a binary format (0 and 1)
    # binary_image = (image_data > 0).astype(int)

    # Define the path for the JSON output file (use a unique name for each image)
    json_output_path = f"data{i + 1}.json"

    # Create a dictionary to store both the data and its shape
    data_dict = {
        "shape": image_data.shape,
        "data": binary_image.tolist()
    }

    # Write the data dictionary to a JSON file
    with open(json_output_path, 'w') as json_file:
        json.dump(data_dict, json_file)
