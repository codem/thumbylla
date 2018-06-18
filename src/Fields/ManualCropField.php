<?php
namespace Codem\Thumbor;
use SilverStripe\Forms\Fieldlist;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\FormField;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\View\Requirements;


/**
 * Provides a manual cropping field to assist in saving ManualCrop data for the crop Thumbor command
 * @uses cropperjs JS library
 */
class ManualCropField extends FieldGroup {

	protected $image;

	protected $schemaComponent = 'ManualCropField';
	protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

	/**
	 * @param Image $image the original image to crop
	 */
	public function __construct($name, $title = '', SS_Image $image) {
		$this->setImage($image);
		$fields = $this->getManualCropFields($name);
		$this->setName($name);
		$this->setValue('');
		parent::__construct( $title, $fields );
	}

	public function setImage(SS_Image $image) {
		$this->image = $image;
		return $this;
	}

	public function getImage() {
		return $this->image;
	}


	public function getSchemaStateDefaults() {
		$state = parent::getSchemaStateDefaults();
		$state['data']['ManualCropData'] = '';
		$state['data']['ImageURL'] = '';
		if(!empty($this->image->ID) && $this->image instanceof SS_Image) {
			$state['data']['ManualCropData'] = $this->image->getCropData();
			$state['data']['ImageURL'] = $this->image->getAbsoluteURL();
		}
		return $state;
	}

	/**
	 */
	public function getManualCropFields($name) {
		$fields = [];
		$storage_field = TextareaField::create($name, '')->addExtraClass('manualcropdata');// this must be the first field
		$fields[] = $storage_field;
		if(!empty($this->image->ID) && $this->image instanceof SS_Image) {
			$value = $this->image->getSerialisedCropData();
			if(!$value) {
				$fields[] = LiteralField::create('ManualCropDataHelper', '<p class="message info">' . _t('THUMBOR.HasNoCrop', 'Modify the crop using the blue box.<br />'
																						. 'Supporting templates will use either the crop or the centre of the crop to produce thumbnails.') . '<p>');
			} else {
				$storage_field->setValue( $value );
				$fields[] = LiteralField::create('ManualCropDataHelper', '<p class="message info">' . _t('THUMBOR.HasCurrentCrop', 'The current crop is shown. Modify the crop using the blue box.<br />'
																						. 'Supporting templates will use either the crop or the centre of the crop to produce thumbnails.') . '<p>');
			}
		}
		return $fields;
	}

}
