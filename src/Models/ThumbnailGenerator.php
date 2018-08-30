<?php
namespace Codem\Thumbor;
use SilverStripe\AssetAdmin\Model\ThumbnailGenerator As BaseThumbnailGenerator;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Storage\AssetContainer;
use SilverStripe\Assets\Storage\AssetStore;
use SilverStripe\Assets\Storage\DBFile;
use SilverStripe\Core\Config\Configurable;
use GuzzleHttp\Psr7\Response as GuzzleResponse;

/**
 * Generate thumbnails and thumbnail links using Thumbor backend
 */
class ThumbnailGenerator extends BaseThumbnailGenerator {
  /**
   * Generate thumbnail and return the "src" property for this thumbnail
   *
   * @param AssetContainer|DBFile|File $file
   * @param int $width
   * @param int $height
   * @return string
   */
  public function generateThumbnailLink(AssetContainer $file, $width, $height) {
      if (!$file || !$file->getIsImage() || !$file->exists()) {
        return null;
      }

      $protected = $file->getVisibility() == AssetStore::VISIBILITY_PROTECTED;
      if($protected) {
        $backend = new ThumbyllaProtectedImageBackend($file);
      } else {
        $backend = new ThumbyllaImageBackend($file);
      }
      $args = ['FitMax', $width, $height];
      $thumbored_image = $backend->getFormattedImage($args);
      $url = $thumbored_image->__toString();

      if(!$protected) {
        // Public: just return the URL
        return $url;
      } else {
        // Protected: return a base64 encoded image, to avoid expired images
        try {
          $response = $backend->getRemoteResponse($url);
          if(!($response instanceof GuzzleResponse)) {
            throw new \Exception("Failed to get response from a GET - " . get_class($response) );
          }
          $body = $response->getBody()->getContents();
          $body = base64_encode($body);
          $headers = $response->getHeaders();
          $content_type = isset($headers['Content-Type'][0]) ? $headers['Content-Type'][0] : "";
          return sprintf(
              'data:%s;base64,%s',
              // use the Thumbor returned content type - maybe image has become webp
              // default back to the file mimetype if the server did not return it
              $content_type ? $content_type : $file->getMimeType(),
              $body
          );
        } catch (\Exception $e) {}
        return null;
      }
  }
}
