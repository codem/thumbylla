# Setup

Thumbor set up is covered [elsewhere in Thumbor documentation](https://thumbor.readthedocs.io/en/latest/installing.html); it's best that you read that first.

Your Thumbor setup should contain:

1. One or more backend web servers that handle image requests from your websites. These backends can be run by any web server software provided it can proxy the request to Thumbor.
2. One or more Thumbor upstream servers, running on any open ports you have
3. Within your Thumbor server configuration - a loader, an optional storage handler and an optional result storage (thumbnail) handler
4. A system to manage your Thumbor daemon(s), like Supervisord.
5. Optionally, a frontend cache/cdn like Cloudflare or Cloudfront

See a sample [Nginx + Supervisor setup](./100_Nginx_Supervisor.md).

## Backend web servers

These virtual servers handle requests from anything loading one of your Thumbor image URLs,e.g a browser loading an image:
```<img src="https://images.cdn.example.com/xxxxxxxxxxxxxxxxxxxxx=/fit-in/500x200/http://source.image.example.com/happy.jpg" />```

## Thumbor upstream servers
These handle proxied requests and will either serve an image from cache or attempt to create the image based on the commands in the URL (```fit-in/500x200``` in the example above).

## Loaders, storage and result storage
Thumbor may have a cached version of the result image available, in which case image thumbnail creation will not take place.

If not, Thumbor will either load the image from its own storage or the supplied URL via its HTTP loader (```http://source.image.example.com/happy.jpg``` in the example above).

Once Thumbor has the image it will store the thumbnail in result storage and return it to the downstream web server.

Both result storage and image storage are optional, both can be turned off in Thumbor configuration if required. Example:
```
STORAGE = 'thumbor.storages.no_storage'
RESULT_STORAGE = 'thumbor.result_storages.no_storage'
```

## Managing the Thumbor servers
Supervisor is a great choice for managing Thumbor processes.

## Frontend Cache/CDN

You can place a cache in front of your image generation web server(s), for instance using Cloudflare or CloudFront, which can take the load off your Thumbor stack.
