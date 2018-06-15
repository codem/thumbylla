<?php
namespace Codem\Thumbor;
use SilverStripe\Core\Extension;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Forms\Fieldlist;

/**
 * This {@link \Extension} provides storage for manual cropping via {@link Codem\Thumbor\ManualCropField}
 */
class AssetFormFactoryExtension extends Extension {
  /**
	 * CMS Fields
	 * @return FieldList
	 */
	public function updateFormFields($fields, $controller, $formName, $context) {
		$record = isset($context['Record']) ? $context['Record'] : null;
		if(!$record instanceof SS_Image) {
			return;
		}
		$field = ManualCropField::create('ManualCropData', '', $record);
		$fields->addFieldToTab('Editor.Crop', $field);

	}

}
