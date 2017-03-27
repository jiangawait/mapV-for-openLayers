(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	var citys = {
		'新疆': Math.random() * 70,
		'西藏': Math.random() * 70,
		'内蒙古': Math.random() * 70,
		'青海': Math.random() * 70,
		'四川': Math.random() * 70,
		'黑龙江': Math.random() * 70,
		'甘肃': Math.random() * 70,
		'云南': Math.random() * 70,
		'广西': Math.random() * 70,
		'湖南': Math.random() * 70,
		'陕西': Math.random() * 70,
		'广东': Math.random() * 70,
		'吉林': Math.random() * 70,
		'河北': Math.random() * 70,
		'湖北': Math.random() * 70,
		'贵州': Math.random() * 70,
		'山东': Math.random() * 70,
		'江西': Math.random() * 70,
		'河南': Math.random() * 70,
		'辽宁': Math.random() * 70,
		'山西': Math.random() * 70,
		'安徽': Math.random() * 70,
		'福建': Math.random() * 70,
		'浙江': Math.random() * 70,
		'江苏': Math.random() * 70,
		'重庆': Math.random() * 70,
		'宁夏': Math.random() * 70,
		'海南': Math.random() * 70,
		'台湾': Math.random() * 70,
		'北京': Math.random() * 70,
		'天津': Math.random() * 70,
		'上海': Math.random() * 70,
		'香港': Math.random() * 70,
		'澳门': Math.random() * 70,
	}

	$.get('../data/china.json', function(geojson) {

		var dataSet = mapv.geojson.getDataSet(geojson);

		var data = dataSet.get({
			filter: function(item) {
				if (!citys[item.name]) {
					return false;
				}

				item.count = citys[item.name];
				return true;
			}
		});

		dataSet = new mapv.DataSet(data);

		var options = {
			splitList: [{
				start: 0,
				end: 10,
				value: '#f1eef6'
			}, {
				start: 10,
				end: 20,
				value: '#d5bad9'
			}, {
				start: 20,
				end: 30,
				value: '#cc97c7'
			}, {
				start: 30,
				end: 40,
				value: '#e469af'
			}, {
				start: 40,
				end: 50,
				value: '#ee3387'
			}, {
				start: 50,
				end: 60,
				value: '#d61e53'
			}, {
				start: 60,
				value: '#960b3d'
			}],
			methods: {
				click: function(item) {
					console.log(item);
				},
				mousemove: function(item) {
					item = item || {};
					var data = dataSet.get();
					for (var i = 0; i < data.length; i++) {
						if (item.id == data[i].id) {
							data[i].fillStyle = 'yellow';
						} else {
							data[i].fillStyle = null;
						}
					}
					dataSet.set(data);
				}
			},
			globalAlpha: 0.9,
			draw: 'choropleth'
		}

		var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

	});

	var data = [];

	for (var key in citys) {
		var cityCenter = mapv.utilCityCenter.getCenterByCityName(key);
		if (cityCenter) {
			data.push({
				text: key,
				geometry: {
					type: 'Point',
					coordinates: [cityCenter.lng, cityCenter.lat]
				}
			});
		}
	}

	var dataSet = new mapv.DataSet(data);

	var options = {
		fillStyle: 'rgba(55, 50, 50, 0.8)',
		shadowColor: 'rgba(55, 50, 50, 0.5)',
		shadowBlur: 10,
		size: 3,
		zIndex: 10,
		draw: 'simple'
	}

	var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

	var options = {
		fillStyle: 'rgba(55, 50, 50, 0.8)',
		shadowColor: 'rgba(55, 50, 50, 0.5)',
		offset: {
			x: 0,
			y: -10
		},
		shadowBlur: 10,
		size: 3,
		zIndex: 10,
		draw: 'text'
	}
	var mapvLayer = new mapv.olMapLayer(map, dataSet, options);
})));