var windowH = $(window).height();
$("#map").height(windowH);
$("#infoWrapper").height(windowH);

var formatAcquiredTime = d3.time.format('%d-%b-%Y, %H:%M UTC');


// create basic leaflet map
// ========================

var surveyPoints = new L.FeatureGroup();


// tile layer for base map
var hotUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  hotAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles from <a href="http://hot.openstreetmap.org/" target="_blank">H.O.T.</a>',
  hotLayer = L.tileLayer(hotUrl, {attribution: hotAttribution}); 
// initialize map w options
var map = L.map('map', {
    layers: [hotLayer],
    center: new L.LatLng(0,0),
    zoom: 2,
    minZoom: 2,
    worldCopyJump: true,
  });

function mapData() {

  // quick and dirty check for invalid geoJSON objects due to blank lines at end of csv when converting
  var checkedData = [];
  $.each(surveyData.features, function(index, survey){
    if(survey.geometry.coordinates){
      checkedData.push(survey);
    } 
  });

  L.geoJson(checkedData, {
    pointToLayer: function (feature, latlng){
        return L.circleMarker(latlng);
    },
    // style: function(feature){
    //     switch (feature.properties["RHU / Hospital"]){
    //       case 'Hospital': return hospitalMarkerOptions;
    //       case 'RHU': return rhuMarkerOptions;
    //     }
    // },
    onEachFeature: onEachPoint
  }).addTo(surveyPoints);
  
  map.addLayer(surveyPoints);
  zoomOut();
}

function onEachPoint(feature, layer) {
  var popupHtml = "";
  $.each(feature.properties, function(index, property){
    popupHtml += "<small>" + index + ":</small> <strong>" + property + "</strong><br>";
  })
  layer.bindPopup(popupHtml);
}

function zoomOut(){  
  map.fitBounds(surveyPoints.getBounds().pad(0.1,0.1));

} 

// on window resize
$(window).resize(function(){
    windowH = $(window).height();
    $("#map").height(windowH);
    $("#infoWrapper").height(windowH); 
})

mapData();