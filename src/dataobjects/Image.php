<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;
use SilverStripe\Core\Config;
use SilverStripe\Assets\Image As SS_Image;

/**
 * A Thumbor image object that extends Image and overrides various methods
 */
class Image extends SS_Image {

	private static $backend = "Codem\Thumbor\ImageBackend";

	/**
	 * @var Thumbor\Url\Builder
	 */
	private $thumbor_url;

	private $halign = "center";
	private $valign = "middle";

	public function __construct($record = null, $isSingleton = false, $model = null) {
		if(is_string($record)) {
			// handle UploadField passing a string as record when class_for_file_extension is not overridden
			$record = null;
		}
		parent::__construct($record, $isSingleton, $model);
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
		return $proto . $backends[$key];
	}

	/**
	 * Get secret key shared with the thumbor server to generate images. If this is exposed, anyone with it can create images from allowed hosts
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
		$inst = ThumborUrlBuilder::construct($server, $secret, $this->getAbsoluteURL());
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
		call_user_func_array([$this->thumbor_url, "addFilter"], $args);
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

		$path = $this->getFullPath();
		if(!is_readable($path)) {
			return null;
		}

		$meta_original = getimagesize( $path );
		if(empty($meta_original[0]) || empty($meta_original[1])) {
			return null;
		}

		$width = $meta_original[0];
		$height = $meta_original[1];
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
	 * Return a {@link Codem\Thumbor\Image} with a focal filter set based on the date returned from ManualCropData
	 * @see {@link Codem\Thumbor\ImageExtension}
	 * @returns Codem\Thumbor\Image
	 */
	public function CroppedFocus() {
		$data = $this->getCropData();
		if(!empty($data)) {
			$left = $data['x'];
			$top = $data['y'];
			// right =  left + width
			$right = $left + $data['width'];
			$bottom = $top + $data['height'];
			$this->Focal($left, $top, $right, $bottom);
			return $this;
		} else {
			// return the unaltered image if not data is set
			return $this;
		}
	}

	/**
	 * Crop the image using Thumbor manual crop handling based on image crop data
	 * @returns Codem\Thumbor\Image
	 */
	public function ManualCrop() {
		$data = $this->getCropData();
		if(!empty($data)) {
			$left = $data['x'];
			$top = $data['y'];
			// right =  left + width
			$right = $left + $data['width'];
			$bottom = $top + $data['height'];

			$this->UrlInstance();
			$this->thumbor_url->crop($left, $top, $right, $bottom);
		}
		return $this;
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
			case 'CMSThumbnail':// default CMS Thumbnail
				$this->thumbor_url->resize($this->stat('cms_thumbnail_width'),$this->stat('cms_thumbnail_height'));// e.g 100x100
				break;
			case 'AssetLibraryPreview':
			case 'assetlibrarypreview':
				$this->thumbor_url->resize($this->stat('asset_preview_width'),$this->stat('asset_preview_height'));// e.g 400x200
				break;
			case 'AssetLibraryThumbnail':
			case 'assetlibrarythumbnail':
				$this->thumbor_url->resize($this->stat('asset_thumbnail_width'),$this->stat('asset_thumbnail_height'));// e.g 100x100
				break;
			case 'StripThumbnail':
			case 'stripthumbnail':
				$this->thumbor_url->resize($this->stat('strip_thumbnail_width'),$this->stat('strip_thumbnail_height'));// e.g 50x50
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
				// this can result in images that are oddly cropped
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
		//var_dump($this->thumbor_url->build()->__toString());
		return new ThumboredImage( $this->thumbor_url, $this->Title, $this->Filename );
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

	public function Original() {
		return $this->getFormattedImage('Original');
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

	public function FitMax($width, $height) {
		return  $this->getFormattedImage('FitMax', $width, $height);
	}

	/**
	 *
	 * @todo provide a field to allow manual cropping
	 */
	public function CroppedFocusedImage($width, $height) {
		return $this->getFormattedImage('Fill', $width, $height);
	}

	/**
	 * We are not generating anything. This exists solely to avoid invoking GD image generation.
	 */
	public function generateFormattedImage($format) {
		// no need to generate anything!
	}


	// Predefined social media images

	public function getSocialProviderConfig($provider) {
		$config = $this->config()->get('social');
		return isset($config[ $provider ]) && is_array($config[ $provider ]) ? $config[ $provider ] : [];
	}

	public function Social($provider, $key) {
		$config = $this->getSocialProviderConfig($provider);
		if(!empty($config[$key]['width']) && !empty($config[$key]['height'])) {
			return $this->getFormattedImage('Fill', $config[$key]['width'], $config[$key]['height']);
		} else {
			return null;
		}
	}

}
