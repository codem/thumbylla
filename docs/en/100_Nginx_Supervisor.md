# Setting up a Thumbor server with Nginx + Supervisor

## Prerequisites

You'll need sudo on a Linux server, some basic knowledge of PIP, Nginx, Supervisor and some basic command line knowledge.

## Installation

### 1. PIP

If it's not already installed, install [PIP](https://pip.pypa.io/en/stable/installing/), so you can install Thumbor.

### 2. Supervisor

If it's not already installed, install [Supervisor](http://supervisord.org/). On Ubuntu you would ```sudo apt install supervisor```

> Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems

### 3. Nginx

Install Nginx in whichever way you want. You can use a pre-existing install or have a standalone install. The most important thing is that you have an Nginx server accepting and proxying requests.

### 4. Thumbor

Install Thumbor using PIP, which provides the most up-to-date versions.

```
sudo pip install thumbor pycurl
```

## Configuration

### Thumbor

> A really good reference is the [Thumbor configuration documentation](http://thumbor.readthedocs.io/en/latest/configuration.html)

```
sudo mkdir /etc/thumbor
sudo thumbor-config > /etc/thumbor/my-thumbor.conf
```

For the most basic configuration, modify the following values

+ SECURITY_KEY: change this to something random and lengthy, it will be used to generate thumbnails. **Anyone who has the key can generate thumbnails.**
+ ALLOW_UNSAFE_URL: change to ```False```
+ HTTP_LOADER_DEFAULT_USER_AGENT: you can modify the user agent used to retrieve original files
+ HTTP_LOADER_PROXY_HOST, HTTP_LOADER_PROXY_PORT: modify if you are behind a proxy
+ FILE_STORAGE_ROOT_PATH: For basic setup, use file storage. This option sets the local location for result/thumbnail storage. Other storage and result storage options are available.
+ ALLOWED_SOURCES: set domain values including wildcards, limiting image generation to images from these hosts/sources.

You can tweak other values as required.


### Supervisor

> The following supervisor configuration will start 4 thumbor processes (numprocs=4) on ports 11100 to 11103 ( --port=1110%(process_num)s ).

You can use any port range that is free and tweak the number of processes, maybe you only need 1?

```
[program:thumbor]
command=thumbor --port=1110%(process_num)s --conf=/etc/thumbor/my-thumbor.conf
process_name=thumbor_1110%(process_num)s
user=username
# this will start 4 processes on ports 11100 to 11103
numprocs=4
# you can tweak these settings as you see fit
autostart=true
autorestart=true
startretries=3
```

Where ```username``` is a user that can write to the FILE_STORAGE_ROOT_PATH. It should *not* be root.

Restart supervisor, check for running processes, look in supervisor logs for errors if there are issues.

### Nginx

Set up Nginx to proxy requests to the Thumbor server.

```
# The Thumbor upstream
# Reference: http://nginx.org/en/docs/http/ngx_http_upstream_module.html
upstream thumbor {
	# these port numbers need to match --port=1110%(process_num)s in supervisor
	server 127.0.0.1:11100;
	server 127.0.0.1:11101;
	server 127.0.0.1:11102;
	server 127.0.0.1:11103;
}
server {

	# Optionally allow http if you want non-https requests.
	# listen *:80;
	# basic https config
	listen *:443 http2;
	# Basic setup - tweak your SSL/TLS config here
	ssl_certificate /path/to/crt;
	ssl_certificate_key /path/to/key;

	# serve images off a wildcard domain, modify to use yours
	server_name *.cdn.example.com;

	# optionally create this root with an index.html
	# nothing is stored here
	root /var/www/thumbor;

	# log locations, tweak error log levels as required
	error_log /path/to/error.log info;
	access_log /path/to/access.log;

	location / {
		# pass all requests to the upstream configured above
		proxy_pass http://thumbor;
		# hide the following headers, avoids authentication prompts being passed through
		proxy_hide_header WWW-Authenticate;
		proxy_hide_header Proxy-Authenticate;
		# intercept any errors from Thumbor
		proxy_intercept_errors on;
		# add the upstream status if you like, to assist in debugging
		add_header X-Upstream-Status $upstream_status;
		# serve any errors returned from the proxy as a 404 page
		error_page 400 401 402 403 404 405 406 407 408 409 410 500 501 502 503 504 511 =404 @proxyerror;
	}

	location @proxyerror {
		add_header X-Upstream-Error $upstream_status;
	}

	# avoid logs filling up with this
	location = /favicon.ico {
		log_not_found off;
		access_log off;
	}

	# and this
	location = /robots.txt {
		log_not_found off;
		access_log off;
	}

}
```

### Options

Your ```server_name``` settings are important here, for instance in this setup you could limit your server names to a restricted set e.g ```image1.cdn.example.com```, ```image2.cdn.example.com``` rather than a wildcard.

Test your configuration ```sudo nginx -t``` and reload nginx.

### Next steps

Once the module is installed and configured, you can monitor requests by looking at both the Supervisor and Nginx logs.


## Troubleshooting

1. Check your website error logs
2. Check supervisor error logs

To debug thumbor using supervisor change the command to:
```command=thumbor --port=1110%(process_num)s --conf=/etc/thumbor/thumbor.conf --log-level=debug```
