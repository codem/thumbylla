<?php

namespace Codem\Thumbor;

use SilverStripe\Assets\Flysystem\FlysystemAssetStore;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Core\Flushable;
use SilverStripe\Core\Injector\Injector;

/**
 * Asset store based on flysystem Filesystem as a backend
 */
class AssetStore extends FlysystemAssetStore {
  /**
   * Check if a signed URL is present - determine if a grant exists for the given FileID
   * Signed URLs are created in the {@link Codem\Thumbor\ImageBackend}:
   * - The backend sets an expiry timestamp for the image
   * - The backend adds a signed token, the value being the
   *
   * @param string $fileID
   * @return bool
   */
  protected function isGranted($fileID) {
    try {

      $protected = $this->getProtectedFilesystem()->has($fileID);
      if($protected) {
        $query_string = $_SERVER['QUERY_STRING'];
        parse_str($query_string, $query);
        if(empty($query['a']) && empty($query['b'])) {
          // nothing provided, whatever the main AssetStore returns
          // this can occur for direct URL access to the image with no  token/expiry
          // this is not an error condition
          return parent::isGranted($fileID);
        }

        if(empty($query['a'])) {
          throw new \Exception("No token provided");
        }
        if(empty($query['b'])) {
          throw new \Exception("No expiry provided");
        } else {
          // check expiry timestamp
          $expiry = (float)$query['b'];
          $now = microtime(true);
          $diff = $now - $expiry;
          if($diff > 0) {
            throw new \Exception("URL has expired");
          }
        }

        $uri = $_SERVER['REQUEST_URI'];
        $parts = parse_url($uri);
        if(empty($parts['path'])) {
          throw new \Exception("Not path provided in uri:{$uri}");
        }
        $token = ImageBackend::signPath($parts['path'], $query['b']);
        if($token != $query['a']) {
          throw new \Exception("Token mismatch");
        }
        // token matches AND is not expired, this protected image URL can be viewed
        return true;
      }
    } catch (\Exception $e) {
      syslog(LOG_INFO, "Failed: {$e->getMessage()}");
    }

    // let the main AssetStore handle success/error
    return parent::isGranted($fileID);
  }
}
