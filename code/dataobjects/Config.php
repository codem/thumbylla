<?php
namespace Codem\Thumbor;
/**
 * Simple Config class for Thumbor
 */
class Config extends \Object {
  private static $thumbor_generation_key = '';
  private static $backend_protocol_https = false;
  private static $backend_path = '';
	private static $backends = [];
}
