# Silverstripe Thumbor image generation module

> Thumbor'd SilverStripe Images

This module takes the load off generating images within Silverstripe and provides image assets integration with the [Thumbor open source image server](https://github.com/thumbor/thumbor).

Images generated by Thumbor bypass the standard GD backend provided by Silverstripe and are instead generated and served from a Thumbor server. CMS users upload original images to /assets in your website.

Currently only Silverstripe 3.6+ is supported, 4.x is in the works.

## What is Thumbor?

From the Thumbor website itself:

> Thumbor is a smart imaging service. It enables on-demand crop, resizing and flipping of images. It features a very smart detection of important points in the image for better cropping and resizing, using state-of-the-art face and feature detection algorithms

Thumbor is written in Python and is easily installed via PIP and configured using a standard configuration file.

## Why should I use it?

Thumbor takes the load off your SilverStripe website. Your web stack is busy processing requests and shouldn't be resizing images on demand.

With this module, your users upload images via the usual SilverStripe upload process (e.g FileField, UploadField) and the system then hands off resizing and cropping to Thumbor, via a specific URL.

The Thumbor server can exist anywhere, provided the URLs for the Thumbor generated images point to it. You can even have multiple Thumbor servers each with multiple upstreams all handling requests.

Other advantages:

+ Thumbor supports webp output using the ```format``` filter
+ Apply multiple filters on the go to a single image
+ Apply a cache lifetime to generated thumbnails
+ Use a variety of backends to store generated images (e.g Redis, Mongo, [S3](https://github.com/thumbor-community/aws)) or implement your own.
+ Run your own image CDN (if you like)
+ Is compatible with Pagespeed

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

## Image manipulation in templates

The following standard image manipulation methods are provided for use in templates

+ ScaleWidth
+ ScaleHeight
+ Fill
+ Pad
+ Fit
+ ResizedImage
+ CMSThumbnail, AssetLibraryThumbnail, AssetLibraryPreview, StripThumbnail

Note that ResizedImage in this module preserves aspect ratio.

The module also provides some extra image manipulation methods in templates:
+ **FlipVertical** - flip an original image vertically e.g ```$Image.FlipVertical```
+ **FlipHorizontal** - flip an original image horizontally e.g ```$Image.FlipHorizontal```
+ **ScaleWidthFlipVertical** - scale the image by width and flip it vertically e.g ```$Image.ScaleWidthFlipVertical(360)```
+ **ScaleWidthFlipHorizontal** - scale the image by width and flip it horizontally e.g ```$Image.ScaleWidthFlipHorizontal(360)```
+ **ScaleHeightFlipVertical** - scale the image by height and flip it vertically e.g ```$Image.ScaleHeightFlipVertical(360)```
+ **ScaleHeightFlipHorizontal** - scale the image by height and flip it horizontally e.g ```$Image.ScaleHeightFlipHorizontal(360)```

Filters are provided via the ```Filter``` method, for example the following template code:
```
$Image.Filter('brightness', 20).Filter('saturation', 3).Filter('sharpen', 8).ScaleWidth(360)
```
... will increase the brightness by 20%, increase saturation by 3%, sharpen with an amount of 8, then scale the image to 360px width. Images are not generated until the URL is requested by the web browser/client.

Filters are extremely powerful, [the full list is available here](https://github.com/thumbor/thumbor/wiki/Filters).
To use a filter in a template, use the parameters in the same order as described on the relevant Thumbor filter page.

### Example ###
For [Sharpen](https://github.com/thumbor/thumbor/wiki/Sharpen), adding ```$Image.Filter('sharpen', 7, 1, true)``` to your template will display a sharpened version of the image with a sharpen_amount=7, sharpen_radius=1 and sharpening of the luminance channel only turned on.


## Configuring a Thumbor Server

In the docs we've provide a simple setup for Nginx proxying requests on a various number of hosts to multiple Thumbor upstreams.  Your implementation may vary but this config provides the basics to get set up.

Nginx is superfast at serving up static files but this could be appropriated for Apache.


### Using nginx + Supervisor

[Check out the docs here](.docs/en/00_Nginx_Supervisor.md)

## Configuring the module

This example config shows a basic setup. You'll need to have a running Thumbor server before enabling the image Injector.

```
---
Name: local_thumbor_config
After:
  - 'thumbor_config'
---
# use our image class
Injector:
  Image:
    class: 'Codem\Thumbor\Image'
# Example config for creating images
Codem\Thumbor\Config:
  # from /etc/thumbor/thumbor.conf - SECURITY_KEY value
  thumbor_generation_key: 'your_thumbor_generation_key'
  # true if using https
  backend_protocol_https : false
  # if serving images off a directory on the backends
  backend_path : ''
  # list all backends here, as many as you want
  backends:
    - 'img1.images.domain.extension'
    - 'img2.images.domain.extension'
    - 'img3.images.domain.extension'
```
