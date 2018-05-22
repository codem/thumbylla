# Setting up a Thumbor server with nginx + Supervisor

## Prerequisites

You'll need sudo on a Linux server, some basic knowledge of PIP, nginx, Supervisor and some basic command line knowledge.

## Installation

### 1. PIP

Install PIP: https://pip.pypa.io/en/stable/installing/

### 2. Supervisor

> Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems (http://supervisord.org)

Install supervisor if not already installed. On Ubuntu you would ```sudo apt install supervisor```

### 3. nginx

Install Nginx in whichever way you want,e.g from https://nginx.org/en/linux_packages.html#stable
You can use a pre-existing install or have a standalone install. The most important thing is that you have an nginx server accepting requests.

Configuring and tweaking an nginx installation is beyond the scope of this document - there are many, many resources for this on the web.

### 4. Thumbor

Install Thumbor using PIP. The Ubuntu PPA is out-of-date at this writing.

```
sudo pip install thumbor pycurl
```

## Configuration

### Thumbor

```
sudo mkdir /etc/thumbor
sudo thumbor-config > /etc/thumbor/thumbor.conf
```

For the most basic configuration, modify the following values

+ SECURITY_KEY: change this to something random and lengthy, it will be used to generate thumbnails. **Anyone who has the key can generate thumbnails and use up storage.**
+ ALLOW_UNSAFE_URL: change to ```False```
+ HTTP_LOADER_DEFAULT_USER_AGENT: you can modify the user agent used to retrieve original files
+ HTTP_LOADER_PROXY_HOST, HTTP_LOADER_PROXY_PORT: modify if you are behind a proxy
+ FILE_STORAGE_ROOT_PATH: set to your local location for thumbnail storage
+ ALLOWED_SOURCES: set domain values including wildcards, limiting image generation to these hosts

You can tweak other values as required.


### Supervisor

> The following supervisor configuration will start 4 thumbor processes (numprocs=4) on ports 12100 to 12103 ( --port=1210%(process_num)s ).

You can use any port range that is free and tweak the number of processes, maybe you only need 1?

```
[program:thumbor]
command=thumbor --port=1210%(process_num)s --conf=/etc/thumbor/thumbor.conf
process_name=thumbor_1210%(process_num)s
user=username
# this will start  processes on ports 12100 to 12103
numprocs=4
# you can tweak these settings as you see fit
autostart=true
autorestart=true
startretries=3
```

Where ```username``` is a user that can write to the FILE_STORAGE_ROOT_PATH. It should *not* be root.

Restart supervisor, check for running processes, look in supervisor logs for errors if there are issues.

### nginx

Set up an http proxy to handle incoming image requests, redirecting them to the thumbor server.
Optionally allow http if you want non-https requests

```
upstream thumbor {
	# these port numbers need to match --port=1210%(process_num)s in supervisor
	server 127.0.0.1:12100;
	server 127.0.0.1:12101;
	server 127.0.0.1:12102;
	server 127.0.0.1:12103;
}
server {

	# listen *:80;
	# basic https config
	listen *:443 ssl http2;
	# Basic setup - tweak your SSL/TLS config here
	ssl_certificate /path/to/crt;
	ssl_certificate_key /path/to/key;

	# serve images off a wildcard domain
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
		# hide the following headers
		proxy_hide_header WWW-Authenticate;
		proxy_hide_header Proxy-Authenticate;
		# intercept any errors from Thumbor
		proxy_intercept_errors on;
		# add the upstream status if you like to assist in debugging
		add_header X-Upstream-Status $upstream_status;
		# serve an errors using one 404 page
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

Your ```server_name``` settings are important here, for instance in this setup you could configure your backends to be ```image1.cdn.example.com```, ```image2.cdn.example.com``` and so-forth.

You could lock down your server names to be strict, for instance ```server_name image1.cdn.example.com image2.cdn.example.com```

Test your configuration ```sudo nginx -t``` and reload nginx.

### Next steps

Provided the module is installed and, image URL requests from your Silvertripe install should be pointing at the ```backends``` you configured in YML. You can monitor requests by looking at both the Supervisor and Nginx logs.

Errors will show in supervisor, whilst in nginx error logs, all errors will show as 404s.


## Troubleshooting

1. Check your website error logs
2. Check supervisor error logs

To debug thumbor using supervisor change the command to:
```command=thumbor --port=1210%(process_num)s --conf=/etc/thumbor/thumbor.conf --log-level=debug```
