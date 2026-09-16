/**
 * ============================================================
 * AL-QUDS PHARMACY — SHOP / CATALOG CONTROLLER
 * Real-time client filtering, sorting, drawer, and chips
 * ============================================================
 */

const params = new URLSearchParams(location.search);

const state = {
  categories: params.getAll("category"),
  brands: params.getAll("brand"),
  priceMin: null,
  priceMax: null,
  inStockOnly: false,
  noPrescriptionOnly: false,
  offersOnly: params.get("tag") === "offers",
  sort: params.get("sort") || "relevance",
  query: (params.get("q") || "").toLowerCase().trim()
};

function renderFilterOptions() {
  const catContainer = document.getElementById("filter-categories");
  if (catContainer && typeof CATEGORIES !== "undefined") {
    catContainer.innerHTML = CATEGORIES.map(c => `
      <label class="flex items-center justify-between gap-2 text-xs py-1.5 px-2 rounded-lg hover:bg-[var(--blue-50)] cursor-pointer select-none transition-colors group">
        <span class="flex items-center gap-2 text-[var(--navy-900)] font-medium">
          <input type="checkbox" class="filter-cat w-4 h-4 rounded text-[var(--blue-600)] accent-[var(--blue-600)] cursor-pointer" value="${c.id}" ${state.categories.includes(c.id) ? "checked" : ""}>
          <span>${c.name}</span>
        </span>
        <span class="text-[11px] font-bold text-[var(--slate-500)] bg-[var(--paper)] px-2 py-0.5 rounded-full group-hover:bg-white transition-colors">${c.count}</span>
      </label>
    `).join("");
  }

  const brandContainer = document.getElementById("filter-brands");
  if (brandContainer && typeof BRANDS !== "undefined") {
    brandContainer.innerHTML = BRANDS.map(b => `
      <label class="flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg hover:bg-[var(--blue-50)] cursor-pointer select-none transition-colors text-[var(--navy-900)] font-medium">
        <input type="checkbox" class="filter-brand w-4 h-4 rounded text-[var(--blue-600)] accent-[var(--blue-600)] cursor-pointer" value="${b}" ${state.brands.some(sb => sb.includes(b) || b.includes(sb)) ? "checked" : ""}>
        <span>${b}</span>
      </label>
    `).join("");
  }

  if (state.offersOnly) {
    const offersCb = document.getElementById("filter-offers-only");
    if (offersCb) offersCb.checked = true;
  }
}

function readFiltersFromForm() {
  state.categories = [...document.querySelectorAll(".filter-cat:checked")].map(el => el.value);
  state.brands = [...document.querySelectorAll(".filter-brand:checked")].map(el => el.value);
  
  const minVal = document.getElementById("price-min").value;
  state.priceMin = minVal ? Number(minVal) : null;

  const maxVal = document.getElementById("price-max").value;
  state.priceMax = maxVal ? Number(maxVal) : null;

  state.inStockOnly = document.getElementById("filter-instock").checked;
  state.noPrescriptionOnly = document.getElementById("filter-no-prescription").checked;
  state.offersOnly = document.getElementById("filter-offers-only").checked;
}

function renderActiveChips() {
  const bar = document.getElementById("active-filters-bar");
  const container = document.getElementById("active-filters-chips");
  if (!bar || !container) return;

  const chips = [];

  state.categories.forEach(catId => {
    const c = CATEGORIES.find(item => item.id === catId);
    if (c) {
      chips.push({ label: c.name, type: "category", val: catId });
    }
  });

  state.brands.forEach(b => {
    chips.push({ label: b, type: "brand", val: b });
  });

  if (state.priceMin !== null || state.priceMax !== null) {
    chips.push({
      label: `السعر: ${state.priceMin || 0} - ${state.priceMax || '∞'} ج.م`,
      type: "price"
    });
  }

  if (state.inStockOnly) chips.push({ label: "متوفر فقط", type: "instock" });
  if (state.noPrescriptionOnly) chips.push({ label: "صرف مباشر", type: "rx" });
  if (state.offersOnly) chips.push({ label: "عروض فقط", type: "offers" });
  if (state.query) chips.push({ label: `بحث: "${state.query}"`, type: "query" });

  if (!chips.length) {
    bar.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  bar.classList.remove("hidden");
  container.innerHTML = chips.map(chip => `
    <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--blue-100)] text-[var(--navy-900)] text-xs font-bold rounded-full font-display">
      ${chip.label}
      <button type="button" class="chip-remove text-[var(--slate-500)] hover:text-[var(--red-600)]" data-chip-type="${chip.type}" data-chip-val="${chip.val || ''}" aria-label="إزالة فلتر">✕</button>
    </span>
  `).join("");

  container.querySelectorAll(".chip-remove").forEach(btn => {
    btn.onclick = () => {
      const type = btn.getAttribute("data-chip-type");
      const val = btn.getAttribute("data-chip-val");
      
      if (type === "category") {
        state.categories = state.categories.filter(c => c !== val);
        const cb = document.querySelector(`.filter-cat[value="${val}"]`);
        if (cb) cb.checked = false;
      } else if (type === "brand") {
        state.brands = state.brands.filter(b => b !== val);
        const cb = document.querySelector(`.filter-brand[value="${val}"]`);
        if (cb) cb.checked = false;
      } else if (type === "price") {
        state.priceMin = null;
        state.priceMax = null;
        document.getElementById("price-min").value = "";
        document.getElementById("price-max").value = "";
      } else if (type === "instock") {
        state.inStockOnly = false;
        document.getElementById("filter-instock").checked = false;
      } else if (type === "rx") {
        state.noPrescriptionOnly = false;
        document.getElementById("filter-no-prescription").checked = false;
      } else if (type === "offers") {
        state.offersOnly = false;
        document.getElementById("filter-offers-only").checked = false;
      } else if (type === "query") {
        state.query = "";
      }
      applyFiltersAndRender();
    };
  });
}

function applyFiltersAndRender() {
  if (typeof PRODUCTS === "undefined") return;
  let list = PRODUCTS.slice();

  // Search query filter
  if (state.query) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(state.query) ||
      p.brand.toLowerCase().includes(state.query) ||
      (p.short || "").toLowerCase().includes(state.query)
    );
  }

  // Categories filter
  if (state.categories.length) {
    list = list.filter(p => state.categories.includes(p.category));
  }

  // Brands filter
  if (state.brands.length) {
    list = list.filter(p => state.brands.some(b => p.brand.includes(b) || b.includes(p.brand)));
  }

  // Price range
  if (state.priceMin !== null) list = list.filter(p => p.price >= state.priceMin);
  if (state.priceMax !== null) list = list.filter(p => p.price <= state.priceMax);

  // In-stock
  if (state.inStockOnly) list = list.filter(p => p.stock > 0);

  // Prescription required
  if (state.noPrescriptionOnly) list = list.filter(p => !p.prescriptionRequired);

  // Offers only
  if (state.offersOnly) list = list.filter(p => p.compareAt > p.price || p.badges.some(b => b.includes("خصم") || b.includes("عرض")));

  // Sorting
  switch (state.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      list.sort((a, b) => ((b.compareAt - b.price) / b.compareAt) - ((a.compareAt - a.price) / a.compareAt));
      break;
    case "popular":
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
    case "newest":
      list.reverse();
      break;
    default:
      break;
  }

  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  const countEl = document.getElementById("results-count");
  const headingEl = document.getElementById("results-heading");

  if (list.length > 0) {
    grid.innerHTML = list.map(productCardHTML).join("");
    grid.classList.remove("hidden");
    empty.classList.add("hidden");
  } else {
    grid.innerHTML = "";
    grid.classList.add("hidden");
    empty.classList.remove("hidden");
  }

  if (countEl) countEl.textContent = `تم العثور على ${list.length} منتج متاح`;

  if (headingEl) {
    if (state.query) {
      headingEl.textContent = `نتائج البحث عن: "${state.query}"`;
    } else if (state.categories.length === 1) {
      const c = CATEGORIES.find(item => item.id === state.categories[0]);
      headingEl.textContent = c ? c.name : "المتجر";
    } else if (state.offersOnly) {
      headingEl.textContent = "العروض والتخفيضات الحصرية";
    } else {
      headingEl.textContent = "كل المنتجات الطبية";
    }
  }

  renderActiveChips();
  bindGlobalEvents(grid);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilterOptions();
  applyFiltersAndRender();

  // Sort dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Apply filters button
  document.getElementById("apply-filters")?.addEventListener("click", () => {
    readFiltersFromForm();
    applyFiltersAndRender();
    closeMobileFilters();
  });

  // Clear filters
  const resetAll = () => {
    document.querySelectorAll(".filter-cat, .filter-brand, #filter-instock, #filter-no-prescription, #filter-offers-only").forEach(el => el.checked = false);
    document.getElementById("price-min").value = "";
    document.getElementById("price-max").value = "";
    state.categories = [];
    state.brands = [];
    state.priceMin = null;
    state.priceMax = null;
    state.inStockOnly = false;
    state.noPrescriptionOnly = false;
    state.offersOnly = false;
    state.query = "";
    applyFiltersAndRender();
    closeMobileFilters();
  };

  document.getElementById("clear-filters")?.addEventListener("click", resetAll);
  document.getElementById("clear-all-chips")?.addEventListener("click", resetAll);
  document.getElementById("empty-reset-btn")?.addEventListener("click", resetAll);

  // Mobile Filter Drawer Toggle
  const panel = document.getElementById("filters-panel");
  const backdrop = document.getElementById("filters-backdrop");
  const openFilterBtn = document.querySelector("[data-filters-open]");
  const closeFilterBtns = document.querySelectorAll("[data-filters-close]");

  function openMobileFilters() {
    if (!panel) return;
    panel.classList.remove("hidden");
    panel.classList.add("filter-drawer-panel");
    requestAnimationFrame(() => {
      panel.classList.add("open");
    });
    if (backdrop) backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMobileFilters() {
    if (!panel) return;
    panel.classList.remove("open");
    setTimeout(() => {
      panel.classList.remove("filter-drawer-panel");
      if (window.innerWidth < 1024) {
        panel.classList.add("hidden");
      }
    }, 250);
    if (backdrop) backdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  openFilterBtn?.addEventListener("click", openMobileFilters);
  closeFilterBtns.forEach(btn => btn.addEventListener("click", closeMobileFilters));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && panel.classList.contains("open")) {
      closeMobileFilters();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      if (backdrop) backdrop.classList.add("hidden");
      document.body.style.overflow = "";
      panel?.classList.remove("filter-drawer-panel", "open");
    }
  });
});
