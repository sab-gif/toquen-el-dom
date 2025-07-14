#Dockerfile for Nginx
#Base imagen

FROM nginx:stable-alpine-slim

#copy static files
COPY . /usr/share/nginx/html/

#run related to users
RUN chown -R nginx:nginx /usr/share/nginx/html/ && chown -R nginx:nginx /var/cache/nginx && chown -R nginx:nginx /var/run/

#open as unpriviledged user
USER nginx

#Expose port 80
EXPOSE 80

#Start Nginx
CMD ["nginx", "-g", "daemon off;"]