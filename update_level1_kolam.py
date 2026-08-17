from PIL import Image
import os

user_dir = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\.user_uploaded"
dest_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art\kolam\simple-dot-kolams"

os.makedirs(dest_dir, exist_ok=True)

# Image mappings for Category 1 (Simple Dot Kolams):
# 1. media_1786875175242.png -> example-01.png (Continuous Cross Sikku Loop)
# 2. media_1786875175246.png -> example-02.png (Diamond Frame 4-Petal Floral)
# 3. media_1786875175422.png -> example-03.png (Snowflake 6-Petal Rosette Sikku)

img1_path = os.path.join(user_dir, "media_1786875175242.png")
img2_path = os.path.join(user_dir, "media_1786875175246.png")
img3_path = os.path.join(user_dir, "media_1786875175422.png")

im1 = Image.open(img1_path)
im1.save(os.path.join(dest_dir, "example-01.png"))

im2 = Image.open(img2_path)
im2.save(os.path.join(dest_dir, "example-02.png"))

im3 = Image.open(img3_path)
im3.save(os.path.join(dest_dir, "example-03.png"))

print("Successfully deployed Category 1 authentic Kolam images!")
