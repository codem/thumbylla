<?php
namespace Codem\Thumbor;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;
use SilverStripe\Core\Config\Config;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Assets\Storage\AssetStore;
use Intervention\Image\ImageManagerStatic;

/**
 * A Thumbor image object that extends Image and overrides various methods
 * @todo maybe the overriding methods e.g ScaleWidth to the {@link Codem\Thumbor\ThumbyllaImageBackend} and access them via {@link SilverStripe\Assets\ImageManipulation}
 */
class Image extends SS_Image {

	private static $table_name = "ThumborImage";

	private $image_backend = null;

	private $_cache_width = 0;//the width of the original image uploaded
	private $_cache_height = 0;//the height of the original image uploaded

	public function __construct($record = null, $isSingleton = false, $queryParams = array()) {
		parent::__construct($record, $isSingleton, $queryParams);
		if($this->getVisibility() == AssetStore::VISIBILITY_PROTECTED) {
			$this->image_backend = new ThumbyllaProtectedImageBackend($this);
		} else {
			$this->image_backend = new ThumbyllaImageBackend($this);
		}
	}


	/**
	 * @returns object
	 */
	public function getImageBackend() {
		return $this->image_backend;
	}

	/**
	 * Helper method to get the current Thumbor URL Builder instance
	 * @returns Thumbor\Url\Builder
	 */
	public function getUrlInstance() {
		return $this->getImageBackend()->getUrlInstance();
	}

	/**
	 * Return the width of the original image uploaded
	 * @param boolean $force set to true to force retrieval
	 * @returns int
	 */
	public function getWidth($force = false) {
		if($this->_cache_width && !$force) {
			return $this->_cache_width;
		}

		try {
			$stream = $this->getStream();
			$im = ImageManagerStatic::make($stream);
			$width = $im->getWidth();
			$this->_cache_width = $width;
			return $this->_cache_width;
		} catch (\Exception $e) {

		}
		return 0;
	}

	/**
	 * Return the height of the original image uploaded
	 * @param boolean $force set to true to force retrieval
	 * @returns int
	 */
	public function getHeight($force = false) {
		if($this->_cache_height && !$force) {
			return $this->_cache_height;
		}

		try {
			$stream = $this->getStream();
			$im = ImageManagerStatic::make($stream);
			$height = $im->getHeight();
			$this->_cache_height = $height;
			return $this->_cache_height;
		} catch (\Exception $e) {

		}
		return 0;
	}

	/**
	 * Override {@link ViewableData::obj()} to avoid getting previous filter requests from the Viewable data objCache
	 * @param string $fieldName
	 * @param array $arguments
	 * @param bool $cache Cache this object
	 * @param string $cacheName a custom cache name
	 * @return Object|DBField
	 */
	public function obj($fieldName, $arguments = [], $cache = false, $cacheName = null) {
		return parent::obj($fieldName, $arguments, false, $cacheName);
	}

	public function Resampled() {
		return $this;
	}

	/**
	 * Overrides ImageManipulation trait
	 */
	public function manipulate($variant, $callback) {
		return;
	}

	/**
	 * Overrides ImageManipulation trait
	 */
	public function manipulateImage($variant, $callback)
	{
		return;
	}

	/**
	 * As filters are chainable, getting multiple manipulations in a template on the same image
	 * can result in filters being retained for the 2nd image.
	 *
	 * Example with Restart() in a template
	 * $TestImage.Pad(500,300, 'fc0') - /fit-in/500x300/filters:fill(fc0)/_URL_
	 * $TestImage.Align('left','top').Fill(160,160) - /160x160/left/top/_URL_
	 *
	 * Example without Restart() in a template
	 * $TestImage.Pad(500,300, 'fc0') - /fit-in/500x300/filters:fill(fc0)/_URL_
	 * $TestImage.Align('left','top').Fill(160,160) - /160x160/left/top/filters:fill(fc0)/_URL_
	 *
	 * Without Restart() the fc0 filter is incorrectly carried to the 2nd image request in the template
	 *
	 * If we are displaying the same image in multiple ways.
	 * Call $Image.Restart().Filter() to the thumbor_url instance and start from scratch;
	 */
	public function Restart() {
		// Reset thumbor_url
		$backend = $this->getImageBackend()->Restart();
		return $this;
	}

	/**
	 * Align the crop (for Fill/CroppedImage)
	 * @param string $halign one of center, left, right
 	 * @param string $valign one of middle, top, bottom
	 * @returns Codem\Thumbor\Image
	 */
	public function Align($halign = "center", $valign = "middle") {
		$backend = $this->getImageBackend()->Align($halign, $valign);
		return $this;
	}

	/**
	 * Enable Smart Cropping on this instance. It cannot be turned off once enabled.
	 * @note requires a Thumbor server with smart crop capabilities
	 * @param boolean $smart
	 */
	public function Smart($enabled = true) {
		$backend = $this->getImageBackend()->Smart($enabled);
		return $this;
	}

	/**
	 * Add multiple filters
	 */
	public function Filters(array $filter) {
		$backend = $this->getImageBackend()->Filters($filter);
		return $this;
	}

	/**
	 * Add single filter
	 * @note DOCS: "Filters are affecting each other in the order they are specified"
	 */
	public function Filter() {
		$args = func_get_args();
		$this->getImageBackend()->Filter($args);
		return $this;
	}

	/**
	 * Shortcut method to crop an image from its edges, e.g 20,20,20,20 crops the image 20 pixels in from each edge
	 * @param int $in_from_left pixels in from the left edge (>0)
	 * @param int $in_from_top pixels in from the top edge (>0)
	 * @param int $in_from_right pixels in from the right edge (>0)
	 * @param int $in_from_bottom pixels in from the bottom edge (>0)
	 */
	public function ManualCropFromCorners($in_from_left, $in_from_top, $in_from_right, $in_from_bottom) {

		$width = $this->getWidth();
		$height = $this->getHeight();

		syslog(LOG_INFO, $width . ":" . $height);
		// calculate the bottom/right/x|y values
		$bottom_right_x = $width - $in_from_right;
		$bottom_right_y = $height - $in_from_bottom;

		$top_left_x = $in_from_left;
		$top_left_y = $in_from_top;

		syslog(LOG_INFO, $bottom_right_x . ":" . $bottom_right_y);

		$backend = $this->getImageBackend()->ManualCropFromCorners($top_left_x, $top_left_y, $bottom_right_x, $bottom_right_y);
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
		$backend = $this->getImageBackend()->Focal($left, $top, $right, $bottom);
		return $this;
	}

	/**
	 * Return a {@link Codem\Thumbor\Image} with a focal filter set based on the date returned from ManualCropData
	 * @see {@link Codem\Thumbor\ManualCropImageExtension}
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
			$this->getImageBackend()->ManualCrop($data);
		}
		return $this;
	}

	/**
	 * Some specific Thumbor image handling
	 */

	public function FlipVertical() {
		return $this->getImageBackend()->getFormattedImage(['FlipVertical']);
	}

	public function FlipHorizontal() {
		return $this->getImageBackend()->getFormattedImage(['FlipHorizontal']);
	}

	public function ScaleWidthFlipVertical($width) {
		return $this->getImageBackend()->getFormattedImage(['ScaleWidthFlipVertical', $width]);
	}

	public function ScaleWidthFlipHorizontal($width) {
		return $this->getImageBackend()->getFormattedImage(['ScaleWidthFlipHorizontal', $width]);
	}

	public function Original() {
		return $this->getImageBackend()->getFormattedImage(['Original']);
	}

	// Predefined social media images

	public function getSocialProviderConfig($provider) {
		$config = $this->config()->get('social');
		return isset($config[ $provider ]) && is_array($config[ $provider ]) ? $config[ $provider ] : [];
	}

	public function Social($provider, $key) {
		$config = $this->getSocialProviderConfig($provider);
		if(!empty($config[$key]['width']) && !empty($config[$key]['height'])) {
			return $this->getImageBackend()->getFormattedImage( ['Fill', $config[$key]['width'], $config[$key]['height'] ]);
		} else {
			return null;
		}
	}

	// --- CORE silverstripe image thumbnailing methods --- ///

	/**
	 * Return URL representing an image scaled to the provided width
	 */
	public function ScaleWidth($width) {
		return $this->getImageBackend()->getFormattedImage(['ScaleWidth', $width]);
	}

	/**
	 * Proportionally scale down this image if it is wider than the specified width.
	 * Similar to ScaleWidth but without up-sampling. Use in templates with $ScaleMaxWidth.
	 *
	 * @param int $width The maximum width of the output image
	 * @return Codem\ThumboredImage
	 */
	public function ScaleMaxWidth($width) {
			$width = $this->castDimension($width, 'Width');
			$original_width = $this->getWidth();
			if($original_width <= $width) {
				$width = $original_width;
			}
			return $this->getImageBackend()->getFormattedImage(['ScaleWidth', $width]);
	}

	/**
	 * Return URL representing an image resized/cropped to fill specified dimensions
	 */
	public function Fill($width, $height, $test = '') {
		return $this->getImageBackend()->getFormattedImage(['Fill', $width, $height]);
	}

	/**
	 * Crop this image to the aspect ratio defined by the specified width and height,
	 * then scale down the image to those dimensions if it exceeds them.
	 * Similar to Fill but without up-sampling. Use in templates with $FillMax.
	 *
	 * @param int $width The relative (used to determine aspect ratio) and maximum width of the output image
	 * @param int $height The relative (used to determine aspect ratio) and maximum height of the output image
	 * @return Codem\ThumboredImage
	 */
	public function FillMax($width, $height) {
			$width = $this->castDimension($width, 'Width');
			$height = $this->castDimension($height, 'Height');

			$original_width = $this->getWidth();
			$original_height = $this->getHeight();

			if (!$original_width || !$original_height) {
				return null;
			}

			if ($original_width === $width && $original_height === $height) {
				// return a representation of the original image
				return $this->Original();
			}

			// Compare current and destination aspect ratios
			$image_ratio = $original_width / $original_height;
			$crop_ratio = $width / $height;
			if ($crop_ratio < $image_ratio && $currentHeight < $height) {
				// Crop off sides
				$width_new = round($original_height * $crop_ratio);
				$height_new = $original_height;
			} elseif ($currentWidth < $width) {
				// Crop off top/bottom
				$width_new = $original_width;
				$height_new = round($original_width / $crop_ratio);
			} else {
				// Crop on both
				$width_new = $width;
				$height_new = $height;
			}

			return $this->getImageBackend()->getFormattedImage(['Fill', $width_new, $height_new]);
	}

	/**
	 * Crop image on Y axis if it exceeds specified height. Retain width.
	 * Use in templates with $CropHeight. Example: $Image.ScaleWidth(100).CropHeight(100)
	 *
	 * @uses CropManipulation::Fill()
	 * @param int $height The maximum height of the output image
	 * @return Codem\ThumboredImage
	 */
	public function CropHeight($height) {
		$original_width = $this->getWidth();
		$original_height = $this->getHeight();
		if($original_height <= $height) {
			return $this->Original();
		}
		return $this->getImageBackend()->getFormattedImage(['Fill', $original_width, $height]);
	}

	/**
	 * Crop image on X axis if it exceeds specified width. Retain height.
	 * Use in templates with $CropWidth. Example: $Image.ScaleHeight(100).$CropWidth(100)
	 *
	 * @uses CropManipulation::Fill()
	 * @param int $width The maximum width of the output image
	 * @return Codem\ThumboredImage
	 */
	public function CropWidth($width) {
			$original_width = $this->getWidth();
			$original_height = $this->getlHeight();
			if($original_width <= $width) {
				return $this->Original();
			}
			return $this->getImageBackend()->getFormattedImage(['Fill', $width, $original_height]);
	}

	/**
	 * Scale image proportionally by height. Use in templates with $ScaleHeight.
	 *
	 * @param int $height The height to set
	 * @return Codem\ThumboredImage
	 */
	public function ScaleHeight($height) {
		$original_height = $this->getHeight();
		return $this->getImageBackend()->getFormattedImage(['ScaleHeight', $height]);
	}

	/**
	 * Proportionally scale down this image if it is taller than the specified height.
	 * Similar to ScaleHeight but without up-sampling. Use in templates with $ScaleMaxHeight.
	 *
	 * @uses ScalingManipulation::ScaleHeight()
	 * @param int $height The maximum height of the output image
	 * @return AssetContainer
	 */
	public function ScaleMaxHeight($height) {
			$height = $this->castDimension($height, 'Height');
			$original_height = $this->getHeight();
			if($original_height <= $height) {
				return $this->Original();
			}
			return $this->getImageBackend()->getFormattedImage(['ScaleHeight', $height]);
	}

	/**
	 * Note that Thumbor avoids skewing images, so this may not return what you expect
	 *
	 * @param int $width Width to resize to
	 * @param int $height Height to resize to
	 * @return Codem\ThumboredImage
	 */
	public function ResizedImage($width, $height) {
		return $this->getImageBackend()->getFormattedImage([__FUNCTION__, $width, $height]);
	}

	/**
	 * Fit image to specified dimensions and fill leftover space with a solid colour (default white). Use in
	 * templates with $Pad.
	 *
	 * @param int $width The width to size to
	 * @param int $height The height to size to
	 * @param string $backgroundColor
	 * @param int $transparencyPercent Level of transparency - not supported by Thumbor
	 * @return Codem\ThumboredImage
	 */
	public function Pad($width, $height, $backgroundColor = 'FFFFFF', $transparencyPercent = 0) {
		return $this->getImageBackend()->getFormattedImage(['Pad', $width, $height, $backgroundColor, $transparencyPercent]);
	}

	/**
	 * Scale image proportionally to fit within the specified bounds, thumbor handles sanity checking
	 *
	 * @param integer $width The width to size within
	 * @param integer $height The height to size within
	 */
	public function Fit($width, $height) {
		return $this->getImageBackend()->getFormattedImage(['Fit', $width, $height]);
	}

	public function FitMax($width, $height) {
		return $this->getImageBackend()->getFormattedImage(['FitMax', $width, $height]);
	}

	/**
	 *
	 * @todo provide a field to allow manual cropping
	 */
	public function CroppedFocusedImage($width, $height) {
		return $this->getImageBackend()->getFormattedImage(['Fill', $width, $height]);
	}

}
