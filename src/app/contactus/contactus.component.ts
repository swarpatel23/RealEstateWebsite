import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'


@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

    contactdetail = { name: "", email: "", message: "" }
    constructor() { }

    uploadContactDetail() {
        console.log(this.contactdetail)
    }

    ngOnInit() {
        var lat, long;
        mapboxgl.accessToken = '';
        var map;
        map = new mapboxgl.Map({
            container: 'map',
            center: [72.863365, 22.691586], // starting position
            zoom: 16, // starting zoom
            style: 'mapbox://styles/mapbox/satellite-streets-v11',

        });


        map.on("load", setmarker);

        function setmarker() {
            //console.log("hi");
            var mapLayer = map.getLayer('markers');


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
                                        coordinates: [72.863365, 22.691586]
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

}
