# # Use Nginx as the base image
# FROM nginx:alpine

# # Copy the Angular dist files to the Nginx HTML directory
# COPY /dist/navbar /usr/share/nginx/html

# # Copy custom NGINX configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

FROM httpd:2.4-alpine
RUN rm -r /usr/local/apache2/htdocs/*
RUN rm -r /usr/local/apache2/conf/httpd.conf
RUN mkdir /usr/local/apache2/htdocs/shared_ui
COPY httpd.config /usr/local/apache2/conf/httpd.conf
COPY ./dist/navbar/ /usr/local/apache2/htdocs/shared_ui/
RUN chmod -R 755 /usr/local/apache2/htdocs/shared_ui/
EXPOSE 80
