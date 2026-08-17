from PIL import Image
import os

src_path = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\.user_uploaded\media_1786874962460.png"
dest_path = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art\kolam\decorative-daily-kolams\example-02.png"

im = Image.open(src_path)
im.save(dest_path)

print("Successfully replaced Example 2 image with Dual Triangular Sikku Weaved Matrix Kolam!")
