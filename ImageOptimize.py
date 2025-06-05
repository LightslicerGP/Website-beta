import os
from PIL import Image

img_folder = "images_raw"
dest_folder = "images"

for current_folder, folders, files in os.walk(img_folder):
    # print(current_folder, folders, files)
    # print()
    
    for folder in folders:
        os.makedirs(os.path.join(dest_folder, folder), exist_ok=True)
    for file in files:
        # Get the relative path from img_folder
        rel_path = os.path.relpath(current_folder, img_folder)
        # Create the destination path by joining dest_folder with the relative path
        dest_path = os.path.join(dest_folder, rel_path)
        # Create the destination directory if it doesn't exist
        os.makedirs(dest_path, exist_ok=True)
        # Copy the file from source to destination
        src_file = os.path.join(current_folder, file)
        
        # If file is PNG, convert to WebP
        if file.lower().endswith('.png'):
            # Change extension to .webp
            dst_file = os.path.join(dest_path, os.path.splitext(file)[0] + '.webp')
            # Convert PNG to WebP
            img = Image.open(src_file)
            img.save(dst_file, 'WEBP', quality=80)
        else:
            # For non-PNG files, copy as is
            dst_file = os.path.join(dest_path, file)
            with open(src_file, 'rb') as fsrc:
                with open(dst_file, 'wb') as fdst:
                    fdst.write(fsrc.read())