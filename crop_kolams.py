from PIL import Image
import os

img_path = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\.user_uploaded\media_1786873801656.png"
base_art_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art\kolam"

img = Image.open(img_path)
width, height = img.size
print(f"Uploaded screenshot size: {width}x{height}")

# Define crop bounding boxes (left, upper, right, lower) for authentic Kolam tiles in the screenshot:
# The screenshot contains multiple grids of authentic Kolam designs.
# We will extract 9 distinct Kolam tiles!

crops = {
    # 5 Dot Kolams (Top Left red tiles)
    r"simple-dot-kolams\example-01.png": (10, 20, 135, 145),
    r"simple-dot-kolams\example-02.png": (140, 20, 265, 145),
    r"simple-dot-kolams\example-03.png": (10, 150, 135, 275),

    # Sikku Loop Kolams (Black & White tiles in center)
    r"loop-line-kolams\example-01.png": (320, 68, 425, 195),
    r"loop-line-kolams\example-02.png": (430, 68, 535, 195),
    r"loop-line-kolams\example-03.png": (540, 68, 645, 195),

    # Decorative Daily Padma Kolams (Red terracotta tiles bottom right)
    r"decorative-daily-kolams\example-01.png": (770, 500, 895, 625),
    r"decorative-daily-kolams\example-02.png": (900, 500, 1025, 625),
    r"decorative-daily-kolams\example-03.png": (770, 630, 895, 755),
}

for rel_path, box in crops.items():
    full_path = os.path.join(base_art_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    cropped_tile = img.crop(box)
    cropped_tile.save(full_path)
    print(f"Saved authentic Kolam tile to {rel_path}")

print("Successfully extracted authentic Tamil Nadu Kolam tiles from user screenshot!")
