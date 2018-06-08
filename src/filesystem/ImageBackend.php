<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Assets\Image_Backend As SS_Image_Backend;
use SilverStripe\Assets\Storage\AssetContainer;
use SilverStripe\Assets\Storage\AssetStore;
use SilverStripe\Core\Config\Config;
use SilverStripe\Assets\InterventionBackend;
use SilverStripe\Core\Flushable;

/**
 * An Image Backend for Thumbor-based image handling, replacing the InterventionBackend
 * Remember, the actual 'backend' is the Thumbor Server, all we do is create image URLs ;)
 * @package thumbylla
 */
class ImageBackend extends InterventionBackend implements SS_Image_Backend, Flushable {


	/**
	 * @var Thumbor\Url\Builder
	 */
	private $thumbor_url;

	private $image;

	private $halign = "center";
	private $valign = "middle";

	private $_cache_width = 0;//the width of the original image uploaded
	private $_cache_height = 0;//the height of the original image uploaded

	public function setImage(SS_Image $image) {
		$this->image = $image;
	}

	/**
	 * Based on config, pick a server to serve an image
	 * @returns string
	 */
	private function pickServer() {
		$proto = "http://";
		$backends = Config::inst()->get('Codem\Thumbor\Config', 'backends');
		if(!$backends || empty($backends) || !is_array($backends)) {
			throw new \Exception("No servers defined");
		}
		$use_https = Config::inst()->get('Codem\Thumbor\Config', 'use_https');
		if($use_https) {
			$proto = "https://";
		}
		$key = array_rand($backends, 1);
		$server = $proto . $backends[$key];
		return $server;
	}

	/**
	 * Get secret key shared with the thumbor server to generate images. If this is exposed, anyone with it can create images from allowed hosts
	 * @todo this should not be public
	 * @returns string
	 */
	public function getSecretKey() {
		return Config::inst()->get('Codem\Thumbor\Config', 'thumbor_generation_key');
	}

	/**
	 * @returns Thumbor\Url\Builder
	 */
	private function generateUrlInstance() {
		$server = $this->pickServer();
		$secret = $this->getSecretKey();
		$inst = ThumborUrlBuilder::construct($server, $secret, $this->image->getAbsoluteURL());
		return $inst;
	}

	/**
	 * Create an instance of Thumbor\Url\Builder for this image, if it doesn't already exist
	 * @returns void
	 */
	private function UrlInstance() {
		if(!$this->thumbor_url) {
			$this->thumbor_url = $this->generateUrlInstance();
		}
	}

	/**
	 * Retrieve the Thumbor\Url\Builder instance for this image, mainly used in tests
	 * @returns Thumbor\Url\Builder
	 */
	public function getUrlInstance() {
		$this->UrlInstance();
		return $this->thumbor_url;
	}

	public function hasCommands() {
		return true;
	}

	public function currentUrl() {
		$this->UrlInstance();
		return $this->thumbor_url->build()->__toString();
	}

	/**
	 * Reset the current thumbor_url - see {@link Codem\Thumbor\Image::Restart()}
	 */
	public function Restart() {
		$this->thumbor_url = $this->generateUrlInstance();
	}

	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 * @deprecated ?
	 */
	public function isSize($width, $height) {
		return false;
	}

	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 * @deprecated ?
	 */
	public function isWidth($width) {
		return false;
	}

	/**
	 * This always returns false to force {@link self::getFormattedImage} to be called
	 * @deprecated ?
	 */
	public function isHeight($height) {
		return false;
	}

	/**
	 * Return the width of the original image
	 */
	public function getOriginalWidth() {
		if(!$this->_cache_width) {
			$this->_cache_width = parent::getWidth();
		}
		return $this->_cache_width;
	}

	/**
	 * Return the height of the original image
	 */
	public function getOriginalHeight() {
		if(!$this->_cache_height) {
			$this->_cache_height = parent::getHeight();
		}
		return $this->_cache_height;
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
	}

	/**
	 * @returns string the current horizontal aligment
	 */
	public function getHalign() {
		return $this->halign;
	}

	/**
	 * @returns string the current vertical aligment
	 */
	public function getValign() {
		return $this->valign;
	}

	/**
	 * Enable Smart Cropping on this instance. It cannot be turned off once enabled.
	 * @note requires a Thumbor server with smart crop capabilities
	 * @param boolean $smart
	 */
	public function Smart($enabled = true) {
		$this->UrlInstance();
		$this->halign = $this->valign = "";
		$this->thumbor_url->smartCrop($enabled);
		return $this;
	}

	/**
	 * Add multiple filters
	 */
	public function Filters(array $filters) {
		$this->UrlInstance();
		foreach($filters as $filter) {
			$this->Filter($filter);
		}
		return $this;
	}

	/**
	 * Add single filter. Note that the addFilter arguments can be completely arbitrary.
	 * @note DOCS: "Filters are affecting each other in the order they are specified"
	 */
	public function Filter($filter) {
		$this->UrlInstance();
		call_user_func_array([$this->thumbor_url, "addFilter"], $filter);
		return $this;
	}

	/**
	 * Shortcut method to crop an image from its edges, e.g 20,20,20,20 crops the image 20 pixels in from each edge
	 * @param int $in_from_left pixels in from the left edge
	 * @param int $in_from_top pixels in from the top edge
	 * @param int $in_from_right pixels in from the right edge
	 * @param int $in_from_bottom pixels in from the bottom edge
	 * @todo ensureLocalFile from cdncontent ?
	 */
	public function ManualCropFromCorners($in_from_left, $in_from_top, $in_from_right, $in_from_bottom) {

		$width = $this->getOriginalWidth();
		$height = $this->getOriginalHeight();
		// calculate the bottom/right/x|y values
		$bottom_right_x = $width - $in_from_right;
		$bottom_right_y = $height - $in_from_bottom;

		$this->UrlInstance();
		$this->thumbor_url->crop($in_from_left, $in_from_top, $bottom_right_x, $bottom_right_y);
		return $this;
	}

	/**
	 * Supply focal per http://thumbor.readthedocs.io/en/latest/focal.html, noting this warning: http://thumbor.readthedocs.io/en/latest/focal.html#warning
	 * @param int $left
	 * @param int $top
	 * @param int $right
	 * @param int $bottom
	 * Example specifying 100,100,100,100 on an image that is then ScaleWidth(300)
	 */
	public function Focal($left, $top, $right, $bottom) {
		$this->UrlInstance();
		$this->halign = $this->valign = "";
		$focal_string = "{$left}x{$top}:{$right}x{$bottom}";
		$this->thumbor_url = $this->thumbor_url->addFilter('focal', $focal_string);
		return $this;
	}

	/**
	 * Crop the image using Thumbor manual crop handling based on image crop data
	 * @returns Codem\Thumbor\Image
	 */
	public function ManualCrop($data) {
		$left = $data['x'];
		$top = $data['y'];
		// right =  left + width
		$right = $left + $data['width'];
		$bottom = $top + $data['height'];

		$this->UrlInstance();
		$this->thumbor_url->crop($left, $top, $right, $bottom);
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
	 * @return Codem\Thumbor\ThumboredImage
	 * @todo would be nice to split this into own methods per format
	 */
	public function getFormattedImage($args) {
		$format = array_shift($args);
		$this->UrlInstance();// create a url instance if not already created
		switch($format) {
			case 'ScaleWidth':
			case 'SetWidth':
				$this->thumbor_url->resize($args[0], 0);// e.g 300x0
				break;
			case 'ScaleHeight':
			case 'SetHeight':
				$this->thumbor_url->resize(0, $args[0]);// e.g 0x300
				break;
			case 'CroppedImage':// ->Fill
			case 'Fill':
				// generate a cropped image, default from the middle/center of the image
				// Use Align in template to set crop point
				$this->thumbor_url->resize($args[0], $args[1]);// e.g 300x300
				if($this->halign && $this->valign) {
					$this->thumbor_url = $this->thumbor_url->valign($this->valign)->halign($this->halign);
				}
				break;
			case 'FlipVertical':
				// flip the original image
				$this->thumbor_url->resize(0, '-0');
				break;
			case 'FlipHorizontal':
				// flip the original image
				$this->thumbor_url->resize('-0', 0);
				break;
			case 'ScaleWidthFlipVertical':
				// scale and flip vertically
				$this->thumbor_url->resize($args[0], '-0');
				break;
			case 'ScaleWidthFlipHorizontal':
				// scale and flip horizontally
				$this->thumbor_url->resize($args[0] * -1, 0);
				break;
			case 'ScaleHeightFlipVertical':
				// scale and flip vertically
				$this->thumbor_url->resize(0, $args[1] * -1);
				break;
			case 'ScaleHeightFlipHorizontal':
				// scale and flip horizontally
				$this->thumbor_url->resize('-0', $args[1]);
				break;
			case 'PaddedImage':// ->Pad
			case 'SetSize':// ->Pad
			case 'Pad':
				// a bit like Fill but we Pad out with a specified colour, #fff if not specified
				$pad_colour = 'fff';
				$this->thumbor_url->fitIn($args[0], $args[1]);// e.g 300x300
				if(!empty($args[2])) {
					$pad_colour = $args[2];
				}
				$this->thumbor_url = $this->thumbor_url->addFilter('fill', $pad_colour);
				break;
			case 'SetRatioSize'://->Fit
			case 'Fit':
			case 'FitMax':
				// Returns an image scaled proportional, with its greatest diameter scaled to args
				$this->thumbor_url->fitIn($args[0], $args[1]);// e.g 300x300
				break;
			case 'ResizedImage':
				// this *could* result in images that are oddly cropped
				$this->thumbor_url->resize($args[0], $args[1]);
				break;
			case 'Original':
				// handle original case (e.g ManualCrop with no resize)
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
		return new ThumboredImage( $this->thumbor_url, $this->image->Title, $this->image->Filename );
	}

	/**
	 * Populate the backend with a given object
	 *
	 * @param AssetContainer $assetContainer Object to load from
	 */
	public function loadFromContainer(AssetContainer $assetContainer) {}

	/**
	 * Populate the backend from a local path
	 *
	 * @param string $path
	 */
	public function loadFrom($path) {}

	/**
	 * Write to the given asset store
	 *
	 * @param AssetStore $assetStore
	 * @param string $filename Name for the resulting file
	 * @param string $hash Hash of original file, if storing a variant.
	 * @param string $variant Name of variant, if storing a variant.
	 * @param array $config Write options. {@see AssetStore}
	 * @return array Tuple associative array (Filename, Hash, Variant) Unless storing a variant, the hash
	 * will be calculated from the given data.
	 */
	public function writeToStore(AssetStore $assetStore, $filename, $hash = null, $variant = null, $config = array()) {}

	/**
	 * writeTo - not implemented
	 *
	 * @param string $path
	 * @return void
	 */
	public function writeTo($path)  {}

	/**
	 * setQuality - not implemented
	 *
	 * @param int $quality
	 * @return void
	 */
	public function setQuality($quality)  {}

	/**
	 * setImageResource - not implemented
	 *
	 * @param mixed $resource
	 * @return void
	 */
	public function setImageResource($resource)  {}

	/**
	 * getImageResource - not implemented
	 *
	 * @return mixed
	 */
	public function getImageResource()  {
		return true;
	}

	/**
	 * hasImageResource - not implemented
	 *
	 * @return boolean
	 */
	public function hasImageResource()  {}

	/**
	 * resize
	 *
	 * @param int $width
	 * @param int $height
	 * @return Image_Backend
	 */
	public function resize($width, $height)  {

	}

	/**
	 * resizeRatio
	 *
	 * @param int $width
	 * @param int $height
	 * @return Image_Backend
	 */
	public function resizeRatio($maxWidth, $maxHeight, $useAsMinimum = false)  {}

	/**
	 * resizeByWidth
	 *
	 * @param int $width
	 * @return Image_Backend
	 */
	public function resizeByWidth($width)  {}

	/**
	 * resizeByHeight
	 *
	 * @param int $height
	 * @return Image_Backend
	 */
	public function resizeByHeight($height)  {}

	/**
	 * paddedResize
	 *
	 * @param int $width
	 * @param int $height
	 * @return Image_Backend
	 */
	public function paddedResize($width, $height, $backgroundColor = "FFFFFF", $transparencyPercent = 0)  {}

	/**
	 * croppedResize
	 *
	 * @param int $width
	 * @param int $height
	 * @return Image_Backend
	 */
	public function croppedResize($width, $height) {}

	/**
   * Crop's part of image.
   * @param int $top y position of left upper corner of crop rectangle
   * @param int $left x position of left upper corner of crop rectangle
   * @param int $width rectangle width
   * @param int $height rectangle height
   * @return Image_Backend
   */
  public function crop($top, $left, $width, $height) {}

	/**
	 * imageAvailable
	 *
	 * @param string $filename
	 * @param string $manipulation
	 * @return boolean
	 */
	public function imageAvailable($filename, $manipulation) {}

	/**
	 * onBeforeDelete
	 *
	 * @param Image $frontend
	 * @return void
	 */
	public function onBeforeDelete($frontend) {}

}
