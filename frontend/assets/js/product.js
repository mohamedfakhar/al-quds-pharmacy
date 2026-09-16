/**
 * ============================================================
 * AL-QUDS PHARMACY — PRODUCT DETAILS CONTROLLER
 * Gallery switching, Tabs, Stepper, and Cart/Wishlist integration
 * ============================================================
 */

const slug = new URLSearchParams(location.search).get("slug");
const product = (typeof PRODUCTS !== "undefined")
  ? (PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0])
  : null;

if (product) {
  const category = (typeof CATEGORIES !== "undefined")
    ? CATEGORIES.find(c => c.id === product.category)
    : null;

  // Page Titles & Meta
  document.title = `${product.name} | صيدلية القدس`;
  const titleEl = document.getElementById("page-title");
  if (titleEl) titleEl.textContent = document.title;
  
  const descEl = document.getElementById("page-description");
  if (descEl) descEl.setAttribute("content", product.short);

  // Breadcrumbs
  const breadcrumbEl = document.getElementById("breadcrumb");
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <a href="index.html" class="hover:text-[var(--blue-600)]">الرئيسية</a>
      <span>/</span>
      <a href="shop.html?category=${category?.id || ''}" class="hover:text-[var(--blue-600)]">${category?.name || 'المتجر'}</a>
      <span>/</span>
      <span class="text-[var(--navy-900)] font-bold">${product.name}</span>
    `;
  }

  const discount = product.compareAt > product.price ? Math.round(100 - (product.price / product.compareAt * 100)) : 0;
  const isFav = Wishlist.has(product.id);
  const galleryImages = (product.images && product.images.length) ? product.images : [product.img];

  // Render Main Product Area
  const root = document.getElementById("product-root");
  if (root) {
    root.innerHTML = `
      <!-- Gallery Column (5 cols on lg) -->
      <div class="lg:col-span-5 flex flex-col gap-4">
        <!-- Main Image -->
        <div class="relative bg-white rounded-3xl border border-[var(--line)] aspect-square flex items-center justify-center p-6 overflow-hidden shadow-xs">
          <img id="main-product-img" src="${galleryImages[0]}" alt="${product.name}" class="max-w-full max-h-full object-contain transition-all duration-300">
          
          <div class="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
            ${discount > 0 ? `<span class="badge badge-amber text-xs">خصم ${discount}%</span>` : ''}
            ${product.prescriptionRequired ? `<span class="badge badge-navy text-xs">تتطلب روشتة طبية</span>` : ''}
          </div>

          <button type="button" class="product-card__wishlist-btn !top-4 !left-4 !w-10 !h-10 ${isFav ? 'active' : ''}" data-wishlist-toggle="${product.id}" aria-label="إضافة للمفضلة">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? '#DC2626' : 'none'}" stroke="${isFav ? '#DC2626' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
        </div>

        <!-- Thumbnails -->
        ${galleryImages.length > 1 ? `
          <div class="grid grid-cols-4 gap-3">
            ${galleryImages.map((img, idx) => `
              <button type="button" class="thumb-btn aspect-square rounded-xl bg-white border ${idx === 0 ? 'border-[var(--blue-600)] ring-2 ring-[var(--blue-100)]' : 'border-[var(--line)]'} p-2 flex items-center justify-center overflow-hidden transition-all hover:border-[var(--blue-500)]" data-img-src="${img}">
                <img src="${img}" alt="${product.name} thumbnail ${idx + 1}" class="w-full h-full object-contain">
              </button>
            `).join("")}
          </div>
        ` : ''}

        <!-- Trust Badges Under Image -->
        <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--line)] text-center text-xs text-[var(--slate-500)] font-display">
          <div class="flex flex-col items-center gap-1">
            <span class="text-base">🚚</span>
            <span>توصيل 60 دقيقة</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-base">🔒</span>
            <span>دفع آمن ومشفر</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <span class="text-base">✅</span>
            <span>ضمان أصالة 100%</span>
          </div>
        </div>
      </div>

      <!-- Information & Actions Column (7 cols on lg) -->
      <div class="lg:col-span-7 flex flex-col">
        <div class="mb-4">
          <span class="text-xs font-bold text-[var(--slate-400)] uppercase tracking-wider block mb-1">${product.brand}</span>
          <h1 class="font-display text-2xl sm:text-3xl font-extrabold text-[var(--navy-900)] leading-tight mb-3">
            ${product.name}
          </h1>

          <div class="flex items-center gap-3 text-xs text-[var(--slate-500)]">
            <div class="flex items-center text-[var(--amber-600)] font-bold text-sm">
              <span>★ ★ ★ ★ ★</span>
              <span class="mr-1.5 text-[var(--navy-900)]">${product.rating}</span>
            </div>
            <span>·</span>
            <span>${product.reviewsCount} تقييم عملاء موثق</span>
            <span>·</span>
            <span class="${product.stock > 0 ? 'text-[var(--mint-700)] font-bold' : 'text-[var(--red-600)] font-bold'}">
              ${product.stock > 0 ? `متوفر في المخزن (${product.stock} علبة)` : 'نفدت الكمية مؤقتاً'}
            </span>
          </div>
        </div>

        <!-- Price Display -->
        <div class="card p-5 bg-[var(--blue-50)]/50 border-[var(--blue-100)] rounded-2xl mb-6 flex flex-wrap items-baseline gap-4">
          <span class="font-display font-black text-3xl sm:text-4xl text-[var(--navy-900)]">
            ${EGP.format(product.price)}
          </span>
          ${discount > 0 ? `
            <span class="text-base text-[var(--slate-400)] line-through font-display">
              ${EGP.format(product.compareAt)}
            </span>
            <span class="badge badge-amber text-xs font-bold font-display">
              وفرت ${EGP.format(product.compareAt - product.price)} (${discount}%)
            </span>
          ` : ''}
        </div>

        <!-- Prescription Warning Banner -->
        ${product.prescriptionRequired ? `
          <div class="card p-4 mb-6 bg-[var(--amber-50)] border-[var(--amber-100)] rounded-2xl flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-[var(--amber-100)] text-[var(--amber-600)] flex items-center justify-center shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="text-xs leading-relaxed">
              <p class="font-display font-bold text-sm text-[var(--amber-600)] mb-0.5">
                تنبيه: هذا الدواء يصرف حصرياً بروشتة طبية معتمدة
              </p>
              <p class="text-[var(--slate-600)]">
                يرجى تجهيز صورة الروشتة لرفعها أثناء إتمام الطلب أو من خلال صفحة 
                <a href="prescription-upload.html" class="text-[var(--blue-600)] font-bold underline">رفع الروشتة</a> 
                ليقوم الصيدلي بالتحقق منها ومراجعة الجرعات.
              </p>
            </div>
          </div>
        ` : ''}

        <!-- Short Description -->
        <p class="text-sm text-[var(--slate-600)] leading-relaxed mb-6">
          ${product.short}
        </p>

        <!-- Actions & Quantity -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <!-- Quantity Stepper -->
          <div class="qty-stepper self-start sm:self-auto">
            <button type="button" id="qty-minus" aria-label="إنقاص الكمية">−</button>
            <input type="number" id="product-qty" value="1" min="1" max="${product.stock || 99}" readonly>
            <button type="button" id="qty-plus" aria-label="زيادة الكمية">+</button>
          </div>

          <!-- Add to Cart Button -->
          <button type="button" id="btn-add-main" class="btn btn-primary flex-1 !min-h-[48px] text-base" ${product.stock === 0 ? 'disabled' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            أضف إلى السلة
          </button>

          <!-- Buy Now Button -->
          <button type="button" id="btn-buy-now" class="btn btn-mint flex-1 !min-h-[48px] text-base" ${product.stock === 0 ? 'disabled' : ''}>
            شراء فوري الآن
          </button>
        </div>

        <!-- Free Consultation Hotline Banner -->
        <div class="mt-auto pt-6 border-t border-[var(--line)] flex items-center justify-between gap-4 text-xs text-[var(--slate-500)] font-display">
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[var(--mint-600)]"></span>
            استشارة صيدلانية مجانية متوفرة لهذا المنتج
          </span>
          <a href="tel:16000" class="font-bold text-[var(--navy-900)] hover:text-[var(--blue-600)]">اتصل بـ 16000</a>
        </div>
      </div>
    `;

    // Populate Tab Content
    document.getElementById("tab-desc-content").innerHTML = `
      <p class="mb-4">${product.description || product.short}</p>
      <div class="grid sm:grid-cols-2 gap-4 mt-6">
        <div class="card p-4 bg-[var(--paper)]">
          <strong class="block font-display text-[var(--navy-900)] text-xs mb-1">الشركة المصنعة / العلامة:</strong>
          <span>${product.brand}</span>
        </div>
        <div class="card p-4 bg-[var(--paper)]">
          <strong class="block font-display text-[var(--navy-900)] text-xs mb-1">شكل الجرعة:</strong>
          <span>أقراص / عبوة أصلية محكمة</span>
        </div>
      </div>
    `;

    document.getElementById("tab-ing-content").innerHTML = `
      <p class="mb-3 font-bold text-[var(--navy-900)]">المواد الفعالة والتركيز:</p>
      <p>${product.ingredients || 'تحتوي التركيبة على مواد طبية معتمدة مطابقة لدستور الأدوية المصري.'}</p>
    `;

    document.getElementById("tab-use-content").innerHTML = `
      <p class="mb-3 font-bold text-[var(--navy-900)]">تعليمات الاستخدام والجرعات:</p>
      <p>${product.usage || 'تناول الجرعة بدقة حسب وصفة الطبيب المعالج أو إرشادات النشرة الداخلية المرفقة.'}</p>
    `;

    document.getElementById("tab-warn-content").innerHTML = `
      <div class="p-4 rounded-xl bg-[var(--red-100)]/40 border border-[var(--red-100)] text-[var(--red-600)] mb-3">
        <strong class="block font-bold mb-1">تنبيهات هامة:</strong>
        <p class="text-xs text-[var(--slate-700)]">${product.warnings || 'يحفظ بعيداً عن متناول الأطفال وفي درجة حرارة أقل من 30 مئوية بعيداً عن الرطوبة.'}</p>
      </div>
    `;

    // Bind Gallery Thumbnails
    document.querySelectorAll(".thumb-btn").forEach(btn => {
      btn.onclick = () => {
        const src = btn.getAttribute("data-img-src");
        document.getElementById("main-product-img").src = src;
        document.querySelectorAll(".thumb-btn").forEach(b => {
          b.classList.remove("border-[var(--blue-600)]", "ring-2", "ring-[var(--blue-100)]");
          b.classList.add("border-[var(--line)]");
        });
        btn.classList.add("border-[var(--blue-600)]", "ring-2", "ring-[var(--blue-100)]");
      };
    });

    // Quantity Stepper Logic
    const qtyInput = document.getElementById("product-qty");
    document.getElementById("qty-minus")?.addEventListener("click", () => {
      qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
    });
    document.getElementById("qty-plus")?.addEventListener("click", () => {
      qtyInput.value = Math.min(product.stock || 99, Number(qtyInput.value) + 1);
    });

    // Add to Cart Main Button
    document.getElementById("btn-add-main")?.addEventListener("click", () => {
      const q = Number(qtyInput.value);
      Cart.add(product.id, q);
      toast(`تمت إضافة (${q}) من "${product.name}" إلى السلة`);
    });

    // Buy Now Button
    document.getElementById("btn-buy-now")?.addEventListener("click", () => {
      const q = Number(qtyInput.value);
      Cart.add(product.id, q);
      location.href = "checkout.html";
    });

    // Mobile Sticky Purchase Bar
    const stickyBar = document.createElement("div");
    stickyBar.id = "sticky-purchase-bar";
    stickyBar.className = "sticky-purchase-bar";
    stickyBar.setAttribute("aria-label", "شريط الشراء السريع");
    stickyBar.innerHTML = `
      <div class="flex flex-col min-w-0 flex-1">
        <span class="text-xs text-[var(--slate-500)] truncate font-semibold">${product.name}</span>
        <span class="font-display font-extrabold text-base text-[var(--navy-900)]">${EGP.format(product.price)}</span>
      </div>
      <button type="button" id="btn-sticky-add" class="btn btn-primary !h-11 px-5 text-sm shrink-0 font-bold" ${product.stock === 0 ? 'disabled' : ''}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <span>أضف للسلة</span>
      </button>
    `;
    document.body.appendChild(stickyBar);

    document.getElementById("btn-sticky-add")?.addEventListener("click", () => {
      const q = Number(qtyInput ? qtyInput.value : 1);
      Cart.add(product.id, q);
      toast(`تمت إضافة (${q}) من "${product.name}" إلى السلة`);
    });

    const mainBtn = document.getElementById("btn-add-main");
    if (mainBtn && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            stickyBar.classList.add("visible");
          } else {
            stickyBar.classList.remove("visible");
          }
        });
      }, { threshold: 0 });
      observer.observe(mainBtn);
    }
  }

  // Render Related Products
  const relatedGrid = document.getElementById("related-grid");
  if (relatedGrid && typeof PRODUCTS !== "undefined") {
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    const displayRelated = related.length ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = displayRelated.map(productCardHTML).join("");
    bindGlobalEvents(relatedGrid);
  }
}

// Tabs Logic
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tab-target]").forEach(tabBtn => {
    tabBtn.onclick = () => {
      const targetId = tabBtn.getAttribute("data-tab-target");
      
      // Update Tab Buttons
      document.querySelectorAll("[data-tab-target]").forEach(b => b.classList.remove("active"));
      tabBtn.classList.add("active");

      // Update Tab Contents
      document.querySelectorAll(".tab-content").forEach(content => content.classList.add("hidden"));
      document.getElementById(targetId)?.classList.remove("hidden");
    };
  });
});
