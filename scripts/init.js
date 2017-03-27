(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global)));
}(this, (function(exports) {
	/**
	 * @desc 定义坐标系统与范围
	 */
	var chinaExtent = [45.64, 3.79, 165.62, 59.79]; // 中国范围
	var worldExtent = [-180, -90, 180, 90]; // 世界范围
	//var regionExtent = [119.216456801,29.075363916,119.890480883,29.456707392];//兰溪城市范围
	proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
	var projection = ol.proj.get("EPSG:4326"); //4326坐标
	var china2000Projection = ol.proj.get("EPSG:4490"); //4490坐标
	china2000Projection.setExtent(worldExtent); // Proj4自定义坐标系统必须设置范围



	/**
	 * @desc 去掉第0层的天地图分辨率信息，不会出现缩放到最后是空白的现象
	 */
	var tdtResolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625,
		0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
		0.00274658203125, 0.001373291015625, 0.0006866455078125,
		0.00034332275390625, 0.000171661376953125, 0.0000858306884765625,
		0.00004291534423828125, 0.000021457672119140625,
		0.0000107288360595703125, 0.00000536441802978515625,
		0.000002682209014892578125, 0.0000013411045074462890625
	];

	/**
	 *@desc 与分辨率信息需要每层严格对应起来
	 */
	var matrixIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
		18, 19, 20
	];

	/**
	 * @desc 天地图格网信息
	 */
	var tdtGrid = new ol.tilegrid.WMTS({
		extent: chinaExtent,
		origin: [-180, 90],
		resolutions: tdtResolutions,
		matrixIds: matrixIds
	});

	/**
	 * @desc 天地图图层
	 */
	var wmtsVecLayer = new ol.layer.Tile({
		source: new ol.source.WMTS({
			layer: 'vec',
			style: 'default',
			version: '1.0.0',
			matrixSet: 'c',
			format: 'tiles',
			url: 'http://t{0-6}.tianditu.com/vec_c/wmts',
			tileGrid: tdtGrid,
			wrapX: true,
			projection: china2000Projection
		})
	});

	var wmtsAnnoLayer = new ol.layer.Tile({
		source: new ol.source.WMTS({
			layer: 'cva',
			style: 'default',
			version: '1.0.0',
			matrixSet: 'c',
			format: 'tiles',
			url: 'http://t{0-6}.tianditu.com/cva_c/wmts',
			tileGrid: tdtGrid,
			wrapX: true,
			projection: china2000Projection
		})
	});
	var olmap = new ol.Map({
		view: new ol.View({
			center: [109.483933, 34.502358],
			zoom: 11,
			projection: china2000Projection
		}),
		layers: [wmtsVecLayer, wmtsAnnoLayer],
		renderer: 'canvas',
		target: 'map'
	});

	olmap.getView().fitExtent(chinaExtent, olmap.getSize()); //自动定位区域
	exports.olmap = olmap;
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
})));