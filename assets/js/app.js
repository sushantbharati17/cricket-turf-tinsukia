/**
 * Cricket Turf Tinsukia - Interactive Application Logic
 * Location: Makum Road, Tinsukia, Assam
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.TURF_CONFIG || {};

  // State Management for Interactive Slot Calculator
  const bookingState = {
    pitchId: 'pitch-1',
    date: getTodayDateString(),
    slotIndex: 2, // Default to Prime Floodlight (04:00 PM - 10:00 PM)
    duration: 2,  // Default 2 hours
    selectedAddons: []
  };

  /* ==========================================================================
     1. INITIALIZATION & DATA HYDRATION
     ========================================================================== */
  initHeaderScroll();
  initMobileMenu();
  initGallery();
  initFAQ();
  initCalculator();
  initContactForm();
  initModalHandlers();

  // Helper for today's date in YYYY-MM-DD
  function getTodayDateString(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  /* ==========================================================================
     2. STICKY HEADER & SCROLL BEHAVIOR
     ========================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     3. MOBILE MENU & DRAWER
     ========================================================================== */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!toggleBtn || !drawer) return;

    function toggleMenu() {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    toggleBtn.addEventListener('click', toggleMenu);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (drawer.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close on outside tap
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  /* ==========================================================================
     4. INTERACTIVE SLOT BOOKING CALCULATOR
     ========================================================================== */
  function initCalculator() {
    const dateInput = document.getElementById('calc-date');
    const durationSelect = document.getElementById('calc-duration');
    const pitchCards = document.querySelectorAll('.pitch-choice-card');
    const slotPills = document.querySelectorAll('.slot-pill-btn');
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const whatsappBtn = document.getElementById('calc-whatsapp-btn');
    const reserveModalBtn = document.getElementById('calc-reserve-btn');

    if (dateInput) {
      dateInput.min = getTodayDateString(0);
      dateInput.value = bookingState.date;
      dateInput.addEventListener('change', (e) => {
        bookingState.date = e.target.value;
        updateCalculatorSummary();
      });
    }

    if (durationSelect) {
      durationSelect.value = bookingState.duration;
      durationSelect.addEventListener('change', (e) => {
        bookingState.duration = parseInt(e.target.value, 10);
        updateCalculatorSummary();
      });
    }

    // Pitch selection radio cards
    pitchCards.forEach(card => {
      card.addEventListener('click', () => {
        pitchCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingState.pitchId = card.getAttribute('data-pitch-id');
        updateCalculatorSummary();
      });
    });

    // Time slot selection pills
    slotPills.forEach(pill => {
      pill.addEventListener('click', () => {
        slotPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        bookingState.slotIndex = parseInt(pill.getAttribute('data-slot-idx'), 10);
        updateCalculatorSummary();
      });
    });

    // Addons checkboxes
    addonCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const addonId = cb.getAttribute('data-addon-id');
        if (cb.checked) {
          bookingState.selectedAddons.push(addonId);
        } else {
          bookingState.selectedAddons = bookingState.selectedAddons.filter(id => id !== addonId);
        }
        updateCalculatorSummary();
      });
    });

    // WhatsApp Direct Deep Link Button
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = generateWhatsAppMessage();
        const rawPhone = config.business?.contact?.whatsappRaw || '919876543210';
        const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    // Open Reserve Modal
    if (reserveModalBtn) {
      reserveModalBtn.addEventListener('click', () => {
        openBookingModal();
      });
    }

    // Initial calculation update
    updateCalculatorSummary();
  }

  function calculateTotals() {
    const pitch = (config.pitches || []).find(p => p.id === bookingState.pitchId) || {
      name: "Pitch 1: Grand Box Cricket Arena",
      dayRate: 800,
      nightRate: 1200
    };

    const slots = config.pricingSlots || [
      { time: "06:00 AM – 11:00 AM", rate: 800, type: "Morning Dew" },
      { time: "11:00 AM – 04:00 PM", rate: 700, type: "Afternoon Saver" },
      { time: "04:00 PM – 10:00 PM", rate: 1200, type: "Prime Floodlight" },
      { time: "10:00 PM – 01:00 AM", rate: 1000, type: "Midnight League" }
    ];

    const currentSlot = slots[bookingState.slotIndex] || slots[2];

    // Determine hourly rate based on pitch and slot time
    let hourlyRate = currentSlot.rate;
    if (pitch.id === 'pitch-2' && hourlyRate >= 1200) {
      hourlyRate = 1000;
    }

    const pitchTotal = hourlyRate * bookingState.duration;

    // Calculate add-ons
    let addonsTotal = 0;
    const activeAddons = [];
    (config.addOns || []).forEach(addon => {
      if (bookingState.selectedAddons.includes(addon.id)) {
        addonsTotal += addon.price;
        activeAddons.push(addon);
      }
    });

    const grandTotal = pitchTotal + addonsTotal;
    const advanceAmount = Math.round(grandTotal * 0.20); // 20% advance

    return {
      pitch,
      currentSlot,
      hourlyRate,
      duration: bookingState.duration,
      pitchTotal,
      activeAddons,
      addonsTotal,
      grandTotal,
      advanceAmount,
      dateFormatted: formatDateDisplay(bookingState.date)
    };
  }

  function updateCalculatorSummary() {
    const data = calculateTotals();

    // DOM Elements
    const summaryPitch = document.getElementById('summary-pitch-name');
    const summaryDate = document.getElementById('summary-date');
    const summarySlot = document.getElementById('summary-slot');
    const summaryDuration = document.getElementById('summary-duration');
    const summaryRate = document.getElementById('summary-rate');
    const summaryAddons = document.getElementById('summary-addons');
    const summaryTotal = document.getElementById('summary-total-amount');
    const summaryAdvance = document.getElementById('summary-advance-amount');

    if (summaryPitch) summaryPitch.textContent = data.pitch.name.split(':')[0] || 'Pitch 1';
    if (summaryDate) summaryDate.textContent = data.dateFormatted;
    if (summarySlot) summarySlot.textContent = data.currentSlot.time;
    if (summaryDuration) summaryDuration.textContent = `${data.duration} Hour${data.duration > 1 ? 's' : ''}`;
    if (summaryRate) summaryRate.textContent = `₹${data.hourlyRate}/hr`;
    if (summaryAddons) {
      summaryAddons.textContent = data.addonsTotal > 0 ? `+ ₹${data.addonsTotal} (${data.activeAddons.length} item)` : 'None';
    }
    if (summaryTotal) summaryTotal.textContent = `₹${data.grandTotal.toLocaleString('en-IN')}`;
    if (summaryAdvance) summaryAdvance.textContent = `₹${data.advanceAmount.toLocaleString('en-IN')}`;
  }

  function formatDateDisplay(dateStr) {
    if (!dateStr) return 'Today';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function generateWhatsAppMessage() {
    const data = calculateTotals();
    const addonsListText = data.activeAddons.length > 0
      ? data.activeAddons.map(a => `• ${a.name} (₹${a.price})`).join('\n')
      : 'None';

    return `🏏 *CRICKET TURF BOOKING REQUEST*
📍 *Venue:* Makum Road, Tinsukia, Assam
--------------------------------
• *Pitch:* ${data.pitch.name}
• *Date:* ${data.dateFormatted} (${bookingState.date})
• *Time Slot:* ${data.currentSlot.time} (${data.currentSlot.type})
• *Duration:* ${data.duration} Hour(s)
• *Add-ons:*
${addonsListText}
--------------------------------
💰 *Estimated Total:* ₹${data.grandTotal}
🔒 *20% Advance to Lock:* ₹${data.advanceAmount}
--------------------------------
Hi Cricket Turf! Please let me know if this slot is available so I can confirm via UPI. Thank you!`;
  }

  /* ==========================================================================
     5. MODAL BOOKING SUBMISSION & CONFETTI
     ========================================================================== */
  function initModalHandlers() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('booking-modal-close');
    const form = document.getElementById('slot-reserve-form');

    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('modal-name');
        const phoneInput = document.getElementById('modal-phone');
        const notesInput = document.getElementById('modal-notes');

        if (!nameInput.value.trim() || !phoneInput.value.trim()) {
          alert('Please enter your name and 10-digit mobile number.');
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#032012" stroke-width="5" stroke-dasharray="31.4 31.4"></circle>
          </svg> Securing Slot...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          // Generate reference ID
          const refId = `CT-${Math.floor(100000 + Math.random() * 900000)}`;
          const data = calculateTotals();

          const modalBody = document.getElementById('booking-modal-content');
          if (modalBody) {
            modalBody.innerHTML = `
              <div style="text-align:center; padding: 20px 10px;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid var(--color-primary-light); color: var(--color-primary-neon); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
                  Slot Reserved Tentatively!
                </h3>
                <p style="color: var(--text-light); font-size: 0.95rem; margin-bottom: 20px;">
                  Booking Ref: <strong style="color: var(--color-accent-light); letter-spacing: 1px;">#${refId}</strong>
                </p>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; text-align: left; margin-bottom: 24px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                    <span style="color:var(--text-muted)">Pitch:</span>
                    <strong style="color:#ffffff">${data.pitch.name.split(':')[0]}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                    <span style="color:var(--text-muted)">Date & Time:</span>
                    <strong style="color:#ffffff">${data.dateFormatted} | ${data.currentSlot.time}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
                    <span style="color:var(--text-muted)">Total Estimated:</span>
                    <strong style="color:var(--color-primary-light)">₹${data.grandTotal}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                    <span style="color:var(--text-muted)">20% Advance UPI:</span>
                    <strong style="color:var(--color-accent-light)">₹${data.advanceAmount}</strong>
                  </div>
                </div>

                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 24px; line-height: 1.5;">
                  Our manager on Makum Road will WhatsApp / call you at <strong style="color:#ffffff">${phoneInput.value}</strong> within 10 minutes to verify availability and share the UPI QR code.
                </p>

                <div style="display:flex; flex-direction:column; gap:10px;">
                  <button id="modal-whatsapp-confirm" class="btn btn-whatsapp" style="width:100%;">
                    💬 Confirm Now on WhatsApp
                  </button>
                  <button id="modal-done-btn" class="btn btn-secondary" style="width:100%;">
                    Done
                  </button>
                </div>
              </div>
            `;

            // Trigger celebration confetti
            fireConfetti();

            // WhatsApp confirmation from modal
            const confWhatsAppBtn = document.getElementById('modal-whatsapp-confirm');
            if (confWhatsAppBtn) {
              confWhatsAppBtn.addEventListener('click', () => {
                const rawPhone = config.business?.contact?.whatsappRaw || '919876543210';
                const clientMsg = `Hi Cricket Turf Tinsukia! I just submitted reservation #${refId} for ${data.pitch.name.split(':')[0]} on ${data.dateFormatted} (${data.currentSlot.time}). My name is ${nameInput.value}. Please share UPI QR code to finalize.`;
                window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(clientMsg)}`, '_blank');
              });
            }

            const doneBtn = document.getElementById('modal-done-btn');
            if (doneBtn) {
              doneBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
              });
            }
          }
        }, 800);
      });
    }
  }

  function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const data = calculateTotals();
    const modalSummaryBox = document.getElementById('modal-slot-summary-box');
    if (modalSummaryBox) {
      modalSummaryBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--text-muted); margin-bottom:6px;">
          <span>Pitch:</span> <strong style="color:#ffffff">${data.pitch.name.split(':')[0]}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--text-muted); margin-bottom:6px;">
          <span>Timing:</span> <strong style="color:#ffffff">${data.dateFormatted} (${data.currentSlot.time})</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--text-muted);">
          <span>Total Slot Price:</span> <strong style="color:var(--color-primary-neon)">₹${data.grandTotal}</strong>
        </div>
      `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ==========================================================================
     6. RESPONSIVE GALLERY & LIGHTBOX
     ========================================================================== */
  function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentItemIndex = 0;
    const galleryData = config.gallery || [];

    // Category Filter Buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Open Lightbox
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      if (!lightbox || !galleryData[index]) return;
      currentItemIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      const item = galleryData[currentItemIndex];
      if (!item) return;

      if (lightboxImg) {
        lightboxImg.src = item.image;
        lightboxImg.alt = item.title;
      }
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${item.caption}`;
      }
    }

    function showPrev() {
      currentItemIndex = (currentItemIndex - 1 + galleryData.length) % galleryData.length;
      updateLightboxContent();
    }

    function showNext() {
      currentItemIndex = (currentItemIndex + 1) % galleryData.length;
      updateLightboxContent();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  /* ==========================================================================
     7. FAQ ACCORDION
     ========================================================================== */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherTrigger = other.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('active');
        trigger.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  /* ==========================================================================
     8. CONTACT FORM WITH VALIDATION & TOAST
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const successAlert = document.getElementById('contact-success-alert');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('cf-name');
      const phoneInput = document.getElementById('cf-phone');
      const emailInput = document.getElementById('cf-email');
      const messageInput = document.getElementById('cf-message');

      // Reset errors
      form.querySelectorAll('.form-field').forEach(f => f.classList.remove('error'));

      // Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput, 'Please enter your name');
        isValid = false;
      }

      // Validate Phone (10 digits Indian mobile)
      const cleanPhone = phoneInput.value.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        setError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      }

      // Validate Email (optional or valid format)
      if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        setError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput, 'Please write your message or inquiry');
        isValid = false;
      }

      if (!isValid) return;

      // Loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending inquiry...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        if (successAlert) {
          successAlert.classList.add('show');
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        form.reset();

        setTimeout(() => {
          if (successAlert) successAlert.classList.remove('show');
        }, 7000);
      }, 700);
    });

    function setError(inputElem, msg) {
      const field = inputElem.closest('.form-field');
      if (field) {
        field.classList.add('error');
        const feedback = field.querySelector('.form-feedback');
        if (feedback) feedback.textContent = msg;
      }
    }
  }

  /* ==========================================================================
     9. LIGHTWEIGHT PURE JAVASCRIPT CONFETTI EFFECT
     ========================================================================== */
  function fireConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '3000';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#00e676', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.vx *= 0.98; // drag
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (elapsed < 2400) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
      }
    }

    render();
  }
});
