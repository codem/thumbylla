# File permissions

The ```SilverStripe\Assets\Flysystem\AssetAdapter``` ships with no group-read permissions for protected assets.
To modify these permissions by default and allow users in a group to access assets, add the following to your project configuration.

```
SilverStripe\Assets\Flysystem\AssetAdapter:
  file_permissions:
    file:
     public: 0640
     private: 0640
    dir:
      public: 0750
      private: 0750
```

This will allow group users to read protected assets. You will need to chmod any current protected assets.
