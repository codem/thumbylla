# SilverThumb

> Thumbor'd SilverStripe Images

This module provides assets integration with the Open Source image handling server Thumbor.

## What is Thumbor ?

From the Thumbor website itself:

> Thumbor is a smart imaging service. It enables on-demand crop, resizing and flipping of images. It features a very smart detection of important points in the image for better cropping and resizing, using state-of-the-art face and feature detection algorithms

Thumbor is written in Python and is easily installed via PIP or possibly your distro's usual channel for packages and configured using a standard configuration file that can live in /etc

## Why should I use it

Thumbor takes the load off your SilverStripe website. Your web stack is busy processing requests and shouldn't be resizing images on demand.
With this module, you can upload your images via the usual SilverStripe upload process (e.g FileField, UploadField) and then hand off resizing and cropping to Thumbor, via a specific URL.
The Thumbor server can exist anywhere, provided the URLs for the Thumbor generated images point to it ? You can even have multiple Thumbor servers each with multiple upstreams all handling requests.

Other advantages:

+ Thumbor supports webp
+ Apply multiple filters on the go
+ A large number of backends to store your images
+ Run your own image CDN (if you like)

## What does a Thumbor URL look like?

From: http://thumbor.readthedocs.io/en/latest/usage.html

```
http(s)://*thumbor-server*/hmac/trim/AxB:CxD/fit-in/-Ex-F/HALIGN/VALIGN/smart/filters:FILTERNAME(ARGUMENT):FILTERNAME(ARGUMENT)/*image-uri*
```
Where:
+ http(s) - there is no reason why you shouldn't be using https
+ thumbor-server - your Thumbor server host name
+ hmac - signature of the request, so your disks don't get filled up with thumbs!
+ trim - removes surrounding space
+ AxB:CxD means manually crop the image at left-top point AxB and right-bottom point CxD;
+ fit-in means that the generated image should not be auto-cropped and otherwise just fit in an imaginary box specified by ExF;
+ -Ex-F means resize the image to be ExF of width per height size. The minus signs mean flip horizontally and vertically;
+ HALIGN is horizontal alignment of crop;
+ VALIGN is vertical alignment of crop;
+ smart means using smart detection of focal points;
+ filters can be applied sequentially to the image before returning;
+ image-uri is the public URI for the image you want resized.

## More info

Best read the docs: http://thumbor.readthedocs.io/

## Configuring a Thumbor Server via Nginx

Configuration of the Thumbor Server is out of scope for this module but in the docs we've provide a simple setup for Nginx proxying requests on a various number of hosts to multiple Thumbor upstreams.
This can be appropriated for Apache or any other web server is required. Nginx is superfast at serving up static files.
