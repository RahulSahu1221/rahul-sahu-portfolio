/* ==========================================================================
   TRANSLATIONS — English (default) / Japanese / Hindi
   Keyed by dot-path used in data-i18n attributes throughout index.html.
   Values may contain simple inline HTML (<em>, <br>) where the original
   markup needs it.
   ========================================================================== */
window.PORTFOLIO_I18N = {

en: {
  meta: { name: "English" },
  nav: { about: "About", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", certifications: "Certifications", contact: "Contact" },
  dock: { theme: "Toggle theme", lang: "Language", cmdk: "Command palette" },

  hero: {
    eyebrow: "EEE · Final Year",
    name: "Rahul<br><em>Sahu</em>",
    title: "Electrical &amp; Electronics Engineer",
    desc: "Power systems specialist with hands-on field experience at Nepal Electricity Authority, proficiency in MATLAB/Simulink, and JLPT N5 Japanese certification — targeting core electrical engineering roles with Japanese industry leaders.",
    stat1Label: "CGPA / 10", stat2Label: "Field OJT", stat3Label: "JLPT Japan",
    ctaPrimary: "Get In Touch", ctaOutline: "View Work",
    badgeJp: "日本語", badgeSmall: "Targeting Japan",
    scroll: "Scroll"
  },
  marquee: ["Power Systems", "MATLAB / Simulink", "Power Electronics", "日本語 · JLPT N5", "Embedded Systems", "IoT Engineering", "Nepal Electricity Authority", "AutoCAD Electrical"],

  about: {
    label: "About Me", title: "Engineer<br><em>with Purpose</em>",
    p1: "I am a final-year B.Tech Electrical &amp; Electronics Engineering student at Aditya College of Engineering &amp; Technology, Andhra Pradesh — consistently ranked among the top performers with a <strong>CGPA of 9.19/10</strong> and holding <strong>1st rank in Semester 5</strong>.",
    p2: "My foundation was built in the field. Before university, I completed <strong>6 months of On-the-Job Training at Nepal Electricity Authority</strong>, working directly on distribution line operations, substation activities, and energy meter installations — real infrastructure, real stakes.",
    p3: "I bridge hardware and simulation: from designing <strong>Power Factor Correction systems in MATLAB/Simulink</strong> to building IoT-enabled embedded projects. My goal is to join a Japanese engineering firm where precision, discipline, and technical depth are non-negotiable — values I've built my academic career around.",
    factsLabel: "Quick Facts",
    k1: "Roll Number", k2: "Institution", k3: "Degree", k4: "Expected Graduation", k5: "CGPA", k6: "Semester 5 Rank", k7: "Field OJT", k8: "Target Market", k9: "Nationality", k10: "Location",
    v3: "B.Tech — EEE", v4: "May 2027", v6: "1st in Department", v7: "Nepal Electricity Authority", v8: "Japan (Zenken India)", v9: "Nepali", v10: "Kakinada, Andhra Pradesh"
  },

  experience: {
    label: "Career", title: "Experience &amp;<br><em>Background</em>",
    e1: { type: "Internship · Long-Term", title: "Electrical System Design — AutoCAD", org: "SkillDzire · APSCHE", desc: "Completed a long-term internship on electrical system design using AutoCAD, organized in collaboration with the Andhra Pradesh State Council of Higher Education. Developed proficiency in industrial-grade electrical drawing and layout practices." },
    e2: { type: "Internship · NSDC Affiliated", title: "IoT Engineering Internship", org: "Emertxe · NSDC / ESSCI", desc: "Hands-on training in Internet of Things systems covering foundational programming in C, microcontroller interfacing, and SDLC-based project building. Affiliated with National Skill Development Corporation and ESSCI." },
    e3: { type: "Internship · AICTE Approved", title: "Electric Vehicle Technologies", org: "SkillDzire · AICTE", desc: "Short-term internship on Electric Vehicle technologies and powertrain fundamentals. Covered EV architecture, battery management principles, and charging systems under AICTE-approved curriculum." },
    e4: { type: "On-the-Job Training · 6 Months", title: "Electrical Engineering Trainee (OJT)", org: "Nepal Electricity Authority — Bharatpur", desc: "Six months of structured OJT in live power distribution infrastructure. Executed overhead line patrols, fault identification, switchyard activities, transformer inspections, and energy meter installation. Certified by Acting Centre Chief Er. Rajendra Prasad Paudel." }
  },

  education: {
    label: "Academic Journey", title: "Educational<br><em>Background</em>",
    ed1: { badge: "Pursuing · Final Year", degree: "B.Tech — Electrical &amp; Electronics Engineering", school: "Aditya College of Engineering &amp; Technology (Autonomous) · AP, India", detail: "Consistently among top performers. Ranked 1st in Semester 5, and 2nd in Semesters 1–4. 3rd year completed May 2026. Strong foundation in core electrical systems.", scoreLabel: "CGPA · 5 Semesters" },
    ed2: { badge: "Completed · 2022", degree: "Higher Secondary — Technical &amp; Vocational (EEE)", school: "Pashupati Secondary School · Rupandehi, Nepal", detail: "Specialized in the Technical and Vocational stream with a core focus on Electrical Engineering fundamentals, practical applications, and hands-on technical skills.", scoreLabel: "GPA" },
    ed3: { badge: "Completed · 2020", degree: "Secondary Education — Technical Stream", school: "Tribhuvan Secondary School · Nepal", detail: "Completed early secondary education within the Technical Stream, building a robust mathematical and scientific foundation for future engineering and vocational studies.", scoreLabel: "GPA" }
  },

  skills: {
    label: "Capabilities", title: "Technical<br><em>Skills</em>",
    s1cat: "Core Engineering", s1items: "Power Systems Analysis<br>Power Electronics<br>Electrical Machines<br>Control Systems<br>High Voltage Engineering<br>Switchgear &amp; Protection",
    s2cat: "Simulation &amp; Design", s2items: "MATLAB / Simulink<br>DIALux Evo<br>AutoCAD (Electrical)<br>Multisim / Ultiboard<br>Proteus 8 Professional",
    s3cat: "Practical / Field", s3items: "Substation Operations<br>Distribution Line Maintenance<br>Energy Meter Installation<br>Electrical Fault Diagnosis<br>HV Safety Procedures",
    s4cat: "Embedded &amp; IoT", s4items: "Arduino / Microcontrollers<br>8051 / PIC18 / 8086<br>STM32 (Blue Pill)<br>GSM &amp; GPS Modules<br>Sensor Integration",
    s5cat: "Software &amp; Other", s5items: "Microsoft Excel (Intermediate)<br>Python (Basics)<br>PCB Design Fundamentals<br>Technical Documentation<br>Project Presentation",
    s6cat: "Languages", s6items: "English (Cambridge B2)<br>日本語 / Japanese (JLPT N5)<br>Nepali (Fluent)<br>Hindi (Fluent)<br>Bhojpuri (Native)",
    radarTitle: "◆ Competency Radar ◆",
    r1: "Core Engineering", r2: "Simulation &amp; Design", r3: "Practical / Field", r4: "Embedded &amp; IoT", r5: "Software &amp; Other", r6: "Languages"
  },

  projects: {
    label: "Work", title: "Featured<br><em>Projects</em>",
    tabCompleted: "Completed", tabOngoing: "Ongoing",
    linkCode: "View Code", linkLive: "Live Demo",
    statusComplete: "Complete", statusProgress: "In Progress", statusBlocked: "Blocked", statusLive: "Live",
    p1: { title: "Smart Factory IoT Monitoring System", subtitle: "IoT Internship · Arduino · ThingsBoard · MQTT", desc: "Two-node factory monitoring system built during an IoT internship. Node 1 (main node) has completed gap analysis with fully corrected code; a handful of PICSimLab / W5100–W5500 simulator mismatches are still being resolved. Node 2 (warehouse node) has not yet been started." },
    p2: { title: "RONIN — JLPT Vocabulary Trainer", subtitle: "Progressive Web App · Vanilla JavaScript", desc: "A live, no-build-step PWA covering N5 and N4 vocabulary. Features SRS flashcards, quizzes, four mini-games (Memory Match, Kanji Meteor, Word Chain, JLPT Mock Test), Jisho API dictionary search, custom decks, analytics/heatmap, XP gamification, full offline support, and multi-device touch controls. Built with production-grade theming, light/dark modes, and accessibility support." },
    p3: { title: "Mold Verification &amp; Safety Interlock System", subtitle: "Proteus 8 Professional · Arduino Uno", desc: "A safety start-permit interlock system with three proximity sensors on AND logic, LCD status display, LED/buzzer alerting, and a relay with flyback diode protection. Includes debounce filtering and a deliberate-restart-required safety lock after a fault. Circuit and code fully validated in simulation." },
    p4: { title: "Transformer Life Gauge", subtitle: "Circuit Simulation", desc: "Simulation stage completed. A few small circuit issues remain to be fixed before the design is finalized." },
    p5: { title: "Solar Monitoring System", subtitle: "Arduino Uno · Proteus", desc: "Real-time solar energy monitoring system measuring panel voltage, charging current, battery voltage, battery state of charge, output power, and generated energy — all displayed on a 20×4 LCD. Completed and fully simulated." },
    p6: { title: "EV ADAS System", subtitle: "STM32 (Blue Pill) · PICSimLab · Python / Matplotlib", desc: "An EV control and ADAS state machine built on STM32, paired with a real-time Python/Matplotlib dashboard and simulated in PICSimLab — developed during the Automotive Embedded Systems internship at Emertxe. Functionally complete, but currently blocked by a microcontroller configuration issue; a fix is planned." },
    p7: { title: "Automated Bi-Directional Test &amp; Kitting System", subtitle: "\u201CSeal Mule\u201D · Autonomous Mobile Robot", desc: "An AMR design combining closed-loop PID motor control, RFID/barcode part verification, and wireless data collection from vibration-energy-harvesting sensor nodes along its route. Two-controller architecture: PLC ladder logic (LDmicro) for sequencing/interlocks, plus Arduino for motor/PID/sensor control. Controller and sensor-node code are written; currently blocked on a Proteus library version mismatch for wireless-module simulation." },
    p8: { title: "Two-Stage Fastening Verification System", subtitle: "\u201CBoltGuard\u201D · PLC + Arduino", desc: "Stage 1 verifies install-time torque and angle with PLC ladder sequencing across multiple points (poka-yoke, fault-lock-until-reset). Stage 2 adds an in-service loosening early-warning layer that monitors drift after installation to catch vibration-induced loosening before failure. Ladder logic and Arduino code are complete; circuit wiring is almost finished in Proteus simulation." }
  },

  certifications: {
    label: "Credentials", title: "Certifications &amp;<br><em>Training</em>", verified: "Verified", viewCert: "View Certificate",
    c1: { issuer: "SkillDzire · APSCHE", title: "Electrical System Design using AutoCAD", desc: "Designed electrical layouts using AutoCAD, including wiring diagrams, load calculations, and real-world power distribution planning.", date: "Dec 2025 – Mar 2026 · Long-Term", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe · NSDC / ESSCI", title: "Internet of Things (IoT)", desc: "Built a Smart Factory IoT system using Arduino, MQTT, and ThingsBoard with real-time monitoring, automation, and SDLC-based development.", date: "Mar – Apr 2026", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire · AICTE", title: "Electric Vehicle Technologies Internship", desc: "Gained hands-on experience in EV technologies, including battery systems, motor control, and charging infrastructure concepts.", date: "May 2025 – Jul 2025 · Long-Term", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT · Japan Foundation", title: "Japanese Language Proficiency — N5", desc: "Achieved N5 level in Japanese Language Proficiency Test, demonstrating basic reading, listening, and communication skills.", date: "December 2025 · Score: 83 / 180", id: "Reg: 25B3010401-51110 · Passed" },
    c5: { issuer: "Nepal Electricity Authority", title: "6-Month Electrical Engineering OJT", desc: "Completed 6-month field training in power distribution systems, working on substations, maintenance, and real-time electrical operations.", date: "Jun – Dec 2022 · Bharatpur", id: "Issued: Dec 21, 2022" },
    c6: { issuer: "SkillDzire · APSCHE", title: "Solar PV System Design", desc: "Completed an online internship in solar photovoltaic system design, covering panel sizing, string configuration, and system layout fundamentals.", date: "2026", id: "Certificate ID: eveac3jtc7" }
  },

  achievements: {
    label: "Recognition", title: "Achievements &amp;<br><em>Activities</em>",
    a1: { title: "2nd Prize — VEDA 2K25 National Symposium", desc: "Awarded 2nd Prize in Poster Presentation at the VEDA 2K25 National Level Student Symposium, Aditya University, during Engineer's Day (September 2025). Project: Electric Motor Technologies for EV Applications." },
    a2: { title: "Ranked 1st — Semester 5, B.Tech EEE", desc: "Achieved 1st rank in department in Semester 5. Maintained 2nd position in Semesters 1–4 with consistent academic excellence. Overall CGPA: 9.19/10 after five semesters." },
    a3: { title: "Symposium Coordinator — VEDA 2K25", desc: "Served as event coordinator for the VEDA 2K25 National Level Student Symposium at Aditya University, managing technical sessions and participant coordination for the Engineer's Day event." },
    a4: { title: "Paper Presentation — VEDA 2K24 Symposium", desc: "Participated as a paper presenter at the VEDA 2K24 National Level Technical Symposium, demonstrating research communication skills at the national level during Engineer's Day (September 2024)." },
    a5: { title: "Japanese Language Proficiency (JLPT N5 Certified)", desc: "Successfully passed JLPT N5 (December 2025) with a score of 83/180, earning A grades in Vocabulary and Grammar. Currently preparing for JLPT N4 to enhance professional communication and workplace readiness." }
  },

  contact: {
    label: "Let's Connect", tagline: "Ready for<br><em>What's Next</em>",
    sub: "Open to Japanese engineering placements via Zenken India and core EEE roles in India.",
    email: "Email", phone: "Phone", linkedin: "LinkedIn", instagram: "Instagram"
  },
  footer: { copy: "© 2026 Rahul Sahu — Electrical &amp; Electronics Engineer", jp: "電気技術者 · ラフル・サフ" },

  cmdk: {
    placeholder: "Type a command or search…",
    groupActions: "Actions", groupNavigate: "Navigate",
    resume: "View Resume", viewProjects: "View Projects", github: "Open GitHub", linkedin: "Open LinkedIn",
    email: "Send an Email", toggleTheme: "Toggle Theme", switchLang: "Switch Language",
    goAbout: "Go to About", goExperience: "Go to Experience", goEducation: "Go to Education",
    goSkills: "Go to Skills", goProjects: "Go to Projects", goCerts: "Go to Certifications",
    goContact: "Go to Contact", noResults: "No results found.",
    focusMode: "Toggle Focus Mode", hint: "Command"
  }
},

/* ========================================================================== */
ja: {
  meta: { name: "日本語" },
  nav: { about: "自己紹介", experience: "職歴", education: "学歴", skills: "スキル", projects: "プロジェクト", certifications: "資格・修了証", contact: "連絡先" },
  dock: { theme: "テーマ切替", lang: "言語", cmdk: "コマンドパレット" },

  hero: {
    eyebrow: "電気電子工学 ・ 最終学年 ・ CGPA 9.19",
    name: "ラフル<br><em>サフ</em>",
    title: "電気電子エンジニア",
    desc: "ネパール電力公社（NEA）での実地研修経験、MATLAB/Simulinkの実務スキル、JLPT N5（日本語能力試験）認定を持つパワーシステム専門のエンジニア。日系企業でのコア電気工学職を志望しています。",
    stat1Label: "CGPA（10点満点）", stat2Label: "実地研修期間", stat3Label: "JLPT 認定",
    ctaPrimary: "お問い合わせ", ctaOutline: "実績を見る",
    badgeJp: "日本語", badgeSmall: "日本市場を志望",
    scroll: "スクロール"
  },
  marquee: ["パワーシステム", "MATLAB / Simulink", "パワーエレクトロニクス", "日本語 ・ JLPT N5", "組込みシステム", "IoTエンジニアリング", "ネパール電力公社", "AutoCAD Electrical"],

  about: {
    label: "自己紹介", title: "目的を持った<br><em>エンジニア</em>",
    p1: "私はインド・アーンドラプラデーシュ州にあるAditya College of Engineering &amp; Technologyで電気電子工学を専攻する最終学年生です。<strong>CGPA 9.19/10</strong>を維持し、<strong>第5学期では学科内1位</strong>を獲得しました。",
    p2: "私の基礎は現場で培われました。大学入学前には<strong>ネパール電力公社にて6か月間の実地研修（OJT）</strong>を修了し、配電線の運用、変電所業務、電力量計の設置など、実際のインフラに直接携わりました。",
    p3: "ハードウェアとシミュレーションを結び付けることが私の強みです。MATLAB/Simulinkによる<strong>力率改善（PFC）システムの設計</strong>から、IoTを活用した組込みプロジェクトの開発まで手がけています。精度・規律・技術的深さが求められる日系企業への入社を目標に、学業を積み重ねてきました。",
    factsLabel: "基本情報",
    k1: "学籍番号", k2: "所属機関", k3: "学位", k4: "卒業予定", k5: "CGPA", k6: "第5学期順位", k7: "実地研修", k8: "希望就職先", k9: "国籍", k10: "所在地",
    v3: "学士（電気電子工学）", v4: "2027年5月", v6: "学科内1位", v7: "ネパール電力公社", v8: "日本（Zenken India経由）", v9: "ネパール国籍", v10: "カキナダ、アーンドラプラデーシュ州"
  },

  experience: {
    label: "職歴", title: "経歴と<br><em>実務経験</em>",
    e1: { type: "インターンシップ・長期", title: "AutoCADによる電気設計", org: "SkillDzire ・ APSCHE", desc: "アーンドラプラデーシュ州高等教育評議会（APSCHE）と連携した、AutoCADを用いた電気システム設計の長期インターンシップを修了。産業レベルの電気製図・レイアウト技術を習得しました。" },
    e2: { type: "インターンシップ・NSDC提携", title: "IoTエンジニアリング・インターンシップ", org: "Emertxe ・ NSDC / ESSCI", desc: "C言語の基礎プログラミング、マイコンとのインターフェース、SDLCに基づくプロジェクト開発まで、IoTシステムの実践研修を受講。国家技能開発公社（NSDC）およびESSCI認定。" },
    e3: { type: "インターンシップ・AICTE認定", title: "電気自動車（EV）技術", org: "SkillDzire ・ AICTE", desc: "EV技術とパワートレインの基礎を学ぶ短期インターンシップ。AICTE認定カリキュラムのもと、EVアーキテクチャ、バッテリー管理の原理、充電システムを学習しました。" },
    e4: { type: "実地研修（OJT）・6か月間", title: "電気工学実習生（OJT）", org: "ネパール電力公社 ・ バラトプル支局", desc: "実稼働中の配電インフラにて6か月間の体系的なOJTを実施。架空配電線の巡視、故障箇所の特定、開閉所業務、変圧器点検、電力量計の設置を担当。センター長代理 Er. Rajendra Prasad Paudel氏の認定を取得。" }
  },

  education: {
    label: "学歴", title: "学業の<br><em>歩み</em>",
    ed1: { badge: "在学中・最終学年", degree: "学士課程 ・ 電気電子工学", school: "Aditya College of Engineering &amp; Technology（自治校）・ インド アーンドラプラデーシュ州", detail: "常に上位の成績を維持。第5学期は学科内1位、第1〜4学期は2位を継続。3年次は2026年5月に修了。電気工学の基礎を確実に習得しています。", scoreLabel: "CGPA（5学期累計）" },
    ed2: { badge: "修了・2022年", degree: "高等中等教育 ・ 技術／職業課程（電気電子工学）", school: "Pashupati Secondary School ・ ネパール ルパンデヒ郡", detail: "技術・職業課程を専攻し、電気工学の基礎理論、実践応用、実務スキルを重点的に学びました。", scoreLabel: "GPA" },
    ed3: { badge: "修了・2020年", degree: "中等教育 ・ 技術課程", school: "Tribhuvan Secondary School ・ ネパール", detail: "技術課程にて中等教育前期を修了し、工学および職業教育に向けた確かな数学・科学的基礎を築きました。", scoreLabel: "GPA" }
  },

  skills: {
    label: "専門分野", title: "技術<br><em>スキル</em>",
    s1cat: "電気工学基礎", s1items: "パワーシステム解析<br>パワーエレクトロニクス<br>電気機器<br>制御システム<br>高電圧工学<br>スイッチギア＆保護",
    s2cat: "シミュレーション＆設計", s2items: "MATLAB / Simulink<br>DIALux Evo<br>AutoCAD（電気系）<br>Multisim / Ultiboard<br>Proteus 8 Professional",
    s3cat: "実務・現場経験", s3items: "変電所運用<br>配電線保守<br>電力量計設置<br>電気故障診断<br>高電圧安全手順",
    s4cat: "組込み＆IoT", s4items: "Arduino／マイコン<br>8051 / PIC18 / 8086<br>STM32（Blue Pill）<br>GSM・GPSモジュール<br>センサー統合",
    s5cat: "ソフトウェア他", s5items: "Microsoft Excel（中級）<br>Python（基礎）<br>PCB設計基礎<br>技術文書作成<br>プロジェクト発表",
    s6cat: "言語", s6items: "英語（Cambridge B2）<br>日本語（JLPT N5）<br>ネパール語（流暢）<br>ヒンディー語（流暢）<br>ボージュプリー語（母語）",
    radarTitle: "◆ コンピテンシー・レーダー ◆",
    r1: "電気工学基礎", r2: "シミュレーション＆設計", r3: "実務・現場経験", r4: "組込み＆IoT", r5: "ソフトウェア他", r6: "言語"
  },

  projects: {
    label: "実績", title: "主要<br><em>プロジェクト</em>",
    tabCompleted: "完了", tabOngoing: "進行中",
    linkCode: "コードを見る", linkLive: "デモを見る",
    statusComplete: "完了", statusProgress: "進行中", statusBlocked: "保留中", statusLive: "公開中",
    p1: { title: "スマートファクトリーIoT監視システム", subtitle: "IoTインターンシップ ・ Arduino ・ ThingsBoard ・ MQTT", desc: "IoTインターンシップにて開発した2ノード構成の工場監視システム。ノード1（メインノード）はギャップ分析を終え、コードも修正済みですが、PICSimLabおよびW5100–W5500のシミュレーター不整合が数点残っています。ノード2（倉庫ノード）は未着手です。" },
    p2: { title: "RONIN — JLPT語彙学習アプリ", subtitle: "PWA（プログレッシブウェブアプリ） ・ Vanilla JavaScript", desc: "ビルド不要で公開中のPWA。N5・N4レベルの語彙を網羅し、SRS方式のフラッシュカード、クイズ、4種のミニゲーム（神経衰弱、漢字メテオ、ワードチェーン、JLPT模擬試験）、Jisho API辞書検索、カスタムデッキ、分析・ヒートマップ、XPゲーミフィケーション、完全オフライン対応、マルチデバイス対応のタッチ操作を実装。プロダクションレベルのテーマ設計、ライト／ダークモード、アクセシビリティにも対応。" },
    p3: { title: "金型確認＆安全インターロックシステム", subtitle: "Proteus 8 Professional ・ Arduino Uno", desc: "AND論理による3個の近接センサー、LCDステータス表示、LED／ブザー警報、フライバックダイオード保護付きリレーを備えた起動許可インターロックシステム。デバウンス処理と、異常発生後の意図的な再起動要求ロックを実装。回路・コードともにシミュレーションで検証済み。" },
    p4: { title: "変圧器寿命診断ゲージ", subtitle: "回路シミュレーション", desc: "シミュレーション段階は完了。設計確定前に修正が必要な小さな回路上の課題が数点残っています。" },
    p5: { title: "太陽光監視システム", subtitle: "Arduino Uno ・ Proteus", desc: "パネル電圧、充電電流、バッテリー電圧、バッテリー残量（SOC）、出力電力、発電量をリアルタイムに測定し、20×4 LCDに表示する太陽光発電監視システム。完成済み、シミュレーション検証も完了。" },
    p6: { title: "EV ADASシステム", subtitle: "STM32（Blue Pill） ・ PICSimLab ・ Python / Matplotlib", desc: "Emertxeでの自動車組込みシステム・インターンシップにて開発した、STM32ベースのEV制御およびADASステートマシン。リアルタイムPython/Matplotlibダッシュボードと連携し、PICSimLabでシミュレーション。機能的には完成していますが、現在マイコンの設定上の問題により動作できず、修正を予定しています。" },
    p7: { title: "自動双方向テスト＆キッティングシステム", subtitle: "「Seal Mule」 ・ 自律走行ロボット（AMR）", desc: "PIDによる閉ループモーター制御、RFID／バーコードによる部品確認、振動発電センサーノードからの無線データ収集を組み合わせたAMR設計。PLCラダーロジック（LDmicro）によるシーケンス／インターロック制御と、Arduinoによるモーター／PID／センサー制御の2コントローラー構成。コントローラーおよびセンサーノードのコードは記述済みですが、無線モジュールのシミュレーション用Proteusライブラリのバージョン不整合により現在保留中です。" },
    p8: { title: "2段階締結確認システム", subtitle: "「BoltGuard」 ・ PLC + Arduino", desc: "第1段階では、複数箇所にわたるPLCラダーシーケンスにより設置時のトルクと角度を確認（ポカヨケ、異常時はリセットまでロック）。第2段階では、設置後の緩みを監視し、振動による緩みを故障前に検知する早期警報レイヤーを追加。ラダーロジックおよびArduinoコードは完成済みで、Proteusシミュレーション上の回路配線もほぼ完了しています。" }
  },

  certifications: {
    label: "資格・修了証", title: "資格・<br><em>研修修了証</em>", verified: "認証済み", viewCert: "証明書を見る",
    c1: { issuer: "SkillDzire ・ APSCHE", title: "AutoCADによる電気システム設計", desc: "配線図、負荷計算、実務レベルの配電計画を含む、AutoCADを用いた電気レイアウト設計を実施。", date: "2025年12月 – 2026年3月 ・ 長期", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe ・ NSDC / ESSCI", title: "IoT（モノのインターネット）", desc: "Arduino、MQTT、ThingsBoardを用いたスマートファクトリーIoTシステムを構築。リアルタイム監視、自動化、SDLCに基づく開発を実践。", date: "2026年3月 – 4月", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire ・ AICTE", title: "電気自動車（EV）技術インターンシップ", desc: "バッテリーシステム、モーター制御、充電インフラの概念を含むEV技術の実践経験を習得。", date: "2025年5月 – 7月 ・ 長期", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT ・ 国際交流基金", title: "日本語能力試験 — N5", desc: "日本語能力試験N5に合格し、基礎的な読解・聴解・コミュニケーション能力を証明。", date: "2025年12月 ・ 得点：83／180", id: "受験番号: 25B3010401-51110 ・ 合格" },
    c5: { issuer: "ネパール電力公社", title: "電気工学 実地研修（6か月間）", desc: "変電所業務、保守作業、実際の電気運用に携わり、配電システムに関する6か月間の現場研修を修了。", date: "2022年6月 – 12月 ・ バラトプル", id: "発行日: 2022年12月21日" },
    c6: { issuer: "SkillDzire ・ APSCHE", title: "太陽光発電システム設計", desc: "パネル選定、ストリング構成、システムレイアウトの基礎を扱う太陽光発電システム設計のオンラインインターンシップを修了。", date: "2026年", id: "証明書ID: eveac3jtc7" }
  },

  achievements: {
    label: "表彰・活動", title: "表彰と<br><em>課外活動</em>",
    a1: { title: "VEDA 2K25全国シンポジウム — 優秀賞（2位）", desc: "2025年9月のエンジニアズ・デー期間中、Aditya大学で開催されたVEDA 2K25全国学生シンポジウムのポスター発表部門にて優秀賞（2位）を受賞。テーマ：EV用電動モーター技術。" },
    a2: { title: "第5学期 学科内1位（学士課程 電気電子工学）", desc: "第5学期において学科内1位を達成。第1〜4学期は2位を維持し、安定した学業成績を収めました。5学期累計CGPA：9.19／10。" },
    a3: { title: "VEDA 2K25 シンポジウム運営委員", desc: "Aditya大学で開催されたVEDA 2K25全国学生シンポジウムの運営委員として、エンジニアズ・デーにおける技術セッションの運営と参加者対応を担当。" },
    a4: { title: "VEDA 2K24シンポジウム — 論文発表", desc: "2024年9月のエンジニアズ・デー期間中に開催されたVEDA 2K24全国技術シンポジウムにて論文発表者として参加し、全国レベルでの研究発表力を示しました。" },
    a5: { title: "日本語能力（JLPT N5認定）", desc: "2025年12月、JLPT N5に合格（得点83／180）。語彙・文法ではA評価を獲得。現在はJLPT N4取得に向けて学習を継続し、実務レベルのコミュニケーション力向上を目指しています。" }
  },

  contact: {
    label: "お問い合わせ", tagline: "次の一歩へ<br><em>準備万端</em>",
    sub: "Zenken India経由での日系企業への就職、およびインド国内のコア電気工学職を歓迎します。",
    email: "メール", phone: "電話", linkedin: "LinkedIn", instagram: "Instagram"
  },
  footer: { copy: "© 2026 ラフル・サフ — 電気電子エンジニア", jp: "電気技術者 ・ ラフル・サフ" },

  cmdk: {
    placeholder: "コマンドを入力または検索…",
    groupActions: "アクション", groupNavigate: "移動",
    resume: "履歴書を見る", viewProjects: "プロジェクトを見る", github: "GitHubを開く", linkedin: "LinkedInを開く",
    email: "メールを送る", toggleTheme: "テーマを切替", switchLang: "言語を切替",
    goAbout: "自己紹介へ", goExperience: "職歴へ", goEducation: "学歴へ",
    goSkills: "スキルへ", goProjects: "プロジェクトへ", goCerts: "資格・修了証へ",
    goContact: "連絡先へ", noResults: "該当する結果がありません。",
    focusMode: "フォーカスモード切替", hint: "コマンド"
  }
},

/* ========================================================================== */
hi: {
  meta: { name: "हिन्दी" },
  nav: { about: "परिचय", experience: "अनुभव", education: "शिक्षा", skills: "कौशल", projects: "प्रोजेक्ट्स", certifications: "प्रमाणपत्र", contact: "संपर्क" },
  dock: { theme: "थीम बदलें", lang: "भाषा", cmdk: "कमांड पैलेट" },

  hero: {
    eyebrow: "EEE · अंतिम वर्ष · CGPA 9.19",
    name: "राहुल<br><em>साहू</em>",
    title: "इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियर",
    desc: "नेपाल इलेक्ट्रिसिटी अथॉरिटी में फील्ड अनुभव, MATLAB/Simulink में दक्षता, और JLPT N5 जापानी भाषा प्रमाणन रखने वाला पावर सिस्टम्स विशेषज्ञ — जापानी इंजीनियरिंग कंपनियों में कोर इलेक्ट्रिकल इंजीनियरिंग भूमिकाओं के लिए लक्षित।",
    stat1Label: "CGPA / 10", stat2Label: "फील्ड OJT", stat3Label: "JLPT जापान",
    ctaPrimary: "संपर्क करें", ctaOutline: "कार्य देखें",
    badgeJp: "日本語", badgeSmall: "जापान लक्ष्य",
    scroll: "स्क्रॉल करें"
  },
  marquee: ["पावर सिस्टम्स", "MATLAB / Simulink", "पावर इलेक्ट्रॉनिक्स", "日本語 · JLPT N5", "एम्बेडेड सिस्टम्स", "IoT इंजीनियरिंग", "नेपाल इलेक्ट्रिसिटी अथॉरिटी", "AutoCAD Electrical"],

  about: {
    label: "मेरे बारे में", title: "उद्देश्य के साथ<br><em>इंजीनियर</em>",
    p1: "मैं आंध्र प्रदेश स्थित Aditya College of Engineering &amp; Technology में इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग का अंतिम वर्ष का B.Tech छात्र हूँ — <strong>9.19/10 CGPA</strong> के साथ लगातार शीर्ष प्रदर्शन करने वालों में शामिल रहा हूँ और <strong>सेमेस्टर 5 में विभाग में प्रथम स्थान</strong> प्राप्त किया है।",
    p2: "मेरी नींव फील्ड में बनी। विश्वविद्यालय से पहले, मैंने <strong>नेपाल इलेक्ट्रिसिटी अथॉरिटी में 6 महीने की ऑन-द-जॉब ट्रेनिंग</strong> पूरी की, जिसमें डिस्ट्रिब्यूशन लाइन ऑपरेशन्स, सबस्टेशन गतिविधियों और एनर्जी मीटर इंस्टॉलेशन पर सीधे काम किया — वास्तविक इंफ्रास्ट्रक्चर, वास्तविक ज़िम्मेदारी।",
    p3: "मैं हार्डवेयर और सिमुलेशन को जोड़ता हूँ — MATLAB/Simulink में <strong>पावर फैक्टर करेक्शन सिस्टम</strong> डिज़ाइन करने से लेकर IoT-आधारित एम्बेडेड प्रोजेक्ट्स बनाने तक। मेरा लक्ष्य किसी जापानी इंजीनियरिंग कंपनी से जुड़ना है, जहाँ सटीकता, अनुशासन और तकनीकी गहराई अनिवार्य हों — यही मूल्य मेरे शैक्षणिक करियर की नींव रहे हैं।",
    factsLabel: "मुख्य जानकारी",
    k1: "रोल नंबर", k2: "संस्थान", k3: "डिग्री", k4: "स्नातक (अपेक्षित)", k5: "CGPA", k6: "सेमेस्टर 5 रैंक", k7: "फील्ड OJT", k8: "लक्षित बाज़ार", k9: "राष्ट्रीयता", k10: "स्थान",
    v3: "B.Tech — EEE", v4: "मई 2027", v6: "विभाग में प्रथम", v7: "नेपाल इलेक्ट्रिसिटी अथॉरिटी", v8: "जापान (Zenken India के माध्यम से)", v9: "नेपाली", v10: "काकीनाडा, आंध्र प्रदेश"
  },

  experience: {
    label: "करियर", title: "अनुभव एवं<br><em>पृष्ठभूमि</em>",
    e1: { type: "इंटर्नशिप · दीर्घकालिक", title: "AutoCAD से इलेक्ट्रिकल सिस्टम डिज़ाइन", org: "SkillDzire · APSCHE", desc: "आंध्र प्रदेश स्टेट काउंसिल ऑफ हायर एजुकेशन के सहयोग से आयोजित AutoCAD आधारित इलेक्ट्रिकल सिस्टम डिज़ाइन की दीर्घकालिक इंटर्नशिप पूरी की। औद्योगिक स्तर की इलेक्ट्रिकल ड्रॉइंग और लेआउट प्रैक्टिस में दक्षता हासिल की।" },
    e2: { type: "इंटर्नशिप · NSDC संबद्ध", title: "IoT इंजीनियरिंग इंटर्नशिप", org: "Emertxe · NSDC / ESSCI", desc: "C प्रोग्रामिंग की बुनियादी बातों, माइक्रोकंट्रोलर इंटरफेसिंग और SDLC-आधारित प्रोजेक्ट निर्माण को कवर करने वाला IoT सिस्टम्स का व्यावहारिक प्रशिक्षण। नेशनल स्किल डेवलपमेंट कॉरपोरेशन और ESSCI से संबद्ध।" },
    e3: { type: "इंटर्नशिप · AICTE स्वीकृत", title: "इलेक्ट्रिक व्हीकल तकनीक", org: "SkillDzire · AICTE", desc: "इलेक्ट्रिक व्हीकल तकनीक और पावरट्रेन की बुनियादी बातों पर लघु अवधि की इंटर्नशिप। AICTE-स्वीकृत पाठ्यक्रम के तहत EV आर्किटेक्चर, बैटरी मैनेजमेंट सिद्धांत और चार्जिंग सिस्टम को कवर किया।" },
    e4: { type: "ऑन-द-जॉब ट्रेनिंग · 6 महीने", title: "इलेक्ट्रिकल इंजीनियरिंग प्रशिक्षु (OJT)", org: "नेपाल इलेक्ट्रिसिटी अथॉरिटी — भरतपुर", desc: "लाइव पावर डिस्ट्रिब्यूशन इंफ्रास्ट्रक्चर में छह महीने की संरचित OJT। ओवरहेड लाइन पेट्रोलिंग, फॉल्ट पहचान, स्विचयार्ड गतिविधियाँ, ट्रांसफार्मर निरीक्षण और एनर्जी मीटर इंस्टॉलेशन का कार्य किया। एक्टिंग सेंटर चीफ Er. Rajendra Prasad Paudel द्वारा प्रमाणित।" }
  },

  education: {
    label: "शैक्षणिक यात्रा", title: "शैक्षणिक<br><em>पृष्ठभूमि</em>",
    ed1: { badge: "अध्ययनरत · अंतिम वर्ष", degree: "B.Tech — इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग", school: "Aditya College of Engineering &amp; Technology (स्वायत्त) · आंध्र प्रदेश, भारत", detail: "लगातार शीर्ष प्रदर्शन करने वालों में शामिल। सेमेस्टर 5 में प्रथम, तथा सेमेस्टर 1–4 में द्वितीय स्थान। तीसरा वर्ष मई 2026 में पूरा हुआ। कोर इलेक्ट्रिकल सिस्टम्स में मज़बूत आधार।", scoreLabel: "CGPA · 5 सेमेस्टर" },
    ed2: { badge: "पूर्ण · 2022", degree: "उच्चतर माध्यमिक — तकनीकी एवं व्यावसायिक (EEE)", school: "Pashupati Secondary School · रूपन्देही, नेपाल", detail: "इलेक्ट्रिकल इंजीनियरिंग की बुनियादी बातों, व्यावहारिक अनुप्रयोगों और व्यावहारिक तकनीकी कौशल पर केंद्रित तकनीकी एवं व्यावसायिक स्ट्रीम में विशेषज्ञता।", scoreLabel: "GPA" },
    ed3: { badge: "पूर्ण · 2020", degree: "माध्यमिक शिक्षा — तकनीकी स्ट्रीम", school: "Tribhuvan Secondary School · नेपाल", detail: "तकनीकी स्ट्रीम में प्रारंभिक माध्यमिक शिक्षा पूरी की, जिससे भविष्य की इंजीनियरिंग और व्यावसायिक पढ़ाई हेतु गणितीय एवं वैज्ञानिक आधार मज़बूत हुआ।", scoreLabel: "GPA" }
  },

  skills: {
    label: "दक्षताएँ", title: "तकनीकी<br><em>कौशल</em>",
    s1cat: "कोर इंजीनियरिंग", s1items: "पावर सिस्टम्स विश्लेषण<br>पावर इलेक्ट्रॉनिक्स<br>इलेक्ट्रिकल मशीनें<br>कंट्रोल सिस्टम्स<br>हाई वोल्टेज इंजीनियरिंग<br>स्विचगियर एवं सुरक्षा",
    s2cat: "सिमुलेशन एवं डिज़ाइन", s2items: "MATLAB / Simulink<br>DIALux Evo<br>AutoCAD (इलेक्ट्रिकल)<br>Multisim / Ultiboard<br>Proteus 8 Professional",
    s3cat: "व्यावहारिक / फील्ड", s3items: "सबस्टेशन ऑपरेशन्स<br>डिस्ट्रिब्यूशन लाइन मेंटेनेंस<br>एनर्जी मीटर इंस्टॉलेशन<br>इलेक्ट्रिकल फॉल्ट डायग्नोसिस<br>HV सुरक्षा प्रक्रियाएँ",
    s4cat: "एम्बेडेड एवं IoT", s4items: "Arduino / माइक्रोकंट्रोलर<br>8051 / PIC18 / 8086<br>STM32 (Blue Pill)<br>GSM एवं GPS मॉड्यूल<br>सेंसर इंटीग्रेशन",
    s5cat: "सॉफ़्टवेयर एवं अन्य", s5items: "Microsoft Excel (मध्यम स्तर)<br>Python (बुनियादी)<br>PCB डिज़ाइन की बुनियादी बातें<br>तकनीकी दस्तावेज़ीकरण<br>प्रोजेक्ट प्रेज़ेंटेशन",
    s6cat: "भाषाएँ", s6items: "अंग्रेज़ी (Cambridge B2)<br>日本語 / जापानी (JLPT N5)<br>नेपाली (धाराप्रवाह)<br>हिंदी (धाराप्रवाह)<br>भोजपुरी (मातृभाषा)",
    radarTitle: "◆ दक्षता रडार ◆",
    r1: "कोर इंजीनियरिंग", r2: "सिमुलेशन एवं डिज़ाइन", r3: "व्यावहारिक / फील्ड", r4: "एम्बेडेड एवं IoT", r5: "सॉफ़्टवेयर एवं अन्य", r6: "भाषाएँ"
  },

  projects: {
    label: "कार्य", title: "प्रमुख<br><em>प्रोजेक्ट्स</em>",
    tabCompleted: "पूर्ण", tabOngoing: "जारी",
    linkCode: "कोड देखें", linkLive: "लाइव डेमो",
    statusComplete: "पूर्ण", statusProgress: "प्रगति में", statusBlocked: "अवरुद्ध", statusLive: "लाइव",
    p1: { title: "स्मार्ट फैक्ट्री IoT मॉनिटरिंग सिस्टम", subtitle: "IoT इंटर्नशिप · Arduino · ThingsBoard · MQTT", desc: "IoT इंटर्नशिप के दौरान बनाया गया दो-नोड फैक्ट्री मॉनिटरिंग सिस्टम। नोड 1 (मुख्य नोड) का गैप विश्लेषण पूरा हो चुका है और कोड पूरी तरह ठीक किया जा चुका है; कुछ PICSimLab / W5100–W5500 सिमुलेटर बेमेल अभी सुलझाए जा रहे हैं। नोड 2 (वेयरहाउस नोड) पर काम अभी शुरू नहीं हुआ है।" },
    p2: { title: "RONIN — JLPT शब्दावली ट्रेनर", subtitle: "प्रोग्रेसिव वेब ऐप · Vanilla JavaScript", desc: "बिना बिल्ड-स्टेप के लाइव PWA, जिसमें N5 और N4 शब्दावली शामिल है। इसमें SRS फ्लैशकार्ड, क्विज़, चार मिनी-गेम्स (मेमोरी मैच, कांजी मेटेओर, वर्ड चेन, JLPT मॉक टेस्ट), Jisho API डिक्शनरी सर्च, कस्टम डेक, एनालिटिक्स/हीटमैप, XP गेमिफिकेशन, पूर्ण ऑफ़लाइन सपोर्ट, और मल्टी-डिवाइस टच कंट्रोल्स शामिल हैं। प्रोडक्शन-स्तरीय थीमिंग, लाइट/डार्क मोड और एक्सेसिबिलिटी के साथ निर्मित।" },
    p3: { title: "मोल्ड सत्यापन एवं सुरक्षा इंटरलॉक सिस्टम", subtitle: "Proteus 8 Professional · Arduino Uno", desc: "AND लॉजिक पर आधारित तीन प्रॉक्सिमिटी सेंसर, LCD स्टेटस डिस्प्ले, LED/बज़र अलर्ट, और फ्लाईबैक डायोड सुरक्षा वाले रिले के साथ एक सुरक्षा स्टार्ट-परमिट इंटरलॉक सिस्टम। इसमें डिबाउंस फ़िल्टरिंग और फ़ॉल्ट के बाद जानबूझकर पुनः-प्रारंभ आवश्यक सुरक्षा लॉक शामिल है। सर्किट और कोड, दोनों सिमुलेशन में पूर्णतः सत्यापित।" },
    p4: { title: "ट्रांसफार्मर लाइफ गेज", subtitle: "सर्किट सिमुलेशन", desc: "सिमुलेशन चरण पूरा हो चुका है। डिज़ाइन को अंतिम रूप देने से पहले कुछ छोटी सर्किट संबंधी खामियाँ अभी ठीक की जानी बाकी हैं।" },
    p5: { title: "सोलर मॉनिटरिंग सिस्टम", subtitle: "Arduino Uno · Proteus", desc: "पैनल वोल्टेज, चार्जिंग करंट, बैटरी वोल्टेज, बैटरी SOC, आउटपुट पावर, और उत्पन्न ऊर्जा को मापने वाला रीयल-टाइम सोलर एनर्जी मॉनिटरिंग सिस्टम — सभी डेटा 20×4 LCD पर प्रदर्शित। पूर्ण एवं पूरी तरह सिमुलेटेड।" },
    p6: { title: "EV ADAS सिस्टम", subtitle: "STM32 (Blue Pill) · PICSimLab · Python / Matplotlib", desc: "Emertxe में ऑटोमोटिव एम्बेडेड सिस्टम्स इंटर्नशिप के दौरान बनाया गया STM32-आधारित EV कंट्रोल एवं ADAS स्टेट मशीन, जो रीयल-टाइम Python/Matplotlib डैशबोर्ड से जुड़ा है और PICSimLab में सिमुलेटेड है। कार्यात्मक रूप से पूर्ण, लेकिन फ़िलहाल एक माइक्रोकंट्रोलर कॉन्फ़िगरेशन समस्या के कारण चालू नहीं हो पा रहा; समाधान की योजना बनाई जा रही है।" },
    p7: { title: "स्वचालित द्वि-दिशात्मक टेस्ट एवं किटिंग सिस्टम", subtitle: "\u201CSeal Mule\u201D · स्वायत्त मोबाइल रोबोट (AMR)", desc: "क्लोज़्ड-लूप PID मोटर कंट्रोल, RFID/बारकोड पार्ट सत्यापन, और अपने मार्ग पर वाइब्रेशन-एनर्जी-हार्वेस्टिंग सेंसर नोड्स से वायरलेस डेटा संग्रह को जोड़ने वाला AMR डिज़ाइन। दो-कंट्रोलर आर्किटेक्चर: सीक्वेंसिंग/इंटरलॉक के लिए PLC लैडर लॉजिक (LDmicro), तथा मोटर/PID/सेंसर कंट्रोल के लिए Arduino। कंट्रोलर और सेंसर-नोड कोड लिखा जा चुका है; वायरलेस मॉड्यूल सिमुलेशन हेतु Proteus लाइब्रेरी वर्ज़न बेमेल के कारण फ़िलहाल अवरुद्ध।" },
    p8: { title: "दो-चरण फास्टनिंग सत्यापन सिस्टम", subtitle: "\u201CBoltGuard\u201D · PLC + Arduino", desc: "चरण 1 में कई बिंदुओं पर PLC लैडर सीक्वेंसिंग के ज़रिए इंस्टॉल-टाइम टॉर्क और एंगल का सत्यापन (पोका-योके, फ़ॉल्ट होने पर रीसेट तक लॉक)। चरण 2 में एक इन-सर्विस लूज़निंग अर्ली-वार्निंग लेयर जोड़ी गई है, जो इंस्टॉलेशन के बाद ड्रिफ्ट पर नज़र रखकर विफलता से पहले वाइब्रेशन-जनित ढीलेपन को पकड़ती है। लैडर लॉजिक और Arduino कोड पूर्ण; Proteus सिमुलेशन में सर्किट वायरिंग लगभग पूरी।" }
  },

  certifications: {
    label: "प्रमाणपत्र", title: "प्रमाणपत्र एवं<br><em>प्रशिक्षण</em>", verified: "सत्यापित", viewCert: "प्रमाणपत्र देखें",
    c1: { issuer: "SkillDzire · APSCHE", title: "AutoCAD से इलेक्ट्रिकल सिस्टम डिज़ाइन", desc: "वायरिंग डायग्राम, लोड कैलकुलेशन और वास्तविक पावर डिस्ट्रिब्यूशन प्लानिंग सहित AutoCAD से इलेक्ट्रिकल लेआउट डिज़ाइन किए।", date: "दिसंबर 2025 – मार्च 2026 · दीर्घकालिक", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe · NSDC / ESSCI", title: "इंटरनेट ऑफ थिंग्स (IoT)", desc: "Arduino, MQTT और ThingsBoard का उपयोग कर रीयल-टाइम मॉनिटरिंग, ऑटोमेशन और SDLC-आधारित डेवलपमेंट के साथ स्मार्ट फैक्ट्री IoT सिस्टम बनाया।", date: "मार्च – अप्रैल 2026", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire · AICTE", title: "इलेक्ट्रिक व्हीकल तकनीक इंटर्नशिप", desc: "बैटरी सिस्टम, मोटर कंट्रोल और चार्जिंग इंफ्रास्ट्रक्चर अवधारणाओं सहित EV तकनीकों का व्यावहारिक अनुभव प्राप्त किया।", date: "मई 2025 – जुलाई 2025 · दीर्घकालिक", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT · जापान फाउंडेशन", title: "जापानी भाषा प्रवीणता — N5", desc: "जापानी भाषा प्रवीणता परीक्षा N5 उत्तीर्ण की, जिसमें बुनियादी पठन, श्रवण और संचार कौशल प्रदर्शित किया।", date: "दिसंबर 2025 · स्कोर: 83 / 180", id: "पंजीकरण: 25B3010401-51110 · उत्तीर्ण" },
    c5: { issuer: "नेपाल इलेक्ट्रिसिटी अथॉरिटी", title: "6-महीने की इलेक्ट्रिकल इंजीनियरिंग OJT", desc: "सबस्टेशन, मेंटेनेंस और रीयल-टाइम इलेक्ट्रिकल ऑपरेशन्स पर काम करते हुए पावर डिस्ट्रिब्यूशन सिस्टम्स में 6-महीने की फील्ड ट्रेनिंग पूरी की।", date: "जून – दिसंबर 2022 · भरतपुर", id: "जारी: 21 दिसंबर, 2022" },
    c6: { issuer: "SkillDzire · APSCHE", title: "सोलर PV सिस्टम डिज़ाइन", desc: "पैनल साइज़िंग, स्ट्रिंग कॉन्फ़िगरेशन और सिस्टम लेआउट की बुनियादी बातों को कवर करने वाली सोलर फोटोवोल्टिक सिस्टम डिज़ाइन की ऑनलाइन इंटर्नशिप पूरी की।", date: "2026", id: "प्रमाणपत्र ID: eveac3jtc7" }
  },

  achievements: {
    label: "उपलब्धियाँ", title: "उपलब्धियाँ एवं<br><em>गतिविधियाँ</em>",
    a1: { title: "द्वितीय पुरस्कार — VEDA 2K25 राष्ट्रीय संगोष्ठी", desc: "सितंबर 2025 में इंजीनियर्स डे के दौरान Aditya विश्वविद्यालय में आयोजित VEDA 2K25 राष्ट्रीय स्तरीय छात्र संगोष्ठी में पोस्टर प्रेजेंटेशन में द्वितीय पुरस्कार प्राप्त किया। प्रोजेक्ट: EV अनुप्रयोगों हेतु इलेक्ट्रिक मोटर तकनीकें।" },
    a2: { title: "सेमेस्टर 5 में प्रथम स्थान, B.Tech EEE", desc: "सेमेस्टर 5 में विभाग में प्रथम स्थान प्राप्त किया। सेमेस्टर 1–4 में लगातार द्वितीय स्थान बनाए रखते हुए निरंतर शैक्षणिक उत्कृष्टता दिखाई। पाँच सेमेस्टर के बाद कुल CGPA: 9.19/10।" },
    a3: { title: "संगोष्ठी समन्वयक — VEDA 2K25", desc: "Aditya विश्वविद्यालय में आयोजित VEDA 2K25 राष्ट्रीय स्तरीय छात्र संगोष्ठी में इवेंट समन्वयक के रूप में कार्य किया, इंजीनियर्स डे के लिए तकनीकी सत्रों और प्रतिभागी समन्वय का प्रबंधन किया।" },
    a4: { title: "पेपर प्रेजेंटेशन — VEDA 2K24 संगोष्ठी", desc: "सितंबर 2024 में इंजीनियर्स डे के दौरान आयोजित VEDA 2K24 राष्ट्रीय स्तरीय तकनीकी संगोष्ठी में पेपर प्रेजेंटर के रूप में भाग लिया, राष्ट्रीय स्तर पर शोध संप्रेषण कौशल प्रदर्शित किया।" },
    a5: { title: "जापानी भाषा प्रवीणता (JLPT N5 प्रमाणित)", desc: "दिसंबर 2025 में JLPT N5 सफलतापूर्वक उत्तीर्ण किया (स्कोर 83/180), शब्दावली और व्याकरण में A ग्रेड प्राप्त किया। वर्तमान में व्यावसायिक संचार एवं कार्यस्थल तत्परता बढ़ाने हेतु JLPT N4 की तैयारी कर रहा हूँ।" }
  },

  contact: {
    label: "संपर्क करें", tagline: "अगले कदम के लिए<br><em>तैयार</em>",
    sub: "Zenken India के माध्यम से जापानी इंजीनियरिंग नियुक्तियों और भारत में कोर EEE भूमिकाओं के लिए उपलब्ध।",
    email: "ईमेल", phone: "फ़ोन", linkedin: "LinkedIn", instagram: "Instagram"
  },
  footer: { copy: "© 2026 राहुल साहू — इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियर", jp: "電気技術者 ・ ラフル・サフ" },

  cmdk: {
    placeholder: "कमांड टाइप करें या खोजें…",
    groupActions: "क्रियाएँ", groupNavigate: "नेविगेट करें",
    resume: "रिज़्यूमे देखें", viewProjects: "प्रोजेक्ट्स देखें", github: "GitHub खोलें", linkedin: "LinkedIn खोलें",
    email: "ईमेल भेजें", toggleTheme: "थीम बदलें", switchLang: "भाषा बदलें",
    goAbout: "परिचय पर जाएँ", goExperience: "अनुभव पर जाएँ", goEducation: "शिक्षा पर जाएँ",
    goSkills: "कौशल पर जाएँ", goProjects: "प्रोजेक्ट्स पर जाएँ", goCerts: "प्रमाणपत्र पर जाएँ",
    goContact: "संपर्क पर जाएँ", noResults: "कोई परिणाम नहीं मिला।",
    focusMode: "फोकस मोड टॉगल करें", hint: "कमांड"
  }
}

};
