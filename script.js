/* ------------------------------------------
   1. BASE DE DADOS DE PRODUTOS (MOCK)
   ------------------------------------------ */
const productsDatabase = [
    {
        id: 1,
        name: "Bolo Red Velvet Premium",
        category: "bolos",
        price: 120.00,
        rating: 5,
        popular: 10,
        badge: "Mais Vendido",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80",
        description: "Massa aveludada com recheio tradicional de cream cheese e frutas vermelhas."
    },
    {
        id: 2,
        name: "Caixa Brigadeiros Gourmet (12un)",
        category: "docinhos",
        price: 45.00,
        rating: 5,
        popular: 8,
        badge: "Destaque",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
        description: "Variedade de sabores: ao leite, pistache, nozes e belga intenso."
    },
    {
        id: 3,
        name: "Torta de Limão Siciliano",
        category: "tortas",
        price: 85.00,
        rating: 4,
        popular: 6,
        badge: "Refrescante",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
        description: "Base crocante de biscoito, creme leve de limão e merengue tostado."
    },
    {
        id: 4,
        name: "Bolo Trufado de Chocolate",
        category: "bolos",
        price: 110.00,
        rating: 5,
        popular: 9,
        badge: "Novo",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
        description: "Massa 70% cacau com ganache intensa e raspas de chocolate nobre."
    }
];

/* Estado da Aplicação */
let cart = [];

/* ------------------------------------------
   2. INICIALIZAÇÃO E EVENTOS
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsDatabase);
    initCarousel();
    initHeaderScroll();
    initPromoModal();
});

/* ------------------------------------------
   3. RENDERIZAÇÃO E FILTROS DO CATÁLOGO
   ------------------------------------------ */
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');

function renderProducts(products) {
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Nenhum produto encontrado.</p>`;
        return;
    }

    products.forEach(product => {
        const stars = '<i class="fa-solid fa-star"></i>'.repeat(product.rating);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <span class="product-badge">${product.badge}</span>
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">${stars}</div>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Adicionar ao carrinho">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

/* Lógica de Filtro e Busca Instantânea */
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filtered = productsDatabase.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'todos' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sort === 'preco-menor') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'preco-maior') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'relevancia') filtered.sort((a, b) => b.popular - a.popular);

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
sortFilter.addEventListener('change', filterProducts);

/* ------------------------------------------
   4. GERENCIAMENTO DO CARRINHO DE COMPRAS
   ------------------------------------------ */
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total-value');

document.getElementById('open-cart').addEventListener('click', () => cartDrawer.classList.add('open'));
document.getElementById('close-cart').addEventListener('click', () => cartDrawer.classList.remove('open'));

function addToCart(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} foi adicionado ao carrinho!`);
}

function updateCartQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartCountEl.textContent = count;
    cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/* ------------------------------------------
   5. CHECKOUT E MODAIS
   ------------------------------------------ */
const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCheckout = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast("Seu carrinho está vazio!");
        return;
    }
    cartDrawer.classList.remove('open');
    checkoutModal.classList.add('open');
});

closeCheckout.addEventListener('click', () => checkoutModal.classList.remove('open'));

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Pedido efetuado com sucesso! Obrigado pela preferência.");
    cart = [];
    updateCartUI();
    checkoutModal.classList.remove('open');
    checkoutForm.reset();
});

/* Popup Promocional */
function initPromoModal() {
    const promoModal = document.getElementById('promo-modal');
    setTimeout(() => {
        promoModal.classList.add('open');
    }, 3000);

    document.getElementById('close-promo').addEventListener('click', () => promoModal.classList.remove('open'));
    document.getElementById('btn-claim-coupon').addEventListener('click', () => {
        showToast("Cupom DOCE10 copiado!");
        promoModal.classList.remove('open');
    });
}

/* ------------------------------------------
   6. CARROSSEL DE BANNERS
   ------------------------------------------ */
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    }

    document.querySelector('.next-slide').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.querySelector('.prev-slide').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

/* ------------------------------------------
   7. UTILITÁRIOS (TOASTS, SCROLL & HEADER)
   ------------------------------------------ */
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

/* Back to Top & Header Smart Hide */
const backToTop = document.getElementById('backToTop');
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scroll-down');
    } else {
        header.classList.remove('scroll-down');
    }
    lastScroll = currentScroll;
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
