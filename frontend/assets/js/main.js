/**
 * ============================================================
 * AL-QUDS PHARMACY — MAIN SHARED CLIENT CONTROLLER
 * Handles Cart, Wishlist, Autocomplete, Drawer, and Cards
 * ============================================================
 */

const EGP = new Intl.NumberFormat("ar-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0
});

/* ---------------- TOAST NOTIFICATION ---------------- */
function toast(message, type = "success") {
  let region = document.getElementById("toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.appendChild(region);
  }

  const el = document.createElement("div");
  el.className = "toast";
  
  const icon = type === "success" 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14B89A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;

  el.innerHTML = `${icon} <span>${message}</span>`;
  region.appendChild(el);

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(8px) scale(0.95)";
    el.style.transition = "all 0.25s ease";
    setTimeout(() => el.remove(), 250);
  }, 2800);
}

/* ---------------- PERSISTENT CART ---------------- */
const Cart = {
  key: "alquds_cart_items",
  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      return [];
    }
  },
  write(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateBadge();
  },
  add(productId, qty = 1) {
    const items = this.read();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty: Math.max(1, qty) });
    }
    this.write(items);
  },
  remove(productId) {
    this.write(this.read().filter(i => i.id !== productId));
  },
  setQty(productId, qty) {
    const items = this.read();
    const it = items.find(i => i.id === productId);
    if (it) {
      it.qty = Math.max(1, qty);
      this.write(items);
    }
  },
  clear() {
    this.write([]);
  },
  count() {
    return this.read().reduce((n, i) => n + i.qty, 0);
  },
  subtotal() {
    if (typeof PRODUCTS === "undefined") return 0;
    return this.read().reduce((sum, item) => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },
  updateBadge() {
    const n = this.count();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? "inline-flex" : "none";
    });
  }
};

/* ---------------- PERSISTENT WISHLIST ---------------- */
const Wishlist = {
  key: "alquds_wishlist_items",
  read() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      return [];
    }
  },
  get() {
    return this.read();
  },
  write(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateBadge();
    this.syncButtons();
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: items }));
  },
  has(productId) {
    return this.read().includes(productId);
  },
  remove(productId) {
    const items = this.read().filter(id => id !== productId);
    this.write(items);
  },
  toggle(productId) {
    let items = this.read();
    const exists = items.includes(productId);
    if (exists) {
      items = items.filter(id => id !== productId);
    } else {
      items.push(productId);
    }
    this.write(items);
    return !exists;
  },
  count() {
    return this.read().length;
  },
  updateBadge() {
    const n = this.count();
    document.querySelectorAll("[data-wishlist-count]").forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? "inline-flex" : "none";
    });
  },
  syncButtons() {
    const items = this.read();
    document.querySelectorAll("[data-wishlist-toggle]").forEach(btn => {
      const id = btn.getAttribute("data-wishlist-toggle");
      const active = items.includes(id);
      btn.classList.toggle("active", active);
      const svg = btn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", active ? "#DC2626" : "none");
        svg.setAttribute("stroke", active ? "#DC2626" : "currentColor");
      }
    });
  }
};

/* ---------------- MOBILE DRAWER ---------------- */
function initDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  if (!drawer) return;
  
  const openBtns = document.querySelectorAll("[data-drawer-open]");
  const closeBtns = document.querySelectorAll("[data-drawer-close]");

  const open = () => {
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  
  const close = () => {
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtns.forEach(b => b.addEventListener("click", open));
  closeBtns.forEach(b => b.addEventListener("click", close));

  // Close when clicking any nav link inside drawer
  drawer.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", close);
  });
  
  drawer.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });
}

/* ---------------- SEARCH AUTOCOMPLETE ---------------- */
function initSearch(inputSelector, resultsSelector) {
  const inputs = document.querySelectorAll(inputSelector);
  if (!inputs.length) return;

  inputs.forEach(input => {
    const container = input.closest(".search-container") || input.parentElement;
    const results = container.querySelector(resultsSelector) || document.querySelector(resultsSelector);
    if (!results) return;

    let debounceTimer;
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = input.value.trim();
        if (!val) {
          results.classList.add("hidden");
          results.innerHTML = "";
          return;
        }

        const matches = typeof demoSearch === "function" ? demoSearch(val) : [];
        if (!matches.length) {
          results.innerHTML = `
            <div class="p-4 text-center text-sm text-[var(--slate-500)]">
              <span class="block text-2xl mb-1">🔍</span>
              لم نجد نتائج مطابقة لـ "<strong>${val}</strong>"
            </div>`;
        } else {
          results.innerHTML = `
            <div class="py-2">
              <div class="px-4 py-1.5 text-xs font-bold text-[var(--slate-400)]">المنتجات المقترحة</div>
              ${matches.map(p => `
                <a href="product.html?slug=${p.slug}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--blue-50)] transition-colors border-b border-[var(--line-soft)] last:border-0">
                  <img src="${p.img}" alt="${p.name}" class="w-10 h-10 object-contain rounded-md bg-white border border-[var(--line)] shrink-0">
                  <div class="flex-1 min-w-0">
                    <span class="block text-xs text-[var(--slate-500)] truncate">${p.brand}</span>
                    <span class="block text-sm font-bold text-[var(--navy-900)] truncate">${p.name}</span>
                  </div>
                  <span class="text-xs font-extrabold text-[var(--blue-600)] shrink-0 font-display">${EGP.format(p.price)}</span>
                </a>
              `).join("")}
              <a href="shop.html?q=${encodeURIComponent(val)}" class="block text-center py-2.5 text-xs font-bold text-[var(--blue-600)] hover:bg-[var(--blue-100)] transition-colors">
                عرض جميع النتائج ←
              </a>
            </div>`;
        }
        results.classList.remove("hidden");
      }, 200);
    });

    document.addEventListener("click", e => {
      if (!results.contains(e.target) && e.target !== input) {
        results.classList.add("hidden");
      }
    });
  });
}

const FALLBACK_PRODUCT_IMG = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";

/* ---------------- PRODUCT CARD GENERATOR ---------------- */
function productCardHTML(p) {
  const discount = p.compareAt > p.price ? Math.round(100 - (p.price / p.compareAt * 100)) : 0;
  const isFav = Wishlist.has(p.id);
  const imgSrc = p.img || FALLBACK_PRODUCT_IMG;

  return `
  <article class="product-card" id="card-${p.id}">
    <div class="product-card__thumb">
      <button type="button" class="product-card__wishlist-btn ${isFav ? 'active' : ''}" data-wishlist-toggle="${p.id}" aria-label="إضافة ${p.name} للمفضلة">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#DC2626' : 'none'}" stroke="${isFav ? '#DC2626' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      </button>

      <a href="product.html?slug=${p.slug}" class="w-full h-full flex items-center justify-center">
        <img src="${imgSrc}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMG}';" alt="${p.name}" loading="lazy" width="220" height="220">
      </a>

      <div class="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end pointer-events-none">
        ${discount > 0 ? `<span class="badge badge-amber">خصم ${discount}%</span>` : ''}
        ${p.prescriptionRequired ? `<span class="badge badge-navy">روشتة مطلوبة</span>` : ''}
      </div>
    </div>

    <div class="product-card__body">
      <span class="product-card__brand">${p.brand}</span>
      <a href="product.html?slug=${p.slug}" class="product-card__title" title="${p.name}">
        ${p.name}
      </a>

      <div class="product-card__rating">
        <span class="product-card__rating-stars">★ ★ ★ ★ ★</span>
        <span class="font-bold text-[var(--slate-700)]">${p.rating}</span>
        <span class="product-card__reviews-count">(${p.reviewsCount})</span>
      </div>

      <div class="product-card__footer">
        <div class="product-card__price-group">
          <span class="product-card__price">${EGP.format(p.price)}</span>
          ${discount > 0 ? `<span class="product-card__compare">${EGP.format(p.compareAt)}</span>` : ''}
        </div>

        <button type="button" class="product-card__add-btn" data-add-to-cart="${p.id}" aria-label="أضف ${p.name} إلى السلة">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------------- EVENT BINDINGS ---------------- */
function bindGlobalEvents(root = document) {
  // Add to Cart buttons
  root.querySelectorAll("[data-add-to-cart]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-add-to-cart");
      const p = (typeof PRODUCTS !== "undefined") ? PRODUCTS.find(prod => prod.id === id) : null;
      Cart.add(id, 1);
      
      // Visual feedback on button
      btn.style.transform = "scale(1.2)";
      btn.style.backgroundColor = "var(--mint-600)";
      btn.style.color = "#ffffff";
      setTimeout(() => {
        btn.style.transform = "";
        btn.style.backgroundColor = "";
        btn.style.color = "";
      }, 350);

      toast(p ? `تمت إضافة "${p.name}" إلى السلة` : "تمت إضافة المنتج إلى السلة");
    };
  });

  // Wishlist toggle buttons
  root.querySelectorAll("[data-wishlist-toggle]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-wishlist-toggle");
      const isAdded = Wishlist.toggle(id);
      const p = (typeof PRODUCTS !== "undefined") ? PRODUCTS.find(prod => prod.id === id) : null;
      
      toast(isAdded ? `تمت إضافة "${p?.name || 'المنتج'}" للمفضلة` : `تمت إزالة "${p?.name || 'المنتج'}" من المفضلة`);
    };
  });
}

/* ---------------- DOM INITIALIZER ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initDrawer();
  Cart.updateBadge();
  Wishlist.updateBadge();
  Wishlist.syncButtons();
  bindGlobalEvents();
  initSearch("[data-search-input]", "[data-search-results]");

  // Update dynamic year in footer
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
