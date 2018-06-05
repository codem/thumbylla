<?php
namespace Codem\Thumbor;
/**
 * Backend for Thumbor-based image handling
 * @package silverthumb
 * @subpackage filesystem
 */
class ImageBackend extends \Object implements \Image_Backend {


	/**
	 * __construct
	 *
	 * @param string $filename = null
	 * @return void
	 */
	public function __construct($filename = null)  {
		parent::__construct();
	}

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
	public function paddedResize($width, $height, $backgroundColor = "FFFFFF")  {}

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
