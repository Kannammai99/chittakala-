import subprocess

subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "Mobile responsive UI layout overhaul: header cleanup, card padding, pill alignment, and 3-button CTA bar"], check=True)
subprocess.run(["git", "push", "origin", "main"], check=True)
print("Mobile responsive UI overhaul pushed cleanly!")
