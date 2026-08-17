from PIL import Image
import os

user_dir = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\.user_uploaded"
dest_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art\kolam\loop-line-kolams"

os.makedirs(dest_dir, exist_ok=True)

# Image mappings for Category 2 (Loops and Line Kolams):
# 1. media_1786874684237.png -> example-01.png (Radiant Lotus Corner Loop)
# 2. media_1786874684254.png -> example-02.png (Cross-Form Sikku Loop Matrix)
# 3. media_1786874684392.png -> example-03.png (Interlocking Brahma Mudi Sikku Strand)

img1_path = os.path.join(user_dir, "media_1786874684237.png")
img2_path = os.path.join(user_dir, "media_1786874684254.png")
img3_path = os.path.join(user_dir, "media_1786874684392.png")

im1 = Image.open(img1_path)
im1.save(os.path.join(dest_dir, "example-01.png"))

im2 = Image.open(img2_path)
im2.save(os.path.join(dest_dir, "example-02.png"))

im3 = Image.open(img3_path)
im3.save(os.path.join(dest_dir, "example-03.png"))

print("Successfully deployed Category 2 authentic Kolam images!")
