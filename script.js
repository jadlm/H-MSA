// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ----- ÉLÉMENTS DU DOM -----
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navLinks = document.querySelectorAll('[data-filter]');
    const darkToggle = document.getElementById('darkToggle');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');

    // Admin elements
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.querySelector('.close-modal');
    const submitLogin = document.getElementById('submitAdminLogin');
    const adminPassword = document.getElementById('adminPassword');
    const loginError = document.getElementById('loginError');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const addProductBtn = document.getElementById('addProductBtn');
    const resetProductsBtn = document.getElementById('resetProductsBtn');
    const adminProductList = document.getElementById('adminProductList');
    const productFormContainer = document.getElementById('productFormContainer');
    const productForm = document.getElementById('productForm');
    const formTitle = document.getElementById('formTitle');
    const productId = document.getElementById('productId');
    const productName = document.getElementById('productName');
    const productDesc = document.getElementById('productDesc');
    const productPrice = document.getElementById('productPrice');
    const productCategory = document.getElementById('productCategory');
    const productPromo = document.getElementById('productPromo');
    const productImageFile = document.getElementById('productImageFile');
    const imagePreview = document.getElementById('imagePreview');
    const productImageData = document.getElementById('productImageData');
    const cancelFormBtn = document.getElementById('cancelFormBtn');

    // ----- VARIABLES GLOBALES -----
    let products = [];
    let currentFilter = 'all';
    let searchTerm = '';
    const ADMIN_PASSWORD = 'admin123'; // Changez le mot de passe ici

    // ----- CHARGEMENT INITIAL DES PRODUITS -----
    function loadProducts() {
        const stored = localStorage.getItem('luxuryScentsProducts');
        if (stored) {
            products = JSON.parse(stored);
            renderProducts();
            afterRender();
        } else {
            // Fallback : produits par défaut (images Unsplash)
            products = [
                { id: 1, name: "Sauvage", desc: "Frais et puissant, l'icône Dior", price: 950, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format" },
                { id: 2, name: "Chanel N°5", desc: "L'élégance intemporelle", price: 1200, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format" },
                { id: 3, name: "Creed Aventus", desc: "Fumé, noble, puissant", price: 1800, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1587017539504-67cfbddac6d1?w=400&auto=format" },
                { id: 4, name: "La Vie Est Belle", desc: "Gourmand et solaire", price: 1100, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1619994403073-2cd3e644b8de?w=400&auto=format" },
                { id: 5, name: "Black Opium", desc: "Café & fleur d'oranger", price: 1050, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format" },
                { id: 6, name: "Acqua di Giò", desc: "Marin et frais, l'été en flacon", price: 900, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1592945403407-9c8a9306c64d?w=400&auto=format" },
                { id: 7, name: "Oud Wood", desc: "Boisé, rare, sensuel", price: 1600, category: "homme", promo: true, image: "https://images.unsplash.com/photo-1594035910165-b2b9b1b6d9b0?w=400&auto=format" },
                { id: 8, name: "Baccarat Rouge 540", desc: "Ambre & jasmin, légendaire", price: 2000, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1615631496003-2a3c3f5d4f7c?w=400&auto=format" }
            ];
            saveToLocalStorage();
            renderProducts();
            afterRender();
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('luxuryScentsProducts', JSON.stringify(products));
    }

    // ----- RENDU PUBLIC DES PRODUITS -----
    function renderProducts() {
        if (!products.length) return;
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

    function afterRender() {
        document.querySelectorAll('.btn-wa').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = btn.dataset.name;
                const price = btn.dataset.price;
                const message = `Bonjour, je souhaite commander le parfum *${name}* au prix de ${price} DH.`;
                const url = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`; // Changez le numéro
                window.open(url, '_blank');
            });
        });
    }

    // ----- FILTRES & RECHERCHE -----
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

    // ----- DARK MODE -----
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

    // ----- MENU HAMBURGER -----
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ----- BACK TO TOP -----
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

    // ----- COMPTEUR PROMO -----
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(24, 0, 0, 0);
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

    // ----- ANIMATIONS SCROLL -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .promo-banner').forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });

    // ==================== ADMINISTRATION ====================
    // Ouvrir la modale
    adminLoginBtn.addEventListener('click', () => {
        adminModal.classList.add('show');
    });

    // Fermer la modale
    closeModal.addEventListener('click', () => {
        adminModal.classList.remove('show');
        adminPassword.value = '';
        loginError.textContent = '';
    });

    // Connexion
    submitLogin.addEventListener('click', () => {
        const pwd = adminPassword.value;
        if (pwd === ADMIN_PASSWORD) {
            adminModal.classList.remove('show');
            adminPanel.style.display = 'block';
            renderAdminProductList();
        } else {
            loginError.textContent = 'Mot de passe incorrect';
        }
    });

    // Fermer le panneau admin
    closeAdminPanel.addEventListener('click', () => {
        adminPanel.style.display = 'none';
    });

    // Afficher la liste des produits dans l'admin
    function renderAdminProductList() {
        adminProductList.innerHTML = products.map(p => `
            <div class="admin-product-item" data-id="${p.id}">
                <img src="${p.image}" alt="${p.name}">
                <div class="admin-product-info">
                    <h4>${p.name}</h4>
                    <p>${p.price} DH - ${p.category}</p>
                </div>
                <div class="admin-product-actions">
                    <button class="edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    // Fonctions globales pour les boutons (accessibles depuis onclick)
    window.editProduct = (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        formTitle.textContent = 'Modifier le produit';
        productId.value = product.id;
        productName.value = product.name;
        productDesc.value = product.desc;
        productPrice.value = product.price;
        productCategory.value = product.category;
        productPromo.checked = product.promo;
        // Image
        if (product.image) {
            imagePreview.src = product.image;
            imagePreview.style.display = 'block';
            productImageData.value = product.image;
        } else {
            imagePreview.style.display = 'none';
            productImageData.value = '';
        }
        productImageFile.value = '';
        productFormContainer.style.display = 'block';
    };

    window.deleteProduct = (id) => {
        if (confirm('Supprimer ce produit ?')) {
            products = products.filter(p => p.id !== id);
            saveToLocalStorage();
            renderProducts();
            afterRender();
            renderAdminProductList();
        }
    };

    // Upload d'image avec aperçu
    productImageFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('L\'image ne doit pas dépasser 2 Mo.');
                productImageFile.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
                productImageData.value = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            productImageData.value = '';
        }
    });

    // Ajouter un produit
    addProductBtn.addEventListener('click', () => {
        formTitle.textContent = 'Ajouter un produit';
        productId.value = '';
        productName.value = '';
        productDesc.value = '';
        productPrice.value = '';
        productCategory.value = 'homme';
        productPromo.checked = false;
        imagePreview.style.display = 'none';
        imagePreview.src = '#';
        productImageFile.value = '';
        productImageData.value = '';
        productFormContainer.style.display = 'block';
    });

    // Annuler le formulaire
    cancelFormBtn.addEventListener('click', () => {
        productFormContainer.style.display = 'none';
        imagePreview.style.display = 'none';
        imagePreview.src = '#';
        productImageFile.value = '';
        productImageData.value = '';
    });

    // Sauvegarder (ajout ou modification)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation de l'image pour un nouveau produit
        if (!productId.value && !productImageData.value) {
            alert('Veuillez sélectionner une image.');
            return;
        }

        const id = productId.value ? parseInt(productId.value) : Date.now();
        const product = {
            id: id,
            name: productName.value,
            desc: productDesc.value,
            price: parseInt(productPrice.value),
            category: productCategory.value,
            promo: productPromo.checked,
            image: productImageData.value
        };

        if (productId.value) {
            // modification
            const index = products.findIndex(p => p.id === parseInt(productId.value));
            if (index !== -1) products[index] = product;
        } else {
            // ajout
            products.push(product);
        }

        saveToLocalStorage();
        renderProducts();
        afterRender();
        renderAdminProductList();

        // Réinitialiser le formulaire
        productFormContainer.style.display = 'none';
        imagePreview.style.display = 'none';
        imagePreview.src = '#';
        productImageFile.value = '';
        productImageData.value = '';
    });

    // Réinitialiser depuis le JSON (fichier externe)
    resetProductsBtn.addEventListener('click', () => {
        if (confirm('Réinitialiser les produits par défaut ? Les modifications seront perdues.')) {
            fetch('products.json')
                .then(res => res.json())
                .then(data => {
                    products = data;
                    saveToLocalStorage();
                    renderProducts();
                    afterRender();
                    renderAdminProductList();
                })
                .catch(() => {
                    alert('Impossible de charger products.json. Utilisation des produits par défaut.');
                    products = [
                        { id: 1, name: "Sauvage", desc: "Frais et puissant, l'icône Dior", price: 950, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format" },
                        { id: 2, name: "Chanel N°5", desc: "L'élégance intemporelle", price: 1200, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format" },
                        { id: 3, name: "Creed Aventus", desc: "Fumé, noble, puissant", price: 1800, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1587017539504-67cfbddac6d1?w=400&auto=format" },
                        { id: 4, name: "La Vie Est Belle", desc: "Gourmand et solaire", price: 1100, category: "femme", promo: true, image: "https://images.unsplash.com/photo-1619994403073-2cd3e644b8de?w=400&auto=format" },
                        { id: 5, name: "Black Opium", desc: "Café & fleur d'oranger", price: 1050, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format" },
                        { id: 6, name: "Acqua di Giò", desc: "Marin et frais, l'été en flacon", price: 900, category: "homme", promo: false, image: "https://images.unsplash.com/photo-1592945403407-9c8a9306c64d?w=400&auto=format" },
                        { id: 7, name: "Oud Wood", desc: "Boisé, rare, sensuel", price: 1600, category: "homme", promo: true, image: "https://images.unsplash.com/photo-1594035910165-b2b9b1b6d9b0?w=400&auto=format" },
                        { id: 8, name: "Baccarat Rouge 540", desc: "Ambre & jasmin, légendaire", price: 2000, category: "femme", promo: false, image: "https://images.unsplash.com/photo-1615631496003-2a3c3f5d4f7c?w=400&auto=format" }
                    ];
                    saveToLocalStorage();
                    renderProducts();
                    afterRender();
                    renderAdminProductList();
                });
        }
    });

    // Lancement
    loadProducts();
});