/* ===================================================
   TinyBliss — service.js  (Sederhana & Optimal)
   =================================================== */

/* ===== Navbar scroll shadow ===== */
window.addEventListener('scroll', () => {
  document.getElementById('siteNav').classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== Ritual detail data ===== */
const ritualData = {
  'traditional-massage': {
    index:'01', cat:'Massage', img:'picture/5.png',
    title:'Traditional Massage',
    lead:'Pijat tradisional khas Indonesia dengan tekanan menyeluruh pada titik-titik otot utama, dirancang untuk melancarkan peredaran darah dan melepas pegal yang menumpuk dari rutinitas harian.',
    for:['Kamu yang banyak duduk atau berdiri lama saat kerja','Badan pegal menyeluruh setelah perjalanan jauh','Ingin perawatan klasik tanpa aroma atau alat tambahan'],
    feel:['Tekanan mantap dan dalam di area bahu, punggung, dan kaki','Rasa hangat menyebar setelah otot mulai melonggar','Tidur lebih nyenyak di malam yang sama'],
    durations:[['60 min',150000],['90 min',200000],['120 min',260000]]
  },
  'aromatherapy-massage': {
    index:'02', cat:'Massage', img:'picture/2.png',
    title:'Aromatherapy Massage',
    lead:'Pijat relaksasi dengan tekanan lebih lembut, dipadukan minyak esensial pilihan yang membantu menenangkan sistem saraf sekaligus meredakan tegangan otot ringan hingga sedang.',
    for:['Pikiran penuh dan butuh sesi yang menenangkan, bukan keras','Punya kepekaan terhadap aroma dan ingin pengalaman multisensori','Cocok juga sebagai me-time mingguan'],
    feel:['Usapan panjang dan ritmis, bukan tekanan titik','Aroma esensial yang membantu menurunkan rasa cemas','Tubuh terasa ringan dan pikiran lebih jernih setelahnya'],
    durations:[['60 min',200000],['90 min',270000],['120 min',330000]]
  },
  'hot-stone-massage': {
    index:'03', cat:'Massage', img:'picture/1.png',
    title:'Hot Stone Massage',
    lead:'Batu basal yang dipanaskan digunakan untuk menjangkau lapisan otot lebih dalam dibanding pijat tangan biasa, efektif untuk nyeri kronis dan area yang sering kaku.',
    for:['Nyeri otot kronis di leher, bahu, atau punggung bawah','Cuaca dingin atau badan yang mudah kaku','Sudah pernah pijat biasa tapi ingin efek lebih dalam'],
    feel:['Sensasi hangat dari batu yang ditempel dan digeser perlahan','Tekanan dalam tanpa rasa sakit berlebih','Otot kaku terasa lebih lentur sejak sesi pertama'],
    durations:[['60 min',280000],['90 min',370000],['120 min',450000]]
  },
  'body-scrub': {
    index:'04', cat:'Spa', img:'picture/13.png',
    title:'Body Scrub',
    lead:'Eksfoliasi tubuh menyeluruh menggunakan scrub herbal alami, mengangkat sel kulit mati sambil merangsang sirkulasi permukaan kulit agar tampak lebih cerah dan halus.',
    for:['Kulit terasa kasar atau kusam','Persiapan sebelum acara penting','Ingin rutin merawat kulit tubuh, bukan cuma wajah'],
    feel:['Tekstur scrub yang sedikit kasar saat digosokkan merata','Kulit terasa bersih dan ringan usai dibilas','Hasil terlihat langsung: kulit lebih cerah dan lembut'],
    durations:[['45 min',175000],['60 min',225000],['90 min',290000]]
  },
  'body-mask': {
    index:'05', cat:'Spa', img:'picture/9.png',
    title:'Body Mask',
    lead:'Perawatan tubuh menggunakan masker alami yang membantu menutrisi, melembapkan, dan menghaluskan kulit agar terasa lebih sehat dan segar.',
    for:['Kulit terasa kering atau dehidrasi','Ingin perawatan singkat sebelum acara','Mencari sesi pelengkap setelah scrub atau pijat'],
    feel:['Masker terasa sejuk saat pertama kali diaplikasikan','Sensasi kencang ringan saat masker mengering','Kulit terasa lebih lembap dan halus usai dibilas'],
    durations:[['30 min',120000],['45 min',170000],['60 min',220000]]
  },
  'flower-bath': {
    index:'06', cat:'Spa', img:'picture/14.png',
    title:'Flower Bath',
    lead:'Berendam dalam air hangat dengan kelopak bunga dan aromaterapi pilihan, memberikan relaksasi menyeluruh sambil menyegarkan tubuh dan menenangkan pikiran.',
    for:['Ingin sesi relaksasi singkat namun berkesan','Acara spesial seperti bridal atau hari ulang tahun','Suka aroma bunga dan suasana yang menenangkan'],
    feel:['Air hangat dengan aroma bunga yang menenangkan','Otot perlahan rileks saat berendam','Tubuh terasa segar dan pikiran lebih tenang setelahnya'],
    durations:[['20 min',80000],['30 min',120000],['45 min',160000]]
  },
  'foot-reflexology': {
    index:'07', cat:'Therapy', img:'picture/7.png',
    title:'Foot Reflexology',
    lead:'Pijat refleksi yang menekan titik-titik saraf spesifik di telapak kaki, dipercaya membantu memulihkan energi tubuh secara menyeluruh dan mengurangi kelelahan setelah berdiri atau berjalan lama.',
    for:['Berdiri atau berjalan jauh sepanjang hari','Kaki sering terasa berat atau bengkak ringan','Ingin sesi singkat yang tetap berefek ke seluruh tubuh'],
    feel:['Tekanan titik yang kadang terasa nyeri sesaat, lalu melegakan','Sensasi hangat menjalar dari telapak kaki ke betis','Langkah terasa lebih ringan setelah sesi selesai'],
    durations:[['45 min',120000],['60 min',160000],['90 min',220000]]
  },
  'bekam-therapy': {
    index:'08', cat:'Therapy', img:'picture/6.png',
    title:'Bekam Therapy',
    lead:'Terapi bekam tradisional yang dipercaya membantu proses detoksifikasi darah, mendukung sistem imun, dan meredakan nyeri punggung yang membandel.',
    for:['Nyeri punggung yang sering kambuh','Tertarik pada metode penyembuhan tradisional','Sudah familier dengan sensasi bekam sebelumnya'],
    feel:['Sensasi tarikan kop di permukaan kulit, bukan rasa sakit tajam','Bekas merah atau ungu ringan yang memudar dalam beberapa hari','Punggung terasa lebih lega setelah sesi'],
    durations:[['45 min',150000],['60 min',200000],['90 min',260000]]
  },
  'relaxation-therapy': {
    index:'09', cat:'Therapy', img:'picture/3.png',
    title:'Relaxation Therapy',
    lead:'Sesi relaksasi menyeluruh yang memadukan musik terapi dan teknik pernapasan terarah, dirancang untuk menenangkan pikiran yang penuh sekaligus meredakan tegangan tubuh secara perlahan.',
    for:['Pikiran sulit berhenti memikirkan pekerjaan','Sulit tidur karena stres menumpuk','Ingin sesi yang menyentuh sisi mental, bukan cuma fisik'],
    feel:['Ruangan tenang dengan musik dan pernapasan terpandu','Tubuh perlahan melemas seiring sesi berjalan','Rasa tenang yang masih terasa beberapa jam setelahnya'],
    durations:[['60 min',180000],['90 min',240000],['120 min',300000]]
  },
  'luxury-package': {
    index:'10', cat:'Package', img:'picture/8.png',
    title:'Luxury Spa Package',
    lead:'Paket pampering lengkap yang menggabungkan body massage, body scrub, body mask, dan flower bath dalam satu sesi panjang — dibuat untuk hari ketika kamu ingin benar-benar lepas dari semua jadwal.',
    for:['Self-reward setelah periode kerja berat','Acara khusus: ulang tahun, persiapan pernikahan, atau liburan','Ingin satu sesi yang mencakup semuanya tanpa booking terpisah'],
    feel:['Rangkaian perawatan mengalir tanpa jeda berarti','Tubuh dan wajah sama-sama mendapat perhatian penuh','Keluar dengan rasa benar-benar "reset" dari ujung kepala ke kaki'],
    durations:[['120 min',550000],['150 min',700000],['180 min',850000]]
  },
  'couple-package': {
    index:'11', cat:'Package', img:'picture/15.png',
    title:'Couple Spa Package',
    lead:'Pengalaman spa romantis untuk dua orang dalam satu ruangan, memadukan massage, body treatment, dan flower bath untuk momen berkualitas bersama pasangan.',
    for:['Merayakan momen spesial berdua, dari anniversary hingga bulan madu','Ingin self-care yang dilakukan bersama, bukan sendiri','Mencari pengalaman spa yang lebih personal dan intim'],
    feel:['Dua sesi berjalan berdampingan dalam satu ruangan yang sama','Suasana tenang yang dirancang untuk dinikmati berdua','Keluar dengan tubuh rileks dan momen yang lebih dekat'],
    durations:[['90 min',650000],['120 min',850000],['150 min',1050000]]
  },
  'beauty-package': {
    index:'12', cat:'Package', img:'picture/10.png',
    title:'Beauty Spa Package',
    lead:'Perawatan kecantikan lengkap yang memadukan body scrub, body mask, flower bath, dan facial treatment dalam satu sesi untuk kulit yang sehat dan bercahaya menyeluruh.',
    for:['Ingin perawatan tubuh dan wajah sekaligus dalam satu kunjungan','Persiapan menyeluruh sebelum acara besar','Suka mencoba kombinasi perawatan tanpa booking terpisah'],
    feel:['Rangkaian perawatan dari tubuh hingga wajah tanpa jeda panjang','Kulit terasa bersih, lembap, dan kencang di setiap tahap','Hasil akhir: kulit bercahaya dari ujung kaki sampai wajah'],
    durations:[['120 min',500000],['150 min',650000],['180 min',800000]]
  }
};

let currentModalId = null;

/* ===== Modal ===== */
function openModal(id) {
  const data = ritualData[id];
  if (!data) return;
  currentModalId = id;

  document.getElementById('modalImg').src   = data.img;
  document.getElementById('modalImg').alt   = data.title;
  document.getElementById('modalIndex').textContent = data.index;
  document.getElementById('modalCat').textContent   = data.cat;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalLead').textContent  = data.lead;

  document.getElementById('modalFor').innerHTML =
    data.for.map(t => `<li>${t}</li>`).join('');
  document.getElementById('modalFeel').innerHTML =
    data.feel.map(t => `<li>${t}</li>`).join('');

  document.getElementById('modalPriceBlock').innerHTML =
    data.durations.map(([dur, price]) => `
      <div class="modal-price-row">
        <span class="modal-price-dur">${dur}</span>
        <span class="modal-price-amt">Rp ${price.toLocaleString('id-ID')}</span>
      </div>
    `).join('');

  document.getElementById('modalBookBtn').href = `booking.html?service=${id}`;

  document.getElementById('modalBackdrop').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('show');
  document.body.style.overflow = '';
  currentModalId = null;
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'modalBackdrop') closeModal();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ===== Duration toggle ===== */
function setDur(btn) {
  const card   = btn.closest('.card');
  const btns   = Array.from(card.querySelectorAll('.dur-btn'));
  const idx    = btns.indexOf(btn);
  const priceEl = card.querySelector('.price-amount');
  const prices  = priceEl.dataset.prices.split(',').map(Number);

  btns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  priceEl.classList.add('swap');
  setTimeout(() => {
    priceEl.textContent = 'Rp ' + prices[idx].toLocaleString('id-ID');
    priceEl.classList.remove('swap');
  }, 130);
}

/* ===== Filter ===== */
document.getElementById('filterBar').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  const cat = btn.dataset.filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let visible = 0;
  document.querySelectorAll('.card').forEach((card) => {
    const match = (cat === 'all' || card.dataset.cat === cat);
    if (match) {
      card.classList.remove('hidden');
      card.style.animation = 'none';
      void card.offsetWidth; // reflow
      card.style.animation = `riseIn .5s cubic-bezier(.22,1,.36,1) forwards`;
      card.style.animationDelay = (visible * 0.05) + 's';
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  document.getElementById('emptyState').classList.toggle('show', visible === 0);
});