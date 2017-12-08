<?php
namespace Codem\Thumbor;
/**
 * Represents our 'image' that is returned to templates, in reality it's just going to be used to return the Thumbor Server URL
 * @todo possibly return picture tag, srcset stuff maybe
 */
class ThumboredImage extends \ViewableData {

	private $url, $title, $filename;

	public function __construct($url, $title = "", $filename = "") {
		$this->url = $url;
		$this->title = trim($title);
		$this->filename = trim($filename);
		parent::__construct();
	}

	/**
	 * Return an HTML img tag for this Image.
	 *
	 * @return string
	 */
	public function forTemplate() {
		return $this->getTag();
	}
	
	/**
	 * Get the string value of a field on this object that has been suitable escaped to be inserted directly into a
	 * template.
	 */
	public function XML_val($field, $arguments = null, $cache = false) {
		if($this->url) {
			return $this->url->build()->__toString();
		} else {
			return "";
		}
	}
	
	/**
	 * Return the alt attr for the <img>
	 */
	private function getAltAttribute() {
		return $this->title ? $this->title : $this->filename;
	}

	/**
	 * Return an HTML img tag for this Image
	 * @todo support other attributes
	 *
	 * @return string
	 */
	public function getTag() {
		$url = $this->url->build();
		$alt = $this->getAltAttribute();
		return "<img src=\"" . $url->__toString() . "\" alt=\"" . $alt . "\" />";
	}
	
	
	/**
	 * At this point, the image exists
	 *
	 * @return bool Whether the cached image exists
	 */
	public function exists() {
		return true;
	}
	
	public function getRelativePath() {
		return $this->getField('Filename');
	}

	/**
	 * Prevent creating new tables for the cached record
	 *
	 * @return false
	 */
	public function requireTable() {
		return false;
	}

	/**
	 * Prevent writing the cached image to the database
	 *
	 * @throws Exception
	 */
	public function write($showDebug = false, $forceInsert = false, $forceWrite = false, $writeComponents = false) {
		return false;
	}

}
