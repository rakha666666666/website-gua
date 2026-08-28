/* ==========================================================================
   1. EFEK KETIK TEKS (TYPEWRITER) PADA SUBTITLE HERO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const subtitleElement = document.querySelector('.hero-subtitle');
    
    if (subtitleElement) {
        const textToType = '"Di antara miliaran detik yang berputar di semesta, detik saat kamu dilahirkan adalah alasan mengapa duniaku kini penuh dengan warna."';
        subtitleElement.textContent = ''; // Kosongkan dulu teks asli
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                subtitleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40); // Kecepatan ketik (ms)
            }
        }
        
        // Jalankan efek ketik setelah jeda sedikit
        setTimeout(typeWriter, 500);
    }
});

/* ==========================================================================
   2. GENERATOR PARTIKEL HATI & BINTANG MELAYANG (BACKGROUND ANIMATION)
   ========================================================================== */
const symbols = ['💖', '🌸', '✨', '💕', '🌷', '🎂'];

function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.classList.add('floating-particle');
    
    // Pilih simbol acak
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Posisi horizontal acak di layar
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Ukuran acak
    const size = Math.random() * 20 + 15;
    particle.style.fontSize = `${size}px`;
    
    // Durasi melayang acak (antara 4s - 8s)
    const duration = Math.random() * 4 + 4;
    particle.style.animation = `floatUp ${duration}s linear forwards`;
    
    // StyleCSS dinamis untuk animasi partikel
    particle.style.position = 'fixed';
    particle.style.bottom = '-30px';
    particle.style.zIndex = '99';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = Math.random() * 0.7 + 0.3;

    document.body.appendChild(particle);

    // Hapus dari DOM setelah animasi selesai
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Buat partikel baru secara otomatis setiap 400ms
setInterval(createFloatingParticle, 400);

// Tambahkan Keyframes animasi floatUp secara dinamis ke dokumen
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-105vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

/* ==========================================================================
   3. INTERAKSI KLIK LAYAR (LEDAKAN HATI SAAT DIKLIK)
   ========================================================================== */
document.addEventListener('click', (e) => {
    // Jangan picu jika yang diklik adalah tombol/link agar tidak mengganggu fungsi
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.innerText = '🌸';
        spark.style.position = 'fixed';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.fontSize = '18px';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '999';
        spark.style.transition = 'all 0.8s ease-out';

        document.body.appendChild(spark);

        // Hitung arah ledakan acak
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 30;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;

        requestAnimationFrame(() => {
            spark.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 800);
    }
});

/* ==========================================================================
   TOMBOL PEMUTAR MUSIK LATAR (FOURTWNTY - LAGU TENANG)
   ========================================================================== */
const musicBtn = document.getElementById('musicToggle');

// Memanggil file lagu tenang.mp4 milikmu
const bgMusic = new Audio('lagu tenang.mp4'); 
bgMusic.loop = true; // Agar musik mengulang otomatis saat selesai

let isPlaying = false;

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.innerText = '⏸️ Hentikan Melodi';
            }).catch(err => {
                console.log('Autoplay ditolak browser, klik lagi untuk memutar:', err);
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.innerText = '🎵 Putar Lagu';
        }
    });
}
/* ==========================================================================
   5. HIGHLIGHT MENU NAVIGASI SAAT DI-SCROLL
   ========================================================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
