// 精選案例預設資料庫 (Preset Showcase Cases)
const PRESET_CASES = [
  {
    id: "case-1",
    originalItem: "寬鬆落肩格紋襯衫",
    remakeDirection: "日系短版層次抽繩罩衫",
    category: "襯衫",
    difficulty: "微工藝",
    estimatedTime: "45 分鐘",
    coverColor: "from-blue-600/20 to-indigo-900/40",
    icon: "shirt",
    painPoints: [
      "衣長過長遮蓋骨盆與大腿，視覺比例嚴重下沉顯矮",
      "大格子藍色棉質版型缺乏挺度，單穿容易顯得慵懶無精神或過於家居",
      "肩線嚴重下落，若當成一般正裝外衣穿著缺乏立體剪裁感"
    ],
    stylingSuggestions: [
      "【解釦打結法】：下擺倒數 3 顆釦子解開，兩側下襬在肚臍上方交叉打平結，營造天然高腰視覺。",
      "【白高領層次穿搭】：內搭合身高領白色素面打底衫，外罩短版改造襯衫，露出立領與手腕層次。",
      "【下身適配】：搭配深炭灰打褶闊腿西裝褲與厚底樂福鞋，利用「上短下長」黃金比例平衡寬鬆格紋的休閒感。"
    ],
    remakeConcept: {
      tools: ["布剪", "手縫針線或迷你縫紉機", "穿帶器", "棉質扁抽繩 1.2 米"],
      steps: [
        "【水平定位剪裁】：穿上襯衫並標記肚臍上方 3 公分處，取下後畫出水平基準線，預留 2.5 公分摺邊份量後平整剪開。",
        "【下擺縫製抽繩道】：將預留的 2.5 公分下擺向上內折兩次，以平針縫製出一條寬約 1.2 公分的通風抽繩管道，兩側前襟處預留出繩口。",
        "【穿入抽繩與領口修飾】：利用穿帶器將抽繩穿過下擺管道，兩端打八字結；領口翻領向內燙折 1 公分壓線，改為俐落的立領/小古巴領。"
      ],
      proTip: "剪下來的多餘下擺布料不要丟棄！可裁成 5x5cm 小方塊，縫製成隨身耳機收納小袋或胸前同花色撞色小口袋。"
    },
    promptRecord: {
      promptEn: "Editorial fashion photograph of an upcycled oversized blue plaid shirt transformed into a modern Japanese cropped boxy utility overshirt with adjustable hem drawstring, paired with high-waisted charcoal pleated wide trousers, clean studio lighting, 35mm lens, high detail --ar 4:5 --v 6.0",
      promptZh: "時尚大片寫真：一件改造後的過大藍色格紋襯衫，重構成現代日系短版俐落罩衫，下擺帶有可調節抽繩，搭配高腰炭灰色打褶寬褲，純淨攝影棚光影，35mm鏡頭，高精緻度細節。",
      engine: "Midjourney v6.0",
      purpose: "視覺化預覽下擺剪短後的箱型 (Boxy) 輪廓與下身搭配比例"
    }
  },
  {
    id: "case-2",
    originalItem: "褪色直筒老爹牛仔褲",
    remakeDirection: "雙色拼接多口袋工裝托特包",
    category: "丹寧/牛仔",
    difficulty: "裁縫進階",
    estimatedTime: "90 分鐘",
    coverColor: "from-sky-700/20 to-blue-950/40",
    icon: "briefcase",
    painPoints: [
      "膝蓋部位因長期穿著鼓包變形，無法再呈現俐落的腿部線條",
      "水洗刷色嚴重不均勻且褲襠版型過低，走路時容易卡襠不適",
      "褲腳邊緣嚴重磨損踩爛，修改長度後版型容易失真"
    ],
    stylingSuggestions: [
      "【原單品過渡穿搭】：在改造前若想短暫穿著，可大膽將褲管反摺兩折至九分露踝，外搭同色系水洗牛仔外套做 Denim-on-Denim 街頭風。",
      "【改造包款穿搭】：重構為托特包後，極適合作為日常通勤書包或筆電包，搭配極簡米白米色風衣或工裝連帽衫，散發隨性俐落的手作工藝美感。"
    ],
    remakeConcept: {
      tools: ["厚布專用重型剪刀", "拆線器", "強力丹寧縫紉針 (16號)", "內襯帆布 0.5 碼", "金屬四合扣"],
      steps: [
        "【主袋身塑形】：將牛仔褲平鋪，在襠部下方 5 公分處水平切斷兩條褲管。拆開襠部前後弧線，前後拼平後車縫，縫合底部形成托特包主袋結構。",
        "【後口袋再利用】：褲子後方原本的兩個五角形後口袋完整保留在包包外側，天然成為隨手取放手機、票卡與鑰匙的機能口袋。",
        "【褲管改提把與內襯】：利用剪下來的褲腿布裁出兩條寬 4 公分、長 60 公分的背帶；內部車縫防水米色帆布內裡並加裝拉鍊小暗袋。"
      ],
      proTip: "牛仔褲腰頭的金屬鈕扣與皮牌皮標可直接保留在包包正中央，保留古著丹寧的經典身分認證標誌！"
    },
    promptRecord: {
      promptEn: "Close-up artisan craftsmanship product photo of a tote bag upcycled from distressed vintage light-wash denim pants, featuring original back pockets for phone storage, thick brass zipper, durable canvas handles, warm workshop background, soft natural sunlight --ar 1:1 --v 6.0",
      promptZh: "近景工藝品展示：一只由復古刷白刷舊牛仔長褲重製而成的托特包，保留原始後口袋作為手機收納袋，厚實黃銅拉鍊，耐用帆布提把，溫暖手作工作坊背景，柔和自然光。",
      engine: "Midjourney v6.0",
      purpose: "驗證保留牛仔褲後口袋與腰頭皮標作為包袋外觀結構之美感"
    }
  },
  {
    id: "case-3",
    originalItem: "領口鬆弛變形素面白T恤",
    remakeDirection: "法式復古方領打底衫 × 刺繡滾邊",
    category: "T恤/衛衣",
    difficulty: "新手友好",
    estimatedTime: "30 分鐘",
    coverColor: "from-stone-400/20 to-neutral-800/40",
    icon: "sparkles",
    painPoints: [
      "羅紋領口洗滌多次後嚴重鬆弛呈荷葉邊，穿出門容易顯得邋遢邋遢缺乏精神",
      "傳統圓領版型過於普通，容易截斷頸部線條顯得臉型圓潤",
      "棉質布料本身依然親膚柔軟，直接丟入垃圾桶極為浪費"
    ],
    stylingSuggestions: [
      "【鎖骨亮點穿搭】：改為法式方領後，露出優雅鎖骨線條，配戴 1-2 條細金幣項鍊或珍珠短鍊，瞬間提升精緻感。",
      "【西裝內搭王者】：作為休閒西裝或粗花呢外套的打底衫，方領能在嚴肅的外套中注入輕熟法式隨性感。",
      "【下身搭配】：下著選擇法式高腰微喇叭藍色牛仔褲，上衣扎入腰際，打造簡約不費力的 Parisienne 風格。"
    ],
    remakeConcept: {
      tools: ["布用標記粉筆", "極細布剪", "刺繡線與手縫針", "彈性襯條或透明彈力線"],
      steps: [
        "【標定方領輪廓】：穿在身上於鎖骨下方 2 公分與肩頸點畫出方領幾何直角參考點，脫下後用尺修整成對稱的俐落方領形狀。",
        "【修剪與防捲邊固定】：沿記號線平穩剪掉原本鬆垮的荷葉邊圓領，領緣向內折 0.8 公分，以雙針彈性平針進行壓縫避免捲邊。",
        "【手工微刺繡裝飾】：在方領轉角處或左胸位置，使用鼠尾草綠刺繡線手縫極簡植物枝葉輪廓，賦予單品獨一無二的客製靈魂。"
      ],
      proTip: "若擔心方形轉角處縫線不服貼，可在內側轉折處剪一個 2 毫米的斜向牙口，壓燙後立刻平整服貼！"
    },
    promptRecord: {
      promptEn: "Studio editorial portrait of a woman wearing an upcycled minimal white t-shirt featuring a tailored square neckline and delicate green botanic single-line embroidery, paired with gold layered pendants, soft warm beige backdrop, Vogue aesthetic --ar 3:4 --v 6.0",
      promptZh: "攝影棚時尚肖像：女性身穿一件改造後的極簡白T恤，呈現剪裁俐落的法式方領與細緻綠色單線植物刺繡，配戴金色層次項鍊，柔和暖米色背景，Vogue 雜誌美學。",
      engine: "Midjourney v6.0",
      purpose: "探索方領剪裁角度與鎖骨珠寶配搭之視覺平衡"
    }
  },
  {
    id: "case-4",
    originalItem: "過時寬肩長版雙排扣西裝",
    remakeDirection: "俐落短版露腰西裝 × 拆卸式封腰",
    category: "西裝外套",
    difficulty: "裁縫進階",
    estimatedTime: "120 分鐘",
    coverColor: "from-zinc-600/20 to-slate-900/50",
    icon: "scissors",
    painPoints: [
      "厚重的大墊肩讓骨架顯得過於魁武，彷彿 80 年代橄欖球員缺乏當代休閒感",
      "長度過臀甚至及大腿中段，在亞洲人身形上極易壓低視覺重心",
      "羊毛混紡質料極佳且剪裁精美，但整體廓形與現代極簡穿搭格格不入"
    ],
    stylingSuggestions: [
      "【露腰時髦穿搭】：短版西裝內搭極簡黑色削肩 Bra Top，小露腹部肌膚，破解西裝外套的沉悶拘謹。",
      "【垂墜落地褲配搭】：下身配搭同色系垂墜超長闊腿褲與厚底球鞋，營造大長腿的比例分割。",
      "【金屬飾品點綴】：佩戴銀色粗曠手鍊與冷淡風金屬耳骨夾，強調俐落中性的幹練氣場。"
    ],
    remakeConcept: {
      tools: ["拆線刀", "熨斗與燙墊", "重磅縫紉機", "暗扣 2 組", "同色系嫘縈內裡布"],
      steps: [
        "【拆解沉重厚墊肩】：從袖圈內側拆開 5 公分小口，取出原本厚實的硬質海綿墊肩，換為極薄棉質定型襯，使肩線自然順滑。",
        "【腰線齊平截斷】：穿上後於肋骨下緣與肚臍之間標記截短線，保留 4 公分下襬反折與內裡包邊裕量後平直裁斷。",
        "【下擺縫製與封腰製作】：將外層毛料與內裡對折暗針車縫收口；切除的下半截衣襬保留鈕扣門襟，改製為一條可單獨拆卸搭配的結構感腰帶。"
      ],
      proTip: "西裝內裡光滑易滑動，裁剪前務必用大量珠針將表布與裡布水平固定，才能確保裁切邊緣絕對齊平！"
    },
    promptRecord: {
      promptEn: "Runway street style shot of a woman wearing a reconstructed cropped charcoal grey wool blazer with clean raw edges, matching high-rise fluid tailored trousers, minimalist black crop top beneath, urban concrete architectural setting, overcast cinematic light --ar 4:5 --v 6.0",
      promptZh: "伸展台街拍：女性身穿一件重構炭灰色短版毛料西裝外套，帶有俐落收邊，搭配同色高腰垂墜西裝長褲，內搭極簡黑色短背心，城市清水模建築背景，沉穩電影感漫射光影。",
      engine: "Midjourney v6.0",
      purpose: "評估去除墊肩並短版化後，在街頭風格中的實穿與時尚張力"
    }
  },
  {
    id: "case-5",
    originalItem: "過緊碎花長版雪紡洋裝",
    remakeDirection: "兩件式高腰開衩半身裙 + 復古露背法式小背心",
    category: "洋裝/裙裝",
    difficulty: "微工藝",
    estimatedTime: "60 分鐘",
    coverColor: "from-rose-800/20 to-stone-900/40",
    icon: "layers",
    painPoints: [
      "腰圍尺寸過小，後背拉鍊難以完全拉上，久坐容易有壓迫感",
      "整件大面積繁密碎花穿上身容易顯得過於甜膩或帶有鄉村俗氣感",
      "下擺長度尷尬卡在小腿肚最粗的位置，視覺上極顯腿短"
    ],
    stylingSuggestions: [
      "【拆解單穿法】：半身裙搭配寬鬆純白粗針織毛衣或灰色大學T，用中性大面積純色平衡碎花的繁雜感。",
      "【背心甜酷混搭】：改造後的小背心外搭黑色皮質夾克與高腰工裝長褲，呈現「上身浪漫柔美 × 下身酷帥硬挺」的反差穿搭。",
      "【鞋款選擇】：搭配一雙黑色短靴或帆布鞋，擺脫傳統碎花洋裝只能配淑女鞋的呆板印象。"
    ],
    remakeConcept: {
      tools: ["拆線剪刀", "寬 3 公分彈力鬆緊帶", "穿帶針", "縫紉針線"],
      steps: [
        "【腰部分割分離】：沿洋裝原有的高腰接縫線將上半身與下半身裙片完全剪開拆離。",
        "【下半身裙腰鬆緊帶化】：在裙子頂部剪口向內折縫出 4 公分寬的腰頭通道，穿入符合腰圍舒適度的鬆緊帶並收口，側邊微拆 20 公分打造優雅側開衩。",
        "【上半身改綁帶露背小可愛】：將背部原本拉鍊拆除，兩側縫上同花色細綁帶，改為可自由調節鬆緊的法式交叉露背背心。"
      ],
      proTip: "雪紡面料容易抽絲脫線，剪開後立刻使用火機外焰微燒邊或使用布料防脫液固定邊緣！"
    },
    promptRecord: {
      promptEn: "Two-piece modern co-ord set upcycled from a vintage floral maxi dress: high-waisted midi skirt with side slit and backless tie-up crop top, styled with chunky boots and oversized leather bomber, urban street backdrop, warm golden hour sun flare --ar 4:5 --v 6.0",
      promptZh: "兩件式現代套裝，由復古碎花長洋裝改造重構：帶有側開衩的高腰中長裙與後背綁帶短背心，搭配厚底短靴與寬版皮夾克，都市街景背景，溫暖逆光夕陽金芒。",
      engine: "Midjourney v6.0",
      purpose: "模擬洋裝一分為二後的兩件式風格搭配與實穿可塑性"
    }
  },
  {
    id: "case-6",
    originalItem: "洗水縮水變形粗針織毛衣",
    remakeDirection: "溫暖手作羊毛水桶帽 × 無指保暖手腕套",
    category: "其他",
    difficulty: "新手友好",
    estimatedTime: "40 分鐘",
    coverColor: "from-amber-700/20 to-neutral-900/50",
    icon: "feather",
    painPoints: [
      "誤丟入烘衣機造成羊毛纖維嚴重縮水毛氈化，身軀與袖口緊繃無法正常穿著",
      "毛衣表面部分起毛球，但毛線質料紮實溫暖防風",
      "傳統毛衣體積龐大佔據衣櫃收納空間，棄之可惜"
    ],
    stylingSuggestions: [
      "【冬季配件點綴】：重構為水桶帽後，能為深色系的羽絨外套或長版大衣增添溫暖自然的手工文青氛圍。",
      "【色彩呼應法則】：手腕套露在長袖大衣袖口外，與毛線帽顏色相互呼應，形成精緻連貫的冬季配件細節。",
      "【中性簡約風格】：搭配大地色系（駝色、焦糖、米白）針織圍巾，營造日系森林系自然氛圍。"
    ],
    remakeConcept: {
      tools: ["剪毛球器", "大眼毛線縫針", "同色粗毛線", "圓形紙型打版版型"],
      steps: [
        "【除毛球與袖身分離】：先以剪毛球器修整表面平整，然後沿著肩線完整剪下兩支袖管，保留身片主體。",
        "【水桶帽立體縫合】：利用毛衣身片下擺（保留原有羅紋作為帽沿），上方依照頭圍紙型剪出 4 片三角弧形瓣片，以毛線鎖邊針法縫合為圓弧帽頂。",
        "【手腕套免剪開口】：兩支袖管依照手掌長度剪裁為 18 公分長段，在拇指位置剪一個 2 公分小開口並用毛線密針鎖邊，即刻完成一對保暖無指手套。"
      ],
      proTip: "針織布料剪切後極易脫線，剪開前可在裁切線兩側塗抹稀釋白膠或用快乾平針壓線固定線圈！"
    },
    promptRecord: {
      promptEn: "Flatlay styling composition of cozy winter accessories handcrafted from upcycled chunky oatmeal knit sweater: a knit bucket hat and matching fingerless wrist warmers, placed on rustic wooden background with pinecones and hot cocoa --ar 1:1 --v 6.0",
      promptZh: "平鋪靜物穿搭構圖：由改造粗針織燕麥色毛衣手工重製的溫暖冬季配件，包含一頂毛線水桶帽與一對相配的無指手腕套，置於鄉村原木背景上，附帶松果與熱可可道具。",
      engine: "Midjourney v6.0",
      purpose: "確認毛氈化厚實針織重構成手套與帽子後的配件質感呈現"
    }
  }
];

// 預設靈感庫單品清單 (供 AI 提案試用區快速帶入)
const SAMPLE_INPUTS = [
  {
    name: "老爸衣櫃裡的過長寬鬆格子襯衫",
    materialColor: "深藍綠混色 / 粗紡純棉",
    painPoint: "下擺長度卡在大腿一半超顯矮，版型太鬆像穿布袋，單穿像睡衣",
    targetStyle: "日系休閒 CityBoy / 俐落層次感",
    mode: "結構微改"
  },
  {
    name: "腰圍過緊拉不上的碎花連身洋裝",
    materialColor: "米底小雛菊印花 / 雪紡紗",
    painPoint: "後背拉鍊拉到一半就卡住，滿版碎花大面積穿太甜膩像鄉村風",
    targetStyle: "法式輕熟甜酷 / 兩件式混搭",
    mode: "徹底翻新"
  },
  {
    name: "領口穿洗到變成荷葉邊的素白短T",
    materialColor: "純白色 / 24支精梳純棉",
    painPoint: "領口變形下垂看起來像穿了十年的睡衣，但布料很軟捨不得丟",
    targetStyle: "法式俐落優雅 / 顯鎖骨精緻風",
    mode: "穿搭搭配"
  },
  {
    name: "二手市集淘來的厚重雙排扣西裝外套",
    materialColor: "深灰細千鳥格 / 羊毛混紡",
    painPoint: "墊肩超級寬厚像橄欖球員，衣長蓋屁股完全沒有腰身",
    targetStyle: "冷淡極簡風 / 時髦短版露腰",
    mode: "結構微改"
  }
];
