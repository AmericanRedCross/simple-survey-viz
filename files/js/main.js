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



function pointMousover(e){
  var tooltipText = e.target.feature.properties.label;
  $('#tooltip').append(tooltipText); 
}

function pointMouseout(e){
  $('#tooltip').empty(); 
}

function onEachPoint(feature, layer) {
  var popupHtml = "";
  $.each(feature.properties, function(index, property){
    popupHtml += "<small>" + index + ":</small> <strong>" + property + "</strong><br>";
  })
  layer.bindPopup(popupHtml);
  layer.on({
    mouseover: pointMousover,
    mouseout: pointMouseout
  });
}

function zoomOut(){  
  map.fitBounds(surveyPoints.getBounds().pad(0.1,0.1));

} 


// tooltip follows cursor
$(document).ready(function() {
    $('#map').mouseover(function(e) {        
        //Set the X and Y axis of the tooltip
        $('#tooltip').css('top', e.pageY + 10 );
        $('#tooltip').css('left', e.pageX + 20 );         
    }).mousemove(function(e) {    
        //Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
        $("#tooltip").css({top:(e.pageY+15)+"px",left:(e.pageX+20)+"px"});        
    });
});

// on window resize
$(window).resize(function(){
    windowH = $(window).height();
    $("#map").height(windowH);
    $("#infoWrapper").height(windowH); 
})

mapData();