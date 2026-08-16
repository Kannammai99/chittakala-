import shutil

src = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\creative_reset_genz_1786869715343.jpg"
dst = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\hero_concept1.jpg"

try:
    shutil.copyfile(src, dst)
    print("Successfully copied Concept 1 image to frontend/public/hero_concept1.jpg")
except Exception as e:
    print(f"Error copying image: {e}")
