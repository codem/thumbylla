# Apache proxying requests to Thumbor

Nginx tends to be a better solution for handling static requests but if Apache is your thing, the following example configuration may assist.

The ```proxy``` and ```proxy_http``` modules should be loaded.

```
<VirtualHost *:80>

    # Bump your logging level up to info or debug if hitting errors - you may get more debugging information
    ErrorLog /path/to/website.error.log
    TransferLog /path/to/website.access.log
    LogLevel warn

    # By default, Apache will 404 any request that contains encoded path separators.
    # The NoDecode setting retains the path in its encoded state
    # See: https://httpd.apache.org/docs/2.4/mod/core.html#allowencodedslashes
    AllowEncodedSlashes NoDecode

    # See: https://httpd.apache.org/docs/2.4/mod/mod_proxy.html#proxypreservehost
    ProxyPreserveHost On

    # Avoid passing these requests to Thumbor
    Redirect gone /favicon.ico
    Redirect gone /robots.txt
    ProxyPass /favicon.ico !
    ProxyPass /robots.txt !

    # These settings proxy the request to a Thumbor server running on port 14200 on the localhost
    # the 'nocanon' setting is important - this ensures Apache does not double-encode the already encoded path
    # See: https://httpd.apache.org/docs/2.4/mod/mod_proxy.html#proxypass
    ProxyPass / http://127.0.0.1:14200/ nocanon
    ProxyPassReverse / http://127.0.0.1:14200/

    # The server name that will serve images
    ServerName my_thumbor.host

</VirtualHost>
```

> This configuration has not been tested outside a development environment, use at your own risk.
