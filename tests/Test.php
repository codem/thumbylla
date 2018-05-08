<?php
use Codem\Thumbor\ThumboredImage;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;

/**
 * Module tests
 * @note 99designs/phumbor provides a number of tests related to URL/Token/Command generation
 */
class ThumborTest extends \SapphireTest {
	
	const WIDTH = 32;
	const HEIGHT = 32;
	
	
	public function setUp() {
		parent::setUp();
		Config::inst()->update('Director', 'alternate_base_url', '/');
	}
	
	public function tearDown() {
		parent::tearDown();
		Config::inst()->update('Director', 'alternate_base_url', '');
	}
	
	public function testHasGenerationKey() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		$key = $image->getSecretKey();
		$this->assertNotNull( $key );	
	}

	/**
	 * Create an image and test that the URL matches the Phumbor URL generated
	 */
	public function testUrlGeneration() {
		
		$image = \Image::get()->sort('ID ASC')->first();
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
		
		// Download the URL and test its size
		$meta = getimagesize($url);
		
		$this->assertEquals($meta[0], self::WIDTH);
		$this->assertEquals($meta[1], self::HEIGHT);
		
		// Test that the thumb DOES NOT exist locally in /assets, which is the point of Thumbor
		$cache_file_name = $image->cacheFilename('Pad', self::WIDTH, self::HEIGHT, $colour);
		$this->assertTrue(!empty($cache_file_name));
		// The image should not exist in this location
		$filesystem_path = Director::baseFolder() . "/" . $cache_file_name;
		$this->assertTrue( !file_exists($filesystem_path) );
		
	}
	
	
	/**
	 * Test alignment settings
	 */
	public function testAlignSettings() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		
		$original_url = $image->getAbsoluteURL();
		
		$height = floor(self::HEIGHT/2);
		$thumb = $image->Align('left','top')->Fill( self::WIDTH, $height );
		$this->assertEquals( $image->getHalign(), 'left');
		$this->assertEquals( $image->getValign(), 'top');
		
		// Get its URL
		$url = $thumb->getAbsoluteURL();
		
		$this->assertStringEndsWith("=/32x16/left/top/{$original_url}", $url);
		
	}
	
	/**
	 * Test that smart cropping is on
	 */
	public function testSmartCrop() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		
		$original_url = $image->getAbsoluteURL();
		
		$thumb = $image->Smart(true)->ScaleWidth( self::WIDTH );
		
		// Get its URL
		$url = $thumb->getAbsoluteURL();
		
		// should end with this command/path
		$this->assertStringEndsWith("=/32x0/smart/{$original_url}", $url);
		
	}
	
	/**
	 * Test that padding method returns expected command
	 */
	public function testPadding() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		
		$original_url = $image->getAbsoluteURL();
		
		$width = self::WIDTH + 20;
		$height = self::HEIGHT + 20;
		$colour = 'f7392a';
		$thumb = $image->Pad( $width, $height, $colour);
		
		// Get its URL
		$url = $thumb->getAbsoluteURL();
		
		// should end with this command/path
		$this->assertStringEndsWith("=/fit-in/52x52/filters:fill(f7392a)/{$original_url}", $url);
		
		
	}
	
	/**
	 * Test that an image returns as webp (requires server support)
	 */
	public function testWebP() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		
		$original_url = $image->getAbsoluteURL();
		
		$thumb = $image->Filter('format','webp')->ScaleWidth( self::WIDTH );
		
		// Get its URL
		$url = $thumb->getAbsoluteURL();
		
		// should end with this command/path
		$this->assertStringEndsWith("=/32x0/filters:format(webp)/{$original_url}", $url);
		
		$meta = getimagesize($url);
		
		$this->assertEquals( $meta['mime'], "image/webp" );
		
	}
	
	public function testCompoundFilters() {
		$image = \Image::get()->sort('ID ASC')->first();
		$this->assertTrue( !empty($image->ID) && $image->exists() );
		
		$original_url = $image->getAbsoluteURL();
		
		$thumb = $image
					->Filter('quality', 20)
					->Filter('blur', 30)
					->ScaleWidth( self::WIDTH );
		
		// Get its URL
		$url = $thumb->getAbsoluteURL();
		
		// should end with this command/path
		$this->assertStringEndsWith("=/32x0/filters:quality(20):blur(30)/{$original_url}", $url);
		
		
	}
	
	/**
	 * Test that a social shortcut works
	 */
	public function testSocialShortcut() {
		$image = \Image::get()->sort('ID ASC')->first();
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
	
}