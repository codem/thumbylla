<?php
namespace Codem\Thumbor;
/**
 * Provides a manual cropping field to assist in saving ManualCrop data for the crop Thumbor command
 */
class ManualCropField extends \Object {
	
	private $image;
	
	/**
	 * @param \Image $image the original image to crop
	 */
	public function __construct(\Image $image = null) {
		
		$this->image = $image;
		
	}
	
	public function setImage(\Image $image) {
		$this->image = $image;
	}
	
	public function getImage() {
		return $this->image;
	}
	
	public function getField() {
		
		$path = realpath(dirname(__FILE__) . '/../../');
		$base = basename($path);
		
		if(!empty($this->image->ID) && $this->image instanceof \Image) {
			
			$crop_data = $this->image->ManualCropData;//need to call onCropStart on this ?
			// Load necessary scripts and styles
			\Requirements::javascript($base . '/lib/cropperjs/dist/cropper.min.js');
			\Requirements::javascript($base . '/javascript/manualcrop.js');
			\Requirements::css($base . '/lib/cropperjs/dist/cropper.min.css');
			
			$id = $this->image->ID;
			$field_id = "manualcrop-{$id}";
			$init_data = $this->image->getSerialisedCropData();
			$image_tag = "<img id=\"{$field_id}\" style=\"max-width:100%!important\" src=\"{$this->image->getURL()}\">";
			// Create the fields
			$fields = [
					\LiteralField::create("ManualCropDataLiteral{$id}", "<div id=\"{$field_id}-container\" data-saveto=\"{$field_id}-data\" data-manualcropdata=\"" . htmlspecialchars($init_data). "\" style=\"display:block;margin:0;padding:0;\">{$image_tag}</div>"),
					\HiddenField::create("ManualCropData{$id}", "Crop data for image #{$id}")
						->setAttribute("id", "{$field_id}-data")
						//->setAttribute("style", "width:100%")
						->setName("ManualCropData") // see Codem\Thumbor\ImageExtension
			];
		} else {
			$fields = [
					\LiteralField::create("ManualImageCropNoImage", "<p class=\"message\">Cropping will be available once an image is uploaded."),
			];
		}
		
		return \CompositeField::create( $fields );
	}
}