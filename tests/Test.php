<?php
namespace Codem\Thumbor;
use Codem\Thumbor\ThumboredImage;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;
use Codem\Thumbor\ManualCropField As ManualCropField;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Core\Config\Config;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Assets\File;
use SilverStripe\Assets\Folder;
use SilverStripe\Control\Director;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Assets\Storage\AssetStore;

/**
 * Module tests
 * @note 99designs/phumbor provides a number of tests related to URL/Token/Command generation
 */
class ThumborTest extends SapphireTest {

	const WIDTH = 474;
	const HEIGHT = 320;
	const SAMPLE_IMAGE = 'unsplash_5bxCaAcu1dc.jpg';// 2248 × 1515

	protected $usesDatabase = true;
	protected static $fixture_file = 'ThumborImageTest.yml';

	private $image;

	private $asset_store;

	public function setUp() {
		parent::setUp();

		// Copy test images for each of the fixture references
		/** @var File $image */
		$files = File::get()->exclude('ClassName', Folder::class);
		foreach ($files as $image) {
			$sourcePath = __DIR__ . '/samples/' . $image->Name;
			$image->setFromLocalFile($sourcePath, $image->Filename);
			$image->publishFile();
		}
		$this->image = $this->objFromFixture(Image::class, 'sampleImage');
		$this->asset_store = singleton(AssetStore::class);

	}

	public function tearDown() {
		parent::tearDown();
		//$this->unlinkSampleImage();
	}

	private function unlinkSampleImage() {
		if($this->image) {
			$this->image->delete();
		}
	}

	private function getSampleImage() {
		return $this->image;
	}

	private function getRemoteImageDimensions($url, &$width, &$height) {
		$meta = getimagesize($url);
		$width = isset($meta[0]) ? $meta[0] : -1;
		$height = isset($meta[1]) ? $meta[1] : -1;
	}

	public function testHasGenerationKey() {
		$key = Config::inst()->get('Codem\Thumbor\Config', 'thumbor_generation_key');
		$this->assertNotNull( $key );
	}

	/**
	 * Create an image and test that the URL matches the Phumbor URL generated
	 */
	public function testUrlGeneration() {

		$image = $this->getSampleImage();

		$this->assertTrue( !empty($image->ID) && $image->exists() );

		// Generate a thumb
		$colour = 'ffffff';
		$thumb = $image->Pad( self::WIDTH, self::HEIGHT, $colour );
		$this->assertTrue($thumb instanceof ThumboredImage);
		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// Thumbor\Url\Builder
		$instance = $image->getUrlInstance();
		$this->assertTrue($instance instanceof ThumborUrlBuilder);//Phumbor
		$instance_url = $instance->__toString();

		$this->assertEquals($url, $instance_url);

		$this->getRemoteImageDimensions($url, $width, $height);

		$this->assertEquals($width, self::WIDTH);
		$this->assertEquals($height, self::HEIGHT);

		// Test that the _resampled thumb DOES NOT exist locally in /assets, which is the point of Thumbor
		$variant_name = $image->variantName('Pad', self::WIDTH, self::HEIGHT, $colour);
		$filename = $image->getFilename();
		$hash = $image->getHash();
		$exists = $this->asset_store->exists($filename, $hash, $variant_name);

		$this->assertTrue( !$exists, "The variant name exists and it should not" );

	}


	/**
	 * Test alignment settings
	 */
	public function testAlignSettings() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$height = floor(self::HEIGHT/2);
		$width = self::WIDTH;
		$thumb = $image->Align('left','top')->Fill( $width, $height );

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		$this->assertStringEndsWith("=/{$width}x{$height}/left/top/{$original_url}", $url);

	}

	/**
	 * Test that smart cropping is on
	 */
	public function testSmartCrop() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$width = self::WIDTH;
		$height = 0;
		$thumb = $image->Smart(true)->ScaleWidth( $width );

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// should end with this command/path
		$this->assertStringEndsWith("=/{$width}x{$height}/smart/{$original_url}", $url);

	}

	/**
	 * Test that padding method returns expected command
	 */
	public function testPadding() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$width = self::WIDTH + 20;
		$height = self::HEIGHT + 20;
		$colour = 'f7392a';
		$thumb = $image->Pad( $width, $height, $colour);

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// should end with this command/path
		$this->assertStringEndsWith("=/fit-in/{$width}x{$height}/filters:fill(f7392a)/{$original_url}", $url);


	}

	/**
	 * Test that an image returns as webp (requires server support)
	 */
	public function testWebP() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$width = self::WIDTH;
		$height = 0;

		$thumb = $image->Filter('format','webp')->ScaleWidth( $width );

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// should end with this command/path
		$this->assertStringEndsWith("=/{$width}x{$height}/filters:format(webp)/{$original_url}", $url);

		$meta = getimagesize($url);

		$this->assertEquals( $meta['mime'], "image/webp" );

	}

	public function testCompoundFilters() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$width = self::WIDTH;
		$height = 0;

		$thumb = $image
					->Filter('quality', 20)
					->Filter('blur', 30)
					->ScaleWidth( $width );

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// should end with this command/path
		$this->assertStringEndsWith("=/{$width}x{$height}/filters:quality(20):blur(30)/{$original_url}", $url);


	}

	/**
	 * Test that a social shortcut works
	 */
	public function testSocialShortcut() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		$provider = 'Facebook';
		$key = 'cover';
		$thumb = $image->Social($provider, $key);

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		$config = $image->getSocialProviderConfig($provider);
		$provider_config = isset($config[ $key ]) ? $config[ $key ] : [];

		$this->assertArrayHasKey('width', $provider_config);
		$this->assertArrayHasKey('height', $provider_config);

		// should end with this command/path
		$this->assertStringEndsWith("=/{$provider_config['width']}x{$provider_config['height']}/center/middle/{$original_url}", $url);
	}

	/**
	 * Test manual crop from corners
	 * @todo CroppedFocus crop test
	 * @todo failing test - HTTP 599: Port number out of range, culprit seems to be /20x20:-40x-40/ being the crop filter
	 */
	public function testManualCropFromCorners() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		if($image->hasMethod('ensureLocalFile')) {
			$image->ensureLocalFile();
		}

		$original_url = $image->getAbsoluteURL();

		$in_from_left = 20;
		$in_from_top = 20;
		$in_from_right = 40;
		$in_from_bottom = 40;

		$width_original = $image->getWidth();
		$height_original = $image->getHeight();

		$bottom_right_x = $width_original - $in_from_right;
		$bottom_right_y = $height_original - $in_from_bottom;

		$width_thumb = $width_original - $in_from_left - $in_from_right;
		$height_thumb = $height_original - $in_from_top - $in_from_bottom;

		$thumb = $image->ManualCropFromCorners($in_from_left,$in_from_top,$in_from_right,$in_from_bottom)->Original();

		// Get its URL
		$url = $thumb->getAbsoluteURL();

		// should end with this command/path
		$this->assertStringEndsWith("=/{$in_from_left}x{$in_from_top}:{$bottom_right_x}x{$bottom_right_y}/{$original_url}", $url);

		$this->getRemoteImageDimensions($url, $returned_width_thumb, $returned_height_thumb);

		$this->assertEquals( $returned_width_thumb, $width_thumb );// width
		$this->assertEquals( $returned_height_thumb, $height_thumb );// height

	}

	/**
	 * Test that the field returns the expected field
	 */
	public function testManualCropField() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$cropper = new ManualCropField( $image );
		$field = $cropper->getField();

		$this->assertTrue($field instanceof CompositeField);

	}

	/**
	 * Store some manual crop data against the image, emulating {@link ManualCropField} and then ManualCrop() it
	 */
	public function testManualCrop() {
		$image = $this->getSampleImage();
		$this->assertTrue( !empty($image->ID) && $image->exists() );

		$original_url = $image->getAbsoluteURL();

		// samples..
		$width = 149;
		$height = 160;
		$x = 68;
		$y = 22;

		$image->ManualCropData = json_encode([
			"x" => $x,
			"y" => $y,
			"width" => $width,
			"height" => $height
		]);

		$image->write();

		$thumb = $image->ManualCrop()->Original();
		$url = $thumb->getAbsoluteURL();

		$br = $x + $width;
		$bl = $y + $height;
		$this->assertStringEndsWith("=/{$x}x{$y}:{$br}x{$bl}/{$original_url}", $url);

	}

}
