(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	var wuhanExtent = [113.7813, 30.1918, 114.72, 30.63]; // 武汉范围
	map.getView().fitExtent(wuhanExtent, map.getSize()); //自动定位区域
	$.get('../data/wuhan-car', function(rs) {

		var data = [];
		var timeData = [];

		rs = rs.split("\n");
		console.log(rs.length);
		var maxLength = 0;
		for (var i = 0; i < rs.length; i++) {
			var item = rs[i].split(',');
			var coordinates = [];
			if (item.length > maxLength) {
				maxLength = item.length;
			}
			for (j = 0; j < item.length; j += 2) {
				coordinates.push([item[j], item[j + 1]]);
				timeData.push({
					geometry: {
						type: 'Point',
						coordinates: [item[j], item[j + 1]]
					},
					count: 1,
					time: j
				});
			}
			data.push({
				geometry: {
					type: 'LineString',
					coordinates: coordinates
				}
			});

		}

		var dataSet = new mapv.DataSet(data);

		var options = {
			strokeStyle: 'rgba(53,57,255,0.5)',
			coordType: 'bd09mc',
			// globalCompositeOperation: 'lighter',
			shadowColor: 'rgba(53,57,255,0.2)',
			shadowBlur: 3,
			lineWidth: 3.0,
			draw: 'simple'
		}

		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);


		var dataSet = new mapv.DataSet(timeData);

		var options = {
			fillStyle: 'rgba(255, 0, 0, 0.2)',
			coordType: 'bd09mc',
			globalCompositeOperation: "lighter",
			size: 1.5,
			animation: {
				stepsRange: {
					start: 0,
					end: 100
				},
				trails: 3,
				duration: 5,
			},
			draw: 'simple'
		}

		mapvLayer = new mapv.olMapLayer(map, dataSet, options);
	});
})));