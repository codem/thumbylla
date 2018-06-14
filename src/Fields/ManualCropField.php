<?php
namespace Codem\Thumbor;
use SilverStripe\Forms\Fieldlist;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\FormField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\View\Requirements;


/**
 * Provides a manual cropping field to assist in saving ManualCrop data for the crop Thumbor command
 * @uses cropperjs JS library
 */
class ManualCropField extends FieldGroup {

	private $image;

	protected $schemaComponent = 'ManualCropField';
	protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

	/**
	 * @param Image $image the original image to crop
	 */
	public function __construct($name, $title = null, SS_Image $image = null) {
		$this->image = $image;
		$fields = $this->getCropDataField($name);
		$this->setName($name)->setValue('');
		parent::__construct($title, $fields);
	}

	public function setImage(SS_Image $image) {
		$this->image = $image;
	}

	public function getImage() {
		return $this->image;
	}


	public function getSchemaStateDefaults() {
		$state = parent::getSchemaStateDefaults();
		if(!empty($this->image->ID) && $this->image instanceof SS_Image) {
			$state['data'] += [
				'cropdata' => $this->image->getSerialisedCropData(),
				'cropdataraw' => $this->image->getCropData()
			];
		}
		$state['data']['foo'] = 'bar';
		return $state;
	}

	public function getCropDataField($name) {
		$field = TextField::create("ManualCropField_{$name}_CropData");
		if(!empty($this->image->ID) && $this->image instanceof SS_Image) {
			$field->setValue( $this->image->getSerialisedCropData() );
		}
		return [ $field ];
	}

}
