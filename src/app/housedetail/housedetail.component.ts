import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as mapboxgl from 'mapbox-gl'
import { flushMicrotasks } from '@angular/core/testing';
import { DataService } from "./../data.service"
import { ActivatedRoute, Router } from "@angular/router";
import { HouseService } from '../house.service';



@Component({
    selector: 'app-housedetail',
    templateUrl: './housedetail.component.html',
    styleUrls: ['./housedetail.component.css']
})
export class HousedetailComponent implements OnInit {

    public userid: string = "";

    housedetail = {
        user_id: "", house_id: "", saleprice: "", views: 0, yearbuilt: "", postingdate: "",
        type: "", rentprice: "", securitydeposite: "", leaseduration: "", beds: "", baths: "", forrentby: "",
        squarefeet: "", storeys: "", address: "", latitude: "", longitude: "", description: "", contactperson: "", pets: false,
        contactemail: "", contactphone: "", amenities: { ac: false, balcony_or_deck: false, furnished: false, hardwood_floor: false, garage_parking: false, off_street_parking: false, indoorgames: false, swimmingpool: false, elevator: false }, houseimg: []
    }
    loadAPI: Promise<any>;
    constructor(private data: DataService, private _house: HouseService, private _router: Router) {

    }
    houseimg: string[] = []
    uploadedFiles: Array<File> = null;

    fileChange(element) {
        this.uploadedFiles = element.target.files;
        console.log(this.uploadedFiles)
    }

    submitHouseDetails() {

        if (this.uploadedFiles != null) {
            let formData = new FormData();
            for (var i = 0; i < this.uploadedFiles.length; i++) {
                formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);

            }

            this._house.uploadHousePhoto(formData).subscribe(
                res => {
                    this.housedetail.houseimg = res.message;
                    console.log(this.housedetail);
                    console.log(res.message);
                    console.log(res);
                },
                err => {
                    console.log(err.error)
                })
        }

        var today = new Date();
        let dd = <any>today.getDate();

        let mm = <any>today.getMonth() + 1;
        let yyyy = <any>today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        this.housedetail.postingdate = mm + '/' + dd + '/' + yyyy;
        if (this.userid == null) {
            this.userid = localStorage.getItem('userid')

        }
        console.log(this.userid)
        this.housedetail.latitude = (<HTMLInputElement>document.getElementById("latitude")).value
        this.housedetail.longitude = (<HTMLInputElement>document.getElementById("longitude")).value
        this.housedetail.user_id = this.userid
        for (let i = 0; i < (<any>$('#input-file-id')[0]).files.length; i++) {
            this.houseimg.push((<any>$('#input-file-id')[0]).files[i].name)
        }
        console.log(this.houseimg)
        if (this.houseimg.length != 0) {
            this.housedetail.houseimg = this.houseimg;
        } else {

        }
        console.log(this.housedetail)
        setTimeout(function () {
            this._house.uploadHouseDetail(this.housedetail).subscribe(
                res => {
                    console.log(res.houseinfo);
                    this._router.navigate(['/buy'])
                },
                err => {
                    console.log(err);
                }
            )
        }.bind(this), 1000);
    }

    ngOnInit() {
        sessionStorage.removeItem('houseid');
        var start = 1900;
        var end = new Date().getFullYear();
        var options = "";
        for (var year = start; year <= end; year++) {
            options += "<option>" + year + "</option>";
        }
        document.getElementById("year").innerHTML = options;
        // this.loadAPI = new Promise((resolve) => {
        //   this.loadScript();
        //   resolve(true);
        // });

        this.data.currentMessage.subscribe(x => this.userid = x)

        let existedhouse: boolean = false;
        if (sessionStorage.getItem('clickedhouse') != null) {
            existedhouse = true;
            let shouse = sessionStorage.getItem('clickedhouse')
            let house = JSON.parse(shouse);
            console.log(house);
            this.housedetail.address = house.address;
            this.housedetail.contactemail = house.contactemail;
            this.housedetail.baths = house.baths;
            this.housedetail.beds = house.beds;
            this.housedetail.postingdate = house.postingdate;
            this.housedetail.houseimg = house.houseimg;
            this.housedetail.house_id = house._id;

            this.housedetail.contactperson = house.contactperson;
            this.housedetail.contactphone = house.contactphone;
            this.housedetail.description = house.description;
            this.housedetail.forrentby = house.forrentby;
            this.housedetail.latitude = house.latitude;
            this.housedetail.longitude = house.longitude;
            this.housedetail.leaseduration = house.leaseduration;
            this.housedetail.pets = house.pets;
            this.housedetail.saleprice = house.saleprice;
            this.housedetail.rentprice = house.rentprice;
            this.housedetail.securitydeposite = house.securitydeposite;
            this.housedetail.squarefeet = house.squarefeet;
            this.housedetail.storeys = house.storeys;
            this.housedetail.yearbuilt = house.yearbuilt;
            this.housedetail.user_id = house.user_id;
            this.housedetail.type = house.type;
            if (this.housedetail.type == "rent") {
                $("#hi1").show(1000);
                $("#hi2").show(1000);
                $("#hi3").show(1000);
                $("#hi4").show(1000);
                $("#hi5").hide(1000);
            }
            this.housedetail.views = house.views;

            this.housedetail.amenities.ac = house.amenities.ac
            this.housedetail.amenities.balcony_or_deck = house.amenities.balcony_or_deck
            this.housedetail.amenities.elevator = house.amenities.elevator
            this.housedetail.amenities.furnished = house.amenities.furnished
            this.housedetail.amenities.garage_parking = house.amenities.garage_parking
            this.housedetail.amenities.hardwood_floor = house.amenities.hardwood_floor
            this.housedetail.amenities.off_street_parking = house.amenities.off_street_parking
            this.housedetail.amenities.indoorgames = house.amenities.indoorgames
            this.housedetail.amenities.swimmingpool = house.amenities.swimmingpool

            //sessionStorage.setItem('houseid',house._id)
            console.log(this.housedetail);
            sessionStorage.removeItem('clickedhouse')
        }

        var lat, long;
        mapboxgl.accessToken = '';
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
                if (existedhouse == false) {
                    map.flyTo({
                        center: [long, lat],
                        zoom: 16,
                    });
                }
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
                lat = (<HTMLInputElement>document.getElementById("latitude")).value
                long = (<HTMLInputElement>document.getElementById("longitude")).value
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
