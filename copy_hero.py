import shutil

src = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\chittakala_hero_banner_1786756653255.jpg"
dst = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\hero_banner.jpg"

try:
    shutil.copyfile(src, dst)
    print("Successfully copied hero banner image to frontend/public/hero_banner.jpg")
except Exception as e:
    print(f"Error copying image: {e}")
