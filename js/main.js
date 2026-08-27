// owl carousel start
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    margin: 15,
    autoplay: true,
    autoplayhoverpause: true,
    autoplaytimeout: 500,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      600: {
        items: 2,
        dots: false,
      },
      1000: {
        items: 3,
        dots: false,
      },
    },
  });
});
// owl carousel end

// copy start
const rek1 = document.getElementById("rek1");
const salin1 = document.getElementById("salin1");

if (salin1 && rek1) {
  salin1.onclick = () => {
    rek1.select(); 
    document.execCommand("copy"); 
    Swal.fire({
      icon: "success",
      title: "No. Rekening Berhasil di Salin",
      showConfirmButton: false,
      timer: 1000,
    });
  };
}
// copy end

// waktu start
const countDownDate = new Date("Dec 31, 2022 00:00:00").getTime();
const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  if(document.getElementById("hari")) document.getElementById("hari").innerHTML = days;
  if(document.getElementById("jam")) document.getElementById("jam").innerHTML = hours;
  if(document.getElementById("menit")) document.getElementById("menit").innerHTML = minutes;
  if(document.getElementById("detik")) document.getElementById("detik").innerHTML = seconds;
  
  if (distance < 0) {
    clearInterval(x);
    if(document.getElementById("Carasingkat")) document.getElementById("Carasingkat").innerHTML = "EXPIRED";
  }
}, 1000);
// waktu end

// modal start
window.onload = function () {
  const klikModal = document.getElementById("klikmodal");
  if (klikModal) klikModal.click();
};
// modal end

// lagu start
const lagu = document.getElementById("lagu");
function playAudio() {
  if (lagu) lagu.play();
}
function stopAudio() {
  if (lagu) lagu.pause();
}
// lagu end

// undangan / wishes start
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
var to = GetURLParameter("to");
if (document.getElementById("nama")) {
  document.getElementById("nama").innerHTML = to ? decodeURIComponent(to) : "-";
}

// URL Apps Script Kamu yang Terbaru dan Benar
const urlAppsScript = "https://script.google.com/macros/s/AKfycbynd1V5AgX3XevgTCtf3cMW3fUr8ntTEiRbOEboIqNcJKlRjCJmjFGG5jOHTC_gn3I9yw/exec";

// 1. Fungsi untuk Menampilkan/Merender Daftar Ucapan ke Website
function muatUcapan() {
    const container = document.getElementById("list-ucapan");
    if (!container) return;

    fetch(urlAppsScript)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML = '<p class="text-muted text-center py-3">Belum ada ucapan.</p>';
                return;
            }

            // Balik urutan agar ucapan terbaru muncul di paling atas
            data.reverse();

            data.forEach(item => {
                let badgeColor = item.konfirmasi === "Hadir" ? "bg-success" : "bg-danger";

                const cardItem = `
                    <div class="card mb-3 shadow-none border rounded-3">
                        <div class="card-body p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6 class="card-title mb-0 fw-bold text-dark" style="font-size: 1.1rem;">${escapeHtml(item.nama)}</h6>
                                <span class="badge ${badgeColor} rounded-pill px-3 py-1" style="font-size: 0.75rem;">${escapeHtml(item.konfirmasi)}</span>
                            </div>
                            <p class="card-text text-secondary m-0" style="font-size: 0.95rem; line-height: 1.4; white-space: pre-line;">
                                ${escapeHtml(item.ucapan)}
                            </p>
                        </div>
                    </div>
                `;
                container.innerHTML += cardItem;
            });
        })
        .catch(error => {
            console.error("Gagal memuat data:", error);
            container.innerHTML = '<p class="text-danger text-center py-3">Gagal memuat ucapan.</p>';
        });
}

// 2. Fungsi untuk Menangani Pengiriman Form Ucapan (Submit)
const formUcapan = document.getElementById("formUcapan") || document.querySelector("form");

if (formUcapan) {
    formUcapan.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = formUcapan.querySelector('[name="nama"]').value;
        const ucapan = formUcapan.querySelector('[name="ucapan"]').value;
        const konfirmasi = formUcapan.querySelector('[name="konfirmasi"]').value;

        fetch(urlAppsScript, {
            method: "POST",
            mode: "no-cors", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama: nama,
                ucapan: ucapan,
                konfirmasi: konfirmasi
            })
        })
        .then(() => {
            alert("Ucapan berhasil dikirim ❤️");
            formUcapan.reset();
            
            // Refresh daftar ucapan setelah 1.5 detik agar data baru langsung muncul
            setTimeout(muatUcapan, 1500);
        })
        .catch(error => {
            console.error(error);
            alert("Ucapan gagal dikirim. Silakan coba lagi.");
        });
    });
}

// hover blur effect
$('.blur').mouseenter(function(){
  $('.blur').css('filter','blur(5px)'); 
  $(this).css('filter','blur(0px)');    
});
$('.blur').mouseleave(function(){
  $('.blur').css('filter','blur(0px)'); 
});

// Fungsi pengaman teks HTML agar aman
function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Jalankan fungsi memuat ucapan saat pertama kali halaman dibuka
muatUcapan();
// undangan end