# Sử dụng image PostgreSQL chính thức
FROM postgres:16.4

# Thiết lập biến môi trường
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=1234
ENV POSTGRES_DB=gym_app

# Sao chép file SQL chứa dữ liệu vào thư mục khởi tạo
COPY gym_app.sql /docker-entrypoint-initdb.d/
