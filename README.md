# COZY WORLDWIDE — Fashion Storefront Web Application

Website thương mại điện tử thời trang streetwear xây dựng với giao diện trang chủ danh sách sản phẩm, trang chi tiết sản phẩm (chọn size, số lượng, thêm vào giỏ hàng), trang giỏ hàng và luồng đăng nhập / đăng ký tài khoản[cite: 1, 3, 4, 5, 6].

## Cấu trúc dự án
- `index.html`: Trang chủ hiển thị banner và danh sách 16 sản phẩm thời trang.
- `product.html`: Trang chi tiết sản phẩm theo `id`, hỗ trợ chọn size (`S`, `M`, `L`), điều chỉnh số lượng và thêm vào giỏ hàng[cite: 5].
- `cart.html`: Trang giỏ hàng hiển thị sản phẩm đã chọn, số lượng, tổng tiền ước tính (`VND`) và nút thanh toán[cite: 1].
- `login.html` & `register.html`: Giao diện đăng nhập, đăng ký và quản lý trạng thái phiên người dùng[cite: 4, 6].
- `Dockerfile`: Đóng gói ứng dụng web tĩnh lên `nginx:alpine` tại cổng `80`.

## Công nghệ sử dụng
- **Frontend:** HTML5, CSS3 (`style.css`, `home.css`, `product.css`, `cart.css`), JavaScript (`product.js`, `cart.js`, `auth.js`)[cite: 1, 3, 4, 5, 6].
- **Icons:** Font Awesome[cite: 1, 3, 4, 5, 6].
- **Containerization:** Docker (`nginx:alpine`)[cite: 2].

## Hướng dẫn chạy dự án

### Cách 1: Chạy trực tiếp trên máy (Local)
1. Clone repository về máy:
   ```bash
   git clone [https://github.com/username-cua-ban/cozy-worldwide-web.git](https://github.com/username-cua-ban/cozy-worldwide-web.git)
   cd cozy-worldwide-web