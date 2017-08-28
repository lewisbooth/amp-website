"use strict";

// On load animations
function load() {

    // Title height to 50vh
    TweenMax.to($(".top-title"), 1, {
        css: {
            paddingBottom: "0"
        },
        ease: Power3.easeInOut
    }).timeScale(1);

    // Fade in title
    TweenMax.to($("#fade-in"), 0.5, {
        opacity: 1,
        delay: 1,
        ease: Power3.easeInOut
    }).timeScale(1);

    // Fade in contact details
    TweenMax.to($("#fade-in2"), 0.5, {
        opacity: 1,
        delay: 1.6,
        ease: Power3.easeInOut
    }).timeScale(1);
};

// Google maps
function initMap() {

    var ampStudio = { lat: 53.046481, lng: -2.190440 };

    var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 14,
        center: ampStudio,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": "0"
            }, {
                "color": "#e7e7e7"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#dadada"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#e20674"
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "off"
            }, {
                "color": "#e2e2e2"
            }, {
                "weight": "0.01"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }]
    });

    var icon = 'images/map-marker.png';

    var marker = new google.maps.Marker({
        position: ampStudio,
        icon: icon,
        map: map
    });
}