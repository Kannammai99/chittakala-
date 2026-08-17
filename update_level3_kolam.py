from PIL import Image
import shutil
import os

user_dir = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\.user_uploaded"
dest_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art\kolam\decorative-daily-kolams"

os.makedirs(dest_dir, exist_ok=True)

# Image mappings:
# 1. media_1786874191311.png -> example-01.png (Square Sikku Matrix)
# 2. media_1786874191378.png -> example-02.png (12-Point Radial Mandala)
# 3. media_1786874191413.jpg -> example-03.png (Kambi Brahma Mudi Flame)

img1_path = os.path.join(user_dir, "media_1786874191311.png")
img2_path = os.path.join(user_dir, "media_1786874191378.png")
img3_path = os.path.join(user_dir, "media_1786874191413.jpg")

im1 = Image.open(img1_path)
im1.save(os.path.join(dest_dir, "example-01.png"))

im2 = Image.open(img2_path)
im2.save(os.path.join(dest_dir, "example-02.png"))

im3 = Image.open(img3_path)
im3.convert("RGB").save(os.path.join(dest_dir, "example-03.png"))

print("Successfully deployed Level 3 authentic Kolam images!")
