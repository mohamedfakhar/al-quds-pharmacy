/**
 * AL-QUDS PHARMACY - Account Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccountTabs();
  renderAccountOrders();
  renderAccountPrescriptions();
  initProfileForm();
});

// Switch tabs
function initAccountTabs() {
  const tabBtns = document.querySelectorAll('[data-account-tab]');
  const panels = document.querySelectorAll('[data-tab-panel]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.accountTab;

      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-[var(--blue-50)]', 'text-[var(--blue-600)]', 'border-[var(--blue-600)]');
        b.classList.add('text-[var(--slate-600)]');
      });

      btn.classList.add('active', 'bg-[var(--blue-50)]', 'text-[var(--blue-600)]', 'border-[var(--blue-600)]');
      btn.classList.remove('text-[var(--slate-600)]');

      panels.forEach(p => {
        if (p.id === `tab-${target}`) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });

  // Check URL hash for direct tab navigation (e.g. account.html#orders)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const targetBtn = document.querySelector(`[data-account-tab="${hash}"]`);
    if (targetBtn) targetBtn.click();
  }
}

// Render Orders from localStorage or realistic demo data
function renderAccountOrders() {
  const container = document.getElementById('orders-list');
  if (!container) return;

  const savedOrders = JSON.parse(localStorage.getItem('alquds_demo_orders') || '[]');
  
  // Default realistic demo orders if none in localStorage yet
  const defaultOrders = [
    {
      orderId: 'ORD-89412',
      date: '05 سبتمبر 2026',
      status: 'delivered',
      statusLabel: 'تم التوصيل بنجاح',
      statusColor: 'badge-mint',
      total: 440,
      paymentMethod: 'الدفع عند الاستلام (كاش)',
      items: [
        { name: 'بانادول إكسترا 500 ملجم - 24 قرص', brand: 'بانادول', qty: 2, price: 45, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80' },
        { name: 'غسول رغوي للبشرة العادية إلى الدهنية 473 مل', brand: 'سيرافيه', qty: 1, price: 350, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80' }
      ]
    },
    {
      orderId: 'ORD-76103',
      date: '28 أغسطس 2026',
      status: 'delivered',
      statusLabel: 'تم التوصيل بنجاح',
      statusColor: 'badge-mint',
      total: 620,
      paymentMethod: 'بطاقة فيزا الائتمانية',
      items: [
        { name: 'سنتروم لوتين مكمل غذائي وفيتامينات شاملة 100 قرص', brand: 'سنتروم', qty: 1, price: 520, img: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=300&auto=format&fit=crop&q=80' },
        { name: 'معجون أسنان سنسوداين للأسنان الحساسة 75 مل', brand: 'سنسوداين', qty: 1, price: 85, img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&auto=format&fit=crop&q=80' }
      ]
    }
  ];

  const allOrders = [...savedOrders, ...defaultOrders];

  if (allOrders.length === 0) {
    container.innerHTML = `
      <div class="card p-12 text-center text-[var(--slate-500)]">
        <svg class="w-12 h-12 mx-auto mb-3 text-[var(--slate-400)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p class="font-bold text-base text-[var(--navy-900)]">لا توجد طلبات سابقة حتى الآن</p>
        <p class="text-xs mt-1">ابدأ رحلتك الدوائية وتسوق من آلاف المنتجات الموثوقة.</p>
        <a href="shop.html" class="btn btn-primary btn-sm mt-4">تسوق الآن</a>
      </div>
    `;
    return;
  }

  container.innerHTML = allOrders.map(order => `
    <article class="card p-5 sm:p-6 mb-4 hover:border-[var(--blue-400)] transition-all">
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[var(--blue-50)] text-[var(--blue-600)] flex items-center justify-center font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-extrabold text-sm sm:text-base text-[var(--navy-900)]">${order.orderId}</span>
              <span class="badge ${order.statusColor || 'badge-blue'} text-[11px]">${order.statusLabel || 'تم الاستلام بنجاح'}</span>
            </div>
            <p class="text-xs text-[var(--slate-500)] mt-0.5">بتاريخ: ${order.date} · الدفع: ${order.paymentMethod || 'كاش عند الاستلام'}</p>
          </div>
        </div>

        <div class="text-left sm:text-right">
          <span class="text-xs text-[var(--slate-500)] block">إجمالي الطلب</span>
          <span class="font-display font-black text-base sm:text-lg text-[var(--navy-900)]">${order.total} <span class="text-xs font-normal text-[var(--slate-500)]">ج.م</span></span>
        </div>
      </div>

      <div class="py-4 space-y-3">
        ${(order.items || []).map(it => `
          <div class="flex items-center gap-3">
            <img src="${it.img || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80'}" 
              alt="${it.name}" class="w-12 h-12 rounded-lg object-cover border border-[var(--line)] bg-white shrink-0"
              onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80';">
            <div class="min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-bold text-[var(--navy-900)] truncate">${it.name}</p>
              <p class="text-xs text-[var(--slate-500)]">${it.brand || 'منتج طبي'} · الكمية: ${it.qty || 1} × ${it.price} ج.م</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pt-3 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-1.5 text-[var(--slate-600)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          تم الفحص والاعتماد الدوائي من صيدلية القدس
        </div>
        <div class="flex items-center gap-2">
          <button onclick="toast('جاري تحميل الفاتورة الضريبية للطلب ${order.orderId}...')" class="btn btn-outline btn-xs">
            تحميل الفاتورة
          </button>
          <button onclick="toast('تمت إضافة منتجات الطلب ${order.orderId} إلى سلتك مرة أخرى!')" class="btn btn-primary btn-xs">
            إعادة الطلب
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Render Prescriptions History
function renderAccountPrescriptions() {
  const container = document.getElementById('prescriptions-list');
  if (!container) return;

  const defaultPrescriptions = [
    {
      id: 'RX-4912',
      date: '02 سبتمبر 2026',
      patientName: 'محمد فخر الدين',
      status: 'approved',
      statusText: 'تمت المراجعة والتجهيز',
      statusColor: 'badge-mint',
      doctorNotes: 'روشتة باطنة وجهاز هضمي، تم صرف العلاج الأصلي مع التعليمات.',
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'RX-3108',
      date: '14 أغسطس 2026',
      patientName: 'سارة فخر الدين',
      status: 'completed',
      statusText: 'مكتملة ومستلمة',
      statusColor: 'badge-blue',
      doctorNotes: 'روشتة جلدية، مستحضرات ترطيب وواقي شمس.',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80'
    }
  ];

  container.innerHTML = defaultPrescriptions.map(rx => `
    <div class="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 rounded-xl bg-[var(--mint-50)] text-[var(--mint-700)] flex items-center justify-center shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="font-display font-extrabold text-sm text-[var(--navy-900)]">رقم الروشتة: ${rx.id}</span>
            <span class="badge ${rx.statusColor} text-[11px]">${rx.statusText}</span>
          </div>
          <p class="text-xs text-[var(--slate-500)]">المريض: <strong>${rx.patientName}</strong> · تاريخ الرفع: ${rx.date}</p>
          <p class="text-xs text-[var(--slate-600)] mt-1.5 bg-[var(--paper)] px-3 py-1.5 rounded-lg border border-[var(--line)]">
            ملاحظة الصيدلي: ${rx.doctorNotes}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
        <a href="prescription-upload.html" class="btn btn-outline btn-xs">رفع روشتة جديدة</a>
        <button onclick="toast('تم إرسال طلب استشارة دوائية لمتابعة الروشتة ${rx.id}')" class="btn btn-mint btn-xs">استشارة الصيدلي</button>
      </div>
    </div>
  `).join('');
}

// Profile Save Form
function initProfileForm() {
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      toast('تم حفظ وتحديث بيانات حسابك بنجاح!');
    });
  }

  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      toast('تم تغيير كلمة المرور بنجاح!');
      passwordForm.reset();
    });
  }
}
