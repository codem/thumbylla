<?php
namespace Codem\Thumbor;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Forms\Fieldlist;

/**
 * This {@link \DataExtension} provides storage for manual cropping via {@link Codem\Thumbor\ManualCropField}
 */
class ImageExtension extends DataExtension {

	private static $db = [
		'ManualCropData' => 'Varchar(255)',// JSON data for croppr.js, keys are x,y, width and height
	];

	/**
	 * CMS Fields
	 * @return FieldList
	 */
	public function updateCmsFields(Fieldlist $fields) {
		if(!$this->owner instanceof SS_Image) {
			return;
		}
		$cropfield = new ManualCropField( $this->owner );
		if($fields->hasTabSet()) {
			$fields->addFieldToTab('Root.Main', $cropfield->getField());
		} else {
			$fields->add($f);
		}
	}

	/**
	 * getCropData
	 * @returns array
	 */
	public function getCropData() {
		$data = [];
		if(!$this->owner instanceof SS_Image) {
			return $data;
		}
		if($this->owner->ManualCropData) {
			$manual_crop_data = json_decode($this->owner->ManualCropData, false);
			if(isset($manual_crop_data->width) && isset($manual_crop_data->height)
				&& isset($manual_crop_data->x) && isset($manual_crop_data->y)) {
				$width = floor(abs((int)$manual_crop_data->width));
				$height = floor(abs((int)$manual_crop_data->height));
				$x = floor(abs((int)$manual_crop_data->x));
				$y = floor(abs((int)$manual_crop_data->y));
				if($width > 0 && $height > 0 && $x >= 0 && $y >= 0) {
					$data = [
						'x' => $x,
						'y' => $y,
						'width' => $width,
						'height' => $height,
						'rotate' => 0,
						'scaleX' => 1,
						'scaleY' => 1
					];
				}
			}
		}
		return $data;
	}

	/**
	 * Return crop data for use in cropperjs
	 */
	public function getSerialisedCropData() {
		$data = $this->getCropData();
		if(!empty($data)) {
			return json_encode($data, false);
		} else {
			return "";
		}
	}

}
