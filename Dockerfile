#Dockerfile for Nginx
#Base imagen

FROM nginx:latest

#copy static files
COPY . /usr/share/nginx/html/

#Expose port 80
EXPOSE 80

#Start Nginx
CMD ["nginx", "-g", "daemon off;"]