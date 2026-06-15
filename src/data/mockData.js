// Consolidated Mock Data for Moses Mugi's Complete Academic Showcase

// 1. Software Engineering & Web Development Data
export const initialEnrollment = [
  { id: "CS-301", name: "Advanced Database Systems", credits: 4, grade: "A", score: 92 },
  { id: "CS-305", name: "Cloud Architecture & Services", credits: 3, grade: "A-", score: 89 },
  { id: "CS-412", name: "Artificial Intelligence Foundations", credits: 4, grade: "B+", score: 87 },
  { id: "CS-420", name: "Modern Web Development Frameworks", credits: 3, grade: "A", score: 95 }
];

export const studentProfile = {
  name: "Moses Mugi",
  studentId: "STU-2023-8941",
  major: "Computer Science (Focus: Cloud & AI)",
  gpa: "3.84",
  advisor: "Dr. Catherine Vance",
  term: "Spring 2026"
};

export const initialInventory = [
  { id: 101, name: "NVIDIA RTX 4090 GPU", sku: "NV-RTX4090-24G", quantity: 12, price: 1599.99, supplier: "NexTech Distribution", status: "In Stock" },
  { id: 102, name: "AMD Ryzen 9 7950X CPU", sku: "AMD-RYZ9-7950X", quantity: 25, price: 549.00, supplier: "Silicon Valley Wholesale", status: "In Stock" },
  { id: 103, name: "Samsung 990 Pro SSD 2TB", sku: "SS-990P-2TB", quantity: 8, price: 169.99, supplier: "NexTech Distribution", status: "Low Stock" },
  { id: 104, name: "Corsair Vengeance 32GB DDR5", sku: "CS-VEN5-32G", quantity: 45, price: 115.50, supplier: "Global Components Inc.", status: "In Stock" },
  { id: 105, name: "ASUS ROG Thor 1000W PSU", sku: "AS-THOR-1000W", quantity: 3, price: 299.99, supplier: "Global Components Inc.", status: "Low Stock" },
  { id: 106, name: "Lian Li O11 Dynamic EVO Case", sku: "LL-O11D-EVO", quantity: 0, price: 149.99, supplier: "Silicon Valley Wholesale", status: "Out of Stock" }
];

export const suppliersList = [
  "NexTech Distribution",
  "Silicon Valley Wholesale",
  "Global Components Inc.",
  "Apex Hardware Group"
];

// 2. AI Integration & Cybersecurity Data
export const chatbotScenarios = [
  {
    id: "query-1",
    label: "Course Prerequisites",
    prompt: "What are the prerequisites for Cloud Architecture (CS-305)?",
    response: "The prerequisites for CS-305 (Cloud Architecture & Services) are:\n1. CS-201 (Data Structures & Algorithms)\n2. CS-204 (Operating Systems & Networks)\n\nAn understanding of basic Linux command-line tools is highly recommended before starting."
  },
  {
    id: "query-2",
    label: "Explain Big-O Complexity",
    prompt: "Can you explain Big-O time complexity with examples?",
    response: "Big-O notation describes the limiting behavior of a function when the argument tends towards a particular value or infinity (essentially, execution efficiency).\n\nKey Complexities:\n- **O(1) - Constant Time**: Hash map lookups. Execution time is independent of input size.\n- **O(N) - Linear Time**: Finding an element in an unsorted list. Time grows directly with input size.\n- **O(N²) - Quadratic Time**: Bubble Sort. Nested loops over the dataset.\n- **O(log N) - Logarithmic Time**: Binary search in a sorted array."
  },
  {
    id: "query-3",
    label: "Draft Research Abstract",
    prompt: "Draft an abstract outline for my AI integration project.",
    response: "Here is a structured academic abstract outline for your AI Integration Case Study:\n\n**Title**: Integrating Large Language Models for Academic Query Resolution in Student Intranet Portals\n\n- **Background**: Traditional student portals rely on static FAQ trees, leading to high support query times.\n- **Objective**: Develop an interactive, context-aware AI agent embedded in portals to handle curriculum and syllabus queries.\n- **Methodology**: Implemented a responsive React interface running lightweight Retrieval-Augmented Generation (RAG) querying catalog databases.\n- **Results**: Reduced navigation query search time by 75% in automated testing simulations.\n- **Conclusion**: Integrating contextual AI tools inside institutional portals significantly lowers helpdesk workloads."
  }
];

export const pentestScript = [
  { type: "input", text: "nmap -sV -O -p- 192.168.1.50" },
  { type: "output", text: "Starting Nmap 7.94 ( https://nmap.org ) at 2026-06-15 21:30" },
  { type: "output", text: "Nmap scan report for mock-target.local (192.168.1.50)" },
  { type: "output", text: "Host is up (0.00045s latency)." },
  { type: "output", text: "PORT     STATE SERVICE     VERSION" },
  { type: "output", text: "21/tcp   open  ftp         vsftpd 2.3.4" },
  { type: "output", text: "22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1" },
  { type: "output", text: "80/tcp   open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)" },
  { type: "output", text: "139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X" },
  { type: "output", text: "445/tcp  open  netbios-ssn Samba smbd 3.X - 4.X" },
  { type: "output", text: "3306/tcp open  mysql       MySQL 5.0.51a-3ubuntu5" },
  { type: "output", text: "8180/tcp open  http        Apache Tomcat/Coyote 1.1" },
  { type: "output", text: "Device type: general purpose | OS details: Linux 2.6.24 - 2.6.30" },
  { type: "status", text: "[!] Vulnerability Scan Complete: Found vsftpd 2.3.4 Backdoor (CVE-2011-2523) and Apache Tomcat weak credentials." },
  { type: "input", text: "msfconsole" },
  { type: "output", text: "      \u001b[32m_________________________________________________________________\u001b[0m" },
  { type: "output", text: "     \u001b[32m/                                                                 \\\u001b[0m" },
  { type: "output", text: "    \u001b[32m| [metasploit v6.3.35-dev]                     | [100+ exploits]    |\u001b[0m" },
  { type: "output", text: "     \u001b[32m\\_________________________________________________________________/\u001b[0m" },
  { type: "output", text: "msf6 > search vsftpd" },
  { type: "output", text: "Matching Modules\n================\n  #  Name                                  Disclosure Date  Rank       Description\n  -  ----                                  ---------------  ----       -----------\n  0  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  VSFTPD v2.3.4 Backdoor Command Execution" },
  { type: "input", text: "use exploit/unix/ftp/vsftpd_234_backdoor" },
  { type: "output", text: "[*] No payload configured, defaulting to cmd/unix/interact" },
  { type: "input", text: "set RHOSTS 192.168.1.50" },
  { type: "output", text: "RHOSTS => 192.168.1.50" },
  { type: "input", text: "exploit" },
  { type: "output", text: "[*] 192.168.1.50:21 - Banner: 220 (vsFTPd 2.3.4)" },
  { type: "output", text: "[*] 192.168.1.50:21 - USER: sending backdoor trigger..." },
  { type: "output", text: "[*] 192.168.1.50:21 - Backdoor service spawned on port 6200" },
  { type: "output", text: "[*] 192.168.1.50:21 - Attempting to connect to backdoor..." },
  { type: "status", text: "[+] Command shell session 1 opened (192.168.1.12:43521 -> 192.168.1.50:6200) at 2026-06-15 21:32" },
  { type: "input", text: "whoami && uname -a && cat /etc/shadow" },
  { type: "output", text: "root" },
  { type: "output", text: "Linux mock-target 2.6.24-16-server #1 SMP Thu Apr 10 13:58:00 UTC 2008 i686 GNU/Linux" },
  { type: "output", text: "root:$1$L3.A8/Q1$G918uH...:14320:0:99999:7:::\ndaemon:*:14320:0:99999:7:::\nbin:*:14320:0:99999:7:::\nsys:*:14320:0:99999:7:::\nservice:$1$eK1n23H...:14320:0:99999:7:::" },
  { type: "status", text: "[!] PENETRATION TEST SIMULATION COMPLETED SUCCESSFULLY: Root privilege escalation achieved via port 21 backdoor exploit." }
];

export const vulnerabilityReport = {
  host: "192.168.1.50 (mock-target.local)",
  severitySummary: { critical: 2, high: 1, medium: 2, low: 1 },
  vulnerabilities: [
    {
      id: "VULN-001",
      title: "VSFTPD v2.3.4 Backdoor Command Execution",
      cve: "CVE-2011-2523",
      severity: "CRITICAL",
      cvss: 10.0,
      description: "The vsftpd version 2.3.4 contains a backdoor triggered by entering a username ending in a smiley face :) and any password, which spawns a shell listening on port 6200.",
      remediation: "Upgrade vsftpd to a supported version (v2.3.5 or higher) or replace with a secure alternative SFTP daemon.",
      owasp: "A06:2021-Vulnerable and Outdated Components"
    },
    {
      id: "VULN-002",
      title: "Apache Tomcat Weak Manager Credentials",
      cve: "N/A",
      severity: "CRITICAL",
      cvss: 9.8,
      description: "The Tomcat administration portal at port 8180 uses default/weak manager credentials (admin:admin), enabling arbitrary WAR file deployments resulting in Remote Code Execution (RCE).",
      remediation: "Disable or lock down the /manager console access. Apply strong, complex passwords and IP restriction rules in tomcat-users.xml.",
      owasp: "A07:2021-Identification and Authentication Failures"
    },
    {
      id: "VULN-003",
      title: "Samba trans2open Overflow Vulnerability",
      cve: "CVE-2003-0201",
      severity: "HIGH",
      cvss: 8.5,
      description: "An off-by-one buffer overflow vulnerability in trans2open function in Samba allows remote attackers to execute arbitrary code as root.",
      remediation: "Apply official patches or upgrade Samba to version 3.0.x or above.",
      owasp: "A06:2021-Vulnerable and Outdated Components"
    }
  ]
};

// 3. Cloud Computing & Data Science Data
export const initialProducts = [
  { id: 1, name: "Intel NUC Mini PC (AI Edge Node)", category: "Hardware", price: 649.99, image: "💻", stock: 15, popularity: 92 },
  { id: 2, name: "Cloud Storage Serverless Plan (1YR)", category: "Software", price: 120.00, image: "☁️", stock: 999, popularity: 85 },
  { id: 3, name: "Smart IoT Temperature Sensor", category: "Hardware", price: 39.50, image: "🌡️", stock: 42, popularity: 78 },
  { id: 4, name: "Neural Network Training E-Book", category: "Software", price: 29.99, image: "📚", stock: 999, popularity: 95 },
  { id: 5, name: "Edge TPU Accelerator USB", category: "Hardware", price: 79.99, image: "⚡", stock: 8, popularity: 88 }
];

export const cloudDeploymentStats = {
  totalSales: 4125.80,
  ordersCount: 84,
  cpuUtilization: 18.5,
  serverlessInvocations: 12450,
  activeConnections: 142,
  regionalTraffic: [
    { region: "us-east-1", share: 45, latency: 12 },
    { region: "eu-west-1", share: 30, latency: 18 },
    { region: "ap-southeast-1", share: 15, latency: 25 },
    { region: "sa-east-1", share: 10, latency: 32 }
  ],
  trafficTrend: [
    { time: "00:00", requests: 340, lambdaTime: 45 },
    { time: "04:00", requests: 120, lambdaTime: 40 },
    { time: "08:00", requests: 890, lambdaTime: 55 },
    { time: "12:00", requests: 1240, lambdaTime: 65 },
    { time: "16:00", requests: 950, lambdaTime: 50 },
    { time: "20:00", requests: 620, lambdaTime: 48 }
  ]
};

export const retailDataset = [
  { id: 1, date: "2024-01-15", category: "Technology", product: "MacBook Pro M3", sales: 1999.99, profit: 599.99, region: "North" },
  { id: 2, date: "2024-01-18", category: "Furniture", product: "Ergonomic Desk Chair", sales: 249.50, profit: 85.00, region: "East" },
  { id: 3, date: "2024-02-05", category: "Technology", product: "iPhone 15 Pro Max", sales: 1199.00, profit: 450.00, region: "West" },
  { id: 4, date: "2024-02-12", category: "Office Supplies", product: "Whiteboard Pack x5", sales: 89.99, profit: 32.50, region: "South" },
  { id: 5, date: "2024-03-01", category: "Furniture", product: "Standing Desk L-Shape", sales: 499.00, profit: 120.00, region: "North" },
  { id: 6, date: "2024-03-14", category: "Technology", product: "iPad Pro 11-inch", sales: 799.00, profit: 240.00, region: "East" },
  { id: 7, date: "2024-04-10", category: "Office Supplies", product: "Ergonomic Keyboard", sales: 129.99, profit: 45.00, region: "West" },
  { id: 8, date: "2024-04-25", category: "Furniture", product: "Bookshelf Oak wood", sales: 349.00, profit: 75.00, region: "South" },
  { id: 9, date: "2024-05-03", category: "Technology", product: "Dell UltraSharp 32\"", sales: 699.99, profit: 180.00, region: "North" },
  { id: 10, date: "2024-05-20", category: "Office Supplies", product: "Dual Monitor Stand", sales: 110.00, profit: 40.00, region: "East" }
];

export const retailMetrics = {
  totalSales: 6125.46,
  totalProfit: 1867.48,
  avgProfitMargin: 30.48,
  recordsCount: 10543,
  categoryData: [
    { category: "Technology", sales: 4697.98, profit: 1469.99 },
    { category: "Furniture", sales: 1097.50, profit: 280.00 },
    { category: "Office Supplies", sales: 329.98, profit: 117.50 }
  ],
  monthlyTrend: [
    { month: "Jan", sales: 2249.49, profit: 684.99 },
    { month: "Feb", sales: 1288.99, profit: 482.50 },
    { month: "Mar", sales: 1298.00, profit: 360.00 },
    { month: "Apr", sales: 478.99, profit: 120.00 },
    { month: "May", sales: 809.99, profit: 220.00 }
  ]
};

export const analyticsPlaygroundCode = [
  {
    id: "sql-1",
    language: "sql",
    title: "SQL: Sales & Profit by Category",
    code: `SELECT \n  category,\n  SUM(sales) as Total_Sales,\n  SUM(profit) as Total_Profit,\n  ROUND((SUM(profit) / SUM(sales)) * 100, 2) as Margin_Pct\nFROM retail_data\nGROUP BY category\nORDER BY Total_Sales DESC;`,
    result: [
      { category: "Technology", Total_Sales: "$4,697.98", Total_Profit: "$1,469.99", Margin_Pct: "31.29%" },
      { category: "Furniture", Total_Sales: "$1,097.50", Total_Profit: "$280.00", Margin_Pct: "25.51%" },
      { category: "Office Supplies", Total_Sales: "$329.98", Total_Profit: "$117.50", Margin_Pct: "35.61%" }
    ]
  },
  {
    id: "sql-2",
    language: "sql",
    title: "SQL: Top High-Profit Products",
    code: `SELECT \n  product,\n  category,\n  sales,\n  profit\nFROM retail_data\nWHERE profit > 100\nORDER BY profit DESC\nLIMIT 3;`,
    result: [
      { product: "MacBook Pro M3", category: "Technology", sales: "$1,999.99", profit: "$599.99" },
      { product: "iPhone 15 Pro Max", category: "Technology", sales: "$1,199.00", profit: "$450.00" },
      { product: "iPad Pro 11-inch", category: "Technology", sales: "$799.00", profit: "$240.00" }
    ]
  },
  {
    id: "pandas-1",
    language: "python",
    title: "Pandas: Data Cleaning & Correlation",
    code: `# Analysing correlation between price and profit margin\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame(retail_dataset)\n\n# Calculate margin column\ndf['margin_pct'] = (df['profit'] / df['sales']) * 100\n\n# Calculate correlation matrix\ncorr = df[['sales', 'profit', 'margin_pct']].corr()\nprint(corr.to_string())`,
    result: `               sales    profit  margin_pct\nsales       1.000000  0.983944    0.158223\nprofit      0.983944  1.000000    0.301289\nmargin_pct  0.158223  0.301289    1.000000`
  },
  {
    id: "pandas-2",
    language: "python",
    title: "Pandas: Regional Sales Summary",
    code: `# Grouping retail sales by region with Pandas agg\nimport pandas as pd\n\ndf = pd.DataFrame(retail_dataset)\nregional_summary = df.groupby('region').agg({\n    'sales': ['sum', 'mean'],\n    'profit': 'sum'\n})\nprint(regional_summary)`,
    result: `          sales              profit\n            sum        mean     sum\nregion                             \nEast    1159.50  386.500000  365.00\nNorth   3198.98 1066.326667  899.99\nSouth    438.99  219.495000  107.50\nWest    1328.99  664.495000  495.00`
  }
];

// 4. Moses Mugi's Multi-Discipline Connection Graph (14 Nodes representing academic versatility across 6 fields)
export const skillsGraph = {
  nodes: [
    // Web Development
    { id: "React", group: 1, val: 24, x: 200, y: 120, desc: "Frontend modularity, responsive UI grids, and theme triggers" },
    { id: "Web Development", group: 1, val: 28, x: 120, y: 80, desc: "Portal web layouts, checkout portals, dynamic chat boxes" },
    
    // Software Engineering
    { id: "Java & MVC", group: 2, val: 24, x: 280, y: 200, desc: "Object-oriented design, Swing framework structure, DB controllers" },
    { id: "MySQL Relational", group: 2, val: 20, x: 150, y: 260, desc: "Relational modeling, transaction integrity, indexing, joins" },
    { id: "Software Eng", group: 2, val: 28, x: 280, y: 320, desc: "Consolidated databases, ledger adjustment logs, CRUD algorithms" },
    
    // Cybersecurity
    { id: "Kali Linux OS", group: 3, val: 20, x: 450, y: 80, desc: "Penetration testing suites, security scripting, server audits" },
    { id: "Metasploit & Nmap", group: 3, val: 22, x: 550, y: 150, desc: "Vulnerability analysis scanners, port triggers, root exploits" },
    { id: "Cybersecurity", group: 3, val: 28, x: 480, y: 220, desc: "Remediation strategies, security risk ratings, OWASP guidelines compliance" },
    
    // AI Integration
    { id: "NLP & LLMs", group: 4, val: 22, x: 820, y: 120, desc: "Contextual intent parsing, retrieval-augmented prompt feeds" },
    { id: "AI Integration", group: 4, val: 28, x: 720, y: 180, desc: "Syllabus AI bots, automated essay/code helpers, agent chat panels" },
    
    // Cloud Computing
    { id: "AWS Lambda & CDN", group: 5, val: 22, x: 460, y: 320, desc: "Serverless lambda backends, global assets caching, route gateways" },
    { id: "Cloud Computing", group: 5, val: 28, x: 580, y: 360, desc: "Cloud deployment dashboard monitors, storefront checkouts" },
    
    // Data Science
    { id: "Python & Pandas", group: 6, val: 24, x: 860, y: 260, desc: "Dataset matrix operations, correlation analysis, statistics printouts" },
    { id: "Power BI Visuals", group: 6, val: 22, x: 740, y: 300, desc: "Interactive charts, trend metrics trackers, visual aggregations" },
    { id: "Data Science", group: 6, val: 28, x: 850, y: 380, desc: "Dataset slice filtering, code playground executors, database queries" }
  ],
  links: [
    // Web Dev & Software Eng
    { source: "React", target: "Web Development" },
    { source: "Java & MVC", target: "Software Eng" },
    { source: "MySQL Relational", target: "Software Eng" },
    { source: "MySQL Relational", target: "Web Development" },
    { source: "React", target: "Software Eng" },

    // Cybersecurity
    { source: "Kali Linux OS", target: "Cybersecurity" },
    { source: "Metasploit & Nmap", target: "Cybersecurity" },
    { source: "Metasploit & Nmap", target: "Kali Linux OS" },

    // AI Integration
    { source: "NLP & LLMs", target: "AI Integration" },
    { source: "React", target: "AI Integration" },

    // Cloud Computing
    { source: "AWS Lambda & CDN", target: "Cloud Computing" },
    { source: "React", target: "Cloud Computing" },
    { source: "MySQL Relational", target: "Cloud Computing" },

    // Data Science
    { source: "Python & Pandas", target: "Data Science" },
    { source: "Power BI Visuals", target: "Data Science" },
    { source: "Python & Pandas", target: "Power BI Visuals" },
    { source: "MySQL Relational", target: "Data Science" },
    
    // Cross-Disciplinary Mappings (Academic Versatility!)
    { source: "Web Development", target: "Cloud Computing" },
    { source: "Cybersecurity", target: "Cloud Computing" },
    { source: "AI Integration", target: "Data Science" },
    { source: "Software Eng", target: "Cybersecurity" }
  ]
};
