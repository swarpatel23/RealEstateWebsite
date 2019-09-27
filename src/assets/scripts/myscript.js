
var house_list = [];
function house(id, uid, cid, address,
	lat, long, year_bulit, user_price,
	bathroom, bedroom, kitchen, type,
	stories, plot, amenities, amenities_list, sales_rent,
	view, day_web, photos) {
	this.id = id;
	this.uid = uid;
	this.cid = cid;
	this.address = address;
	this.lat = lat;
	this.long = long;
	this.year_bulit = year_bulit;
	this.user_price = user_price;
	this.bathroom = bathroom;
	this.bedroom = bedroom;
	this.kitchen = kitchen;
	this.type = type;
	this.stories = stories;
	this.plot = plot;
	this.amenities = amenities;
	this.amenities_list = amenities_list;
	this.sales_rent = sales_rent;
	this.view = view;
	this.day_web = day_web;
	this.photos = photos;
}
$(document).ready(function () {
	//sorting	
	var h1 = {
		"hid": 1,
		"uid": 2,
		"cid": 3,
		"address": "B-2039, Lorem, Epsum",
		"lat": 51.359657,
		"long": 12.968053,
		"year_bulit": 2000,
		"user_price": 19000,
		"bathroom": 5,
		"bedroom": 5,
		"kitchen": 2,
		"type": "row house",
		"stories": 2,
		"plot": 1334.12,
		"overview": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.",
		"g_amenities_list": [
			"Balcony or deck",
			"Hardwood"
		],
		"b_amenities_list": [
			"garage",
			"cooling",
			"swimming",
			"elevator",
			"indoor_game",
			"hardwood_floor",
			"furnished",
			"balcony",
		],
		"sales_rent": 1,
		"view": 123,
		"day_web": 12,
		"photos": [
			"image/house/h1.jpg",
			"image/house/interior/h1-4.jpg",
			"image/house/interior/h1-5.jpg",
			"image/house/interior/h1-1.jpg",
		]
	};
	var h2 = {
		"hid": 20,
		"uid": 2,
		"cid": 3,
		"address": "B-1025, Lorem, SUrat",
		"lat": 26.359657,
		"long": 81.968053,
		"year_bulit": 1699,
		"user_price": 15500,
		"bathroom": 2,
		"bedroom": 3,
		"kitchen": 1,
		"type": "Flat",
		"stories": 11,
		"plot": 129.12,
		"overview": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.",
		"g_amenities_list": [
			"Balcony or deck",
			"Hardwood"
		],
		"b_amenities_list": [
			"garage",
			"swimming",
			"pet",
			"gym",
			"elevator",
		],
		"sales_rent": 1,
		"view": 10,
		"day_web": 23,
		"photos": [
			"image/house/h2.jpg",
			"image/house/interior/h1-1.jpg",
			"image/house/interior/h1-2.jpg",
			"image/house/interior/h1-1.jpg",
		]
	};
	var h3 = {
		"hid": 17,
		"uid": 2,
		"cid": 3,
		"address": "B-1025, Lorem, SUrat",
		"lat": 95.359657,
		"long": 42.968053,
		"year_bulit": 1699,
		"user_price": 15000.00,
		"bathroom": 1,
		"bedroom": 1,
		"kitchen": 4,
		"type": "Flat",
		"stories": 10,
		"plot": 159.12,
		"overview": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.",
		"g_amenities_list": [
			"Balcony or deck",
			"Hardwood"
		],
		"b_amenities_list": [
			"garage",
			"swimming",
			"pet",
			"gym",
			"elevator",
		],
		"sales_rent": 1,
		"view": 145,
		"day_web": 50,
		"photos": [
			"image/house/h3.jpg",
			"image/house/interior/h1-3.jpg",
			"image/house/interior/h1-4.jpg",
			"image/house/interior/h1-1.jpg",
		]
	};
	var h4 = {
		"hid": 4,
		"uid": 2,
		"cid": 3,
		"address": "B-1025, Lorem, SUrat",
		"lat": 15.359657,
		"long": 42.968053,
		"year_bulit": 1699,
		"user_price": 1205.00,
		"bathroom": 2,
		"bedroom": 5,
		"kitchen": 1,
		"type": "Flat",
		"stories": 10,
		"plot": 159.12,
		"overview": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.",
		"g_amenities_list": [
			"Balcony or deck",
			"Hardwood"
		],
		"b_amenities_list": [
			"garage",
			"swimming",
			"pet",
			"gym",
			"elevator",
		],
		"sales_rent": 1,
		"view": 200,
		"day_web": 50,
		"photos": [
			"image/house/h4.jpg",
			"image/house/interior/h1-5.jpg",
			"image/house/interior/h1-6.jpg",
			"image/house/interior/h1-7.jpg",
		]
	};
	var h5 = {
		"hid": 5,
		"uid": 2,
		"cid": 3,
		"address": "B-1025, Lorem, SUrat",
		"lat": 15.359657,
		"long": 42.968053,
		"year_bulit": 2015,
		"user_price": 55000.00,
		"bathroom": 5,
		"bedroom": 5,
		"kitchen": 2,
		"type": "Flat",
		"stories": 10,
		"plot": 159.12,
		"overview": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.",
		"g_amenities_list": [
			"Balcony or deck",
			"Hardwood"
		],
		"b_amenities_list": [
			"garage",
			"swimming",
			"pet",
			"gym",
			"elevator",
		],
		"sales_rent": 1,
		"view": 145,
		"day_web": 50,
		"photos": [
			"image/house/h5.jpg",
			"image/house/interior/h1-2.jpg",
			"image/house/interior/h1-4.jpg",
			"image/house/interior/h1-5.jpg",
		]
	};
	var base_house = h1;
	var content =
		'<div id="' + base_house["hid"] + '" onclick="house_click(this)" class="card col-xs-12 col-xl-6">'
		+ '<img class="card-img-top" src="' + base_house["photos"][0] + '" alt="Card image cap">'
		+ '<div class="card-body">'
		+ '<div class="row">'
		+ '<div class="col-5">'
		+ '<h5 data-type="currency">$' + base_house["user_price"] + '</h5>'
		+ '</div>'
		+ '<div class="col-7">'
		+ '<div class="row">'
		+ '<div class="col-12">'
		+ '<h6>' + base_house["bedroom"] + ' Bds|' + base_house["bathroom"] + ' Ba| ' + base_house["plot"] + 'ft</h6>'
		+ '<small>' + base_house["address"] + '</small>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	$("#list_of_house").append(content);
	base_house = h2;
	content =
		'<div id="' + base_house["hid"] + '" onclick="house_click(this)" class="card col-xs-12 col-xl-6">'
		+ '<img class="card-img-top" src="' + base_house["photos"][0] + '" alt="Card image cap">'
		+ '<div class="card-body">'
		+ '<div class="row">'
		+ '<div class="col-5">'
		+ '<h5 data-type="currency">$' + base_house["user_price"] + '</h5>'
		+ '</div>'
		+ '<div class="col-7">'
		+ '<div class="row">'
		+ '<div class="col-12">'
		+ '<h6>' + base_house["bedroom"] + ' Bds|' + base_house["bathroom"] + ' Ba| ' + base_house["plot"] + 'ft</h6>'
		+ '<small>' + base_house["address"] + '</small>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	$("#list_of_house").append(content);
	base_house = h3;
	content =
		'<div id="' + base_house["hid"] + '" onclick="house_click(this)" class="card col-xs-12 col-xl-6">'
		+ '<img class="card-img-top" src="' + base_house["photos"][0] + '" alt="Card image cap">'
		+ '<div class="card-body">'
		+ '<div class="row">'
		+ '<div class="col-5">'
		+ '<h5 data-type="currency">$' + base_house["user_price"] + '</h5>'
		+ '</div>'
		+ '<div class="col-7">'
		+ '<div class="row">'
		+ '<div class="col-12">'
		+ '<h6>' + base_house["bedroom"] + ' Bds|' + base_house["bathroom"] + ' Ba| ' + base_house["plot"] + 'ft</h6>'
		+ '<small>' + base_house["address"] + '</small>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	$("#list_of_house").append(content);
	base_house = h4;
	content =
		'<div id="' + base_house["hid"] + '" onclick="house_click(this)" class="card col-xs-12 col-xl-6">'
		+ '<img class="card-img-top" src="' + base_house["photos"][0] + '" alt="Card image cap">'
		+ '<div class="card-body">'
		+ '<div class="row">'
		+ '<div class="col-5">'
		+ '<h5 data-type="currency">$' + base_house["user_price"] + '</h5>'
		+ '</div>'
		+ '<div class="col-7">'
		+ '<div class="row">'
		+ '<div class="col-12">'
		+ '<h6>' + base_house["bedroom"] + ' Bds|' + base_house["bathroom"] + ' Ba| ' + base_house["plot"] + 'ft</h6>'
		+ '<small>' + base_house["address"] + '</small>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	$("#list_of_house").append(content);
	base_house = h5;
	content =
		'<div id="' + base_house["hid"] + '" onclick="house_click(this)" class="card col-xs-12 col-xl-6">'
		+ '<img class="card-img-top" src="' + base_house["photos"][0] + '" alt="Card image cap">'
		+ '<div class="card-body">'
		+ '<div class="row">'
		+ '<div class="col-5">'
		+ '<h5 data-type="currency">$' + base_house["user_price"] + '</h5>'
		+ '</div>'
		+ '<div class="col-7">'
		+ '<div class="row">'
		+ '<div class="col-12">'
		+ '<h6>' + base_house["bedroom"] + ' Bds|' + base_house["bathroom"] + ' Ba| ' + base_house["plot"] + 'ft</h6>'
		+ '<small>' + base_house["address"] + '</small>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	$("#list_of_house").append(content);
	house_list.push(h1);
	house_list.push(h2);
	house_list.push(h3);
	house_list.push(h4);
	house_list.push(h5);






	function collision($div1, $div2) {
		var x1 = $div1.offset().left;
		var w1 = 40;
		var r1 = x1 + w1;
		var x2 = $div2.offset().left;
		var w2 = 40;
		var r2 = x2 + w2;

		if (r1 < x2 || x1 > r2) return false;
		return true;

	}

	// // slider call

	$('#slider-bath').slider({
		range: true,
		min: 1,
		max: 5,
		values: [1, 5],
		slide: function (event, ui) {
			$('#slider-bath .ui-slider-handle:eq(0) .price-range-min').html(ui.values[0]);
			$('#slider-bath .ui-slider-handle:eq(1) .price-range-max').html(ui.values[1]);
			$('#slider-bath .price-range-both').html('<i>' + ui.values[0] + ' - </i>' + ui.values[1]);

			//

			if (ui.values[0] == ui.values[1]) {
				$('#slider-bath .price-range-both i').css('display', 'none');
			} else {
				$('#slider-bath .price-range-both i').css('display', 'inline');
			}
			if (collision($('#slider-bath .price-range-min'), $('#slider-bath .price-range-max')) == true) {
				$('#slider-bath .price-range-min, .price-range-max').css('opacity', '0');
				$('#slider-bath .price-range-both').css('display', 'block');
			} else {
				$('#slider-bath .price-range-min, .price-range-max').css('opacity', '1');
				$('#slider-bath .price-range-both').css('display', 'none');
			}

		}
	});
	$('#slider-bath .ui-slider-range').append('<span class="price-range-both value"><i>' + $('#slider-bath').slider('values', 0) + ' - </i>' + $('#slider').slider('values', 1) + '</span>');

	$('#slider-bath .ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#slider-bath').slider('values', 0) + '</span>');

	$('#slider-bath .ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#slider-bath').slider('values', 1) + '</span>');

	$('#slider-bed').slider({
		range: true,
		min: 1,
		max: 5,
		values: [1, 5],
		slide: function (event, ui) {

			$('#slider-bed .ui-slider-handle:eq(0) .price-range-min').html(ui.values[0]);
			$('#slider-bed .ui-slider-handle:eq(1) .price-range-max').html(ui.values[1]);
			$('#slider-bed .price-range-both').html('<i>' + ui.values[0] + ' - </i>' + ui.values[1]);

			//

			if (ui.values[0] == ui.values[1]) {
				$('#slider-bed .price-range-both i').css('display', 'none');
			} else {
				$('#slider-bed .price-range-both i').css('display', 'inline');
			}
			if (collision($('#slider-bed .price-range-min'), $('#slider-bed .price-range-max')) == true) {
				$('#slider-bed .price-range-min, .price-range-max').css('opacity', '0');
				$('#slider-bed .price-range-both').css('display', 'block');
			} else {
				$('#slider-bed .price-range-min, .price-range-max').css('opacity', '1');
				$('#slider-bed .price-range-both').css('display', 'none');
			}

		}
	});

	$('#slider-bed .ui-slider-range').append('<span class="price-range-both value"><i>' + $('#slider-bed').slider('values', 0) + ' - </i>' + $('#slider').slider('values', 1) + '</span>');

	$('#slider-bed  .ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#slider-bed').slider('values', 0) + '</span>');

	$('#slider-bed  .ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#slider-bed').slider('values', 1) + '</span>');


	$('#slider-plot').slider({
		range: true,
		min: 10,
		max: 1000,
		values: [10, 1000],
		slide: function (event, ui) {

			$('#slider-plot .ui-slider-handle:eq(0) .price-range-min').html(ui.values[0] + " sq ft ");
			$('#slider-plot .ui-slider-handle:eq(1) .price-range-max').html(ui.values[1] + " sq ft ");
			$('#slider-plot .price-range-both').html('<i>' + ui.values[0] + 'sqft - </i>' + ui.values[1] + "sq ft");

			//

			if (ui.values[0] == ui.values[1]) {
				$('#slider-plot .price-range-both i').css('display', 'none');
			} else {
				$('#slider-plot .price-range-both i').css('display', 'inline');
			}
			if (collision($('#slider-plot .price-range-min'), $('#slider-plot .price-range-max')) == true) {
				$('#slider-plot .price-range-min, .price-range-max').css('opacity', '0');
				$('#slider-plot .price-range-both').css('display', 'block');
			} else {
				$('#slider-plot .price-range-min, .price-range-max').css('opacity', '1');
				$('#slider-plot .price-range-both').css('display', 'none');
			}

		}
	});

	$('#slider-plot .ui-slider-range').append('<span class="price-range-both value"><i>' + $('#slider-plot').slider('values', 0) + ' - </i>' + $('#slider').slider('values', 1) + '</span>');

	$('#slider-plot  .ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#slider-plot').slider('values', 0) + '</span>');

	$('#slider-plot  .ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#slider-plot').slider('values', 1) + '</span>');

});





