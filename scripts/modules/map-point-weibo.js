(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	$.get('../data/weibo.json', function(rs) {
		console.log(rs);
		var data1 = [];
		var data2 = [];
		var data3 = [];
		var data4 = [];
		for (var i = 0; i < rs[0].length; i++) {
			var geoCoord = rs[0][i].geoCoord;
			data1.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				}
			});
		}

		for (var i = 0; i < rs[1].length; i++) {
			var geoCoord = rs[1][i].geoCoord;
			data2.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				},
				time: Math.random() * 10
			});
		}

		for (var i = 0; i < rs[2].length; i++) {
			var geoCoord = rs[2][i].geoCoord;
			data3.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				},
			});
		}

		var dataSet = new mapv.DataSet(data1);
		var options = {
			fillStyle: 'rgba(255, 150, 69, 0.8)',
			bigData: 'Point',
			size: 0.7,
			draw: 'simple',
		}
		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data2);
		var options = {
			fillStyle: 'rgba(255, 150, 69, 0.8)',
			size: 0.7,
			bigData: 'Point',
			draw: 'simple',
		}
		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data3);
		var options = {
			fillStyle: 'rgba(255, 99, 99, 0.6)',
			size: 0.7,
			bigData: 'Point',
			draw: 'simple',
		}
		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

		var dataSet = new mapv.DataSet(data2);
		var options = {
			fillStyle: 'rgba(255, 99, 99, 0.9)',
			size: 1.1,
			draw: 'simple',
			bigData: 'Point',
			animation: {
				stepsRange: {
					start: 0,
					end: 10
				},
				trails: 1,
				duration: 6,
			}
		}
		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);
	});
})));