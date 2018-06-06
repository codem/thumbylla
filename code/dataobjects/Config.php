<?php
namespace Codem\Thumbor;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Config\Configurable;

/**
 * Simple Config class for Thumbor
 */
class Config {

  use Injectable;
  use Configurable;

  private static $thumbor_generation_key = '';
  private static $backend_protocol_https = false;
  private static $backend_path = '';
  private static $backends = [];
}
