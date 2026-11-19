const currentUser = localStorage.getItem('currentUser');
let cart = JSON.parse(localStorage.getItem('cart_' + currentUser)) || [];

function render(){
    const cartItems = document.getElementById('cartItems');
    if(!cartItems || !currentUser) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index)=>{
        const price = parseInt(item.price.replace(/\D/g,''));
        total += price * item.qty;

        const div = document.createElement('div');
        div.classList.add('cart-item');

        // Thêm dấu / vào trước item.image để gọi đúng từ gốc
        const displayImage = "/" + item.image.replace(/^\//, "");

        div.innerHTML = `
            <div class="cart-product">
                <img src="${displayImage}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p class="size">Size: ${item.size}</p>
                    <p>${item.price}</p>
                </div>
            </div>
            <div class="cart-qty">
                <div class="qty-box">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-total">
                ${(price * item.qty).toLocaleString()} VND
                <br>
                <span class="remove" onclick="removeItem(${index})">Remove</span>
            </div>
        `;
        cartItems.appendChild(div);
    });
    document.getElementById('total').textContent = "Estimated total: " + total.toLocaleString() + " VND";
}

function changeQty(i, val){
    cart[i].qty += val;
    if(cart[i].qty < 1) cart[i].qty = 1;
    localStorage.setItem('cart_' + currentUser, JSON.stringify(cart));
    render();
}

function removeItem(i){
    cart.splice(i,1);
    localStorage.setItem('cart_' + currentUser, JSON.stringify(cart));
    render();
}

render();