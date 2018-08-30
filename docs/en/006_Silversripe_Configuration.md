# Silvertripe Configuration

The module ships with the following annotated configuration.
Copy the config and modify to your requirements:

* add backend(s)
* add protected backend(s)
* add a protected asset signing key and keep it safe
* add a salt and keep it safe
* add the Thumbor generation key from your thumbor server conf and keep it safe
* set https requirements (probably true)
* set an expiry time for protected asset URLs

You may also like to [tweak File Permissions](./002_File_Permissions.md) in case your web server runs into 403 errors accessing images.

```
---
Name: my_local_thumbor_config
After:
  - '#thumbor_config'
  - '#assetsimage'
  - '#assetscore'
  - '#assetadmingraphql-dependencies'
  - '#assetadminthumbnails'
  - '#assetsfieldtypes'
  - '#assetadmin'
  - '#assetadminfield'
---
# Example config for creating images
Codem\Thumbor\Config:
  # from /etc/thumbor/_my_thumbor_server_.conf
  thumbor_generation_key: 'TOTALLY_NOT_SECURE'
  # the key used to sign protected image urls, best to not use the generation key above
  signing_key: 'A Really bad Signing Key'
  # a salt used in signing protected image urls
  salt: 'A really bad salt'
  use_https : true
  expiry_time: 10
  # if serving off a directory
  backend_path : ''
  # list all backends here, as many as you want
  backends:
    - 'img1.example.com'
    - 'img2.example.com'
  # Protected backends are used to serve protected assets
  protected_backends:
    - 'protected1.example.com'
---
Name: thumbor_mapping_config
After:
  - '#assetsimage'
  - '#assetscore'
  - '#assetadmingraphql-dependencies'
  - '#assetadminthumbnails'
  - '#assetsfieldtypes'
  - '#assetadmin'
  - '#assetadminfield'
---
SilverStripe\Assets\File:
  class_for_file_extension:
    'jpg': 'Codem\Thumbor\Image'
    'jpeg': 'Codem\Thumbor\Image'
    'gif': 'Codem\Thumbor\Image'
    'png': 'Codem\Thumbor\Image'
    'webp': 'Codem\Thumbor\Image'
```
