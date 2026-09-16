/**
 * AL-QUDS PHARMACY - Wishlist Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  renderWishlistPage();

  window.addEventListener('wishlistUpdated', () => {
    renderWishlistPage();
  });
});

function renderWishlistPage() {
  const container = document.getElementById('wishlist-grid');
  const emptyState = document.getElementById('wishlist-empty');
  const countEl = document.getElementById('wishlist-count-text');
  const actionsEl = document.getElementById('wishlist-actions');

  if (!container || !emptyState) return;

  const wishlistIds = Wishlist.get();

  if (wishlistIds.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    if (actionsEl) actionsEl.classList.add('hidden');
    emptyState.classList.remove('hidden');
    if (countEl) countEl.textContent = 'لا توجد منتجات محفوظة';
    return;
  }

  emptyState.classList.add('hidden');
  container.classList.remove('hidden');
  if (actionsEl) actionsEl.classList.remove('hidden');
  if (countEl) countEl.textContent = `${wishlistIds.length} منتج محفوظ`;

  const products = wishlistIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = products.map(product => {
    const isDiscounted = product.oldPrice && product.oldPrice > product.price;
    const discountPercent = isDiscounted ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return `
      <article class="product-card flex flex-col justify-between" id="wishlist-item-${product.id}">
        <div>
          <div class="product-card-thumb relative">
            ${isDiscounted ? `<span class="badge badge-amber absolute top-2.5 right-2.5 z-10 text-[11px] font-bold">خصم ${discountPercent}%</span>` : ''}
            <button onclick="removeFromWishlistPage('${product.id}')" 
              class="absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full bg-white/90 shadow text-[var(--red-600)] hover:bg-[var(--red-50)] flex items-center justify-center transition-all"
              title="إزالة من المفضلة">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" loading="lazy"
                onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMG}';">
            </a>
          </div>

          <div class="product-card-body">
            <span class="product-card-brand">${product.brand}</span>
            <h3 class="product-card-title">
              <a href="product.html?id=${product.id}">${product.name}</a>
            </h3>

            <div class="flex items-center gap-1 my-1.5 text-xs text-[var(--slate-500)]">
              <span class="text-[var(--amber-500)] font-bold">★ ${product.rating}</span>
              <span>(${product.reviewsCount})</span>
              ${product.prescriptionRequired ? '<span class="badge badge-red mr-auto text-[9px]">روشتة مطلوبة</span>' : '<span class="text-[10px] text-[var(--mint-700)] mr-auto">متوفر</span>'}
            </div>

            <div class="product-card-pricing">
              <span class="product-card-price">${product.price} <small>ج.م</small></span>
              ${isDiscounted ? `<span class="product-card-old-price">${product.oldPrice} ج.م</span>` : ''}
            </div>
          </div>
        </div>

        <div class="p-4 pt-0 space-y-2">
          <button onclick="Cart.add('${product.id}', 1); toast('تمت إضافة ${product.name} إلى سلة المشتريات!');" 
            class="btn btn-primary w-full btn-sm !rounded-xl">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            أضف إلى السلة
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function removeFromWishlistPage(id) {
  Wishlist.remove(id);
  const card = document.getElementById(`wishlist-item-${id}`);
  if (card) {
    card.classList.add('opacity-50', 'scale-95');
    setTimeout(() => {
      renderWishlistPage();
      toast('تمت إزالة المنتج من المفضلة');
    }, 200);
  } else {
    renderWishlistPage();
  }
}

function moveAllWishlistToCart() {
  const ids = Wishlist.get();
  if (ids.length === 0) return;

  ids.forEach(id => {
    Cart.add(id, 1);
  });

  toast(`تم نقل جميع المنتجات (${ids.length}) إلى سلة المشتريات بنجاح!`);
}

function clearAllWishlist() {
  if (confirm('هل أنت متأكد من رغبتك في إفراغ قائمة المفضلة بالكامل؟')) {
    localStorage.removeItem('alquds_wishlist_items');
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast('تم إفراغ قائمة المفضلة.');
  }
}
