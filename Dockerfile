# Sử dụng Node.js image
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy các file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# # Kiểm tra cài đặt ts-node
RUN npm install -g ts-node

# Biên dịch TypeScript sang JavaScript
RUN npm run build

# Mở cổng mà ứng dụng sử dụng
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
