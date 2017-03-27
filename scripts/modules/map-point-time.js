(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.olmap = global.olmap || {})));
}(this, (function(map) {
	var randomCount = 1000;

	var data = [];

	var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

	// 构造数据
	while (randomCount--) {
		var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
		data.push({
			geometry: {
				type: 'Point',
				coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
			},
			count: 30 * Math.random(),
			time: 100 * Math.random()
		});
	}

	var dataSet = new mapv.DataSet(data);

	var options = {
		fillStyle: 'rgba(55, 50, 250, 0.2)',
		globalCompositeOperation: "lighter",
		size: 15,
		animation: {
			type: 'time',
			stepsRange: {
				start: 0,
				end: 100
			},
			trails: 10,
			duration: 5,
		},
		draw: 'simple'
	}

	var mapvLayer = new mapv.olMapLayer(map, dataSet, options);

})));