import os

base_dir = r"C:\Users\91986\.gemini\antigravity\scratch\chittakala\frontend\public\art"

svgs = {
    # -------------------------------------------------------------
    # 🎨 WARLI ART (MAHARASHTRA TRIBAL HERITAGE)
    # -------------------------------------------------------------

    # Category 1: Basic Geometry (Beginner)
    r"warli\basic-figures\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Head -->
  <circle cx="100" cy="46" r="14" fill="none" stroke="#FF523B" stroke-width="3.5"/>
  <circle cx="100" cy="46" r="6" fill="#FF523B"/>
  <!-- Torso Triangles -->
  <polygon points="100,102 74,68 126,68" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-linejoin="round"/>
  <polygon points="100,102 74,136 126,136" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-linejoin="round"/>
  <!-- Legs & Foot Caps -->
  <line x1="88" y1="136" x2="88" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="112" y1="136" x2="112" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="88" y1="172" x2="76" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="112" y1="172" x2="124" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Arms -->
  <line x1="100" y1="102" x2="68" y2="115" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="100" y1="102" x2="132" y2="115" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
</svg>''',

    r"warli\basic-figures\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Head & Hair Bun -->
  <circle cx="100" cy="46" r="14" fill="none" stroke="#FF523B" stroke-width="3.5"/>
  <circle cx="114" cy="42" r="5" fill="#FF523B"/>
  <!-- Torso -->
  <polygon points="100,102 74,68 126,68" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-linejoin="round"/>
  <polygon points="100,102 74,136 126,136" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-linejoin="round"/>
  <!-- Celebratory Raised Arms -->
  <line x1="100" y1="102" x2="58" y2="60" stroke="#FF523B" stroke-width="4" stroke-linecap="round"/>
  <line x1="100" y1="102" x2="142" y2="60" stroke="#FF523B" stroke-width="4" stroke-linecap="round"/>
  <!-- Legs -->
  <line x1="88" y1="136" x2="78" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="112" y1="136" x2="122" y2="172" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
</svg>''',

    r"warli\basic-figures\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Figure 1 -->
  <circle cx="65" cy="50" r="11" fill="none" stroke="#FF523B" stroke-width="3"/>
  <polygon points="65,94 46,68 84,68" fill="none" stroke="#FF523B" stroke-width="3"/>
  <polygon points="65,94 46,120 84,120" fill="none" stroke="#FF523B" stroke-width="3"/>
  <line x1="56" y1="120" x2="56" y2="155" stroke="#FF523B" stroke-width="3"/>
  <line x1="74" y1="120" x2="74" y2="155" stroke="#FF523B" stroke-width="3"/>

  <!-- Figure 2 -->
  <circle cx="135" cy="50" r="11" fill="none" stroke="#FF523B" stroke-width="3"/>
  <polygon points="135,94 116,68 154,68" fill="none" stroke="#FF523B" stroke-width="3"/>
  <polygon points="135,94 116,120 154,120" fill="none" stroke="#FF523B" stroke-width="3"/>
  <line x1="126" y1="120" x2="126" y2="155" stroke="#FF523B" stroke-width="3"/>
  <line x1="144" y1="120" x2="144" y2="155" stroke="#FF523B" stroke-width="3"/>

  <!-- Hand-Holding Connection -->
  <path d="M 65,94 Q 100,110 135,94" fill="none" stroke="#FF523B" stroke-width="4" stroke-linecap="round"/>
</svg>''',

    # Category 2: Rhythmic Village Rows (Intermediate)
    r"warli\figure-rows\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <line x1="15" y1="165" x2="185" y2="165" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- Farmer 1 with Basket -->
  <circle cx="45" cy="70" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <path d="M 32,56 Q 45,42 58,56 Z" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
  <polygon points="45,108 32,86 58,86" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="45,108 32,130 58,130" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="39" y1="130" x2="39" y2="165" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="51" y1="130" x2="51" y2="165" stroke="#FF523B" stroke-width="2.5"/>

  <!-- Farmer 2 with Sickle -->
  <circle cx="100" cy="70" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <path d="M 115,85 A 12,12 0 0,1 125,105" fill="none" stroke="#FF7A00" stroke-width="3"/>
  <polygon points="100,108 87,86 113,86" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="100,108 87,130 113,130" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="94" y1="130" x2="94" y2="165" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="106" y1="130" x2="106" y2="165" stroke="#FF523B" stroke-width="2.5"/>

  <!-- Farmer 3 carrying Grain -->
  <circle cx="155" cy="70" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="135" y1="50" x2="175" y2="50" stroke="#FF7A00" stroke-width="2.5"/>
  <circle cx="135" cy="50" r="4" fill="#FF7A00"/>
  <circle cx="175" cy="50" r="4" fill="#FF7A00"/>
  <polygon points="155,108 142,86 168,86" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="155,108 142,130 168,130" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="149" y1="130" x2="149" y2="165" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="161" y1="130" x2="161" y2="165" stroke="#FF523B" stroke-width="2.5"/>
</svg>''',

    r"warli\figure-rows\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Figure 1 Raised Arms -->
  <circle cx="45" cy="65" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="45,100 32,80 58,80" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="45,100 32,120 58,120" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="45" y1="100" x2="20" y2="70" stroke="#FF523B" stroke-width="3"/>
  <line x1="45" y1="100" x2="70" y2="70" stroke="#FF523B" stroke-width="3"/>
  <line x1="39" y1="120" x2="39" y2="155" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="51" y1="120" x2="51" y2="155" stroke="#FF523B" stroke-width="2.5"/>

  <!-- Figure 2 Lowered Arms -->
  <circle cx="100" cy="65" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="100,100 87,80 113,80" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="100,100 87,120 113,120" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="100" y1="100" x2="78" y2="125" stroke="#FF523B" stroke-width="3"/>
  <line x1="100" y1="100" x2="122" y2="125" stroke="#FF523B" stroke-width="3"/>
  <line x1="94" y1="120" x2="94" y2="155" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="106" y1="120" x2="106" y2="155" stroke="#FF523B" stroke-width="2.5"/>

  <!-- Figure 3 Raised Arms -->
  <circle cx="155" cy="65" r="8" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="155,100 142,80 168,80" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="155,100 142,120 168,120" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="155" y1="100" x2="130" y2="70" stroke="#FF523B" stroke-width="3"/>
  <line x1="155" y1="100" x2="180" y2="70" stroke="#FF523B" stroke-width="3"/>
  <line x1="149" y1="120" x2="149" y2="155" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="161" y1="120" x2="161" y2="155" stroke="#FF523B" stroke-width="2.5"/>
</svg>''',

    r"warli\figure-rows\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Central Mortar -->
  <polygon points="85,160 115,160 110,125 90,125" fill="none" stroke="#FF7A00" stroke-width="3.5"/>

  <!-- Figure 1 Pounding Grain -->
  <circle cx="55" cy="60" r="9" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="55,95 40,75 70,75" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="55,95 40,115 70,115" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="55" y1="95" x2="92" y2="90" stroke="#FF523B" stroke-width="3.5"/>
  <line x1="92" y1="50" x2="95" y2="135" stroke="#FF7A00" stroke-width="4"/>
  <line x1="49" y1="115" x2="49" y2="160" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="61" y1="115" x2="61" y2="160" stroke="#FF523B" stroke-width="2.5"/>

  <!-- Figure 2 Pounding Grain -->
  <circle cx="145" cy="60" r="9" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="145,95 130,75 160,75" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <polygon points="145,95 130,115 160,115" fill="none" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="145" y1="95" x2="108" y2="90" stroke="#FF523B" stroke-width="3.5"/>
  <line x1="108" y1="40" x2="105" y2="135" stroke="#FF7A00" stroke-width="4"/>
  <line x1="139" y1="115" x2="139" y2="160" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="151" y1="115" x2="151" y2="160" stroke="#FF523B" stroke-width="2.5"/>
</svg>''',

    # Category 3: Complex Tribal Compositions (Challenging)
    r"warli\dancing-circles\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Central Motif -->
  <circle cx="100" cy="100" r="18" fill="none" stroke="#FF7A00" stroke-width="3"/>
  <circle cx="100" cy="100" r="6" fill="#FF7A00"/>
  <!-- 4 Ring Dancers connected at hands -->
  <circle cx="100" cy="100" r="54" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-dasharray="8,6"/>
  <!-- Dancers -->
  <circle cx="100" cy="38" r="6" fill="#FF523B"/>
  <circle cx="100" cy="162" r="6" fill="#FF523B"/>
  <circle cx="38" cy="100" r="6" fill="#FF523B"/>
  <circle cx="162" cy="100" r="6" fill="#FF523B"/>
</svg>''',

    r"warli\dancing-circles\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Sacred Tree Trunk & Canopy -->
  <line x1="100" y1="160" x2="100" y2="50" stroke="#FF7A00" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 100,110 Q 65,90 55,65 M 100,110 Q 135,90 145,65 M 100,85 Q 75,70 70,45 M 100,85 Q 125,70 130,45" fill="none" stroke="#FF7A00" stroke-width="3" stroke-linecap="round"/>
  <!-- Leaf Clusters -->
  <circle cx="55" cy="65" r="5" fill="#FF7A00"/>
  <circle cx="145" cy="65" r="5" fill="#FF7A00"/>
  <circle cx="70" cy="45" r="5" fill="#FF7A00"/>
  <circle cx="130" cy="45" r="5" fill="#FF7A00"/>
  <circle cx="100" cy="35" r="6" fill="#FF7A00"/>
  <!-- Perching Birds -->
  <path d="M 50,60 Q 40,55 45,50 Z M 150,60 Q 160,55 155,50 Z" fill="#FF523B"/>
  <!-- Dancers around tree -->
  <circle cx="45" cy="140" r="6" fill="#FF523B"/>
  <circle cx="155" cy="140" r="6" fill="#FF523B"/>
</svg>''',

    r"warli\dancing-circles\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Center Musician with Tarpa Horn Instrument -->
  <circle cx="100" cy="85" r="8" fill="none" stroke="#FF7A00" stroke-width="3"/>
  <polygon points="100,110 88,95 112,95" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
  <polygon points="100,110 88,125 112,125" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
  <!-- Tarpa Horn Arc -->
  <path d="M 100,85 L 132,65 A 10,10 0 0,1 142,75 Z" fill="#FF7A00" stroke="#FF7A00" stroke-width="2"/>
  
  <!-- Spiral Tarpa Dance Chain (8 Dancers) -->
  <path d="M 100,30 A 70,70 0 1,1 30,100 A 70,70 0 0,1 100,170 A 70,70 0 0,1 170,100" fill="none" stroke="#FF523B" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Dancers along spiral -->
  <circle cx="100" cy="30" r="5" fill="#FF523B"/>
  <circle cx="30" cy="100" r="5" fill="#FF523B"/>
  <circle cx="100" cy="170" r="5" fill="#FF523B"/>
  <circle cx="170" cy="100" r="5" fill="#FF523B"/>
</svg>''',

    # -------------------------------------------------------------
    # 🌸 KOLAM ART (TAMIL NADU HERITAGE)
    # -------------------------------------------------------------

    # Category 1: Simple Pulli Kolam (Beginner)
    r"kolam\simple-dot-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 3x3 Dot Matrix -->
  <circle cx="60" cy="60" r="5" fill="#6366F1"/>
  <circle cx="100" cy="60" r="5" fill="#6366F1"/>
  <circle cx="140" cy="60" r="5" fill="#6366F1"/>
  <circle cx="60" cy="100" r="5" fill="#6366F1"/>
  <circle cx="100" cy="100" r="6" fill="#FF523B"/>
  <circle cx="140" cy="100" r="5" fill="#6366F1"/>
  <circle cx="60" cy="140" r="5" fill="#6366F1"/>
  <circle cx="100" cy="140" r="5" fill="#6366F1"/>
  <circle cx="140" cy="140" r="5" fill="#6366F1"/>
  <!-- Diamond Perimeter -->
  <polygon points="100,38 162,100 100,162 38,100" fill="none" stroke="#6366F1" stroke-width="3.5" stroke-linejoin="round"/>
  <!-- Diagonal Inner Lines -->
  <line x1="60" y1="60" x2="140" y2="140" stroke="#FF523B" stroke-width="2.5"/>
  <line x1="140" y1="60" x2="60" y2="140" stroke="#FF523B" stroke-width="2.5"/>
</svg>''',

    r"kolam\simple-dot-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 4x4 Dot Grid -->
  <circle cx="55" cy="55" r="4.5" fill="#6366F1"/>
  <circle cx="85" cy="55" r="4.5" fill="#6366F1"/>
  <circle cx="115" cy="55" r="4.5" fill="#6366F1"/>
  <circle cx="145" cy="55" r="4.5" fill="#6366F1"/>
  <circle cx="55" cy="85" r="4.5" fill="#6366F1"/>
  <circle cx="85" cy="85" r="4.5" fill="#6366F1"/>
  <circle cx="115" cy="85" r="4.5" fill="#6366F1"/>
  <circle cx="145" cy="85" r="4.5" fill="#6366F1"/>
  <circle cx="55" cy="115" r="4.5" fill="#6366F1"/>
  <circle cx="85" cy="115" r="4.5" fill="#6366F1"/>
  <circle cx="115" cy="115" r="4.5" fill="#6366F1"/>
  <circle cx="145" cy="115" r="4.5" fill="#6366F1"/>
  <circle cx="55" cy="145" r="4.5" fill="#6366F1"/>
  <circle cx="85" cy="145" r="4.5" fill="#6366F1"/>
  <circle cx="115" cy="145" r="4.5" fill="#6366F1"/>
  <circle cx="145" cy="145" r="4.5" fill="#6366F1"/>
  <!-- Overlapping Squares Star -->
  <rect x="55" y="55" width="90" height="90" fill="none" stroke="#6366F1" stroke-width="3.5" rx="4"/>
  <rect x="55" y="55" width="90" height="90" fill="none" stroke="#FF523B" stroke-width="3.5" rx="4" transform="rotate(45 100 100)"/>
</svg>''',

    r"kolam\simple-dot-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 5-3-1 Interleaved Dot Cross -->
  <circle cx="100" cy="40" r="5" fill="#6366F1"/>
  <circle cx="100" cy="70" r="5" fill="#6366F1"/>
  <circle cx="100" cy="100" r="6" fill="#FF7A00"/>
  <circle cx="100" cy="130" r="5" fill="#6366F1"/>
  <circle cx="100" cy="160" r="5" fill="#6366F1"/>
  <circle cx="40" cy="100" r="5" fill="#6366F1"/>
  <circle cx="70" cy="100" r="5" fill="#6366F1"/>
  <circle cx="130" cy="100" r="5" fill="#6366F1"/>
  <circle cx="160" cy="100" r="5" fill="#6366F1"/>
  <!-- Petal Loops -->
  <path d="M 100,30 Q 70,60 100,100 Q 130,60 100,30 Z M 100,170 Q 70,140 100,100 Q 130,140 100,170 Z M 30,100 Q 60,70 100,100 Q 60,130 30,100 Z M 170,100 Q 140,70 100,100 Q 140,130 170,100 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
</svg>''',

    # Category 2: Traditional Sikku / Neli Kolam (Intermediate)
    r"kolam\loop-line-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 3x3 Dot Grid -->
  <circle cx="60" cy="60" r="5" fill="#6366F1"/>
  <circle cx="100" cy="60" r="5" fill="#6366F1"/>
  <circle cx="140" cy="60" r="5" fill="#6366F1"/>
  <circle cx="60" cy="100" r="5" fill="#6366F1"/>
  <circle cx="100" cy="100" r="6" fill="#FF523B"/>
  <circle cx="140" cy="100" r="5" fill="#6366F1"/>
  <circle cx="60" cy="140" r="5" fill="#6366F1"/>
  <circle cx="100" cy="140" r="5" fill="#6366F1"/>
  <circle cx="140" cy="140" r="5" fill="#6366F1"/>
  <!-- Single Unbroken Continuous Sikku Loop weaving around dots -->
  <path d="M 100,40 C 50,40 40,50 40,100 C 40,150 50,160 100,160 C 150,160 160,150 160,100 C 160,50 150,40 100,40 Z M 100,75 C 80,75 75,80 75,100 C 75,120 80,125 100,125 C 120,125 125,120 125,100 C 125,80 120,75 100,75 Z" fill="none" stroke="#FF523B" stroke-width="4"/>
</svg>''',

    r"kolam\loop-line-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 3x3 Dot Grid -->
  <circle cx="60" cy="60" r="5" fill="#6366F1"/>
  <circle cx="100" cy="60" r="5" fill="#6366F1"/>
  <circle cx="140" cy="60" r="5" fill="#6366F1"/>
  <circle cx="60" cy="100" r="5" fill="#6366F1"/>
  <circle cx="100" cy="100" r="6" fill="#FF523B"/>
  <circle cx="140" cy="100" r="5" fill="#6366F1"/>
  <circle cx="60" cy="140" r="5" fill="#6366F1"/>
  <circle cx="100" cy="140" r="5" fill="#6366F1"/>
  <circle cx="140" cy="140" r="5" fill="#6366F1"/>
  <!-- Four-Corner Teardrop Loops -->
  <path d="M 60,40 C 40,40 40,80 60,80 C 80,80 80,40 60,40 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <path d="M 140,40 C 120,40 120,80 140,80 C 160,80 160,40 140,40 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <path d="M 60,120 C 40,120 40,160 60,160 C 80,160 80,120 60,120 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <path d="M 140,120 C 120,120 120,160 140,160 C 160,160 160,120 140,120 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <!-- Center Intersecting Star -->
  <polygon points="100,75 125,100 100,125 75,100" fill="none" stroke="#FF523B" stroke-width="3.5"/>
</svg>''',

    r"kolam\loop-line-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- 4x4 Grid Dots -->
  <circle cx="60" cy="60" r="4.5" fill="#6366F1"/>
  <circle cx="86" cy="60" r="4.5" fill="#6366F1"/>
  <circle cx="114" cy="60" r="4.5" fill="#6366F1"/>
  <circle cx="140" cy="60" r="4.5" fill="#6366F1"/>
  <circle cx="60" cy="140" r="4.5" fill="#6366F1"/>
  <circle cx="86" cy="140" r="4.5" fill="#6366F1"/>
  <circle cx="114" cy="140" r="4.5" fill="#6366F1"/>
  <circle cx="140" cy="140" r="4.5" fill="#6366F1"/>
  <!-- Dual Interlocking Brahma Mudi Sikku Strands -->
  <path d="M 100,35 L 165,100 L 100,165 L 35,100 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <path d="M 100,55 L 145,100 L 100,145 L 55,100 Z" fill="none" stroke="#FF523B" stroke-width="3.5"/>
</svg>''',

    # Category 3: Radiant Padma & Margazhi Threshold Kolam (Challenging)
    r"kolam\decorative-daily-kolams\example-01.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Center Seed Pod -->
  <circle cx="100" cy="100" r="18" fill="none" stroke="#FF7A00" stroke-width="3.5"/>
  <circle cx="100" cy="100" r="6" fill="#FF7A00"/>
  <!-- 8 Radiating Scalloped Lotus Petals -->
  <path d="M 100,82 C 85,45 115,45 100,82 Z M 100,118 C 85,155 115,155 100,118 Z M 82,100 C 45,85 45,115 82,100 Z M 118,100 C 155,85 155,115 118,100 Z" fill="none" stroke="#FF523B" stroke-width="3.5"/>
  <path d="M 87,87 C 60,60 75,45 87,87 Z M 113,87 C 140,60 125,45 113,87 Z M 87,113 C 60,140 75,155 87,113 Z M 113,113 C 140,140 125,155 113,113 Z" fill="none" stroke="#6366F1" stroke-width="3"/>
  <!-- Leaf Arcs -->
  <circle cx="100" cy="30" r="4" fill="#FF523B"/>
  <circle cx="100" cy="170" r="4" fill="#FF523B"/>
  <circle cx="30" cy="100" r="4" fill="#FF523B"/>
  <circle cx="170" cy="100" r="4" fill="#FF523B"/>
</svg>''',

    r"kolam\decorative-daily-kolams\example-02.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Complex 5x5 Grid 8-Pointed Radiating Star -->
  <polygon points="100,25 122,78 175,100 122,122 100,175 78,122 25,100 78,78" fill="none" stroke="#6366F1" stroke-width="3.5" stroke-linejoin="round"/>
  <polygon points="100,45 116,84 155,100 116,116 100,155 84,116 45,100 84,84" fill="none" stroke="#FF523B" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="100" cy="100" r="14" fill="#FF7A00"/>
</svg>''',

    r"kolam\decorative-daily-kolams\example-03.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <rect width="200" height="200" fill="#F8FAFC" rx="16"/>
  <!-- Grand 8-Petal Floral Rosette with Double Contours -->
  <circle cx="100" cy="100" r="24" fill="none" stroke="#FF523B" stroke-width="3.5"/>
  <circle cx="100" cy="100" r="12" fill="#FF7A00"/>
  <!-- Outer Petal Contours -->
  <path d="M 100,76 Q 120,40 100,24 Q 80,40 100,76 Z M 100,124 Q 120,160 100,176 Q 80,160 100,124 Z M 76,100 Q 40,120 24,100 Q 40,80 76,100 Z M 124,100 Q 160,120 176,100 Q 160,80 124,100 Z" fill="none" stroke="#6366F1" stroke-width="3.5"/>
  <!-- Diagonals -->
  <path d="M 83,83 Q 50,50 46,60 Q 60,46 83,83 Z M 117,83 Q 150,50 154,60 Q 140,46 117,83 Z M 83,117 Q 50,150 46,140 Q 60,154 83,117 Z M 117,117 Q 150,150 154,140 Q 140,154 117,117 Z" fill="none" stroke="#FF523B" stroke-width="3"/>
</svg>''',
}

created_count = 0
for rel_path, content in svgs.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    created_count += 1

print(f"Successfully generated {created_count} authentic Tamil Nadu Kolam & Maharashtra Warli SVG vector files in {base_dir}")
