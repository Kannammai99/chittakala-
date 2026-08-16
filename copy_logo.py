import shutil

src = r"C:\Users\91986\.gemini\antigravity\brain\3446b1f5-eda5-42a8-9fba-28525837d072\chittakala_logo_icon_1786870808517.jpg"
dst = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\logo.jpg"

try:
    shutil.copyfile(src, dst)
    print("Successfully copied logo image to frontend/public/logo.jpg")
except Exception as e:
    print(f"Error copying logo image: {e}")
