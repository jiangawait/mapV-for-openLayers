(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	var beijingPoint = [116.3910, 39.9070]; // 武汉范围
	map.getView().setCenter(beijingPoint); //自动定位区域
	map.getView().setZoom(12); //自动定位区域
	
	$.get('../data/beijing-village.json', function(data) {

		var dataSet = new mapv.DataSet(data);

		var options = {
			fillStyle: 'rgba(255, 80, 53, 0.8)',
			strokeStyle: 'rgba(250, 255, 53, 0.8)',
			size: 3,
			lineWidth: 1,
			draw: 'simple'
		}

		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

	});
})));