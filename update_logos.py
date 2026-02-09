
import os

file_path = r'c:\Users\Dracarys -Vector\Documents\WEB PROJECTS\sas website project\CGMWTNOV2023\Source Code\vertex\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<div class="client-logos">'
end_marker_sequence = '            </div>\n          </div>\n        </section>'

start_index = content.find(start_marker)
if start_index == -1:
    print("Start marker not found")
    exit(1)

end_index = content.find(end_marker_sequence, start_index)
if end_index == -1:
    print("End marker not found")
    exit(1)

# The content to insert
new_logos = """<div class="client-logos">
              <div class="logo-row">
                 <!-- Microsoft -->
                 <div class="logo">
                    <svg viewBox="0 0 200 50" class="logotype" height="40" role="img" fill="#737373">
                      <title>Microsoft</title>
                      <path d="M10 10h18v18h-18z M32 10h18v18h-18z M10 32h18v18h-18z M32 32h18v18h-18z" fill="#f25022"/>
                      <path d="M32 10h18v18h-18z" fill="#7fba00"/>
                      <path d="M10 32h18v18h-18z" fill="#00a4ef"/>
                      <path d="M32 32h18v18h-18z" fill="#ffb900"/>
                      <g transform="translate(60, 36) scale(1.5)">
                         <text font-family="Segoe UI, sans-serif" font-weight="600" fill="#737373">Microsoft</text>
                      </g>
                    </svg>
                 </div>
                 
                 <!-- Google for Education -->
                 <div class="logo">
                     <svg viewBox="0 0 220 50" class="logotype" height="40" role="img" fill="#737373">
                        <title>Google for Education</title>
                        <path d="M25 25h10v-5h-10v5z" fill="none"/> 
                        <text x="0" y="32" font-family="'Product Sans', Arial, sans-serif" font-weight="bold" font-size="24" fill="#5f6368">Google</text>
                        <text x="85" y="32" font-family="'Product Sans', Arial, sans-serif" font-weight="400" font-size="24" fill="#5f6368">for Education</text>
                     </svg>
                 </div>
                 
                 <!-- Moodle -->
                 <div class="logo">
                     <svg viewBox="0 0 120 50" class="logotype" height="40" role="img" fill="#737373">
                         <title>Moodle</title>
                         <text x="0" y="35" font-family="sans-serif" font-weight="800" font-size="30" fill="#f98012">moodle</text>
                     </svg>
                 </div>
              </div>

              <div class="logo-row">
                 <!-- Canvas -->
                 <div class="logo">
                     <svg viewBox="0 0 150 50" class="logotype" height="40" role="img" fill="#737373">
                         <title>Canvas</title>
                         <circle cx="20" cy="25" r="15" fill="none" stroke="#e72528" stroke-width="4"/>
                         <text x="45" y="35" font-family="sans-serif" font-weight="bold" font-size="26" fill="#e72528">canvas</text>
                     </svg>
                 </div>
                 
                 <!-- Blackboard -->
                 <div class="logo">
                     <svg viewBox="0 0 180 50" class="logotype" height="40" role="img" fill="#737373">
                         <title>Blackboard</title>
                         <text x="10" y="35" font-family="sans-serif" font-weight="bold" font-size="26" fill="#262626">Blackboard</text>
                     </svg>
                 </div>

                 <!-- Zoom -->
                 <div class="logo">
                     <svg viewBox="0 0 120 50" class="logotype" height="40" role="img" fill="#737373">
                         <title>Zoom</title>
                         <path d="M10 15h25v20h-25z M40 20l10-5v18l-10-5z" fill="#2d8cff"/>
                         <text x="55" y="35" font-family="sans-serif" font-weight="bold" font-size="28" fill="#2d8cff">zoom</text>
                     </svg>
                 </div>
              </div>"""

# Replace the content
new_content = content[:start_index] + new_logos + content[end_index:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully replaced client logos.")
