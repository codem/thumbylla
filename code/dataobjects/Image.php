<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;

/**
 * A Thumbor image object that extends Image and overrides various methods
 */
class Image extends \Image {

	private static $backend = "Codem\Thumbor\ImageBackend";

	private $url;
	
	private $halign = "center";
	private $valign = "middle";

	/**
	 * Based on config, pick a server to serve an image
	 * @returns string
	 */
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

	/**
	 * Get secret key shared with the thumbor server to generate images. If this is exposed, anyone with it can create images from allowed hosts
	 * @returns string
	 */
	private function getSecretKey() {
		return \Config::inst()->get('Codem\Thumbor\Config', 'thumbor_generation_key');
	}

	/**
	 * @returns Thumbor\Url\Builder
	 */
	private function generateUrlInstance() {
		$server = $this->pickServer();
		$secret = $this->getSecretKey();
		$inst = ThumborUrlBuilder::construct($server, $secret, $this->getAbsoluteURL());
		return $inst;
	}
	
	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 */
	public function isSize($width, $height) {
		return false;
	}
	
	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 */
	public function isWidth($width) {
		return false;
	}

	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 */
	public function isHeight($height) {
		return false;
	}
	
	/**
	 * Get the dimensions of this Image.
	 * @param string $dim If this is equal to "string", return the dimensions in string form,
	 * if it is 0 return the height, if it is 1 return the width.
	 * @return string|int|null
	 */
	public function getDimensions($dim = "string") {
		return null;
	}
	
	/**
	 * Align the crop (for Fill/CroppedImage)
	 * @param string $halign one of center, left, right
 	 * @param string $valign one of middle, top, bottom
	 * @returns Codem\Thumbor\Image
	 */
	public function Align($halign = "center", $valign = "middle") {
		$this->halign = $halign;
		$this->valign = $valign;
		return $this;
	}
	
	/**
	 * Enable Smart Cropping (when true). Smart Crop is off when false if not called or set to false
	 * @note requires a Thumbor server with smart crop capabilities
	 * @param boolean $smart
	 */
	public function Smart($smart = true) {
		$this->UrlInstance();
		$this->url->smart($smart);
		return $this;
	}
	
	/**
	 * Add multiple filters
	 */
	public function Filters(array $filter) {
		$this->UrlInstance();
		foreach($filter as $filter) {
			$this->Filter($filter);
		}
		return $this;
	}
	
	/**
	 * Add single filter
	 * @note DOCS: "Filters are affecting each other in the order they are specified"
	 */
	public function Filter() {
		$this->UrlInstance();
		$args = func_get_args();
		call_user_func_array([$this->url, "addFilter"], $args);
		return $this;
	}
	
	private function UrlInstance() {
		if(!$this->url) {
			$this->url = $this->generateUrlInstance();
		}
	}

	/*
	 * Return a Codem\ThumboredImage object representing the image to be resample/sized by the Thumbor server.
		
			From the DOCS:
			===================
			Image Endpoint

			http://thumbor-server/hmac/trim/AxB:CxD/fit-in/-Ex-F/HALIGN/VALIGN/smart/filters:FILTERNAME(ARGUMENT):FILTERNAME(ARGUMENT)/image-uri
			
			* thumbor-server is the address of the service currently running;
			* hmac is the signature that ensures Security ;
			* trim removes surrounding space in images using top-left pixel color unless specified otherwise;
			* AxB:CxD means manually crop the image at left-top point AxB and right-bottom point CxD;
			* fit-in means that the generated image should not be auto-cropped and otherwise just fit in an imaginary box specified by ExF;
			* -Ex-F means resize the image to be ExF of width per height size. The minus signs mean flip horizontally and vertically;
			* HALIGN is horizontal alignment of crop;
			* VALIGN is vertical alignment of crop;
			* smart means using smart detection of focal points;
			* filters can be applied sequentially to the image before returning;
			* image-uri is the public URI for the image you want resized.
			
	 *
	 * Just pass the correct number of parameters expected by the working function
	 *
	 * @param string $format The name of the format.
	 * @return Codem\ThumboredImage
	 */
	public function getFormattedImage($format) {
		$args = func_get_args();
		array_shift($args);
		$this->UrlInstance();// create a url instance if not already created
		switch($format) {
			case 'ScaleWidth':
			case 'SetWidth':
				$this->url->resize($args[0], 0);// e.g 300x0
				break;
			case 'ScaleHeight':
			case 'SetHeight':
				$this->url->resize(0, $args[0]);// e.g 0x300
				break;
			case 'CroppedImage':// ->Fill
			case 'Fill':
				// generate a cropped image, default from the middle/center of the image
				// Use Align in template to set crop point
				$this->url->valign($this->valign)
									->halign($this->halign)
									->resize($args[0], $args[1]);// e.g 300x300
				break;
			case 'CMSThumbnail':// default CMS Thumbnail
				$this->url->resize($this->stat('cms_thumbnail_width'),$this->stat('cms_thumbnail_height'));// e.g 100x100
				break;
			case 'AssetLibraryPreview':
			case 'assetlibrarypreview':
				$this->url->resize($this->stat('asset_preview_width'),$this->stat('asset_preview_height'));// e.g 400x200
				break;
			case 'AssetLibraryThumbnail':
			case 'assetlibrarythumbnail':
				$this->url->resize($this->stat('asset_thumbnail_width'),$this->stat('asset_thumbnail_height'));// e.g 100x100
				break;
			case 'StripThumbnail':
			case 'stripthumbnail':
				$this->url->resize($this->stat('strip_thumbnail_width'),$this->stat('strip_thumbnail_height'));// e.g 50x50
				break;
			case 'FlipVertical':
				// flip the original image
				$this->url->resize(0, '-0');
				break;
			case 'FlipHorizontal':
				// flip the original image
				$this->url->resize('-0', 0);
				break;
			case 'ScaleWidthFlipVertical':
				// scale and flip vertically
				$this->url->resize($args[0], '-0');
				break;
			case 'ScaleWidthFlipHorizontal':
				// scale and flip horizontally
				$this->url->resize($args[0] * -1, 0);
				break;
			case 'ScaleHeightFlipVertical':
				// scale and flip vertically
				$this->url->resize(0, $args[1] * -1);
				break;
			case 'ScaleHeightFlipHorizontal':
				// scale and flip horizontally
				$this->url->resize('-0', $args[1]);
				break;
			case 'PaddedImage':// ->Pad
			case 'SetSize':// ->Pad
			case 'Pad':
				// a bit like Fill but we Pad out with a specified colour, #fff if not specified
				$pad_colour = 'fff';
				$this->url->fitIn($args[0], $args[1]);// e.g 300x300
				if(!empty($args[2])) {
					$pad_colour = $args[2];
				}
				$this->url = $this->url->addFilter('fill', $pad_colour);
				break;	
			case 'SetRatioSize'://->Fit
			case 'Fit':
				// Returns an image scaled proportional, with its greatest diameter scaled to args
				$this->url->fitIn($args[0], $args[1]);// e.g 300x300
				break;
			case 'ResizedImage':
				// this can result in images that are oddly cropped
				$this->url->resize($args[0], $args[1]);
				break;
			default:
				throw new \Exception("Unhandled format {$format}");
				break;
		}
		
		/*
		* @method Builder trim($colourSource = null)
		* @method Builder crop($topLeftX, $topLeftY, $bottomRightX, $bottomRightY)
		* @method Builder fitIn($width, $height)
		* @method Builder resize($width, $height)
		* @method Builder halign($halign)
		* @method Builder valign($valign)
		* @method Builder smartCrop($smartCrop)
		* @method Builder addFilter($filter, $args, $_ = null)
		* @method Builder metadataOnly($metadataOnly)
		*/
		
		// return an instance that can be used in a template call
		//var_dump($this->url->build()->__toString());
		return new ThumboredImage( $this->url, $this->Title, $this->Filename );
	}
	
	/**
	 * Some specific Thumbor image handling
	 */
	
	public function FlipVertical() {
		return $this->getFormattedImage('FlipVertical');
	}
	
	public function FlipHorizontal() {
		return $this->getFormattedImage('FlipHorizontal');
	}
	
	public function ScaleWidthFlipVertical($width) {
		return $this->getFormattedImage('ScaleWidthFlipVertical', $width);
	}
	
	public function ScaleWidthFlipHorizontal($width) {
		return $this->getFormattedImage('ScaleWidthFlipHorizontal', $width);
	}
	
	/**
	 * Scale image proportionally to fit within the specified bounds, thumbor handles sanity checking
	 *
	 * @param integer $width The width to size within
	 * @param integer $height The height to size within
	 */
	public function Fit($width, $height) {
		return  $this->getFormattedImage('Fit', $width, $height);
	}

	/**
	 * We are not generating anything. This exists solely to avoid invoking GD image generation.
	 */
	public function generateFormattedImage($format) {
		// no need to generate anything!
	}


}
