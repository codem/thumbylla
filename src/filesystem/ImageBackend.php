<?php
namespace Codem\Thumbor;
use SilverStripe\Assets\Image_Backend As SS_Image_Backend;
use SilverStripe\Assets\Storage\AssetContainer;

/**
 * Backend for Thumbor-based image handling.
 * In this case, we don't have a backend - that's all handled by the Thumbor server(s)
 * @package thumbylla
 */
class ImageBackend implements SS_Image_Backend {


	/**
	 * __construct
	 *
	 * @param string $filename = null
	 * @return void
	 */
	public function __construct(AssetContainer $assetContainer = null)  {
		parent::__construct();
	}

	/**
	 * @return int The width of the image
	 */
	public function getWidth() {}

	/**
	 * @return int The height of the image
	 */
	public function getHeight() {}

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
	public function writeTo($path)  {
	}

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
	public function getImageResource()  {}

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
