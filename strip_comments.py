import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Skip lines that are just comments (with optional leading whitespace)
    if re.match(r'^\s*//', line):
        continue
    # For inline comments, if it contains 'https://' or 'http://', keep it as is (simple heuristic)
    if '//' in line and not ('http://' in line or 'https://' in line):
        line = re.sub(r'\s*//.*', '', line) + '\n'
    new_lines.append(line)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
