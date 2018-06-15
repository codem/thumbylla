<?php
namespace Codem\Thumbor;
use SilverStripe\Forms\Fieldlist;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\TextField;
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
			$state['data']['ManualCropData'] = $this->image->getSerialisedCropData();
			$state['data']['ImageURL'] = $this->image->getAbsoluteURL();
		}
		$state['data']['foo'] = 'bar';
		return $state;
	}

	/**
	 */
	public function getManualCropFields($name) {
		$field = TextareaField::create($name, '');
		if(!empty($this->image->ID) && $this->image instanceof SS_Image) {
			$field->setValue( $this->image->getSerialisedCropData() );
		}
		return [ $field ];
	}

}
