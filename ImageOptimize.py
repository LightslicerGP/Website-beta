import os
from PIL import Image
import json

img_folder = "images_raw"
dest_folder = "images"
optimization_file = "optimization.json"

if not os.path.exists(optimization_file):
    with open(optimization_file, "w") as f:
        json.dump([], f)
    optimize_settings = []
else:
    with open(optimization_file, "r") as f:
        optimize_settings = json.load(f)

for current_folder, folders, files in os.walk(img_folder):

    # make folders in destination if needed
    for folder in folders:
        os.makedirs(os.path.join(dest_folder, folder), exist_ok=True)

    for file in files:
        rel_path = os.path.relpath(current_folder, img_folder)  # current folder path
        dest_path = os.path.join(dest_folder, rel_path)  # dest folder path
        os.makedirs(dest_path, exist_ok=True)  # make dest path
        src_file = os.path.join(current_folder, file)  # current file path

        # png file, optimize
        if file.lower().endswith(".png"):

            dst_file = os.path.join(
                dest_path, os.path.splitext(file)[0] + ".webp"
            )  # get dest file path
            img = Image.open(src_file)

            print(src_file)

            # get file settings if existent
            file_settings = None
            for settings in optimize_settings:
                if settings.get("path") == src_file:
                    file_settings = settings
                    break

            # if not, set default settings
            if not file_settings:
                file_settings = {
                    "path": src_file,
                    "quality": 90,
                    "size": [img.width, img.height],
                }
                optimize_settings.append(file_settings)

            if img.mode in ("RGBA", "LA"):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            quality = file_settings["quality"]
            size = file_settings["size"]

            # Resize image if size is different
            if img.size != tuple(size):
                img = img.resize(size, Image.Resampling.LANCZOS)

            img.save(dst_file, "WEBP", quality=quality, optimize=True, method=6)

        # not png, for now dont bother
        else:
            dst_file = os.path.join(dest_path, file)
            with open(src_file, "rb") as fsrc:
                with open(dst_file, "wb") as fdst:
                    fdst.write(fsrc.read())

with open(optimization_file, "w") as f:
    json.dump(optimize_settings, f, indent=2)
