<?php
namespace Codem\Thumbor;

use League\Flysystem\Filesystem;
use SilverStripe\Assets\Flysystem\FlysystemAssetStore;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Core\Flushable;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injector;

/**
 * Asset store based on flysystem Filesystem as a backend
 */
class ThumbyllaAssetStore extends FlysystemAssetStore {
  /**
   * Check if a signed URL is present - determine if a grant exists for the given FileID
   * Signed URLs are created in the {@link Codem\Thumbor\ThumbyllaImageBackend}:
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
        if(empty($query['a']) && empty($query['b']) && empty($query['h'])) {
          /**
           * nothing provided, return whatever the main AssetStore returns
           * this can occur for direct URL access to the original image with no
           * token/expiry
           * this is not an error condition
           */
          return parent::isGranted($fileID);
        }

        if(empty($query['a'])) {
          throw new \Exception("No token provided in query");
        }
        if(empty($query['h'])) {
          throw new \Exception("No host token provided in query");
        }
        if(empty($query['b'])) {
          throw new \Exception("No expiry provided in query");
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
        $data = $parts['path'] . $query['b'];
        $token = ThumbyllaProtectedImageBackend::signData($data);
        if($token != $query['a']) {
          throw new \Exception("Token mismatch");
        }

        /**
         * Check host token, using the currently configured protected hosts
         * A host token should be present and match one of the currently configired (signed) protected backends
         * This ensures that protected image requests come via a protected Thumbor server host
         */
        $protected_backends = Config::inst()->get('Codem\Thumbor\Config', 'protected_backends');
        if(!$protected_backends || empty($protected_backends) || !is_array($protected_backends)) {
          throw new \Exception("No protected servers defined");
        } else {
          $host_token = $query['h'];
          $host_token_match = false;
          foreach($protected_backends as $protected_backend) {
            $host_token = ThumbyllaProtectedImageBackend::signData($protected_backend);
            if($host_token == $query['h']) {
              $host_token_match = true;
              break;
            }
          }

          if(!$host_token_match) {
            throw new \Exception("Host token mismatch");
          }
        }
        // token matches AND is not expired, this protected image URL can be viewed
        return true;
      }
    } catch (\Exception $e) {
      syslog(LOG_INFO, "FAILED: {$e->getMessage()}");
      return false;
    }

    // let the main AssetStore handle success/error
    return parent::isGranted($fileID);
  }

  /**
   * Generate an {@see HTTPResponse} for the given file from the source filesystem
   * @param Filesystem $flysystem
   * @param string $fileID
   * @return HTTPResponse
   */
  protected function createResponseFor(Filesystem $flysystem, $fileID) {
    $response = parent::createResponseFor($flysystem, $fileID);
    if($flysystem === $this->getProtectedFilesystem()) {
      /**
       * Set up headers for protected assets
       * Tell caches that we do not want these cached
       */
      $expires = new \DateTime();
      $expires->modify('-1 hour');
      $headers = [
        'Cache-Control' => 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'Expires' => $expires->format(\DateTime::RFC822)
      ];
      foreach ($headers as $header => $value) {
        $response->addHeader($header, $value);
      }
    }
    return $response;
  }

}
