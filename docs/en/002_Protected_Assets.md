# Protected Assets

Silverstripe 4.x ships with a new public/protected assets system.

Public assets are available to anyone and are easily accessible to the Thumbor HTTP loader, as they are delivered via the web server.

Protected assets are available to those users with session data indicating that they can access the image provided. This poses a problem for the Thumbor HTTP Loader as it is "session-less".
To allow the HTTP Loader to access protected images, a protected image backend is used for those images in the protected filesystem. It:
+ Signs the image path e.g /assets/images/my_image.jpg with a signing_key
+ Sets an expiry time on the URL request
+ Signs the 'protected' host name which is then checked for validity during the grants stage.

Direct requests to the image URL without any tokens provided will cause Silverstripe to do it's default session-based checking. This will always fail for the Thumbor HTTP loader.
When the asset store receives a request for a protected image with tokens and expiry, it will check each in order and only allow the request if it has not expired and the tokens match.

The configuration for this is:

```
# a signing key, not the image generation key
signing_key: 'a signing key, something nicely random'
# a salt used in signing
salt: 'a salt'
# image expiry time in seconds
expiry_time: 10
# protected backends
protected_backends:
  - 'img1.protected.example.com'
```

## Set up a 'protected' Thumbor backend

A protected Thumbor server should be set up to act as the backend thumbor server for protected images. This separates concerns and allows you to set cache control headers and configuration separately to a public Thumbor server.

The setup is very similar to a public Thumbor server with the following changes:
+ The web server should set Cache-Control private headers and an expiry in the past
+ The protected Thumbor server should set storage expiration to 0 seconds along with a max-age of 0
+ The protected Thumbor server should have the storage and result_storage set to the relevant no_storage values. This stops Thumbor storing protected images in its cache(s),

## Example frontend web server config
> Read this in conjunction with the Nginx_Supervisor Docs

```
# A Thumbor server on different port(s) to the 'public' one
upstream protected_thumbor_upstream {
    server 127.0.0.1:14200;
    server 127.0.0.1:14201;
}

server {
  ...

  server_name *.protected.example.com;

  location / {
    proxy_pass http://protected_thumbor_upstream;
    ...
    proxy_hide_header Cache-Control;
    proxy_hide_header Expires;
    etag off;
    add_header 'Expires' '-1';
    add_header 'Cache-Control' 'no-cache, no-store, must-revalidate, s-maxage=0, max-age=0';
    ...
  }

  ...

}

```

## Example Thumbor Server config
> Stored in /etc/thumbor/my.protected.server.conf or similar, which Supervisor loads

```
STORAGE = 'thumbor.storages.no_storage'
RESULT_STORAGE = 'thumbor.result_storages.no_storage'
ENABLE_ETAGS = False
STORAGE_EXPIRATION_SECONDS = 0
RESULT_STORAGE_EXPIRATION_SECONDS = 0
MAX_AGE = 0
```

The config values force Thumbor to resample the image every time in memory. You can modify them as required for your use case. For instance, if you are OK with storing results for a longer time in cache add a ```RESULT_STORAGE``` with a required expiration.
