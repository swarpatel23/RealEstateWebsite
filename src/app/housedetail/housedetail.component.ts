import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as mapboxgl from 'mapbox-gl'
import { flushMicrotasks } from '@angular/core/testing';
import { DataService } from "./../data.service"



@Component({
    selector: 'app-housedetail',
    templateUrl: './housedetail.component.html',
    styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {

    public userid: string = "";

    housedetail = {user_id:"",saleprice:"",
        type: "", rentprice: "", securitydeposite: "", leaseduration: "", beds: "", baths: "", forrentby: "",
        squarefeet: "", storeys: "", address: "", latitude: "", longitude: "", description: "", contactperson: "", pets: false,
        contactemail: "", contactphone: "", amenities: { ac: false, balcony_or_deck: false, furnished: false, hardwood_floor: false, garage_parking: false, off_street_parking: false, indoorgames: false, swimmingpool: false, elevator: false }, houseimg: []
    }
    loadAPI: Promise<any>;
    constructor(private data: DataService) {
        
    }
    houseimg: string[] = []
    submitHouseDetails() {
        if(this.userid==null)
        {
            this.userid=localStorage.getItem('userid')

        }
        console.log(this.userid)
        this.housedetail.latitude=(<HTMLInputElement>document.getElementById("latitude")).value
        this.housedetail.longitude=(<HTMLInputElement>document.getElementById("longitude")).value 
        this.housedetail.user_id=this.userid
        for (let i = 0; i < (<any>$('#input-file-id')[0]).files.length; i++) {
            this.houseimg.push((<any>$('#input-file-id')[0]).files[i].name)
        }
        console.log(this.houseimg)
        this.housedetail.houseimg = this.houseimg;
        console.log(this.housedetail)
    }

    ngOnInit() {
        // this.loadAPI = new Promise((resolve) => {
        //   this.loadScript();
        //   resolve(true);
        // });

        this.data.currentMessage.subscribe(x => this.userid = x)




        var lat, long;
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3dhcjIzIiwiYSI6ImNqejlhbmt1YzAxdXAzbm1yZzMzbHFmNHMifQ.xPyQpPklaSXYm5pFCO85Hg';
        var map;
        map = new mapboxgl.Map({
            container: 'map',
            center: [72.8662016, 22.690201599999998], // starting position
            zoom: 5, // starting zoom
            style: 'mapbox://styles/mapbox/satellite-streets-v11',

        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                lat = position.coords.latitude;
                long = position.coords.longitude;
                
                (<HTMLInputElement>document.getElementById("latitude")).value = lat;
                (<HTMLInputElement>document.getElementById("longitude")).value = long;
                // map = new mapboxgl.Map({
                //     container: 'map',
                //     center: [long, lat], // starting position
                //     zoom: 13, // starting zoom
                //     style: 'mapbox://styles/mapbox/satellite-streets-v11',

                // });
                map.flyTo({
                    center: [long, lat],
                    zoom: 13,
                });
            }, function () {

                (<HTMLInputElement>document.getElementById("latitude")).placeholder = "select your place location in map";
                (<HTMLInputElement>document.getElementById("longitude")).placeholder = "select your place location in map";

            });





            map.on('click', function (e) {
                (<HTMLInputElement>document.getElementById("latitude")).value = e.lngLat.lat;
                (<HTMLInputElement>document.getElementById("longitude")).value = e.lngLat.lng;
                
            });
            map.on("load", setmarker);
            map.on("click", setmarker);
            function setmarker() {
                //console.log("hi");
                var mapLayer = map.getLayer('markers');

                if (typeof mapLayer !== 'undefined') {
                    // Remove map layer & source.
                    map.removeLayer('markers').removeSource('markers');

                }
                /* Image: An image is loaded and added to the map. */
                map.loadImage("../../assets/image/marker.png", function (error, image) {
                    if (error) throw error;
                    map.addImage("custom-marker", image);
                    /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
                    map.addLayer({
                        id: "markers",
                        type: "symbol",
                        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
                        source: {
                            type: "geojson",
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: "Point",
                                            coordinates: [(<HTMLInputElement>document.getElementById("longitude")).value, (<HTMLInputElement>document.getElementById("latitude")).value]
                                        }
                                    }
                                ]
                            }
                        },
                        layout: {
                            "icon-image": "custom-marker",
                        }
                    });

                });

            }
        }

        $(document).ready(function () {
            $("#Radios1").click(function () {
                $("#Radios1").prop("checked", true);
                console.log("sale");
                $("#hi1").hide(1000);
                $("#hi2").hide(1000);
                $("#hi3").hide(1000);
                $("#hi4").hide(1000);
                $("#hi5").show(1000);

            });
            $("#Radios2").click(function () {
                $("#Radios2").prop("checked", true);
                console.log("rent");
                $("#hi1").show(1000);
                $("#hi2").show(1000);
                $("#hi3").show(1000);
                $("#hi4").show(1000);
                $("#hi5").hide(1000);

            });

            $(':input[type="number"]').change(function () {
                //console.log("123");
                if ($(this).val() < 0) {
                    $(this).val(0);
                }
            });
        });



    }


    // public loadScript() {
    //     var isFound = false;
    //     var scripts = document.getElementsByTagName("script")
    //     for (var i = 0; i < scripts.length; ++i) {
    //         if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
    //             isFound = true;
    //         }
    //     }

    //     if (!isFound) {
    //         var dynamicScripts = ["https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js", "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js", "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"];

    //         for (var i = 0; i < dynamicScripts.length; i++) {
    //             let node = document.createElement('script');
    //             node.src = dynamicScripts[i];
    //             node.type = 'text/javascript';
    //             node.async = false;
    //             node.charset = 'utf-8';
    //             document.getElementsByTagName('head')[0].appendChild(node);
    //         }

    //     }


    // }




}
