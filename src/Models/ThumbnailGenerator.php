<?php
namespace Codem\Thumbor;
use SilverStripe\AssetAdmin\Model\ThumbnailGenerator As BaseThumbnailGenerator;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Storage\AssetContainer;
use SilverStripe\Assets\Storage\AssetStore;
use SilverStripe\Assets\Storage\DBFile;
use SilverStripe\Core\Config\Configurable;
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

      if($file->getVisibility() == AssetStore::VISIBILITY_PROTECTED) {
  			$backend = new ThumbyllaProtectedImageBackend($file);
  		} else {
  			$backend = new ThumbyllaImageBackend($file);
  		}
      $args = ['FitMax', $width, $height];
      $thumbored_image = $backend->getFormattedImage($args);
      return $thumbored_image->__toString();
  }
}
