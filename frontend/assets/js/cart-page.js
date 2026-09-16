/**
 * ============================================================
 * AL-QUDS PHARMACY — CART PAGE CONTROLLER
 * Dynamic cart calculation, coupon support, and empty states
 * ============================================================
 */

const SHIPPING_BASE = 25;
let appliedDiscount = 0;
let appliedCode = "";

function renderCart() {
  if (typeof PRODUCTS === "undefined") return;

  const rawItems = Cart.read();
  const items = rawItems.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    return p ? { ...item, product: p } : null;
  }).filter(Boolean);

  const hasItems = items.length > 0;
  const withItemsEl = document.getElementById("cart-with-items");
  const emptyEl = document.getElementById("cart-empty");

  if (withItemsEl) withItemsEl.classList.toggle("hidden", !hasItems);
  if (emptyEl) emptyEl.classList.toggle("hidden", hasItems);

  if (!hasItems) return;

  const itemsContainer = document.getElementById("cart-items");
  if (itemsContainer) {
    itemsContainer.innerHTML = items.map(({ product, qty }) => `
      <div class="card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-[var(--blue-400)]">
        <!-- Thumbnail -->
        <a href="product.html?slug=${product.slug}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--paper)] border border-[var(--line)] p-2 shrink-0 flex items-center justify-center overflow-hidden">
          <img src="${product.img || FALLBACK_PRODUCT_IMG}" onerror="this.onerror=null;this.src='${FALLBACK_PRODUCT_IMG}';" alt="${product.name}" class="w-full h-full object-contain">
        </a>

        <!-- Info Column -->
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span class="text-xs font-bold text-[var(--slate-400)] uppercase font-display">${product.brand}</span>
            ${product.prescriptionRequired ? '<span class="badge badge-navy text-[10px]">روشتة مطلوبة</span>' : ''}
          </div>
          
          <a href="product.html?slug=${product.slug}" class="font-display font-bold text-sm sm:text-base text-[var(--navy-900)] hover:text-[var(--blue-600)] block truncate mb-1">
            ${product.name}
          </a>

          <div class="text-xs text-[var(--slate-500)] mb-3">
            سعر الوحدة: <strong class="text-[var(--navy-900)]">${EGP.format(product.price)}</strong>
          </div>

          <!-- Quantity Stepper & Remove Action -->
          <div class="flex items-center gap-4">
            <div class="qty-stepper">
              <button type="button" data-qty-minus="${product.id}" aria-label="إنقاص الكمية">−</button>
              <input type="number" value="${qty}" readonly>
              <button type="button" data-qty-plus="${product.id}" aria-label="زيادة الكمية">+</button>
            </div>

            <button type="button" data-remove="${product.id}" class="text-xs font-bold text-[var(--red-600)] hover:underline flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              حذف
            </button>
          </div>
        </div>

        <!-- Line Total -->
        <div class="sm:text-left shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
          <span class="text-xs text-[var(--slate-400)] sm:hidden">الإجمالي:</span>
          <span class="font-display font-black text-lg sm:text-xl text-[var(--navy-900)]">
            ${EGP.format(product.price * qty)}
          </span>
        </div>
      </div>
    `).join("");
  }

  // Calculate Totals
  const subtotal = items.reduce((sum, { product, qty }) => sum + (product.price * qty), 0);
  const shipping = subtotal >= 500 ? 0 : SHIPPING_BASE;
  const total = Math.max(0, subtotal + shipping - appliedDiscount);

  // Update Summary DOM
  const subtotalEl = document.getElementById("sum-subtotal");
  const shippingEl = document.getElementById("sum-shipping");
  const totalEl = document.getElementById("sum-total");
  const discountRow = document.getElementById("sum-discount-row");
  const discountEl = document.getElementById("sum-discount");

  if (subtotalEl) subtotalEl.textContent = EGP.format(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "مجاني (طلب أكثر من 500 ج.م)" : EGP.format(shipping);
  if (totalEl) totalEl.textContent = EGP.format(total);

  if (discountRow) {
    if (appliedDiscount > 0) {
      discountRow.classList.remove("hidden");
      if (discountEl) discountEl.textContent = `- ${EGP.format(appliedDiscount)}`;
    } else {
      discountRow.classList.add("hidden");
    }
  }

  // Bind Buttons
  document.querySelectorAll("[data-qty-plus]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-qty-plus");
      const current = Cart.read().find(i => i.id === id);
      if (current) {
        Cart.setQty(id, current.qty + 1);
        renderCart();
      }
    };
  });

  document.querySelectorAll("[data-qty-minus]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-qty-minus");
      const current = Cart.read().find(i => i.id === id);
      if (current) {
        if (current.qty > 1) {
          Cart.setQty(id, current.qty - 1);
        } else {
          Cart.remove(id);
          toast("تم حذف المنتج من السلة");
        }
        renderCart();
      }
    };
  });

  document.querySelectorAll("[data-remove]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-remove");
      Cart.remove(id);
      toast("تمت إزالة المنتج من سلة المشتريات");
      renderCart();
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Coupon Logic
  const applyCouponBtn = document.getElementById("apply-coupon");
  const couponInput = document.getElementById("coupon");

  applyCouponBtn?.addEventListener("click", () => {
    const code = (couponInput.value || "").trim().toUpperCase();
    if (!code) {
      toast("الرجاء إدخال كود الكوبون أولاً", "warning");
      return;
    }

    const subtotal = Cart.subtotal();
    if (code === "ALQUDS10") {
      appliedDiscount = Math.round(subtotal * 0.10);
      appliedCode = code;
      toast("تهانينا! تم تطبيق خصم 10% بنجاح");
    } else if (code === "WELCOME10") {
      appliedDiscount = 20;
      appliedCode = code;
      toast("تم تطبيق خصم الترحيب (20 ج.م)");
    } else {
      appliedDiscount = 0;
      appliedCode = "";
      toast("عذراً، كود الكوبون غير صالح أو منتهي الصلاحية", "warning");
    }
    renderCart();
  });
});
