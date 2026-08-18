import subprocess

subprocess.run(["git", "add", "tests/api/test_exercises.py"], check=True)
subprocess.run(["git", "commit", "-m", "Update test_exercises assertion to Dancing Warli Trio"], check=True)
subprocess.run(["git", "push", "origin", "main"], check=True)
print("Pushed cleanly!")
