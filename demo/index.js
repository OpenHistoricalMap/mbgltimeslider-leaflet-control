// demo: South Bronx
// data ranges 1873-2019, but let's start with a narrower window so the user has an excuse to stretch the range
var START_ZOOM = 15.0;
var START_CENTER = [ 48.57240, 7.81240 ];
var OHM_SOURCE = "osm";
var STARTING_DATE = 1805;
var DATE_RANGE = [ 1600, (new Date()).getFullYear() - 1 ];
var DATE_LIMIT = [ -4000, (new Date()).getFullYear() - 1 ];

// URL of a map style suited to OpenistoricalMap's data layers

var MAP_STYLE_URL = 'https://openhistoricalmap.github.io/map-styles/main/main.json';

// when the timeslider comes up, let's keep a reference to it so we can fetch/set it externally
var MAP, ohmlayer, timeslider;

document.addEventListener('DOMContentLoaded', function(event) {
    //
    // the basic map and controls
    // the map style is in mapstyle.js
    //

    MAP = L.map('map', {
        zoomSnap: 0.1,  // enable fractional zooming since our demo is only vector tile layers
    })
    .setView(START_CENTER, START_ZOOM);

    L.control.scale().addTo(MAP);

    ohmlayer = L.mapboxGL({
        style: MAP_STYLE_URL,
        accessToken: 'not necessary',
    })
    .addTo(MAP);

    //
    // add the TimeSliderControl to the "ohmlayer"
    //
    timeslider = new L.Control.MBGLTimeSlider({
        mbgllayer: ohmlayer,  // specify the L.mapboxGL layer to filter
        timeSliderOptions: {  // these are passed directly to the Mapbox GL TimeSlider.TimeSliderControl as-given
            sourcename: OHM_SOURCE,
            date: STARTING_DATE,
            datelimit: DATE_LIMIT,
            range: DATE_RANGE
        },
    })
    .addTo(MAP);

    //
    // now the TimeSlider's URL hash controls
    // read URL hash params and apply to the starting map view
    // then track and update the URL hash automagically
    //

    const urlreader = new L.Control.MBGLTimeSliderUrlHashReader({
        timeslidercontrol: timeslider,
    });
    MAP.addControl(urlreader);

    const urlwriter = new L.Control.MBGLTimeSliderUrlHashWriter({
        timeslidercontrol: timeslider,
    });
    MAP.addControl(urlwriter);

    // that's it!
});
