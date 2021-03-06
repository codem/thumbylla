# Thumbylla

> Thumbor'd Silverstripe 4 Images including support for protected image assets

This module pushes image thumbnail generation to a [Thumbor open source image server](https://github.com/thumbor/thumbor).

Images generated by Thumbor bypass the standard Intervention backend provided by Silverstripe and are instead generated and served from a Thumbor server.
Original images are uploaded and stored in the standard assets location in a Silverstripe installation.

[SilverStripe 3 compatible version](https://github.com/codem/thumbylla/tree/ss3) - v0.1

Future releases for SilverStripe 4 will be tagged v0.2 and up.

> This is a new module, considered pre-release at the moment

## What is Thumbor?

From the Thumbor website itself:

> Thumbor is a smart imaging service. It enables on-demand crop, resizing and flipping of images. It features a very smart detection of important points in the image for better cropping and resizing, using state-of-the-art face and feature detection algorithms

Thumbor is written in Python and is easily installed via PIP and configured using a standard configuration file.

## Why should I use it?

Thumbor takes the load off your SilverStripe website. Your web stack is busy processing requests and shouldn't be resizing images on demand.

With this module, your users upload images via the usual SilverStripe upload process (e.g FileField, UploadField) and the system then hands off resizing and cropping to Thumbor, via a specific URL.

The Thumbor server can exist anywhere, provided the URLs for the Thumbor generated images point to it and the Thumbor server can access source images. You can have multiple Thumbor servers each with multiple upstreams all handling requests.

Other advantages:

* Thumbor supports webp output using the ```format``` filter
* Apply multiple filters on the go to a single image
* Apply a cache lifetime to generated thumbnails
* [Use a variety of backends](https://github.com/thumbor-community) to store generated images (e.g Redis, Mongo, [S3](https://github.com/thumbor-community/aws)) or implement your own.
* Put a frontend cache in front of Thumbor image servers.
* Is compatible with Pagespeed

## What does a Thumbor URL look like?

> https://thumbor.readthedocs.io/en/latest/usage.html

```
http(s)://*thumbor-server*/hmac/trim/AxB:CxD/fit-in/-Ex-F/HALIGN/VALIGN/smart/filters:FILTERNAME(ARGUMENT):FILTERNAME(ARGUMENT)/*image-uri*
```
Where:
* http(s) - there is no reason why you shouldn't be using https
* thumbor-server - your Thumbor server host name
* hmac - signature of the request, so your disks don't get filled up with thumbs!
* trim - removes surrounding space
* AxB:CxD means manually crop the image at left-top point AxB and right-bottom point CxD;
* fit-in means that the generated image should not be auto-cropped and otherwise just fit in an imaginary box specified by ExF;
* -Ex-F means resize the image to be ExF of width per height size. The minus signs mean flip horizontally and vertically;
* HALIGN is horizontal alignment of crop;
* VALIGN is vertical alignment of crop;
* smart means using smart detection of focal points;
* filters can be applied sequentially to the image before returning;
* image-uri is the public URI for the image you want resized.

## More info

Best read the docs: https://thumbor.readthedocs.io/

## Signed URLs for protected assets

See [Protected Assets](docs/en/002_Protected_Assets.md)

## Image manipulation in templates

The following standard image manipulation methods are provided for use in templates:

* ScaleWidth
* ScaleHeight
* Fill
* Pad
* Fit
* ResizedImage
* CMSThumbnail, AssetLibraryThumbnail, AssetLibraryPreview, StripThumbnail

Note that ResizedImage in this module preserves aspect ratio.

The module also provides some extra image manipulation methods in templates:
* **FlipVertical** - flip an original image vertically e.g ```$Image.FlipVertical```
* **FlipHorizontal** - flip an original image horizontally e.g ```$Image.FlipHorizontal```
* **ScaleWidthFlipVertical** - scale the image by width and flip it vertically e.g ```$Image.ScaleWidthFlipVertical(360)```
* **ScaleWidthFlipHorizontal** - scale the image by width and flip it horizontally e.g ```$Image.ScaleWidthFlipHorizontal(360)```
* **ScaleHeightFlipVertical** - scale the image by height and flip it vertically e.g ```$Image.ScaleHeightFlipVertical(360)```
* **ScaleHeightFlipHorizontal** - scale the image by height and flip it horizontally e.g ```$Image.ScaleHeightFlipHorizontal(360)```
* **ManualCropFromCorners** - manually crop and image from its corners e.g ```$Image.ManualCropFromCorners(left px, top px, right px, bottom px)```
* **Focal** - crop an image around a Focal point e.g ```$Image.Focal(left px, top px, right px, bottom px)```
* **CroppedFocus** - crop an image on a focal point based on stored crop data e.g ```$Image.CroppedFocus```
* **ManualCrop** - crop the image to the exact dimensions returned from the cropping tool

Filters are provided via the ```Filter``` method and can be chained, for example the following template code:
```
$Image.Filter('brightness', 20).Filter('saturation', 3).Filter('sharpen', 8).ScaleWidth(360)
```
... will increase the brightness by 20%, increase saturation by 3%, sharpen with an amount of 8, then scale the image to 360px width. Images are not generated until the URL is requested by the web browser/client.

Filters are extremely powerful, [the full list is available here](https://github.com/thumbor/thumbor/wiki/Filters).
To use a filter in a template, use the parameters in the same order as described on the relevant Thumbor filter page.

### Example
For [Sharpen](https://github.com/thumbor/thumbor/wiki/Sharpen), adding ```$Image.Filter('sharpen', 7, 1, true)``` to your template will display a sharpened version of the image with a sharpen_amount=7, sharpen_radius=1 and sharpening of the luminance channel only turned on.

### Gotchas

#### Restarting the filters.
When you want to manipulate the same image mutiple times in a template, you will need to reset filters on the image:

Compare:
```
$TestImage.Restart().Pad(500,300, 'fc0')
$TestImage.Restart().Align('left','top').Fill(160,160)
```
With:
```
$TestImage.Pad(500,300, 'fc0')
// this version will retain the Pad filter
$TestImage.Align('left','top').Fill(160,160)
```

#### Filters that need an extra command

Some filters require others to return the relevant image URL.
Return the current filter instance by calling ```Original``` in the template. This is only required for specific filter actions that do not return the Thumbor image URL.

```
// This will return the original image
$TestImage.ManualCrop
// This will return a Thumbor URL - manually cropped image to 600px width
$TestImage.ManualCrop.ScaleWidth(600)
// This will return the manually cropped Thumbor image URL
$TestImage.ManualCrop.Original
```


## Configuring a Thumbor Server

[Check out the module docs here](docs/en/000_Setup.md)

## Silverstripe Configuration

The module ships with the configuration to handle image manipulation via Thumbor **turned off**. This allows you to switch back to the default Silverstripe image handling by removing project configuration.

If you view the module Yaml config, a number of configuration options are commented out, use these in your own project configuration. To use the module, create the configuration in your own project Yaml, based on the module configuration:

The below example config shows a basic setup. You *will* need to have a running Thumbor server before enabling the configuration.

```
---
Name: local_thumbor_config
After:
  - '#thumbor_config'
---
# Example config for creating images
Codem\Thumbor\Config:
  # from /etc/thumbor/thumbor.conf (MY_SECURE_KEY is the default, you shouldn't use this)
  thumbor_generation_key: 'xxxxxx'
  # for signing tokens for protected images, make it complex
  signing_key: 'xxx'
  salt: 'a salt'
  use_https : false
  # protected image expiry time (s)
  expiry_time: 2
  # if serving off a directory
  backend_path : ''
  # list all backends you have configured here, as many as you want, the module will pick one at random
  backends:
    - 'img1.cdn.example.com'
    - 'img2.cdn.example.com'
    - 'img3.cdn.example.com'
  protected_backends:
    - 'protected.example.com'
---
Name: local_thumbor_injection
After:
  - '#thumbor_injection'
---
SilverStripe\Core\Injector\Injector:
  SilverStripe\Assets\Image:
    class: 'Codem\Thumbor\Image'
  SilverStripe\Assets\Image_Backend:
    class: Codem\Thumbor\ThumbyllaImageBackend
  SilverStripe\AssetAdmin\Model\ThumbnailGenerator.graphql:
    class: Codem\Thumbor\ThumbnailGenerator
  SilverStripe\AssetAdmin\Model\ThumbnailGenerator.assetadmin:
    class: Codem\Thumbor\ThumbnailGenerator
  SilverStripe\Assets\Storage\AssetStore:
    class: Codem\Thumbor\ThumbyllaAssetStore
---
Name: local_thumbor_mapping_config
After:
  - '#thumbor_mapping_config'
---
# reset image handling classes
SilverStripe\Assets\File:
  class_for_file_extension:
    'jpg': 'Codem\Thumbor\Image'
    'jpeg': 'Codem\Thumbor\Image'
    'gif': 'Codem\Thumbor\Image'
    'png': 'Codem\Thumbor\Image'
    'webp': 'Codem\Thumbor\Image'
```

## Documentation
[Documentation is updated from time-to-time](docs/en/readme.md)

## Known Issues + Issue Tracking

Please use the Github Issue Tracker to ask questions/report bugs.

## Libraries + Building
This module [makes use of cropperjs](https://github.com/fengyuanchen/cropperjs) and [react-cropper](https://github.com/roadmanfong/react-cropper) for image cropping and focal point handling.

All required assets are in client/dist/js|styles.
If you want to build your own you will need Node and Yarn, then:
```
$ cd vendor\codem\thumbylla
$ yarn install
```
You can then run ```yarn run build``` or ```yarn run watch```, for instance.


### Licence
See LICENCE
