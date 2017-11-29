<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;

/**
 * A dataobject that extends Image and overrides various methods
 */
class Image extends \Image {
	
	private static $backend = "Codem\Thumbor\ThumborBackend";
	
	/**
	 * Gets the URL of the image, returns an absolute URL
	 *
	 * @uses Director::baseURL()
	 * @return string
	 */
	public function getURL() {
		return $this->getAbsoluteURL();
	}
	
	/**
	 * Gets the absolute URL accessible through the web.
	 *
	 * @uses Director::absoluteBaseURL()
	 * @return string
	 */
	public function getAbsoluteURL() {
		
	}
	
	/**
	 * Return a SilverThumb\Image object representing the image in the given format.
	 * This image will be generated using generateFormattedImage().
	 * The generated image is cached, to flush the cache append ?flush=1 to your URL.
	 *
	 * Just pass the correct number of parameters expected by the working function
	 *
	 * @param string $format The name of the format.
	 * @return Image_Cached|null
	 */
	public function getFormattedImage($format) {
		
	}
	
	
}
