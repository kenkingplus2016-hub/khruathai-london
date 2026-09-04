import re

file_path = "public/event-catering.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

print("File read, length:", len(content))

# Let's check if the pattern exists
pattern = re.compile(r'<div class="event-card-grid" style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 2rem;">.*?</section>', re.DOTALL)
match = pattern.search(content)

if match:
    print("Match found! Length of match:", len(match.group(0)))
else:
    print("No match found.")

