/** * CONFIGURATION */
const CONFIG = {
    BACKEND_URL: window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'http://backend:5000',
    DEFAULT_IMG: 'img/default-product.webp'
};

/** * UTILITIES */
const formatPath = (path) => path ? `/${path.replace(/^FrontEnd\//, "").replace(/^\//, "")}` : CONFIG.DEFAULT_IMG;
const getEl = (id) => document.getElementById(id);

/** * QUANTITY LOGIC */
window.changeQty = (val) => {
    const qtyEl = getEl('qty');
    if (!qtyEl) return;
    let current = parseInt(qtyEl.textContent) || 1;
    qtyEl.textContent = Math.max(1, current + val);
};

/** * MAIN LOAD */
async function loadProduct() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) return;

    try {
        const res = await fetch(`${CONFIG.BACKEND_URL}/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const product = await res.json();
        renderUI(product);
        setupInteractions(product, productId);
    } catch (err) {
        console.error(err);
        getEl('name').textContent = "Product not found";
    }
}

function renderUI(product) {
    getEl('name').textContent = product.name || "Unknown Product";
    getEl('price').textContent = product.price || "0 VND";
    
    const mainImg = getEl('mainImg');
    if (mainImg) mainImg.src = formatPath(product.images?.[0]);

    // Thumbnails
    ['thumb1', 'thumb2'].forEach((id, idx) => {
        const el = getEl(id);
        if (el) el.src = formatPath(product.images?.[idx + 1] || product.images?.[0]);
    });

    // Click đổi ảnh chính
    document.querySelectorAll('.thumbs img').forEach((img, idx) => {
        img.onclick = () => { if(mainImg) mainImg.src = formatPath(product.images?.[idx]); };
    });

    // Description
    const descList = getEl('desc');
    if (descList && product.desc) {
        descList.innerHTML = product.desc.map(item => `<li>${item}</li>`).join('');
    }
}

/** * INTERACTION LOGIC */
function setupInteractions(product, productId) {
    // 1. CHỌN SIZE (Sửa lỗi không ăn event hoặc class active)
    const sizeBtns = document.querySelectorAll('.sizes button');
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });

    // 2. LOGIC THÊM GIỎ HÀNG (Dùng chung cho cả Add to Cart và Buy Now)
    const handleCartAction = (isBuyNow = false) => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return showToast("Please log in first!", "error");

        const selectedSize = document.querySelector('.sizes button.active')?.textContent;
        if (!selectedSize) return showToast("Please select a size!", "error");

        const qty = parseInt(getEl('qty').textContent) || 1;
        const storageKey = `cart_${currentUser}`;
        let cart = JSON.parse(localStorage.getItem(storageKey)) || [];

        const existing = cart.find(i => i.id === productId && i.size === selectedSize);
        const cleanImg = product.images?.[0]?.replace(/^FrontEnd\//, "").replace(/^\//, "") || "";

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                qty: qty,
                size: selectedSize,
                image: cleanImg
            });
        }

        localStorage.setItem(storageKey, JSON.stringify(cart));
        
        if (isBuyNow) {
            window.location.href = 'cart.html'; // Chuyển hướng ngay nếu là Buy Now
        } else {
            showToast("Added to cart!", "success");
        }
    };

    // Gán sự kiện cho 2 nút
    document.querySelector('.add-cart')?.addEventListener('click', () => handleCartAction(false));
    document.querySelector('.buy-now')?.addEventListener('click', () => handleCartAction(true));
}

function showToast(msg, type = "info") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

loadProduct();