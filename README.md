# COZY WORLDWIDE — Fashion Storefront Web Application

**Live Demo:** [https://quyetleee.github.io/cozy-worldwide-testweb/](https://quyetleee.github.io/cozy-worldwide-testweb/)

A streetwear e-commerce storefront web application designed with a clean visual hierarchy and smooth shopping flows, including a product catalog homepage, product detail pages (size & quantity selection, add-to-cart), shopping cart management, and user authentication screens.

## Key Features & Structure

* **`index.html`**: Storefront homepage featuring hero banners and a 16-item streetwear product catalog.
* **`product.html`**: Dynamic product detail page by `id`, supporting size selection (`S`, `M`, `L`), quantity adjustment, and cart integration.
* **`cart.html`**: Shopping cart interface displaying selected items, quantities, estimated total (`VND`), and checkout flow.
* **`login.html` & `register.html`**: User authentication interfaces with client-side session state handling.
* **`Dockerfile`**: Containerized static web deployment using `nginx:alpine` on port `80`.

## Tech Stack

* **Frontend:** HTML5, CSS3 (`style.css`, `home.css`, `product.css`, `cart.css`), Vanilla JavaScript (`product.js`, `cart.js`, `auth.js`)
* **Icons:** Font Awesome
* **Containerization:** Docker (`nginx:alpine`)

## Getting Started

### Run Locally
1. Clone the repository:
   ```bash
   git clone [https://github.com/Quyetleee/cozy-worldwide-testweb.git](https://github.com/Quyetleee/cozy-worldwide-testweb.git)
   cd cozy-worldwide-testweb
