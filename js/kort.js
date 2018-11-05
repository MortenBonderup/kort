/*jslint browser:true, devel:true, white:true, vars:true */

/* Modul interface (API) */

function sted(stedtitel, stedtekst, lon, lat) {
    this.stedtitel = stedtitel;
    this.stedtekst = stedtekst;
    this.lon = lon;
    this.lat = lat;

    this.getLon = function () {
        return this.lon;
    };

    this.getLat = function () {
        return this.lat;
    };

    this.getStedTitel = function () {
        return this.stedtitel;
    };

    this.getStedTekst = function () {
        return this.stedtekst;
    };

}

var stedliste = [];
var start_niveau_zoom = 0;
var kortcentrum_longitude = 0;
var kortcentrum_latitude = 0;
var kortbredde = "";
var korthoejde = "";


/* Modul implementering */

function init() {

    /**
     * 
     * Elementer sætter korthøjde og kortbredde
     */
    document.querySelector(".map").style.height = korthoejde;
    document.querySelector(".map").style.width = kortbredde;

    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });


    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    var vectorSource = new ol.source.Vector({
        //create empty vector for key values
    });

    for (var i = 0; i < stedliste.length; i++) {
        var iconFeature = new ol.Feature({
            // geometry: new ol.geom.Point(ol.proj.fromLonLat([byliste[i], byliste[i + 1]])),
            geometry: new ol.geom.Point(ol.proj.fromLonLat([stedliste[i].getLon(), stedliste[i].getLat()])),
            stedtitel: stedliste[i].getStedTitel(),
            stedtekst: stedliste[i].getStedTekst()
        });
        vectorSource.addFeature(iconFeature);

    }

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: './map-pin.svg'
        }))
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle
    });

    var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var map = new ol.Map({
        layers: [rasterLayer, vectorLayer],
        overlays: [overlay],
        target: 'map',
        view: new ol.View({
            center: ol.proj.fromLonLat([kortcentrum_longitude, kortcentrum_latitude]),
            zoom: start_niveau_zoom
        })
    });

    /**
     * Add a click handler to the map to render the popup.
     */
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                    coordinate, 'EPSG:3857', 'EPSG:4326'));

            content.innerHTML = '<code>' + feature.get('stedtitel') + '<p>' + feature.get('stedtekst') + '</code>';
            overlay.setPosition(coordinate);
        });
    });

};

