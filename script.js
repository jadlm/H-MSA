// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ---------- PRODUITS (data) ----------
    const products = [
        { id: 1, name: "Sauvage", desc: "Frais et puissant, l'icône Dior", price: 950, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format" },
        { id: 2, name: "Chanel N°5", desc: "L'élégance intemporelle", price: 1200, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format" },
        { id: 3, name: "Creed Aventus", desc: "Fumé, noble, puissant", price: 1800, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1587017539504-67cfbddac6d1?w=400&auto=format" },
        { id: 4, name: "La Vie Est Belle", desc: "Gourmand et solaire", price: 1100, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1619994403073-2cd3e644b8de?w=400&auto=format" },
        { id: 5, name: "Black Opium", desc: "Café & fleur d'oranger", price: 1050, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format" },
        { id: 6, name: "Acqua di Giò", desc: "Marin et frais, l'été en flacon", price: 900, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1592945403407-9c8a9306c64d?w=400&auto=format" },
        { id: 7, name: "Oud Wood", desc: "Boisé, rare, sensuel", price: 1600, category: "homme", promo: true, image: "https://images.unsplash.com/photo-1594035910165-b2b9b1b6d9b0?w=400&auto=format" },
        { id: 8, name: "Baccarat Rouge 540", desc: "Ambre & jasmin, légendaire", price: 2000, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1615631496003-2a3c3f5d4f7c?w=400&auto=format" }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navLinks = document.querySelectorAll('[data-filter]');
    const darkToggle = document.getElementById('darkToggle');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    let currentFilter = 'all';
    let searchTerm = '';

    // ---------- RENDER PRODUITS ----------
    function renderProducts() {
        const filtered = products.filter(p => {
            const matchesFilter = currentFilter === 'all' || p.category === currentFilter;
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm);
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            productsGrid.innerHTML = `<p class="no-result">Aucun parfum trouvé</p>`;
            return;
        }

        productsGrid.innerHTML = filtered.map(p => {
            const catBadge = p.category === 'homme' ? 'Homme' : 'Femme';
            const promoBadge = p.promo ? '<span class="product-badge promo">Promo</span>' : '';
            return `
            <div class="product-card" data-category="${p.category}">
                <span class="product-badge">${catBadge}</span>
                ${promoBadge}
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
                <div class="product-info">
                    <div class="product-cat">${catBadge}</div>
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-desc">${p.desc}</p>
                    <div class="product-price">${p.price} DH</div>
                    <button class="btn-wa" data-name="${p.name}" data-price="${p.price}"><i class="fab fa-whatsapp"></i> Commander</button>
                </div>
            </div>
        `}).join('');
    }

    // ---------- WHATSAPP COMMANDE ----------
    function setupWhatsAppListeners() {
        document.querySelectorAll('.btn-wa').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = btn.dataset.name;
                const price = btn.dataset.price;
                const message = `Bonjour, je souhaite commander le parfum *${name}* au prix de ${price} DH.`;
                const url = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        });
    }

    // Mise à jour après chaque render
    function afterRender() {
        setupWhatsAppListeners();
    }

    // ---------- FILTRES & RECHERCHE ----------
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
            afterRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderProducts();
        afterRender();
    });

    // navigation par catégorie (liens navbar)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;
            currentFilter = filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
            renderProducts();
            afterRender();
            document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
            if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
        });
    });

    // ---------- DARK MODE ----------
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = darkToggle.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // ---------- MENU HAMBURGER ----------
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fermer menu si click sur lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ---------- BACK TO TOP ----------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- COMPTEUR PROMOTIONNEL (24h) ----------
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(24, 0, 0, 0); // minuit
        const diff = endOfDay - now;
        if (diff <= 0) {
            document.getElementById('countdownTimer').innerText = '00:00:00';
            return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('countdownTimer').innerText = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ---------- ANIMATIONS AU SCROLL (intersection observer) ----------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px' });

    document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .promo-banner').forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });

    // initial render
    renderProducts();
    afterRender();

    // ---------- FLOATING WHATSAPP (redirection simple) déjà en href ----------
    // rien de plus

    // ---------- RESET ACTIVE FILTER VIA BOUTIQUE (optionnel) ----------
    document.querySelector('a[href="#produits"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
        navMenu.classList.remove('active');
    });
});

// petite classe pour animations scroll (fade)
const style = document.createElement('style');
style.innerHTML = `
    .fade-out { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in { opacity: 1; transform: translateY(0); }
    .no-result { text-align: center; font-size: 1.4rem; grid-column: 1 / -1; padding: 3rem; }
`;
document.head.appendChild(style);