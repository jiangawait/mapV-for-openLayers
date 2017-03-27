(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	// $('#pointTime').remove();
	var $timeDiv = $("<div id='pointTime' style='position:absolute; bottom: 80px; right:50px; padding: 5px; background-color:rgba(0, 60, 136, .5); border: 1px solid #dddddd; color:white;'></div>");
	$('body').append($timeDiv);
	var data = [];
	// '../../data/china-point.json'
	$.get('../data/china-point.json', function(rs) {
		for (var i = 0; i < rs[0].length; i++) {
			var geoCoord = rs[0][i].geoCoord;
			data.push({
				geometry: {
					type: 'Point',
					coordinates: geoCoord
				},
				time: Math.random() * 10
			});
		}

		var dataSet = new mapv.DataSet(data);
		var options = {
			fillStyle: 'rgba(255, 0, 0, 0.6)',
			//shadowColor: 'rgba(255, 250, 50, 0.5)',
			//shadowBlur: 3,
			updateCallback: function(time) {
				time = time.toFixed(2);
				$timeDiv.html('时间' + time);
			},
			size: 3,
			draw: 'simple',
			animation: {
				type: 'time',
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