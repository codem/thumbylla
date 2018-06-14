/**
 * Handle manual cropping of images via cropperjs library
 */
;(function($) {
	$.entwine('ss', function($){
		$('div[data-manualcropdata]').entwine({
			onmatch: function() {
				var data = $(this).data('manualcropdata');
				var saveto = $(this).parents('.CompositeField:first').find('input[name="ManualCropData"]:first');
				console.log(saveto);
				var img = $(this).children('img')[0];
				var cropper = new Cropper( img, {
					viewMode: 1,
					dragMode: 'crop',
					aspectRatio: NaN,
					autoCrop: true,
					movable: true,
					rotatable: false,
					scalable: true,
					zoomable: false,
					zoomOnTouch: false,
					zoomOnWheel: false,
					checkOrientation: false,
					autoCropArea: 0.5,
					data : data,
					ready: function(e) {},
					crop : function(e) {
						var save_data = {
							x : Math.round(e.detail.x),
							y : Math.round(e.detail.y),
							width : Math.round(e.detail.width),
							height : Math.round(e.detail.height)
						};
						saveto.val( JSON.stringify(save_data) );
					}

				});
			}
		});
	});
})(jQuery);
