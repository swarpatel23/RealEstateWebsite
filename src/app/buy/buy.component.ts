import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
   house_click(house):void {						
    var hid = house.id;
    var house_list = this.obj_houselist;
    let shouse:any;
    shouse = house_list.find(function(house){			
      return house["hid"].toString()==hid.toString();
    });
    console.log(shouse);
    $("#main-house-thumbnail").attr("src",shouse["photos"][0]);

    var inner_carosal_active = '<div class="carousel-item active">'
              +'<a href="'+shouse["photos"][0]+'" target="_blank"><img src="'+shouse["photos"][0]+'"'
              +'class="img-fluid "></a>'
              +'</div>';
    var inner_carosal = " " +inner_carosal_active;
    for(let i=1;i<shouse["photos"].length;i++)
    {
      inner_carosal += '<div class="carousel-item">'
              +'<a href="'+shouse["photos"][i]+'" target="_blank"><img src="'+shouse["photos"][i]+'"'
              +'class="img-fluid "></a>'
              +'</div>';
    }

    var g_feture = "";
    for (let index = 0; index < shouse["g_amenities_list"].length; index++) {
      const element = shouse["g_amenities_list"][index];
      console.log(element);
      g_feture += "<li>"+element+"</li>";
      
    }



    var b_feture = "";
    var ac = '<div class="grid-item"><i class="fas fa-wind fa-2x" aria-hidden="true" data-toggle="tooltip" title="AC"></i><br><small>Air Conditioning </small></div>';
    var garage = '<div class="grid-item"><i class="fa fa-car fa-2x" aria-hidden="true" data-toggle="tooltip" title="Garage"></i><br><small>Garage </small></div>';										
    var swimming = '<div class="grid-item"><i class="fas fa-swimmer fa-2x" aria-hidden="true" data-toggle="tooltip" title="Swimming"></i><br> <small>Swimming Pool</small></div>';
    var pet = '<div class="grid-item"><i class="fa fa-paw fa-2x" aria-hidden="true" data-toggle="tooltip" title="Pets Allowed"></i><br> <small>Pets Allowed</small></div>';
    var gym = '<div class="grid-item"><i class="fas fa-dumbbell fa-2x" aria-hidden="true" data-toggle="tooltip" title="Gym"></i><br> <small>Gym</small></div>';
    var elevator = '<div class="grid-item"><i class="fas fa-arrows-alt-v fa-2x" aria-hidden="true" data-toggle="tooltip" title="Elevator"></i><br> <small>Elevator</small></div>';
    var indoor_game = '<div class="grid-item"><i class="fas fa-chess fa-2x" aria-hidden="true" data-toggle="tooltip" title="Indoor game"></i><br> <small>Indoor game</small></div>';
    
    for (let i = 0; i < shouse["b_amenities_list"].length; i++) {
      const amenities_list = shouse["b_amenities_list"][i];				
      switch (amenities_list) {
        case "cooling":
          b_feture += ac;
          break;			
        case "garage":
          b_feture += garage;
          break;
        case "swimming":
          b_feture += swimming;
          break;	
        case "pet":
          b_feture += pet;
          break;
        case "gym":
          b_feture += gym;
          break;
        case "indoor_game":
          b_feture += indoor_game;
          break;				
        case "elevator":
          b_feture += elevator;
          break
        default:
          break;
      }
      
    }
  //	console.log(b_feture);
    $("#demo").html(inner_carosal);
    $("#house_price").html("$"+shouse["user_price"]+"<small>/mo</small>");
    $("#house_address").html(shouse["address"]);
    $("#no_of_bed").html(shouse["bedroom"]);
    $("#no_of_bathroom").html(shouse["bathroom"]);
    $("#plot_size").html(shouse["plot"]+" <small> ft</small>");
    $("#overview").html(shouse["overview"]);
    $("#total_view").html(shouse["view"]);
    $("#days_on_web").html(shouse["day_web"]);
    $("#g_feture").html(g_feture);
    $("#b_feture").html(b_feture);

    $("#house_detail").css("animation", "anim 2s forwards");
    $("#house_detail").css({ "display": "" });

    $("#field").css({ "display": "none" });


  }

  constructor() { }

  ngOnInit() {
    function heart_clicked() {
			if ($("#heart").hasClass("far")) {
				$("#heart").addClass('fas').removeClass('far');
			}
			else {
				$("#heart").addClass('far').removeClass('fas');
			}
		}
		function close_details() {
			$("#house_detail").css({ "display": "none" });
			$("#field").css({ "display": "" });
		}
		function close_appointment() {
			$("#appointment_detail").css({ "display": "none" });
			$("#house_detail").css({ "display": "" });
		}
	
    function appointment_click(element) {
			console.log("clicked");
			console.log(element.id);
			
			$("#appointment_detail").css("animation", "anim 2s forwards");
			$("#appointment_detail").css({ "display": "" });

			$("#house_detail").css({ "display": "none" });


		}

		function underline(element) {
			if (document.getElementById("display_houses").className == "nav-link under-line-active") {
				document.getElementById("display_houses").className = "nav-link under-line";
				//col-xs-12 col-lg-6 d-none d-lg-flex overflow-hidden


			}
			if (document.getElementById("display_map").className == "nav-link under-line-active") {
				document.getElementById("display_map").className = "nav-link under-line";
				//col-xs-12 col-lg-6
			}
			if (element.id == "display_houses") {
				console.log("houses");
				document.getElementById("field").className = "col-xs-12 col-lg-6";
				document.getElementById("map").className = "d-none";
			}
			else {
				console.log("fields");
				document.getElementById("field").className = "d-none";
				document.getElementById("map").className = "col-xs-12 d-lg-flex overflow-hidden";

			}
			if (element.id == "display_map") {
				console.log($(document).height());
				var h = $(document).height();

				$(document).height(h - 1);
				console.log($(document).height());
				//$("#map > div.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-touch-drag-pan.mapboxgl-touch-zoom-rotate > canvas").height = "";
				//map.resize();
				close_appointment();
				close_details();

			}
			element.className = "nav-link under-line-active";


		}
		function underline_price(element) {
			let sortby = "";
			let order = 1;//1 ASC
			if (document.getElementById("price-high-low").className == "col-4 my-roboto under-line-active") {
				document.getElementById("price-high-low").className = "col-4 my-roboto under-line";
			}
			if (document.getElementById("price-low-high").className == "col-4 my-roboto under-line-active") {
				document.getElementById("price-low-high").className = "col-4 my-roboto under-line";

			}
			if (document.getElementById("newest-first").className == "col-4 my-roboto under-line-active") {
				document.getElementById("newest-first").className = "col-4 my-roboto under-line";
			}
			element.className = "col-4 my-roboto under-line-active";
			switch (element.id) {
				case "price-high-low":
					sortby = "user_price";
					order = -1;
					break;
				case "price-low-high":
					sortby = "user_price";
					order = 1;
					break;
				case "newest-first":
					sortby = "day_web";
					order = 1;
					break;
				default:
					break;
			}

       console.log(sortby,order);
       let house_list = this.obj_houselist;
       let base_house ;
       let content:string = "";
			house_list.sort(sortbyandorder(sortby, order));
			// console.log(house_list);
			$("#list_of_house").html("");
			for (let index = 0; index < house_list.length; index++) {
				base_house = house_list[index];								
				content =
					'<div id="' + base_house["hid"] + '" onclick="house_click('+base_house+')" class="card col-xs-12 col-xl-6">'
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
			}

		}

		function sortbyandorder(sortby, order) {
			return function (a, b) {
				if (a[sortby] > b[sortby]) {
					return 1 * order;
				} else if (a[sortby] < b[sortby]) {
					return -1 * order;
				}
				return;
			}
		}
		$(window).resize(function () {
			if ($(window).width() >= 992) {
				document.getElementById("field").className = "col-xs-12 col-lg-6";
				document.getElementById("map").className = "col-xs-12 col-lg-6 d-none d-lg-flex overflow-hidden";
				document.getElementById("display_houses").className = "nav-link under-line-active";
				document.getElementById("display_map").className = "nav-link under-line";
			}
		});
 
  }
  json_houselist:string = '[{"hid":1,"uid":2,"cid":3,"address":"B-2039, Lorem, Epsum","lat":51.359657,"long":12.968053,"year_bulit":2000,"user_price":19000,"bathroom":5,"bedroom":5,"kitchen":2,"type":"row house","stories":2,"plot":1334.12,"overview":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.","g_amenities_list":["Balcony or deck","Hardwood"],"b_amenities_list":["garage","cooling","swimming","elevator","indoor_game","hardwood_floor","furnished","balcony"],"sales_rent":1,"view":123,"day_web":12,"photos":["image/house/h1.jpg","image/house/interior/h1-4.jpg","image/house/interior/h1-5.jpg","image/house/interior/h1-1.jpg"]},{"hid":20,"uid":2,"cid":3,"address":"B-1025, Lorem, SUrat","lat":26.359657,"long":81.968053,"year_bulit":1699,"user_price":15500,"bathroom":2,"bedroom":3,"kitchen":1,"type":"Flat","stories":11,"plot":129.12,"overview":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.","g_amenities_list":["Balcony or deck","Hardwood"],"b_amenities_list":["garage","swimming","pet","gym","elevator"],"sales_rent":1,"view":10,"day_web":23,"photos":["image/house/h2.jpg","image/house/interior/h1-1.jpg","image/house/interior/h1-2.jpg","image/house/interior/h1-1.jpg"]},{"hid":17,"uid":2,"cid":3,"address":"B-1025, Lorem, SUrat","lat":95.359657,"long":42.968053,"year_bulit":1699,"user_price":15000,"bathroom":1,"bedroom":1,"kitchen":4,"type":"Flat","stories":10,"plot":159.12,"overview":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.","g_amenities_list":["Balcony or deck","Hardwood"],"b_amenities_list":["garage","swimming","pet","gym","elevator"],"sales_rent":1,"view":145,"day_web":50,"photos":["image/house/h3.jpg","image/house/interior/h1-3.jpg","image/house/interior/h1-4.jpg","image/house/interior/h1-1.jpg"]},{"hid":4,"uid":2,"cid":3,"address":"B-1025, Lorem, SUrat","lat":15.359657,"long":42.968053,"year_bulit":1699,"user_price":1205,"bathroom":2,"bedroom":5,"kitchen":1,"type":"Flat","stories":10,"plot":159.12,"overview":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.","g_amenities_list":["Balcony or deck","Hardwood"],"b_amenities_list":["garage","swimming","pet","gym","elevator"],"sales_rent":1,"view":200,"day_web":50,"photos":["image/house/h4.jpg","image/house/interior/h1-5.jpg","image/house/interior/h1-6.jpg","image/house/interior/h1-7.jpg"]},{"hid":5,"uid":2,"cid":3,"address":"B-1025, Lorem, SUrat","lat":15.359657,"long":42.968053,"year_bulit":2015,"user_price":55000,"bathroom":5,"bedroom":5,"kitchen":2,"type":"Flat","stories":10,"plot":159.12,"overview":"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore beatae dolore, iusto magnam praesentium pariatur consectetur doloribus vero aperiam reiciendis ullam repudiandae, molestias dignissimos ad amet rerum, labore adipisci distinctio.","g_amenities_list":["Balcony or deck","Hardwood"],"b_amenities_list":["garage","swimming","pet","gym","elevator"],"sales_rent":1,"view":145,"day_web":50,"photos":["image/house/h5.jpg","image/house/interior/h1-2.jpg","image/house/interior/h1-4.jpg","image/house/interior/h1-5.jpg"]}]';
  obj_houselist = JSON.parse(this.json_houselist);  
  
  call_me()
  {
    console.log(this.obj_houselist);
    document.getElementById("list_of_house");
  }
  
}
