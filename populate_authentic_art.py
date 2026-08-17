import os

base_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art"

# High-resolution Authentic Folk Art SVG Vector Files
art_files = {
    # -------------------------------------------------------------------------
    # 🌸 AUTHENTIC TAMIL NADU KOLAM (RED TERRACOTTA THRESHOLD & RICE POWDER)
    # -------------------------------------------------------------------------

    # Cat 1: Simple Pulli Kolam (Beginner)
    r"kolam\simple-dot-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 3x3 Dot Grid -->
  <circle cx="90" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="150" r="7" fill="#FFFFFF"/>
  <circle cx="210" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="210" r="6" fill="#FDE68A"/>
  <!-- Diamond Boundary -->
  <polygon points="150,55 245,150 150,245 55,150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <!-- Intersecting Arcs -->
  <line x1="90" y1="90" x2="210" y2="210" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="210" y1="90" x2="90" y2="210" stroke="#FFFFFF" stroke-width="4"/>
</svg>''',

    r"kolam\simple-dot-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 4x4 Dot Grid -->
  <circle cx="80" cy="80" r="5" fill="#FDE68A"/>
  <circle cx="126" cy="80" r="5" fill="#FDE68A"/>
  <circle cx="174" cy="80" r="5" fill="#FDE68A"/>
  <circle cx="220" cy="80" r="5" fill="#FDE68A"/>
  <circle cx="80" cy="126" r="5" fill="#FDE68A"/>
  <circle cx="126" cy="126" r="5" fill="#FDE68A"/>
  <circle cx="174" cy="126" r="5" fill="#FDE68A"/>
  <circle cx="220" cy="126" r="5" fill="#FDE68A"/>
  <circle cx="80" cy="174" r="5" fill="#FDE68A"/>
  <circle cx="126" cy="174" r="5" fill="#FDE68A"/>
  <circle cx="174" cy="174" r="5" fill="#FDE68A"/>
  <circle cx="220" cy="174" r="5" fill="#FDE68A"/>
  <circle cx="80" cy="220" r="5" fill="#FDE68A"/>
  <circle cx="126" cy="220" r="5" fill="#FDE68A"/>
  <circle cx="174" cy="220" r="5" fill="#FDE68A"/>
  <circle cx="220" cy="220" r="5" fill="#FDE68A"/>
  <!-- Overlapping Squares Star -->
  <rect x="80" y="80" width="140" height="140" fill="none" stroke="#FFFFFF" stroke-width="5" rx="6"/>
  <rect x="80" y="80" width="140" height="140" fill="none" stroke="#FFFFFF" stroke-width="5" rx="6" transform="rotate(45 150 150)"/>
</svg>''',

    r"kolam\simple-dot-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 5-3-1 Interleaved Cross Grid -->
  <circle cx="150" cy="50" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="100" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="150" r="8" fill="#FFFFFF"/>
  <circle cx="150" cy="200" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="250" r="6" fill="#FDE68A"/>
  <circle cx="50" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="100" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="200" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="250" cy="150" r="6" fill="#FDE68A"/>
  <!-- Smooth Curved Petal Loops -->
  <path d="M 150,35 Q 100,80 150,150 Q 200,80 150,35 Z M 150,265 Q 100,220 150,150 Q 200,220 150,265 Z M 35,150 Q 80,100 150,150 Q 80,200 35,150 Z M 265,150 Q 220,100 150,150 Q 220,200 265,150 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
</svg>''',

    # Cat 2: Traditional Sikku / Neli Kolam (Intermediate)
    r"kolam\loop-line-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 3x3 Dot Grid -->
  <circle cx="90" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="150" r="7" fill="#FFFFFF"/>
  <circle cx="210" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="210" r="6" fill="#FDE68A"/>
  <!-- Authentic Tamil Nadu Single Unbroken Continuous Sikku Loop -->
  <path d="M 150,50 C 60,50 50,60 50,150 C 50,240 60,250 150,250 C 240,250 250,240 250,150 C 250,60 240,50 150,50 Z M 150,110 C 110,110 110,120 110,150 C 110,180 120,190 150,190 C 180,190 190,180 190,150 C 190,120 180,110 150,110 Z" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
</svg>''',

    r"kolam\loop-line-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 3x3 Dot Grid -->
  <circle cx="90" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="90" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="150" r="7" fill="#FFFFFF"/>
  <circle cx="210" cy="150" r="6" fill="#FDE68A"/>
  <circle cx="90" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="150" cy="210" r="6" fill="#FDE68A"/>
  <circle cx="210" cy="210" r="6" fill="#FDE68A"/>
  <!-- Four-Corner Teardrop Loops -->
  <path d="M 90,60 C 60,60 60,120 90,120 C 120,120 120,60 90,60 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 210,60 C 180,60 180,120 210,120 C 240,120 240,60 210,60 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 90,180 C 60,180 60,240 90,240 C 120,240 120,180 90,180 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 210,180 C 180,180 180,240 210,240 C 240,240 240,180 210,180 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <!-- Center Node Star -->
  <polygon points="150,110 190,150 150,190 110,150" fill="none" stroke="#FDE68A" stroke-width="4"/>
</svg>''',

    r"kolam\loop-line-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 4x4 Grid Dots -->
  <circle cx="90" cy="90" r="5" fill="#FDE68A"/>
  <circle cx="130" cy="90" r="5" fill="#FDE68A"/>
  <circle cx="170" cy="90" r="5" fill="#FDE68A"/>
  <circle cx="210" cy="90" r="5" fill="#FDE68A"/>
  <circle cx="90" cy="210" r="5" fill="#FDE68A"/>
  <circle cx="130" cy="210" r="5" fill="#FDE68A"/>
  <circle cx="170" cy="210" r="5" fill="#FDE68A"/>
  <circle cx="210" cy="210" r="5" fill="#FDE68A"/>
  <!-- Dual Interlocking Brahma Mudi Sikku Strands -->
  <path d="M 150,45 L 255,150 L 150,255 L 45,150 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 150,80 L 220,150 L 150,220 L 80,150 Z" fill="none" stroke="#FDE68A" stroke-width="4"/>
</svg>''',

    # Cat 3: Radiant Padma & Margazhi Threshold Kolam (Challenging)
    r"kolam\decorative-daily-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- Central Seed Pod -->
  <circle cx="150" cy="150" r="26" fill="none" stroke="#FDE68A" stroke-width="5"/>
  <circle cx="150" cy="150" r="8" fill="#FDE68A"/>
  <!-- 8 Radiating Scalloped Lotus Petals -->
  <path d="M 150,124 C 125,60 175,60 150,124 Z M 150,176 C 125,240 175,240 150,176 Z M 124,150 C 60,125 60,175 124,150 Z M 176,150 C 240,125 240,175 176,150 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 131,131 C 85,85 110,60 131,131 Z M 169,131 C 215,85 190,60 169,131 Z M 131,169 C 85,215 110,240 131,169 Z M 169,169 C 215,215 190,240 169,169 Z" fill="none" stroke="#FDE68A" stroke-width="4"/>
  <!-- Outer Corner Accent Dots -->
  <circle cx="150" cy="35" r="6" fill="#FFFFFF"/>
  <circle cx="150" cy="265" r="6" fill="#FFFFFF"/>
  <circle cx="35" cy="150" r="6" fill="#FFFFFF"/>
  <circle cx="265" cy="150" r="6" fill="#FFFFFF"/>
</svg>''',

    r"kolam\decorative-daily-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- 8-Pointed Radiating Morning Star Kolam -->
  <polygon points="150,35 182,118 265,150 182,182 150,265 118,182 35,150 118,118" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <polygon points="150,65 174,126 235,150 174,174 150,235 126,174 65,150 126,126" fill="none" stroke="#FDE68A" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="150" cy="150" r="20" fill="#FDE68A"/>
</svg>''',

    r"kolam\decorative-daily-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#991B1B" rx="20"/>
  <!-- Grand 8-Petal Rosette Threshold Kolam -->
  <circle cx="150" cy="150" r="34" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <circle cx="150" cy="150" r="16" fill="#FDE68A"/>
  <!-- Double-Contoured Petal Arcs -->
  <path d="M 150,116 Q 180,60 150,32 Q 120,60 150,116 Z M 150,184 Q 180,240 150,268 Q 120,240 150,184 Z M 116,150 Q 60,180 32,150 Q 60,120 116,150 Z M 184,150 Q 240,180 268,150 Q 240,120 184,150 Z" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <path d="M 125,125 Q 75,75 68,90 Q 90,68 125,125 Z M 175,125 Q 225,75 232,90 Q 210,68 175,125 Z M 125,175 Q 75,225 68,210 Q 90,232 125,175 Z M 175,175 Q 225,225 232,210 Q 210,232 175,175 Z" fill="none" stroke="#FDE68A" stroke-width="4"/>
</svg>''',

    # -------------------------------------------------------------------------
    # 🎨 AUTHENTIC MAHARASHTRA WARLI TRIBAL ART (WARM TERRACOTTA MUD WALL)
    # -------------------------------------------------------------------------

    # Cat 1: Basic Geometry (Beginner)
    r"warli\basic-figures\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Head & Hair Bun -->
  <circle cx="150" cy="70" r="20" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <circle cx="150" cy="70" r="8" fill="#FFFFFF"/>
  <circle cx="170" cy="65" r="7" fill="#FFFFFF"/>
  <!-- Torso Triangles -->
  <polygon points="150,150 110,100 190,100" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <polygon points="150,150 110,200 190,200" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <!-- Legs & Foot Caps -->
  <line x1="132" y1="200" x2="132" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <line x1="168" y1="200" x2="168" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <line x1="132" y1="255" x2="115" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <line x1="168" y1="255" x2="185" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <!-- Arms -->
  <line x1="150" y1="150" x2="100" y2="170" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <line x1="150" y1="150" x2="200" y2="170" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
</svg>''',

    r"warli\basic-figures\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Head & Bun -->
  <circle cx="150" cy="70" r="20" fill="none" stroke="#FFFFFF" stroke-width="5"/>
  <circle cx="170" cy="65" r="7" fill="#FFFFFF"/>
  <!-- Torso -->
  <polygon points="150,150 110,100 190,100" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <polygon points="150,150 110,200 190,200" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round"/>
  <!-- Celebratory Raised Arms -->
  <line x1="150" y1="150" x2="85" y2="85" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
  <line x1="150" y1="150" x2="215" y2="85" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Legs -->
  <line x1="132" y1="200" x2="115" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <line x1="168" y1="200" x2="185" y2="255" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
</svg>''',

    r"warli\basic-figures\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Figure 1 -->
  <circle cx="95" cy="75" r="16" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <polygon points="95,140 68,100 122,100" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <polygon points="95,140 68,180 122,180" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="82" y1="180" x2="82" y2="235" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="108" y1="180" x2="108" y2="235" stroke="#FFFFFF" stroke-width="4.5"/>

  <!-- Figure 2 -->
  <circle cx="205" cy="75" r="16" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <polygon points="205,140 178,100 232,100" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <polygon points="205,140 178,180 232,180" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="192" y1="180" x2="192" y2="235" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="218" y1="180" x2="218" y2="235" stroke="#FFFFFF" stroke-width="4.5"/>

  <!-- Hand Holding Arc -->
  <path d="M 95,140 Q 150,165 205,140" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
</svg>''',

    # Cat 2: Rhythmic Village Rows (Intermediate)
    r"warli\figure-rows\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <line x1="20" y1="245" x2="280" y2="245" stroke="#FDE68A" stroke-width="3" stroke-dasharray="6,6"/>

  <!-- Farmer 1 with Basket -->
  <circle cx="70" cy="100" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M 50,80 Q 70,60 90,80 Z" fill="none" stroke="#FDE68A" stroke-width="4"/>
  <polygon points="70,160 50,126 90,126" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="70,160 50,194 90,194" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="61" y1="194" x2="61" y2="245" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="79" y1="194" x2="79" y2="245" stroke="#FFFFFF" stroke-width="4"/>

  <!-- Farmer 2 with Sickle -->
  <circle cx="150" cy="100" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M 172,125 A 18,18 0 0,1 188,155" fill="none" stroke="#FDE68A" stroke-width="4"/>
  <polygon points="150,160 130,126 170,126" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="150,160 130,194 170,194" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="141" y1="194" x2="141" y2="245" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="159" y1="194" x2="159" y2="245" stroke="#FFFFFF" stroke-width="4"/>

  <!-- Farmer 3 carrying Grain -->
  <circle cx="230" cy="100" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="200" y1="70" x2="260" y2="70" stroke="#FDE68A" stroke-width="4"/>
  <circle cx="200" cy="70" r="6" fill="#FDE68A"/>
  <circle cx="260" cy="70" r="6" fill="#FDE68A"/>
  <polygon points="230,160 210,126 250,126" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="230,160 210,194 250,194" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="221" y1="194" x2="221" y2="245" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="239" y1="194" x2="239" y2="245" stroke="#FFFFFF" stroke-width="4"/>
</svg>''',

    r"warli\figure-rows\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Figure 1 Raised Arms -->
  <circle cx="70" cy="95" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="70,150 50,118 90,118" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="70,150 50,182 90,182" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="70" y1="150" x2="35" y2="105" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="70" y1="150" x2="105" y2="105" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="61" y1="182" x2="61" y2="235" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="79" y1="182" x2="79" y2="235" stroke="#FFFFFF" stroke-width="4"/>

  <!-- Figure 2 Lowered Arms -->
  <circle cx="150" cy="95" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="150,150 130,118 170,118" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="150,150 130,182 170,182" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="150" y1="150" x2="118" y2="190" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="150" y1="150" x2="182" y2="190" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="141" y1="182" x2="141" y2="235" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="159" y1="182" x2="159" y2="235" stroke="#FFFFFF" stroke-width="4"/>

  <!-- Figure 3 Raised Arms -->
  <circle cx="230" cy="95" r="12" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="230,150 210,118 250,118" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="230,150 210,182 250,182" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="230" y1="150" x2="195" y2="105" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="230" y1="150" x2="265" y2="105" stroke="#FFFFFF" stroke-width="4.5"/>
  <line x1="221" y1="182" x2="221" y2="235" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="239" y1="182" x2="239" y2="235" stroke="#FFFFFF" stroke-width="4"/>
</svg>''',

    r"warli\figure-rows\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Central Mortar -->
  <polygon points="130,240 170,240 162,185 138,185" fill="none" stroke="#FDE68A" stroke-width="5"/>

  <!-- Figure 1 Pounding Grain -->
  <circle cx="80" cy="90" r="13" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="80,142 58,110 102,110" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="80,142 58,172 102,172" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="80" y1="142" x2="138" y2="135" stroke="#FFFFFF" stroke-width="5"/>
  <line x1="138" y1="75" x2="142" y2="200" stroke="#FDE68A" stroke-width="5"/>
  <line x1="70" y1="172" x2="70" y2="240" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="90" y1="172" x2="90" y2="240" stroke="#FFFFFF" stroke-width="4"/>

  <!-- Figure 2 Pounding Grain -->
  <circle cx="220" cy="90" r="13" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="220,142 198,110 242,110" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <polygon points="220,142 198,172 242,172" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="220" y1="142" x2="162" y2="135" stroke="#FFFFFF" stroke-width="5"/>
  <line x1="162" y1="60" x2="158" y2="200" stroke="#FDE68A" stroke-width="5"/>
  <line x1="210" y1="172" x2="210" y2="240" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="230" y1="172" x2="230" y2="240" stroke="#FFFFFF" stroke-width="4"/>
</svg>''',

    # Cat 3: Complex Tribal Compositions (Challenging)
    r"warli\dancing-circles\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Central Ring Motif -->
  <circle cx="150" cy="150" r="26" fill="none" stroke="#FDE68A" stroke-width="4"/>
  <circle cx="150" cy="150" r="9" fill="#FDE68A"/>
  <!-- Dancers Circle -->
  <circle cx="150" cy="150" r="82" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="12,9"/>
  <!-- 4 Ring Dancers -->
  <circle cx="150" cy="58" r="9" fill="#FFFFFF"/>
  <circle cx="150" cy="242" r="9" fill="#FFFFFF"/>
  <circle cx="58" cy="150" r="9" fill="#FFFFFF"/>
  <circle cx="242" cy="150" r="9" fill="#FFFFFF"/>
</svg>''',

    r"warli\dancing-circles\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Sacred Tree Trunk & Branches -->
  <line x1="150" y1="240" x2="150" y2="75" stroke="#FDE68A" stroke-width="6" stroke-linecap="round"/>
  <path d="M 150,160 Q 100,130 85,95 M 150,160 Q 200,130 215,95 M 150,120 Q 110,95 105,65 M 150,120 Q 190,95 195,65" fill="none" stroke="#FDE68A" stroke-width="4" stroke-linecap="round"/>
  <!-- Leaf Clusters -->
  <circle cx="85" cy="95" r="7" fill="#FDE68A"/>
  <circle cx="215" cy="95" r="7" fill="#FDE68A"/>
  <circle cx="105" cy="65" r="7" fill="#FDE68A"/>
  <circle cx="195" cy="65" r="7" fill="#FDE68A"/>
  <circle cx="150" cy="55" r="8" fill="#FDE68A"/>
  <!-- Perching Birds -->
  <path d="M 75,90 Q 60,82 68,75 Z M 225,90 Q 240,82 232,75 Z" fill="#FFFFFF"/>
  <!-- Dancers around tree -->
  <circle cx="65" cy="210" r="9" fill="#FFFFFF"/>
  <circle cx="235" cy="210" r="9" fill="#FFFFFF"/>
</svg>''',

    r"warli\dancing-circles\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#7C2D12" rx="20"/>
  <!-- Center Musician with Tarpa Horn Instrument -->
  <circle cx="150" cy="125" r="12" fill="none" stroke="#FDE68A" stroke-width="4"/>
  <polygon points="150,162 132,136 168,136" fill="none" stroke="#FDE68A" stroke-width="3.5"/>
  <polygon points="150,162 132,185 168,185" fill="none" stroke="#FDE68A" stroke-width="3.5"/>
  <!-- Tarpa Horn Arc -->
  <path d="M 150,125 L 198,95 A 15,15 0 0,1 213,110 Z" fill="#FDE68A" stroke="#FDE68A" stroke-width="3"/>

  <!-- Spiral Tarpa Dance Chain (8 Dancers) -->
  <path d="M 150,45 A 105,105 0 1,1 45,150 A 105,105 0 0,1 150,255 A 105,105 0 0,1 255,150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  <!-- Dancers along spiral -->
  <circle cx="150" cy="45" r="8" fill="#FFFFFF"/>
  <circle cx="45" cy="150" r="8" fill="#FFFFFF"/>
  <circle cx="150" cy="255" r="8" fill="#FFFFFF"/>
  <circle cx="255" cy="150" r="8" fill="#FFFFFF"/>
</svg>''',
}

created_count = 0
for rel_path, content in art_files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    created_count += 1

print(f"Successfully generated {created_count} authentic Tamil Nadu Kolam & Maharashtra Warli vector art files in {base_dir}")
