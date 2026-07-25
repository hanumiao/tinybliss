let addonTotal = 0;
  let selectedServiceName = null;
  let selectedDur = null;

  const serviceDurationRules = {
    'Traditional Massage': ['60 menit', '90 menit', '120 menit'],
    'Aromatheraphy Massage': ['60 menit', '90 menit', '120 menit'],
    'Hot Stone Massage': ['60 menit', '90 menit', '120 menit'],
    'Body Scrub': ['45 menit', '60 menit', '90 menit'],
    'Body Mask': ['30 menit', '45 menit', '60 menit'],
    'Flower Bath': ['20 menit', '30 menit', '45 menit'],
    'Foot Reflexology': ['45 menit', '60 menit', '90 menit'],
    'Bekam Therapy': ['45 menit', '60 menit', '90 menit'],
    'Relaxation Therapy': ['60 menit', '90 menit', '120 menit'],
    'Luxury Spa Package': ['120 menit', '150 menit', '180 menit'],
    'Couple Spa Package': ['90 menit', '120 menit', '150 menit'],
    'Beauty Spa Package': ['120 menit', '150 menit', '180 menit'],
  };

  const serviceDurationPrices = {
    'Traditional Massage': {
      '60 menit': 150000,
      '90 menit': 200000,
      '120 menit': 260000,
    },
    'Aromatheraphy Massage': {
      '60 menit': 200000,
      '90 menit': 270000,
      '120 menit': 330000,
    },
    'Hot Stone Massage': {
      '60 menit': 280000,
      '90 menit': 370000,
      '120 menit': 450000,
    },
    'Body Scrub': {
      '45 menit': 175000,
      '60 menit': 225000,
      '90 menit': 290000,
    },
    'Body Mask': {
      '30 menit': 120000,
      '45 menit': 170000,
      '60 menit': 220000,
    },
    'Flower Bath': {
      '20 menit': 80000,
      '30 menit': 120000,
      '45 menit': 160000,
    },
    'Foot Reflexology': {
      '45 menit': 120000,
      '60 menit': 160000,
      '90 menit': 220000,
    },
    'Bekam Therapy': {
      '45 menit': 150000,
      '60 menit': 200000,
      '90 menit': 260000,
    },
    'Relaxation Therapy': {
      '60 menit': 180000,
      '90 menit': 240000,
      '120 menit': 300000,
    },
    'Luxury Spa Package': {
      '120 menit': 550000,
      '150 menit': 700000,
      '180 menit': 850000,
    },
    'Couple Spa Package': {
      '90 menit': 650000,
      '120 menit': 850000,
      '150 menit': 1050000,
    },
    'Beauty Spa Package': {
      '120 menit': 500000,
      '150 menit': 650000,
      '180 menit': 800000,
    },
  };

  function applyDurationRules(serviceName) {
    const allowed = serviceDurationRules[serviceName] || null; // null = semua durasi boleh
    const btns = document.querySelectorAll('.dur-btn');
    let activeStillAllowed = false;

    btns.forEach(btn => {
      const label = btn.textContent.trim();
      const isAllowed = !allowed || allowed.includes(label);
      btn.disabled = !isAllowed;
      if (btn.classList.contains('active') && isAllowed) activeStillAllowed = true;
    });

    if (!activeStillAllowed) {
      btns.forEach(b => b.classList.remove('active'));
      selectedDur = null;
    }

    updateSummary();
  }
  

  function selectService(el, name, price) {
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedServiceName = name;
    document.getElementById('durationGrid').classList.remove('pending');
    document.getElementById('durHint').style.display = 'none';
    applyDurationRules(name);
    updateSummary();
  }

  function selectDur(el, label) {
    if (el.disabled) return;
    document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    selectedDur = label;
    updateSummary();
  }

  function selectTherapist(el) {
    document.querySelectorAll('.therapist-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }

  function slideTherapist(dir) {
    const row = document.getElementById('therapistRow');
    row.scrollBy({ left: dir * 130, behavior: 'smooth' });
  }

  function toggleAddon(el) {
  el.classList.toggle('checked');
  el.setAttribute('aria-checked', el.classList.contains('checked'));

  addonTotal = 0;

  document.querySelectorAll('.addon-item.checked').forEach(item => {
    const txt = item.querySelector('.addon-price').textContent;
    addonTotal += parseInt(txt.replace(/\D/g, ''));
  });

  updateSummary();
}

  function updateSummary() {
    let base = 0;
    let displayService = 'Belum dipilih';

    if (selectedServiceName && selectedDur !== null) {
      const customPrices = serviceDurationPrices[selectedServiceName];
      base = (customPrices && customPrices[selectedDur] !== undefined) ? customPrices[selectedDur] : 0;
      displayService = selectedServiceName + ' (' + selectedDur + ')';
    } else if (selectedServiceName) {
      displayService = selectedServiceName + ' — pilih durasi';
    }

    const total = base + addonTotal;
    document.getElementById('sum-service').textContent = displayService;
    document.getElementById('sum-base').textContent = 'Rp ' + base.toLocaleString('id-ID');
    document.getElementById('sum-total').textContent = 'Rp ' + total.toLocaleString('id-ID');
    const addonRow = document.getElementById('addon-row');
    if (addonTotal > 0) {
      addonRow.style.display = 'flex';
      const addonNames = Array.from(document.querySelectorAll('.addon-item.checked .addon-name'))
        .map(el => el.textContent.trim());
      document.getElementById('sum-addon-label').textContent = addonNames.join(', ');
      document.getElementById('sum-addon').textContent = 'Rp ' + addonTotal.toLocaleString('id-ID');
    } else {
      addonRow.style.display = 'none';
    }
  }

  function submitBooking() {
    const nama = document.getElementById('nama').value.trim();
    const hp = document.getElementById('hp').value.trim();
    const tgl = document.getElementById('tgl').value;
    const jam = document.getElementById('jam').value;
    if (!selectedServiceName) {
      alert('Mohon pilih layanan terlebih dahulu.');
      return;
    }
    if (selectedDur === null) {
      alert('Mohon pilih durasi terlebih dahulu.');
      return;
    }
    if (!nama || !hp || !tgl || !jam) {
      alert('Mohon lengkapi nama, nomor HP, tanggal, dan jam terlebih dahulu.');
      return;
    }
    alert('Booking berhasil! 🌿\nKonfirmasi akan dikirim ke WhatsApp Anda.\nSampai jumpa di Serenity Spa!');
    resetBookingForm();
    window.location.href = 'home.html';
  }

  function resetBookingForm() {
    // Data diri & tanggal/jam
    document.getElementById('nama').value = '';
    document.getElementById('hp').value = '';
    document.getElementById('tgl').value = '';
    document.getElementById('jam').value = '';
    updateJamOptions();

    // Layanan & durasi
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
    selectedServiceName = null;
    document.querySelectorAll('.dur-btn').forEach(b => {
      b.classList.remove('active');
      b.disabled = true;
    });
    document.getElementById('durationGrid').classList.add('pending');
    document.getElementById('durHint').style.display = 'block';
    selectedDur = null;

    // Terapis
    document.querySelectorAll('.therapist-card').forEach(c => c.classList.remove('selected'));

    // Add-on
    document.querySelectorAll('.addon-item.checked').forEach(item => {
      item.classList.remove('checked');
      item.setAttribute('aria-checked', 'false');
    });
    addonTotal = 0;

    // Catatan
    document.getElementById('catatan').value = '';

    updateSummary();
  }

  const MIN_BOOKING_LEAD_HOURS = 1;

  function updateJamOptions() {
    const tglInput = document.getElementById('tgl');
    const jamSelect = document.getElementById('jam');
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (tglInput.value !== todayStr) {
      Array.from(jamSelect.options).forEach(opt => { opt.disabled = false; });
      return;
    }

    const earliestAllowed = new Date(today.getTime() + MIN_BOOKING_LEAD_HOURS * 60 * 60 * 1000);
    let activeStillAllowed = false;

    Array.from(jamSelect.options).forEach(opt => {
      if (!opt.value) return; // lewati opsi "Pilih jam"
      const [h, m] = opt.value.split(':').map(Number);
      const optTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m);
      const isAllowed = optTime >= earliestAllowed;
      opt.disabled = !isAllowed;
      if (opt.value === jamSelect.value && isAllowed) activeStillAllowed = true;
    });

    if (!activeStillAllowed) {
      jamSelect.value = '';
    }
  }

  document.querySelectorAll('.dur-btn').forEach(b => b.disabled = true);
  updateSummary();

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('tgl').min = today;