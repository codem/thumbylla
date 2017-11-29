<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;

/**
 * A Thumbor image object that extends Image and overrides various methods
 */
class Image extends \Image {

	private static $backend = "Codem\Thumbor\ThumborBackend";

	private $url;

	private function pickServer() {
		$servers = \Config::inst()->get('Codem\Thumbor\Config', 'backends');
		if(!$servers || empty($servers) || !is_array($servers)) {
			throw new \Exception("No servers defined");
		}
		$key = array_rand($servers, 1);
		$proto_https = \Config::inst()->get('Codem\Thumbor\Config', 'backend_protocol_https');
		$proto = "http://";
		if($proto_https) {
			$proto = "https://";
		}
		return $proto . $servers[$key];
	}

	private function getSecretKey() {
		return \Config::inst()->get('Codem\Thumbor\Config', 'thumbor_generation_key');
	}

	private function generateUrlInstance() {
		$server = $this->pickServer();
		$secret = $this->getSecretKey();
		$inst = ThumborUrlBuilder::construct($server, $secret, $this->getAbsoluteURL());
		return $inst;
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
		$args = func_get_args();
		array_shift($args);
		switch($format) {
			case 'ScaleWidth':
			case 'SetWidth':
				$this->url = $this->generateUrlInstance()->resize($args[0], 0);
				break;
			default:
				throw new \Exception("Unhandled format {$format}");
				break;
		}
		// return an instance that can be used in a template call
		return new ThumboredImage( $this->url );
	}

	public function generateFormattedImage($format) {
		// no need to generate anything!
	}


}

/**
 * Represents our 'image' that is returned to templates, in reality it's just going to be used for return the Thumbor URL
 */
class ThumboredImage extends \Object {

	private $url;

	public function __construct($url) {
		$this->url = $url;
		parent::__construct();
	}

	/**
	 * Return an XHTML img tag for this Image.
	 *
	 * @return string
	 */
	public function forTemplate() {
		return $this->getTag();
	}

	/**
	 * Return an XHTML img tag for this Image,
	 * or NULL if the image file doesn't exist on the filesystem.
	 *
	 * @return string
	 */
	public function getTag() {
		$url = $this->url->build();
		$title = "";
		return "<img src=\"$url\" alt=\"$title\" />";
	}

}
