## Animated Gif Resizing

Thumbor can resize animated GIF images with the following settings in your thumbor.conf, with the caveat in the documentation:

> Please note that smart cropping and filters are not supported for gifs using gifsicle (but won't give an error).


```
USE_GIFSICLE_ENGINE = True
ALLOW_ANIMATED_GIFS = True
```

The ```gifsicle``` package should also be in the $PATH for the Thumbor user. E.g with APT:

```
sudo apt install gifsicle
```
