# Setup

Thumbor set up is covered elsewhere in Thumbor documentation; it's best that you read that documentation rather than us repeating it.

You Thumbor setup should contain:

1. One or more backend web servers that handle image requests from your websites. These backends can be run by any web server software that can proxy the connection to Thumbor.
2. One or more Thumbor upstream servers, running on any open ports you have
3. Within your Thumbor server configuration - a loader, a storage handler and a result storage (thumbnail) handler
4. A system to manage your Thumbor daemon
5. Optionally, a frontend cache like Cloudflare or Cloudfront

## Backend web servers

These virtual servers handle requests from web browsers loading image tags or anything directly loading one of your Thumbor image urls.
E.g
```
<img src="https://images.cdn.example.com/xxxxxxxxxxxxxxxxxxxxx=/fit-in/500x200/http://source.image.example.com/happy.jpg" />
```

Your virtual server might look like this (in Nginx):
```
server_name: *.cdn.example.com;
```

## Thumbor upstream servers

These are passed requests and will either serve an image from cache or attempt to create the image based on the Thumbor commands in the URL (```fit-in/500x200``` in the example above).
See the 100_Nginx_Supervisor documentation for an example.

## Loaders, storage and result storage

Thumbor may have a cached version of the thumbnail already created, in which case image creation will not take place and the thumbnail will be returned to the downstream web server.

If not, it will either load the image from storage or the supplied URL via its HTTP loader (```http://source.image.example.com/happy.jpg``` in the example above).
Once Thumbor has the image it will store the thumbnail in result storage and return it to the downstream web server.

## Managing the Thumbor servers

Supervisor is a great choice for managing Thumbor, ensuring it stays up.

## Frontend Cache

You can place a cache in front of your image generation web server(s), for instance using Cloudflare or CloudFront.
These can take the load off your Thumbor stack in high load environments.
