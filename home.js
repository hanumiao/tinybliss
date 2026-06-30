document.addEventListener("DOMContentLoaded", () => {
    // Fade-up on scroll animation
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { 
            if (e.isIntersecting) { 
                e.target.classList.add('visible'); 
                observer.unobserve(e.target); 
            } 
        });
    }, { threshold: 0.15 });
    
    fadeEls.forEach(el => observer.observe(el));

    // Counter animation function
    function animateCounter(el) {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString('id-ID') + suffix;
            if (current >= target) clearInterval(timer);
        }, 16);
    }

    // Counter Intersection Observer
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                counterObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));
});

//Login Alert
window.addEventListener('load', function () {
    const isLogin = localStorage.getItem("username");
    const loginModalEl = document.getElementById('loginModal');

    // debug, biar kamu tau status sebenernya tiap load
    console.log("status isLogin:", isLogin, "| modal ketemu:", !!loginModalEl);

    //alert muncul jika belum login dan alert masih di halaman
    if ( !isLogin && loginModalEl) {
        // pastikan bootstrap udah keload, kalau belum jangan jalan biar gak error
        if (typeof bootstrap === "undefined") {
            console.error("Bootstrap JS belum keload bro, modal gak akan muncul. Cek urutan <script> kamu.");
            return;
        }

        setTimeout(function () {
            const loginModal = new bootstrap.Modal(loginModalEl);
            loginModal.show();
        }, 3); // waktu alert akan muncul
    }
});

// Fungsi logout, dipanggil dari button manapun di halaman manapun
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("fullname");
    window.location.href = "login.html"; // ganti sesuai nama file login kamu
}
