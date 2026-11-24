// RE:CLOTHES 拾衣研究所 - 核心應用程式邏輯 (State & Interactions)

// 1. 初始化狀態管理 (State Management with LocalStorage persistence)
const STORAGE_KEY = "reclothes_cases_data_v1";

let appState = {
  cases: [],
  selectedCase: null,
  activeCategory: "all",
  activeDifficulty: "all",
  searchQuery: "",
  editingCaseId: null, // null 表示新增，有值表示編輯
  isGeneratingAI: false
};

// 載入資料 (優先讀取 LocalStorage，若無則注入 PRESET_CASES)
function loadInitialData() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      appState.cases = JSON.parse(cached);
    } else {
      appState.cases = [...PRESET_CASES];
      saveToStorage();
    }
  } catch (e) {
    console.error("無法自 LocalStorage 載入資料，使用預設範例", e);
    appState.cases = [...PRESET_CASES];
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.cases));
    updateStatsCounter();
  } catch (e) {
    console.error("儲存失敗", e);
  }
}

// 2. 介面渲染：統計數據更新
function updateStatsCounter() {
  const countEl = document.getElementById("stat-case-count");
  if (countEl) {
    countEl.textContent = `${appState.cases.length} 件`;
  }
}

// 3. 介面渲染：精選案例牆 (Cards Grid)
function renderCasesGrid() {
  const container = document.getElementById("cases-grid");
  const emptyState = document.getElementById("cases-empty-state");
  if (!container) return;

  // 篩選與搜尋運算
  const filtered = appState.cases.filter(item => {
    // 分類篩選
    const matchCategory = appState.activeCategory === "all" || item.category === appState.activeCategory;
    // 難度篩選
    const matchDifficulty = appState.activeDifficulty === "all" || item.difficulty === appState.activeDifficulty;
    // 關鍵字搜尋 (原單品、改造方向、痛點、標籤)
    const q = appState.searchQuery.trim().toLowerCase();
    const matchQuery = !q || 
      item.originalItem.toLowerCase().includes(q) ||
      item.remakeDirection.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.painPoints.some(p => p.toLowerCase().includes(q)) ||
      (item.stylingSuggestions && item.stylingSuggestions.some(s => s.toLowerCase().includes(q)));

    return matchCategory && matchDifficulty && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = filtered.map(item => {
    // 難度標籤色彩
    let diffBadgeColor = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    if (item.difficulty === "微工藝") {
      diffBadgeColor = "bg-amber-500/15 text-amber-300 border-amber-500/30";
    } else if (item.difficulty === "裁縫進階") {
      diffBadgeColor = "bg-rose-500/15 text-rose-300 border-rose-500/30";
    }

    // 痛點預覽 (取第一項簡短呈現)
    const firstPain = item.painPoints && item.painPoints[0] ? item.painPoints[0] : "待補充痛點分析";

    return `
      <div class="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <!-- 頂部裝飾漸層與類別標籤 -->
        <div class="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>

        <div>
          <!-- 頂部標籤區 -->
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
              🏷️ ${escapeHtml(item.category)}
            </span>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${diffBadgeColor}">
                ${escapeHtml(item.difficulty)}
              </span>
              <span class="text-xs text-neutral-400">⏱️ ${escapeHtml(item.estimatedTime || "約30分")}</span>
            </div>
          </div>

          <!-- 原單品 → 改造方向 核心對比展示卡片 (依要求實作) -->
          <div class="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800/80 mb-4">
            <div class="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>原單品 (Before)</span>
            </div>
            <h3 class="text-base font-bold text-neutral-200 line-clamp-1 mb-2">
              ${escapeHtml(item.originalItem)}
            </h3>

            <!-- 轉換流向視覺符號 -->
            <div class="flex items-center space-x-2 my-2 py-1 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
              <svg class="w-4 h-4 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
              <span class="text-xs font-bold tracking-wide">改造／搭配方向 (After)</span>
            </div>

            <div class="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>目標風格</span>
            </div>
            <h4 class="text-lg font-bold text-emerald-300 line-clamp-1">
              ${escapeHtml(item.remakeDirection)}
            </h4>
          </div>

          <!-- 核心痛點簡述 -->
          <div class="mb-4">
            <div class="text-xs font-medium text-neutral-400 mb-1 flex items-center">
              <span class="mr-1">⚡</span> 關鍵痛點剖析：
            </div>
            <p class="text-xs text-neutral-300 bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800 line-clamp-2">
              ${escapeHtml(firstPain)}
            </p>
          </div>
        </div>

        <!-- 底部互動操作按鈕 -->
        <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
          <button onclick="openDetailModal('${item.id}')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-neutral-950 border border-emerald-500/30 transition-all flex items-center space-x-1.5 shadow-sm">
            <span>查看案例詳情</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- CRUD 快捷操作：編輯與刪除 -->
          <div class="flex items-center space-x-1">
            <button onclick="openEditModal('${item.id}')" title="編輯此案例" 
              class="p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button onclick="confirmDeleteCase('${item.id}')" title="刪除此案例" 
              class="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 4. 案例詳情頁 Modal (依要求包含痛點分析、搭配建議、結構改造構想、Prompt 紀錄)
function openDetailModal(caseId) {
  const item = appState.cases.find(c => c.id === caseId);
  if (!item) return;

  appState.selectedCase = item;
  const modal = document.getElementById("detail-modal");
  const container = document.getElementById("detail-modal-body");
  if (!modal || !container) return;

  // 格式化痛點列表
  const painPointsHtml = item.painPoints.map((p, idx) => `
    <li class="flex items-start space-x-2.5 text-sm text-neutral-300">
      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-xs shrink-0 mt-0.5 font-bold">
        ${idx + 1}
      </span>
      <span>${escapeHtml(p)}</span>
    </li>
  `).join("");

  // 格式化搭配建議列表
  const stylingHtml = item.stylingSuggestions.map((s, idx) => `
    <div class="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-sm text-neutral-200">
      ${escapeHtml(s)}
    </div>
  `).join("");

  // 格式化結構改造步驟
  const remakeSteps = item.remakeConcept && item.remakeConcept.steps 
    ? item.remakeConcept.steps.map((st, idx) => `
        <div class="flex items-start space-x-3 text-sm text-neutral-200">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
            0${idx + 1}
          </span>
          <div class="leading-relaxed">${escapeHtml(st)}</div>
        </div>
      `).join("")
    : "<p class='text-neutral-400 text-sm'>暫無步驟說明</p>";

  const toolsHtml = item.remakeConcept && item.remakeConcept.tools
    ? item.remakeConcept.tools.map(t => `
        <span class="px-2.5 py-1 rounded-md text-xs bg-neutral-800 text-neutral-300 border border-neutral-700">
          ✂️ ${escapeHtml(t)}
        </span>
      `).join("")
    : "<span class='text-neutral-400 text-xs'>一般針線即可</span>";

  // Prompt 紀錄卡片
  const promptEn = item.promptRecord ? item.promptRecord.promptEn : "";
  const promptZh = item.promptRecord ? item.promptRecord.promptZh : "";
  const promptEngine = item.promptRecord ? item.promptRecord.engine : "Midjourney / AI Generator";
  const promptPurpose = item.promptRecord ? item.promptRecord.purpose : "視覺化風格提案與造型預覽";

  container.innerHTML = `
    <!-- Modal 標頭區 -->
    <div class="mb-6 pb-6 border-b border-neutral-800">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
          🏷️ ${escapeHtml(item.category)}
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          ⚡ 難度：${escapeHtml(item.difficulty)}
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
          ⏱️ 預估耗時：${escapeHtml(item.estimatedTime || "約30-45分鐘")}
        </span>
      </div>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="text-xs uppercase font-bold tracking-wider text-rose-400 flex items-center space-x-1.5 mb-1">
            <span>原單品狀態</span>
          </div>
          <h2 class="text-xl md:text-2xl font-extrabold text-neutral-100 mb-2">
            ${escapeHtml(item.originalItem)}
          </h2>
        </div>

        <div class="flex items-center text-emerald-400 font-bold text-sm bg-emerald-950/40 border border-emerald-500/30 px-4 py-2 rounded-xl">
          <span class="mr-2">改造重構方向 ➔</span>
          <span class="text-base text-emerald-300">${escapeHtml(item.remakeDirection)}</span>
        </div>
      </div>
    </div>

    <!-- 4 大核心板塊 (痛點、穿搭、結構、Prompt) -->
    <div class="space-y-6">

      <!-- 板塊 1: 單品痛點分析 -->
      <div class="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <h3 class="text-base font-bold text-neutral-100 flex items-center mb-3">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2.5"></span>
          一、 單品痛點分析 (Pain Points Breakdown)
        </h3>
        <ul class="space-y-2.5">
          ${painPointsHtml}
        </ul>
      </div>

      <!-- 板塊 2: 穿搭搭配建議 -->
      <div class="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <h3 class="text-base font-bold text-neutral-100 flex items-center mb-3">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400 mr-2.5"></span>
          二、 穿搭搭配建議 (Restyling & Layering Guide)
        </h3>
        <div class="space-y-2.5">
          ${stylingHtml}
        </div>
      </div>

      <!-- 板塊 3: 結構改造構想 -->
      <div class="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <h3 class="text-base font-bold text-neutral-100 flex items-center mb-3">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2.5"></span>
          三、 結構改造構想 (Upcycling & Reconstruction Plan)
        </h3>
        
        <!-- 所需工具清單 -->
        <div class="mb-4">
          <div class="text-xs font-semibold text-neutral-400 mb-2">所需工具與配件：</div>
          <div class="flex flex-wrap gap-2">
            ${toolsHtml}
          </div>
        </div>

        <!-- 改造執行步驟 -->
        <div class="space-y-3 mb-4">
          ${remakeSteps}
        </div>

        <!-- 工藝貼心提醒 -->
        ${item.remakeConcept && item.remakeConcept.proTip ? `
          <div class="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start space-x-2">
            <span class="shrink-0">💡</span>
            <span><strong>設計師小撇步：</strong>${escapeHtml(item.remakeConcept.proTip)}</span>
          </div>
        ` : ""}
      </div>

      <!-- 板塊 4: 當時使用的 Prompt 紀錄 -->
      <div class="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-bold text-neutral-100 flex items-center">
            <span class="w-2.5 h-2.5 rounded-full bg-indigo-400 mr-2.5"></span>
            四、 當時使用的 AI Prompt 紀錄 (Prompt Archive)
          </h3>
          <span class="px-2.5 py-0.5 rounded text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
            ${escapeHtml(promptEngine)}
          </span>
        </div>

        <p class="text-xs text-neutral-400 mb-3">
          <strong>生成目的：</strong>${escapeHtml(promptPurpose)}
        </p>

        <!-- 英文生圖 Prompt -->
        <div class="relative bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-3 font-mono text-xs text-emerald-300 leading-relaxed break-words">
          <div class="text-neutral-500 text-[10px] uppercase font-sans mb-1 font-bold">English Generation Prompt:</div>
          <div id="modal-prompt-text">${escapeHtml(promptEn)}</div>
          <button onclick="copyPromptToClipboard('modal-prompt-text', this)" 
            class="mt-3 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold bg-neutral-800 hover:bg-emerald-500 hover:text-neutral-950 text-neutral-200 transition-colors flex items-center space-x-1 border border-neutral-700">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>一鍵複製 Prompt</span>
          </button>
        </div>

        <!-- 中文語意翻譯與設計註解 -->
        <div class="bg-neutral-950/50 p-3.5 rounded-xl border border-neutral-800/80 text-xs text-neutral-300">
          <div class="text-neutral-500 text-[10px] uppercase font-bold mb-1">中文語意對照與提示詞拆解：</div>
          <p class="leading-relaxed">${escapeHtml(promptZh)}</p>
        </div>
      </div>

    </div>

    <!-- 底部操作按鈕 -->
    <div class="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <button onclick="openEditModal('${item.id}'); closeDetailModal();" 
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center space-x-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          <span>編輯此案例</span>
        </button>
        <button onclick="confirmDeleteCase('${item.id}'); closeDetailModal();" 
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors flex items-center space-x-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span>刪除案例</span>
        </button>
      </div>

      <button onclick="closeDetailModal()" 
        class="px-5 py-2 rounded-xl text-xs font-bold bg-neutral-700 hover:bg-neutral-600 text-white transition-colors">
        關閉視窗
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// 5. CRUD: 新增 / 編輯案例 Modal (Create / Update)
function openCreateModal() {
  appState.editingCaseId = null;
  const modal = document.getElementById("edit-modal");
  const title = document.getElementById("edit-modal-title");
  const form = document.getElementById("edit-case-form");
  if (!modal || !form) return;

  if (title) title.textContent = "✨ 新增閒置單品改造案例";
  form.reset();

  // 預設填入範例欄位以供快速指引
  document.getElementById("form-category").value = "襯衫";
  document.getElementById("form-difficulty").value = "微工藝";
  document.getElementById("form-time").value = "40 分鐘";

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function openEditModal(caseId) {
  const item = appState.cases.find(c => c.id === caseId);
  if (!item) return;

  appState.editingCaseId = caseId;
  const modal = document.getElementById("edit-modal");
  const title = document.getElementById("edit-modal-title");
  if (!modal) return;

  if (title) title.textContent = "✏️ 編輯改造案例內容";

  // 填入表單欄位
  document.getElementById("form-original").value = item.originalItem || "";
  document.getElementById("form-direction").value = item.remakeDirection || "";
  document.getElementById("form-category").value = item.category || "襯衫";
  document.getElementById("form-difficulty").value = item.difficulty || "新手友好";
  document.getElementById("form-time").value = item.estimatedTime || "30 分鐘";
  document.getElementById("form-pain").value = item.painPoints ? item.painPoints.join("\n") : "";
  document.getElementById("form-styling").value = item.stylingSuggestions ? item.stylingSuggestions.join("\n") : "";
  document.getElementById("form-tools").value = item.remakeConcept && item.remakeConcept.tools ? item.remakeConcept.tools.join("、") : "";
  document.getElementById("form-steps").value = item.remakeConcept && item.remakeConcept.steps ? item.remakeConcept.steps.join("\n") : "";
  document.getElementById("form-prompt-en").value = item.promptRecord ? item.promptRecord.promptEn : "";
  document.getElementById("form-prompt-zh").value = item.promptRecord ? item.promptRecord.promptZh : "";

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeEditModal() {
  const modal = document.getElementById("edit-modal");
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// 處理新增或修改儲存 (Submit Handler)
function handleCaseFormSubmit(e) {
  e.preventDefault();

  const originalItem = document.getElementById("form-original").value.trim();
  const remakeDirection = document.getElementById("form-direction").value.trim();
  const category = document.getElementById("form-category").value;
  const difficulty = document.getElementById("form-difficulty").value;
  const estimatedTime = document.getElementById("form-time").value.trim();
  
  const painText = document.getElementById("form-pain").value.trim();
  const stylingText = document.getElementById("form-styling").value.trim();
  const toolsText = document.getElementById("form-tools").value.trim();
  const stepsText = document.getElementById("form-steps").value.trim();
  
  const promptEn = document.getElementById("form-prompt-en").value.trim();
  const promptZh = document.getElementById("form-prompt-zh").value.trim();

  if (!originalItem || !remakeDirection) {
    showToast("請務必填寫原單品名稱與改造方向！", "error");
    return;
  }

  const painPoints = painText ? painText.split("\n").filter(Boolean) : ["版型過時且缺乏搭配靈感"];
  const stylingSuggestions = stylingText ? stylingText.split("\n").filter(Boolean) : ["建議以簡約素面下身搭配平衡整體造型"];
  const tools = toolsText ? toolsText.split(/[、,，\s]+/).filter(Boolean) : ["剪刀", "針線"];
  const steps = stepsText ? stepsText.split("\n").filter(Boolean) : ["標記修剪線後整平裁切", "縫邊固定防脫鬚"];

  const caseData = {
    originalItem,
    remakeDirection,
    category,
    difficulty,
    estimatedTime: estimatedTime || "30 分鐘",
    painPoints,
    stylingSuggestions,
    remakeConcept: {
      tools,
      steps,
      proTip: "動手剪裁前務必先以珠針假固定並試穿確認活動度！"
    },
    promptRecord: {
      promptEn: promptEn || `Modern editorial photo of an upcycled ${originalItem} redesigned into a ${remakeDirection}, high fashion styling, clean studio lighting --v 6.0`,
      promptZh: promptZh || `現代時尚大片：一件改造後的${originalItem}，重構為${remakeDirection}，高質感影棚採光。`,
      engine: "Midjourney v6.0",
      purpose: "自訂案例的視覺化預覽與風格紀錄"
    }
  };

  if (appState.editingCaseId) {
    // 編輯 (Update)
    const index = appState.cases.findIndex(c => c.id === appState.editingCaseId);
    if (index !== -1) {
      caseData.id = appState.editingCaseId;
      appState.cases[index] = caseData;
      showToast("案例修改成功！", "success");
    }
  } else {
    // 新增 (Create)
    caseData.id = "custom-" + Date.now();
    appState.cases.unshift(caseData); // 新增在最上方
    showToast("新案例已成功發布至精選案例牆！", "success");
  }

  saveToStorage();
  renderCasesGrid();
  closeEditModal();
}

// 6. CRUD: 刪除案例 (Delete)
function confirmDeleteCase(caseId) {
  const item = appState.cases.find(c => c.id === caseId);
  if (!item) return;

  const ok = confirm(`確定要刪除「${item.originalItem} → ${item.remakeDirection}」這個案例嗎？此操作可透過「恢復預設案例」復原。`);
  if (!ok) return;

  appState.cases = appState.cases.filter(c => c.id !== caseId);
  saveToStorage();
  renderCasesGrid();
  showToast(`已刪除「${item.originalItem}」案例`, "info");
}

// 7. 恢復預設案例 (Reset to Factory Presets)
function resetToPresetCases() {
  const ok = confirm("確定要將所有案例重置為官方精選預設版本嗎？這將覆蓋自訂新增的項目。");
  if (!ok) return;

  appState.cases = JSON.parse(JSON.stringify(PRESET_CASES));
  saveToStorage();
  renderCasesGrid();
  showToast("已成功重置為 6 套官方精選案例庫！", "success");
}

// 8. 匯出與匯入 JSON 備份
function exportCasesJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.cases, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `reclothes_cases_backup_${Date.now()}.json`);
  dlAnchorElem.click();
  showToast("案例資料已成功匯出為 JSON 檔！", "success");
}

function importCasesJSON() {
  const fileInput = document.getElementById("import-file-input");
  if (!fileInput) return;
  fileInput.click();
}

function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (Array.isArray(imported)) {
        appState.cases = imported;
        saveToStorage();
        renderCasesGrid();
        showToast(`成功匯入 ${imported.length} 筆案例資料！`, "success");
      } else {
        showToast("JSON 格式不符（需為案例陣列）", "error");
      }
    } catch (err) {
      showToast("解析 JSON 檔案失敗，請檢查格式", "error");
    }
  };
  reader.readAsText(file);
}

// 9. 自己的試用區：智慧 AI 改造與搭配提案生成器 (Interactive Try-it-yourself Generator)
function loadSampleInput(index) {
  const sample = SAMPLE_INPUTS[index];
  if (!sample) return;

  document.getElementById("try-name").value = sample.name;
  document.getElementById("try-material").value = sample.materialColor;
  document.getElementById("try-pain").value = sample.painPoint;
  document.getElementById("try-style").value = sample.targetStyle;
  document.getElementById("try-mode").value = sample.mode;

  showToast(`已填入範例：${sample.name}`, "info");
}

// 智慧提案引擎（模擬多維度 AI 思考生成）
let latestGeneratedProposal = null;

function generateAIProposal(e) {
  if (e) e.preventDefault();

  const name = document.getElementById("try-name").value.trim();
  const material = document.getElementById("try-material").value.trim() || "混紡材質 / 常見色系";
  const pain = document.getElementById("try-pain").value.trim();
  const targetStyle = document.getElementById("try-style").value.trim() || "現代簡約質感";
  const mode = document.getElementById("try-mode").value;

  if (!name || !pain) {
    showToast("請至少填寫「單品名稱」與「目前最大的痛點」！", "error");
    return;
  }

  const resultArea = document.getElementById("try-result-area");
  const loadingArea = document.getElementById("try-loading-area");
  const outputContent = document.getElementById("try-output-content");

  // 開啟載入動畫
  if (loadingArea) loadingArea.classList.remove("hidden");
  if (resultArea) resultArea.classList.add("hidden");

  // 智慧推論單品所屬類別
  let inferredCategory = "其他";
  if (name.includes("襯衫")) inferredCategory = "襯衫";
  else if (name.includes("牛仔") || name.includes("丹寧")) inferredCategory = "丹寧/牛仔";
  else if (name.includes("T") || name.includes("衛衣") || name.includes("帽T")) inferredCategory = "T恤/衛衣";
  else if (name.includes("西裝") || name.includes("外套") || name.includes("風衣")) inferredCategory = "西裝外套";
  else if (name.includes("裙") || name.includes("洋裝")) inferredCategory = "洋裝/裙裝";

  // 根據使用者的痛點與偏好模式生成專屬提案
  setTimeout(() => {
    // 關閉載入
    if (loadingArea) loadingArea.classList.add("hidden");

    let remakeTitle = "";
    let diff = "新手友好";
    let estTime = "30 分鐘";

    if (mode === "穿搭搭配") {
      remakeTitle = `${targetStyle.split("/")[0] || "日系"} 俐落層次穿搭重構`;
      diff = "新手友好";
      estTime = "15 分鐘";
    } else if (mode === "結構微改") {
      remakeTitle = `短版箱型 (Boxy) 剪裁 × 抽繩微工藝重塑`;
      diff = "微工藝";
      estTime = "45 分鐘";
    } else {
      remakeTitle = `結構翻新：多功能兩件式立體重構方案`;
      diff = "裁縫進階";
      estTime = "90 分鐘";
    }

    // 生成生圖 Prompt
    const enPrompt = `Fashion catalog photography, upcycling concept: an old ${name} (${material}) creatively transformed into ${remakeTitle}, styled in ${targetStyle}, high-end editorial composition, modern aesthetic, soft daylight --ar 4:5 --v 6.0`;
    const zhPrompt = `時尚型錄攝影，改造理念：將原本的閒置單品「${name}」(${material})，巧妙重構為「${remakeTitle}」，整體呈現${targetStyle}，高級時尚排版，現代美學光影。`;

    const proposalObj = {
      originalItem: name,
      remakeDirection: remakeTitle,
      category: inferredCategory,
      difficulty: diff,
      estimatedTime: estTime,
      painPoints: [
        `【原始痛點透視】：${pain}`,
        `【材質與版型限制】：${material} 在現有版型下缺乏修飾比例的支撐點。`
      ],
      stylingSuggestions: [
        `【視覺比例平衡】：運用「上緊下寬」或「上短下長」原則，下著搭配垂墜高腰褲或硬挺西裝褲，轉移對「${pain}」的視覺焦點。`,
        `【配件層次點綴】：挑選金屬鍊飾或俐落肩背包，在視覺中心營造焦點，完美融入「${targetStyle}」的氛圍。`,
        `【季節疊穿公式】：內搭同色系高領或外搭結構感背心，利用領口與袖口長度差打破單品原本的單調感。`
      ],
      remakeConcept: {
        tools: ["布剪", "手縫針線", "珠針", "捲尺"],
        steps: [
          `【畫線標記】：穿上衣物，標記改善「${pain}」的黃金剪裁線（如縮短長度或收窄側邊），預留 2 公分折邊。`,
          `【平整裁切】：使用布剪沿著預留線條平順剪開，保持切口平整。`,
          `【包邊防脫線】：向內折疊並以雙排平針壓線固定邊緣，若有抽繩需求可預留兩端穿繩孔。`
        ],
        proTip: `動手裁剪前，先用熨斗將「${name}」徹底燙平，標記尺寸時才不會產生視覺誤差！`
      },
      promptRecord: {
        promptEn: enPrompt,
        promptZh: zhPrompt,
        engine: "Gemini / Midjourney v6.0",
        purpose: "專屬 AI 即時根據使用者條件所推論生成之視覺靈感 Prompt"
      }
    };

    latestGeneratedProposal = proposalObj;

    // 渲染提案成果
    outputContent.innerHTML = `
      <div class="glass-card p-6 rounded-2xl border-emerald-500/30 glow-tag">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-neutral-800">
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ✨ AI 靈感提案生成完成
            </span>
            <span class="px-2.5 py-1 rounded-md text-xs bg-neutral-800 text-neutral-300 border border-neutral-700">
              類別推論：${escapeHtml(inferredCategory)}
            </span>
            <span class="px-2.5 py-1 rounded-md text-xs bg-neutral-800 text-amber-300 border border-neutral-700">
              難易度：${escapeHtml(diff)} (${estTime})
            </span>
          </div>

          <!-- 一鍵儲存至案例牆按鈕 (Create in CRUD) -->
          <button onclick="saveGeneratedProposalToWall()" 
            class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-lg flex items-center space-x-1.5 transform hover:scale-105">
            <span>📥 將此提案儲存至上方案例牆</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <div class="text-xs text-neutral-400 font-bold mb-1">【原單品】</div>
            <div class="text-base font-bold text-neutral-200">${escapeHtml(name)}</div>
            <div class="text-xs text-neutral-400 mt-1">材質/顏色：${escapeHtml(material)}</div>
            <div class="text-xs text-rose-400/90 mt-2 bg-rose-950/20 p-2 rounded border border-rose-900/30">
              痛點：${escapeHtml(pain)}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
            <div class="text-xs text-emerald-400 font-bold mb-1">【重構／改造方向】</div>
            <div class="text-lg font-bold text-emerald-300">${escapeHtml(remakeTitle)}</div>
            <div class="text-xs text-neutral-300 mt-1">鎖定風格：${escapeHtml(targetStyle)}</div>
            <div class="text-xs text-emerald-400 mt-2 bg-emerald-900/20 p-2 rounded border border-emerald-500/20">
              形式：${escapeHtml(mode)}
            </div>
          </div>
        </div>

        <!-- 搭配與剪裁建議 -->
        <div class="space-y-4 mb-6">
          <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div class="text-xs font-bold text-amber-400 mb-2 flex items-center">
              <span class="mr-1.5">👗</span> 3 招立即見效的實穿搭配方案：
            </div>
            <ul class="text-xs text-neutral-300 space-y-1.5 pl-2">
              ${proposalObj.stylingSuggestions.map(s => `<li>• ${escapeHtml(s)}</li>`).join("")}
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div class="text-xs font-bold text-emerald-400 mb-2 flex items-center">
              <span class="mr-1.5">✂️</span> 結構改造實作引導：
            </div>
            <ul class="text-xs text-neutral-300 space-y-1.5 pl-2">
              ${proposalObj.remakeConcept.steps.map(st => `<li>• ${escapeHtml(st)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- AI 生圖 Prompt -->
        <div class="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
          <div class="flex items-center justify-between mb-2">
            <div class="text-xs font-bold text-indigo-400 flex items-center">
              <span class="mr-1.5">🎨</span> 專屬 AI 生圖 Prompt (可一鍵複製至 Midjourney)：
            </div>
            <button onclick="copyPromptToClipboard('generated-prompt-text', this)" 
              class="px-2.5 py-1 rounded text-xs bg-neutral-800 hover:bg-emerald-500 hover:text-neutral-950 text-neutral-200 transition-colors">
              複製 Prompt
            </button>
          </div>
          <p id="generated-prompt-text" class="font-mono text-xs text-emerald-300/90 leading-relaxed bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
            ${escapeHtml(enPrompt)}
          </p>
        </div>
      </div>
    `;

    if (resultArea) {
      resultArea.classList.remove("hidden");
      resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    showToast("AI 提案生成完畢！可點擊儲存加入上方精選案例牆", "success");
  }, 1000);
}

// 將試用區產生的提案直接儲存為案例卡片 (CRUD Create)
function saveGeneratedProposalToWall() {
  if (!latestGeneratedProposal) return;

  const newCase = {
    ...latestGeneratedProposal,
    id: "gen-" + Date.now()
  };

  appState.cases.unshift(newCase);
  saveToStorage();
  renderCasesGrid();

  // 平滑滾動至案例牆
  const wallEl = document.getElementById("cases-section");
  if (wallEl) {
    wallEl.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`已將「${newCase.originalItem}」提案成功發布至案例牆！`, "success");
}

// 10. 複製 Prompt 至剪貼簿
function copyPromptToClipboard(elementId, btnElement) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent.trim();

  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const originalHtml = btnElement.innerHTML;
      btnElement.innerHTML = `<span>✓ 已複製到剪貼簿！</span>`;
      btnElement.classList.add("bg-emerald-500", "text-neutral-950");
      setTimeout(() => {
        btnElement.innerHTML = originalHtml;
        btnElement.classList.remove("bg-emerald-500", "text-neutral-950");
      }, 2000);
    }
    showToast("Prompt 已成功複製到剪貼簿！", "success");
  }).catch(err => {
    showToast("複製失敗，請手動選取文字", "error");
  });
}

// 11. 簡易 Toast 提示訊息
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  let bgBorder = "bg-neutral-900/95 border-neutral-700 text-neutral-200";
  if (type === "success") bgBorder = "bg-emerald-950/95 border-emerald-500/50 text-emerald-200";
  if (type === "error") bgBorder = "bg-rose-950/95 border-rose-500/50 text-rose-200";
  if (type === "info") bgBorder = "bg-blue-950/95 border-blue-500/50 text-blue-200";

  toast.className = `p-3.5 rounded-xl border text-xs font-semibold shadow-2xl flex items-center space-x-2 transition-all transform duration-300 opacity-0 translate-y-2 ${bgBorder}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-2");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// 12. XSS 防護輔助函式
function escapeHtml(str) {
  if (typeof str !== "string") return str || "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 13. 事件綁定與初始化 (Event Listeners)
document.addEventListener("DOMContentLoaded", () => {
  loadInitialData();
  renderCasesGrid();
  updateStatsCounter();

  // 分類篩選按鈕群
  const catButtons = document.querySelectorAll(".category-pill");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => {
        b.classList.remove("bg-emerald-500", "text-neutral-950", "font-bold");
        b.classList.add("bg-neutral-800", "text-neutral-300");
      });
      btn.classList.add("bg-emerald-500", "text-neutral-950", "font-bold");
      btn.classList.remove("bg-neutral-800", "text-neutral-300");

      appState.activeCategory = btn.dataset.category || "all";
      renderCasesGrid();
    });
  });

  // 難易度下拉選單
  const diffSelect = document.getElementById("filter-difficulty");
  if (diffSelect) {
    diffSelect.addEventListener("change", (e) => {
      appState.activeDifficulty = e.target.value;
      renderCasesGrid();
    });
  }

  // 即時關鍵字搜尋框
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      renderCasesGrid();
    });
  }

  // 表單送出監聽
  const caseForm = document.getElementById("edit-case-form");
  if (caseForm) {
    caseForm.addEventListener("submit", handleCaseFormSubmit);
  }

  // 試用區表單送出監聽
  const tryForm = document.getElementById("try-generator-form");
  if (tryForm) {
    tryForm.addEventListener("submit", generateAIProposal);
  }

  // 匯入檔案監聽
  const fileInput = document.getElementById("import-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", handleFileImport);
  }
});
