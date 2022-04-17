FROM php:8.1.4-fpm

ENV XDEBUG_VERSION="3.0.4"
ENV LOG_TRACE=1
ENV PHP_MEMORY_LIMIT=2048M

ARG EXTENSION_PHP_DIR="/usr/local/lib/php/extensions/no-debug-non-zts-20200930"
ARG EXTENSION_PHP_NUMBER="20200930"

COPY php/start.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN sed -i -e 's/\r$//' /entrypoint.sh

#install_dependencies
RUN apt-get update && apt-get -y --no-install-recommends install \
    freetds-bin \
    freetds-dev \
    freetds-common \
    git \
    gnupg2 \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmemcached-dev \
    libpng-dev \
    libsybdb5 \
    libxml2-dev \
    libzip-dev \
    ssh \
    unzip \
    zlib1g \
    iproute2 \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/lib/x86_64-linux-gnu/libsybdb.a /usr/lib/

#PHP_extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    bcmath \
    gd \
    pcntl \
    pdo_dblib \
    pdo_mysql \
    soap \
    zip \
    mysqli

#ENV PECL_PACKAGES="igbinary memcached msgpack redis"
#RUN echo "" | pecl install $PECL_PACKAGES \
#    && docker-php-ext-enable $PECL_PACKAGES

RUN pecl install xdebug pcntl \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-enable pcntl

RUN pecl install apcu \
    && docker-php-ext-enable apcu \
    && echo "apc.enabled=1" >> /usr/local/etc/php/conf.d/apcu.ini \
    && echo "apc.enable_cli=1" >> /usr/local/etc/php/conf.d/apcu.ini

ARG XDEBUG_HOST
RUN sed -i \
    -e '$axdebug.mode=debug' \
    -e '$axdebug.start_with_request=yes' \
#    -e '$axdebug.client_host='$(/sbin/ip route list match 0/0 |awk '{ print $3 }') \
    -e '$axdebug.remote_handler=dbgp' \
    -e '$axdebug.client_port=9000' \
    -e '$axdebug.discover_client_host=1' \
    -e '$axdebug.idekey=XDEBUG_SESSION_START' \
    /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Get composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN echo "alias ll='ls -hl --color'" >> ~/.bashrc

RUN wget https://phar.phpunit.de/phpunit-9.phar -O/usr/bin/phpunit
RUN chmod 755 /usr/bin/phpunit

WORKDIR /var/www

EXPOSE 9000
CMD ["entrypoint.sh"]