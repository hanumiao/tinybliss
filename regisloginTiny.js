function switchTab(tab) {
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('form-register').classList.toggle('active', tab === 'register');
    document.getElementById('form-login').classList.toggle('active', tab === 'login');
  }

  function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast' + (isError ? ' error' : '');
    // force reflow
    void t.offsetWidth;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const isHidden = inp.type === 'password';
    inp.type = isHidden ? 'text' : 'password';
    btn.querySelector('svg').style.opacity = isHidden ? '0.4' : '1';
  }

  function register() {
    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pw    = document.getElementById('reg-pw').value;
    const pw2   = document.getElementById('reg-pw2').value;
    const agree = document.getElementById('reg-agree').checked;

    if (!name || !email || !pw || !pw2) { showToast('Semua field wajib diisi.', true); return; }
    if (pw !== pw2) { showToast('Password tidak cocok.', true); return; }
    if (!agree) { showToast('Anda harus menyetujui Terms of Use.', true); return; }

    localStorage.setItem('username', email);
    localStorage.setItem('password', pw);
    localStorage.setItem('fullname', name);

    showToast('Akun berhasil dibuat! Silakan login.');
    setTimeout(() => switchTab('login'), 2000);
  }

  function login() {
    const user = document.getElementById('log-user').value.trim();
    const pw   = document.getElementById('log-pw').value;

    const savedUser = localStorage.getItem('username');
    const savedPass = localStorage.getItem('password');

    if (user === savedUser && pw === savedPass) {
      showToast('Login berhasil! Selamat datang.');
      // Redirect setelah 1.5 detik
      setTimeout(() => { window.location.href = 'home.html'; }, 1500);
    } else {
      showToast('Email atau password salah!', true);
    }
  }