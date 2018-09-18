<?php
namespace Codem\Thumbor;
use Codem\Thumbor\Config as ThumborConfig;
use Thumbor\Url As ThumborUrl;
use Thumbor\Url\Builder As ThumborUrlBuilder;
use SilverStripe\Assets\Image As SS_Image;
use SilverStripe\Assets\Image_Backend As SS_Image_Backend;
use SilverStripe\Assets\Storage\AssetContainer;
use SilverStripe\Core\Config\Config;
use SilverStripe\Assets\InterventionBackend;
use SilverStripe\Core\Flushable;
use SilverStripe\Assets\Storage\AssetStore;
use SilverStripe\Assets\Flysystem\FlysystemAssetStore;
use Exception;

/**
 * A Protected Image Backend for Thumbor-based image handling, replacing the InterventionBackend
 * Remember, the actual 'backend' is the Thumbor Server, all we do is create image URLs ;)
 * @package thumbylla
 */
class ThumbyllaProtectedImageBackend extends ThumbyllaImageBackend {
  /**
   * Based on config, pick a server to serve an image for the available protected backends
   * @returns string
   */
  protected function pickBackendHost() {
    $backends = Config::inst()->get(ThumborConfig::class, 'protected_backends');
    if(!$backends || empty($backends) || !is_array($backends)) {
      throw new Exception("No protected servers defined");
    }
    $key = array_rand($backends, 1);
    $server = $backends[$key];
    return $server;
  }

  /**
	 * This is NOT the key used to validate/sign images, it's used to generate a token for protected image access
	 * @returns string
	 */
	protected static function getProtectedSigningKey() {
		return Config::inst()->get(ThumborConfig::class, 'signing_key');
	}

  /**
   * Get protected image expiry time.
   * When a protected image is served, the Thumbor server must request the image within this amount of time
   */
  protected static function getExpiry() {
		$expiry = Config::inst()->get(ThumborConfig::class, 'expiry_time');
    if(!$expiry) {
      $expiry = 10;
    }
    return (int)$expiry;
	}

  protected function signURL($backend_host, &$image_url) {
		$image_url = self::signWithToken($backend_host, $image_url);
	}

  /**
	 * Add a token and timestamp to the URL, using the Thumbor generation key
	 * @param integer $expires seconds
	 * @param string $image_url
	 */
	private static function signWithToken($backend_host, $image_url) {
    $expires = self::getExpiry();
		$parts = parse_url($image_url);
		$path  = $parts['path'];
		$timestamp = microtime(true) + $expires;
		$token = self::signData($path . $timestamp);
		if(!$token) {
			/**
			 * If no token, return the non-token'd URL
			 * loading the image via Thumbor will most likely fail as the image is "protected"
			 * which is as expected
			 */
			return $image_url;
		}

		/*
     * Create a host token, this is used to validate that an incoming request
     * was via a protected backend
     */
    $host_token = self::signData($backend_host);
    if(!$host_token) {
      // return plain URL, which will result in a load failure on the backend
      return $image_url;
    }
		$query = "";
		if(!empty($parts['query'])) {
			$query = $parts['query'] . "&";
		}
		// a is the token, b is the expiry timestamp
		$query .= "a=" . $token
            . "&b=" . $timestamp
            . "&h=" . $host_token;
		$image_url = $parts['scheme'] . "://"
									. $parts['host']
									. (!empty($parts['port']) ? ":" . $parts['port'] : "")
									. $parts['path']
									. "?" . $query;
		/**
		 * the image URL thumbor loads now looks like this:
		 * http://protected.image.url?a=<token>&b=<expiry>
		 * See {@link Codem\Thumbor\AssetStore} for token/expiry checking
		 */
		return $image_url;
	}

	/**
	 * Sign the path provided and the expiry timestamp provided with the signing key
	 * See {@link Codem\Thumbor\AssetStore::isGranted()}
	 * @returns string
	 */
	public static function signData($data) {
		$key = self::getProtectedSigningKey();
		if(!$key) {
			throw new Exception("Cannot sign if no signing_key provided in config");
		}
    $salt = (string)Config::inst()->get(ThumborConfig::class, 'salt');
		$token = hash_hmac ( "sha256" , $data . $salt, $key, false );
    return $token;
	}

}
