// ==========================
// TinyBliss Membership JS
// ==========================

// Ambil elemen
const modal = document.getElementById("membershipModal");
const closeModal = document.querySelector(".close-modal");
const joinButtons = document.querySelectorAll(".join-btn");
const selectedPlan = document.getElementById("selectedPlan");
const membershipForm = document.getElementById("membershipForm");
const paymentModal = document.getElementById("paymentModal");
const closePayment = document.querySelector(".close-payment");
const finishPayment = document.getElementById("finishPayment");

// ==========================
// Buka Modal
// ==========================
joinButtons.forEach(button => {
    button.addEventListener("click", () => {
        const plan = button.dataset.plan;

        selectedPlan.value = plan + " Membership";
        modal.classList.add("show");
    });
});

// ==========================
// Tutup Modal
// ==========================
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// ==========================
// Submit Form
// ==========================
membershipForm.addEventListener("submit", function(e){

    e.preventDefault();

    modal.classList.remove("show");

    paymentModal.classList.add("show");

});
// Tutup modal pembayaran
closePayment.addEventListener("click", () => {
    paymentModal.classList.remove("show");
});

// Klik luar modal
window.addEventListener("click", (e) => {
    if(e.target === paymentModal){
        paymentModal.classList.remove("show");
    }
});

// Tombol selesai bayar
finishPayment.addEventListener("click", () => {

    alert("Terima kasih!\n\nPembayaran berhasil.\nMembership TinyBliss Anda sedang diproses.");

    paymentModal.classList.remove("show");

    membershipForm.reset();

});