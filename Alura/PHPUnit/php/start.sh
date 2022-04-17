#!/bin/bash

#sed -i 's/newrelic.logfile = "/var/log/newrelic/php_agent.log"/newrelic.logfile = "/var/log/php_agent.log"/g' /usr/local/etc/php/conf.d/newrelic.ini
#sed -i 's/newrelic.daemon.logfile = "/var/log/newrelic/newrelic-daemon.log"/newrelic.daemon.logfile = "/var/log/newrelic-daemon.log"/g' /usr/local/etc/php/conf.d/newrelic.ini
#sed -i 's/;newrelic.daemon.app_connect_timeout =.*/newrelic.daemon.app_connect_timeout=15s/g' /usr/local/etc/php/conf.d/newrelic.ini
#sed -i 's/;newrelic.daemon.start_timeout =.*/newrelic.daemon.start_timeout=5s/g' /usr/local/etc/php/conf.d/newrelic.ini

#/usr/bin/newrelic-daemon start

/usr/local/sbin/php-fpm