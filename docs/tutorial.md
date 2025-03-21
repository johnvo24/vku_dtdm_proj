1. 
2. 
3. Add SSL certificate: https://www.youtube.com/watch?v=CW3r2L9Sluo
4. Docker:
  - Create .dockerignore & Dockerfile files
  - Build image: ```docker build -t gym_app_be .```
  - Show images: ```docker images```
  - Test (Local):
    - Run (background): ```docker run -d --name backend -p 3000:3000 --env-file .env gym_app_be```
    - Log: ```docker logs -f backend```
    - Show dockers: ```docker ps``` hoặc ```docker ps -a```
    - Stop container: ```docker stop backend```
    - Remove container: ```docker rm backend```
    - Remove image: ```docker rmi gym_app_be```
  - Note: <i>gym_app_be: image_name, backend: container_name</i>
5. Github: 
  - Push to github respository
6. 
