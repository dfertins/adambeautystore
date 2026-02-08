let products = [
    { id: 1, name: "Гиалуроновая сыворотка", price: 5500, oldPrice: 6500, category: "face", image: "../images/8.png", badge: "популярное" },
    { id: 2, name: "Ночной крем", price: 4800, oldPrice: null, category: "face", image: "../images/9.png", badge: null },
    { id: 3, name: "Шампунь для волос", price: 3200, oldPrice: 4000, category: "hair", image: "../images/10.png", badge: "хит" },
    { id: 4, name: "Подарочный набор", price: 12900, oldPrice: 15000, category: "sets", image: "../images/11.png", badge: "скидка" },
    { id: 5, name: "Тоник для лица", price: 2900, oldPrice: null, category: "face", image: "../images/19.png", badge: "новинка" },
    { id: 6, name: "Сыворотка ночная", price: 5200, oldPrice: 6200, category: "face", image: "../images/18.png", badge: "акция" },
    { id: 7, name: "Кондиционер для волос", price: 3500, oldPrice: null, category: "hair", image: "../images/20.png", badge: null },
    { id: 8, name: "Мини-набор подарочный", price: 8900, oldPrice: 10900, category: "sets", image: "../images/21.png", badge: "акция" },
    { id: 9, name: "Коллекция Brand X", price: 7600, oldPrice: null, category: "brands", image: "../images/22.png", badge: "бренд" },
    { id: 10, name: "Пудра-нюд", price: 3200, oldPrice: null, category: "face", image: "../images/23.png", badge: null },
    { id: 11, name: "Крем SPF 50", price: 3200, oldPrice: 4000, category: "face", image: "../images/24.png", badge: "акция" },
    { id: 12, name: "Маска для волос", price: 2100, oldPrice: 2600, category: "hair", image: "../images/25.png", badge: "новинка" },
    { id: 13, name: "Сыворотка для роста", price: 4200, oldPrice: 5200, category: "hair", image: "../images/26.png", badge: "акция" },
    { id: 14, name: "Термозащита", price: 1600, oldPrice: null, category: "hair", image: "../images/27.png", badge: null },
    { id: 15, name: "Спрей блеск", price: 1900, oldPrice: null, category: "hair", image: "../images/28.png", badge: null },
    { id: 16, name: "Подарочный сет 'Люкс'", price: 15900, oldPrice: 18900, category: "sets", image: "../images/29.png", badge: "скидка" },
    { id: 17, name: "Подарочный сет мини", price: 7900, oldPrice: null, category: "sets", image: "../images/30.png", badge: null },
    { id: 18, name: "Набор ухода за лицом", price: 12900, oldPrice: 14900, category: "sets", image: "../images/31.png", badge: "акция" },
    { id: 19, name: "Подарочный набор для волос", price: 9900, oldPrice: null, category: "sets", image: "../images/32.png", badge: null },
    { id: 20, name: "Коллекция Brand Y", price: 8600, oldPrice: null, category: "brands", image: "../images/19.png", badge: "бренд" },
    { id: 21, name: "Коллекция Brand Z", price: 9200, oldPrice: null, category: "brands", image: "../images/24.png", badge: "бренд" },
    { id: 22, name: "Профессиональная серия", price: 14500, oldPrice: 16500, category: "brands", image: "../images/11.png", badge: "акция" },
    { id: 23, name: "Эксклюзивный набор", price: 19800, oldPrice: 22800, category: "brands", image: "../images/31.png", badge: "новинка" },
    { id: 24, name: "Коллекция Limited", price: 12500, oldPrice: null, category: "brands", image: "../images/20.png", badge: "бренд" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';

function resolveImagePath(image) {
    if (location.pathname.includes('/pages/')) {
        return image.startsWith('../') ? image : `../${image.replace(/^\/+/, '')}`;
    }
    return image.startsWith('../') ? image.replace(/^\.\.\//, '') : image;
}

function getQueryParam(name) {
    const params = new URLSearchParams(location.search);
    return params.get(name);
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2218%22%3ENo Image%3C/text%3E%3C/svg%3E';

function displayProducts(productsToShow, limit) {
    const container = document.getElementById('best-sellers-container');
    if (!container) return;

    container.innerHTML = '';

    const list = typeof limit === 'number' ? productsToShow.slice(0, limit) : productsToShow;

    list.forEach(product => {
        const catalogHref = (location.pathname.includes('/pages/')) ? 'catalog.html' : 'pages/catalog.html';
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const imgSrc = product && product.image ? resolveImagePath(product.image) : (products.find(p => p.id === product.id && p.image) ? resolveImagePath(products.find(p => p.id === product.id).image) : PLACEHOLDER_IMAGE);
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <a class="product-link" href="${catalogHref}?category=${encodeURIComponent(product.category)}">
                <div class="product-image">
                    <img src="${imgSrc}" alt="${product.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';">
                </div>
                <h3 class="product-name">${product.name}</h3>
            </a>
            <div class="product-price">
                ${product.oldPrice ? `<span class="product-price old">${product.oldPrice.toLocaleString()} ₸</span>` : ''}
                ${product.price.toLocaleString()} ₸
            </div>
            <div class="product-actions">
                <button class="action-btn" onclick="event.stopPropagation(); addToFavorites(${product.id})"><i class="far fa-heart"></i></button>
                <button class="action-btn" onclick="event.stopPropagation(); addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

function displayCatalog(productsToShow) {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    container.innerHTML = '';
    if (!productsToShow.length) {
        container.innerHTML = '<p class="text-center">Товаров не найдено</p>';
        return;
    }
    const catalogHrefBase = (location.pathname.includes('/pages/')) ? 'catalog.html' : 'pages/catalog.html';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const imgSrc = product && product.image ? resolveImagePath(product.image) : (products.find(p => p.id === product.id && p.image) ? resolveImagePath(products.find(p => p.id === product.id).image) : PLACEHOLDER_IMAGE);
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <a class="product-link" href="${catalogHrefBase}?category=${encodeURIComponent(product.category)}">
                <div class="product-image">
                    <img src="${imgSrc}" alt="${product.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';">
                </div>
                <h3 class="product-name">${product.name}</h3>
            </a>
            <div class="product-price">
                ${product.oldPrice ? `<span class="product-price old">${product.oldPrice.toLocaleString()} ₸</span>` : ''}
                ${product.price.toLocaleString()} ₸
            </div>
            <div class="product-actions">
                <button class="action-btn" onclick="event.stopPropagation(); addToFavorites(${product.id})"><i class="far fa-heart"></i></button>
                <button class="action-btn" onclick="event.stopPropagation(); addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

function getFavorites() {
    const raw = JSON.parse(localStorage.getItem('favorites')) || [];
    return raw.map(f => {
        if (!f) return null;
        if (typeof f === 'number' || typeof f === 'string') return products.find(p => p.id == f) || null;
        if (typeof f === 'object' && f.id) return products.find(p => p.id === f.id) || f;
        return null;
    }).filter(Boolean);
}

function renderFavoritesView() {
    const favorites = getFavorites();
    displayCatalog(favorites);
    const total = favorites.reduce((sum, p) => sum + (p.price || 0), 0);
    const totalEl = document.getElementById('total-price');
    if (totalEl) totalEl.textContent = total.toLocaleString();
    const checkoutBtn = document.querySelector('.cart-summary .btn-primary');
    if (checkoutBtn) {
        checkoutBtn.textContent = 'Добавить все в корзину';
        checkoutBtn.onclick = addFavoritesToCart;
        checkoutBtn.style.display = favorites.length ? '' : 'none';
    }
}

function addFavoritesToCart() {
    const favorites = getFavorites();
    favorites.forEach(f => {
        const existing = cart.find(c => c.id === f.id);
        if (existing) existing.quantity += 1; else cart.push({ ...f, quantity: 1 });
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
    const href = location.pathname.includes('/pages/') ? 'catalog.html?view=cart' : 'pages/catalog.html?view=cart';
    window.location.href = href;
}

function renderCartView() {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    container.innerHTML = '';
    if (!cart.length) {
        container.innerHTML = '<p class="text-center">Корзина пуста</p>';
        const totalEl = document.getElementById('total-price'); if (totalEl) totalEl.textContent = '0';
        const checkoutBtn = document.querySelector('.cart-summary .btn-primary'); if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    cart.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const imgSrc = item && item.image ? resolveImagePath(item.image) : (products.find(p => p.id === item.id && p.image) ? resolveImagePath(products.find(p => p.id === item.id).image) : PLACEHOLDER_IMAGE);
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${imgSrc}" alt="${item.name}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';">
            </div>
            <h3 class="product-name">${item.name}</h3>
            <div class="product-price">${item.price.toLocaleString()} ₸</div>
            <div class="product-qty">Кол-во: <button class="qty-btn" onclick="changeCartQuantity(${item.id}, -1)">−</button> ${item.quantity} <button class="qty-btn" onclick="changeCartQuantity(${item.id}, 1)">+</button></div>
            <div class="product-actions">
                <button class="action-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        container.appendChild(productCard);
    });
    updateTotalPrice();
    const checkoutBtn = document.querySelector('.cart-summary .btn-primary');
    if (checkoutBtn) { checkoutBtn.textContent = 'Оформить заказ'; checkoutBtn.onclick = checkout; checkoutBtn.style.display = ''; }
}

function changeCartQuantity(productId, delta) {
    const idx = cart.findIndex(i => i.id === productId);
    if (idx === -1) return;
    cart[idx].quantity += delta;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
    if (getQueryParam('view') === 'cart') renderCartView();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
    if (getQueryParam('view') === 'cart') renderCartView();
}

function filterCatalog(category) {
    let filtered = products;
    if (category === 'sale') {
        filtered = products.filter(p => p.badge && (p.badge.toLowerCase().includes('скид') || p.badge.toLowerCase().includes('акц') || p.badge.toLowerCase().includes('акция')));
    } else if (category === 'new') {
        filtered = products.filter(p => p.badge && p.badge.toLowerCase().includes('нов'));
    } else if (category === 'brands') {
        filtered = products.filter(p => p.category === 'brands');
    } else if (category !== 'all') {
        filtered = products.filter(product => product.category === category);
    }
    displayCatalog(filtered);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

function initSimpleSlider() {
    const slides = document.querySelectorAll('.hero-image .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dot.classList.add('active');
        });
    });
}

function filterProducts(category) {
    currentCategory = category;
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
    updateActiveFilter(category);
}

function updateActiveFilter(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Товар добавлен в корзину!');
}

function addToFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const favoriteBtn = document.querySelector(`[onclick*="addToFavorites(${productId})"]`);
    const isFavorite = favorites.some(fav => fav.id === productId);
    
    if (!isFavorite) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification('Товар добавлен в избранное!');
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ffd700';
            }
        }
    } else {
        favorites = favorites.filter(fav => fav.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification('Товар удалён из избранного');
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        }
    }

    updateFavoritesCount();

    if (getQueryParam('view') === 'favorites') {
        renderFavoritesView();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-accent-blue);
        color: white;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-medium);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function checkStock() {
    products.forEach(product => {
        if (product.price > 5000) {
            console.log(`${product.name} - Премиум товар`);
        } else {
            console.log(`${product.name} - Стандартный товар`);
        }
    });
}

function initSliders() {
    const slides = document.querySelectorAll('.hero-image .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            dot.classList.add('active');
        });
    });
    
    let currentSlide = 0;
    setInterval(() => {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }, 5000);
}

function updateFavoritesCount() {
    const favoritesCount = document.querySelector('.favorites-count');
    if (favoritesCount) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesCount.textContent = favorites.length;
        favoritesCount.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
}

function initSearch() {
    const searchBtn = document.querySelector('.icon-btn[aria-label="Поиск"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchModal = document.createElement('div');
            searchModal.className = 'search-modal';
            searchModal.innerHTML = `
                <div class="search-modal-content">
                    <div class="search-header">
                        <input type="text" id="searchInput" class="search-input" placeholder="Поиск товаров...">
                        <button class="search-close">&times;</button>
                    </div>
                    <div class="search-results" id="searchResults"></div>
                </div>
            `;
            document.body.appendChild(searchModal);
            
            const searchInput = searchModal.querySelector('#searchInput');
            const searchResults = searchModal.querySelector('#searchResults');
            const closeBtn = searchModal.querySelector('.search-close');
            
            searchInput.focus();
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (query.length === 0) {
                    searchResults.innerHTML = '';
                    return;
                }
                
                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query)
                );
                
                if (filtered.length === 0) {
                    searchResults.innerHTML = '<p class="no-results">Товары не найдены</p>';
                    return;
                }
                
                searchResults.innerHTML = '';
                filtered.forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'search-item';
                    const imgSrc = resolveImagePath(product.image);
                    item.innerHTML = `
                        <img src="${imgSrc}" alt="${product.name}">
                        <div class="search-item-info">
                            <h4>${product.name}</h4>
                            <p class="search-price">${product.price.toLocaleString()} ₸</p>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        window.location.href = location.pathname.includes('/pages/') ? 
                            `catalog.html?category=${product.category}` : 
                            `pages/catalog.html?category=${product.category}`;
                    });
                    searchResults.appendChild(item);
                });
            });
            
            closeBtn.addEventListener('click', () => {
                searchModal.remove();
            });
            
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.remove();
                }
            });
        });
    }
}

function getAvatarColor(name) {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
        '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894',
        '#00cec9', '#55efc4', '#81ecec', '#74b9ff', '#0984e3'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Заполните все поля');
                return;
            }
            
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const newReview = {
                id: Date.now(),
                name: name,
                stars: 5,
                text: message,
                date: new Date().toLocaleDateString()
            };
            
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            
            showNotification('Спасибо за отзыв!');
            contactForm.reset();
            
            if (location.pathname.includes('/pages/')) {
                window.location.href = '../index.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }
}

function loadReviews() {
    const reviewsContainer = document.querySelector('.reviews-slider');
    if (!reviewsContainer) return;
    
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    if (savedReviews.length === 0) return;
    
    savedReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.stars) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        const avatarColor = getAvatarColor(review.name);
        const initials = getInitials(review.name);
        reviewCard.innerHTML = `
            <div class="review-avatar" style="background-color: ${avatarColor}; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 24px;">
                ${initials}
            </div>
            <h4 class="review-name">${review.name}</h4>
            <div class="review-stars">${starsHtml}</div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

function updateFavoriteIcons() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('[onclick*="addToFavorites"]').forEach(btn => {
        const match = btn.getAttribute('onclick').match(/addToFavorites\((\d+)\)/);
        if (match) {
            const productId = parseInt(match[1]);
            const isFavorite = favorites.some(f => f.id === productId);
            const icon = btn.querySelector('i');
            if (icon) {
                if (isFavorite) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#ffd700';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products, 4);
    updateCartCount();
    updateFavoritesCount();
    checkStock();
    initMobileMenu();
    initSliders();
    initSearch();
    initContactForm();
    loadReviews();
    updateFavoriteIcons();
    
    const subscribeBtn = document.querySelector('.newsletter .btn');
    const emailInput = document.querySelector('.newsletter input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Введите email');
                return;
            }
            
            if (!email.includes('@')) {
                showNotification('Введите корректный email');
                return;
            }
            
            showNotification('Спасибо за подписку!');
            emailInput.value = '';
        });
    }
    
    const catalogContainer = document.getElementById('catalog-container');
    const favIcon = document.querySelector('.icon-btn[aria-label="Избранное"]');
    if (favIcon) {
        favIcon.addEventListener('click', () => {
            const href = location.pathname.includes('/pages/') ? 'catalog.html?view=favorites' : 'pages/catalog.html?view=favorites';
            window.location.href = href;
        });
    }

    const cartIcon = document.querySelector('.icon-btn[aria-label="Корзина"]');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            const href = location.pathname.includes('/pages/') ? 'catalog.html?view=cart' : 'pages/catalog.html?view=cart';
            window.location.href = href;
        });
    }

    if (catalogContainer) {
        const params = new URLSearchParams(location.search);
        const view = params.get('view');
        const initialCategory = params.get('category');

        if (view === 'favorites') {
            renderFavoritesView();
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        } else if (view === 'cart') {
            renderCartView();
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        } else if (initialCategory) {
            filterCatalog(initialCategory);
        } else {
            displayCatalog(products);
        }

        document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => filterCatalog(btn.dataset.category)) );
    } else {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => filterProducts(btn.dataset.category)) );
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cart-count,
    .favorites-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--color-accent-pink);
        color: white;
        font-size: 11px;
        font-weight: 600;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10;
        pointer-events: none;
    }
`;
document.head.appendChild(style);


const CONFIG = {
    stats: {
        customers: 5000,
        products: 150,
        cities: 50,
        reviews: 98
    },
    animation: {
        duration: 2000,
        delay: 300
    }
};

let statsAnimated = false;

function animateStatistics() {
    if (statsAnimated) return;
    
    const statElements = {
        customers: document.querySelector('.stat-number[data-count="5000"]'),
        products: document.querySelector('.stat-number[data-count="150"]'),
        cities: document.querySelector('.stat-number[data-count="50"]'),
        reviews: document.querySelector('.stat-number[data-count="98"]')
    };
    
    Object.values(statElements).forEach(stat => { if (!stat) return; });
    
    animateNumber(statElements.customers, CONFIG.stats.customers, ''); animateNumber(statElements.products, CONFIG.stats.products, ''); animateNumber(statElements.cities, CONFIG.stats.cities, ''); animateNumber(statElements.reviews, CONFIG.stats.reviews, '%'); statsAnimated = true;
}

function animateNumber(element, target, suffix = '') {
    if (!element) return;
    
    const duration = CONFIG.animation.duration;
    const step = target / (duration / 16);
    let current = 0;
    
    element.textContent = '0' + suffix;
    element.classList.add('count-up');
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function checkImagesLoad() {
    const images = document.querySelectorAll('.about-image img, .team-member img');
    
    images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) { console.warn(`Изображение не загрузилось: ${img.src}`); if (img.classList.contains('team-photo')) img.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'; else if (img.classList.contains('founder-photo')) img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'; }
        img.onerror = function() { console.error(`Ошибка загрузки изображения: ${this.src}`); const parent = this.parentElement; const fallback = parent.querySelector('.image-fallback'); if (fallback) { this.style.display = 'none'; fallback.style.display = 'flex'; } };
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add(animationClass);
                    element.style.opacity = '1';
                    
                    if (element.classList.contains('stats')) setTimeout(animateStatistics, 500);
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initParallaxEffect() {
    const heroSection = document.querySelector('.about-hero');
    
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

function initHoverEffects() {
    const valueCards = document.querySelectorAll('.value-card');
    const teamMembers = document.querySelectorAll('.team-member');
    
    valueCards.forEach(card => { card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-8px) scale(1.02)'; }); card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; }); }); teamMembers.forEach(member => { member.addEventListener('mouseenter', () => { const image = member.querySelector('img'); if (image) image.style.transform = 'scale(1.1)'; }); member.addEventListener('mouseleave', () => { const image = member.querySelector('img'); if (image) image.style.transform = 'scale(1)'; }); });
}

function initButtons() {
    const ctaButton = document.querySelector('.cta-btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            ctaButton.style.transform = 'scale(0.95)'; setTimeout(() => { ctaButton.style.transform = 'scale(1)'; window.location.href = 'catalog.html'; }, 200);
        });
    }
}

function initImageModal() {
    const images = document.querySelectorAll('.about-image img, .team-member img');
    
    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div'); modal.className = 'image-modal'; modal.innerHTML = `<div class="modal-content"><span class="close-modal">&times;</span><img src="${img.src}" alt="${img.alt}"></div>`; modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s ease;'; const modalContent = modal.querySelector('.modal-content'); modalContent.style.cssText = 'position: relative; max-width: 90%; max-height: 90%;'; const modalImg = modal.querySelector('img'); modalImg.style.cssText = 'width: 100%; height: auto; border-radius: var(--radius-medium);'; const closeBtn = modal.querySelector('.close-modal'); closeBtn.style.cssText = 'position: absolute; top: -40px; right: 0; color: white; font-size: 30px; cursor: pointer; background: none; border: none;'; document.body.appendChild(modal); closeBtn.addEventListener('click', () => { modal.style.animation = 'fadeOut 0.3s ease'; setTimeout(() => modal.remove(), 300); }); modal.addEventListener('click', (e) => { if (e.target === modal) { modal.style.animation = 'fadeOut 0.3s ease'; setTimeout(() => modal.remove(), 300); } }); const style = document.createElement('style'); style.textContent = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }'; document.head.appendChild(style);
        });
    });
}

function initAboutPage() { console.log('Инициализация страницы "О нас"...'); setTimeout(checkImagesLoad, 1000); initScrollAnimations(); initParallaxEffect(); initHoverEffects(); initButtons(); initImageModal(); setTimeout(() => { if (document.querySelector('.stats')) animateStatistics(); }, 1000); initMobileMenu(); console.log('Страница "О нас" успешно инициализирована'); }

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

window.addEventListener('load', initAboutPage);



function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен! Сумма: ${total.toLocaleString()} ₸`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
    if (getQueryParam('view') === 'cart') {
        renderCartView();
    } else {
        displayProducts(products, 4);
    }
}
        
        function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const el = document.getElementById('total-price');
    if (el) el.textContent = total.toLocaleString();
    return total;
}
        

const originalAddToCart = addToCart;
addToCart = function(productId) {
    originalAddToCart(productId);
    updateTotalPrice();
    if (getQueryParam('view') === 'cart') renderCartView();
};