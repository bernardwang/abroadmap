var heatmapData = [
  new google.maps.LatLng(37.782, -122.447),
  new google.maps.LatLng(37.782, -122.445),
  new google.maps.LatLng(37.782, -122.443),
  new google.maps.LatLng(37.782, -122.441),
  new google.maps.LatLng(37.782, -122.439),
  new google.maps.LatLng(37.782, -122.437),
  new google.maps.LatLng(37.782, -122.435),
  new google.maps.LatLng(37.785, -122.447),
  new google.maps.LatLng(37.785, -122.445),
  new google.maps.LatLng(37.785, -122.443),
  new google.maps.LatLng(37.785, -122.441),
  new google.maps.LatLng(37.785, -122.439),
  new google.maps.LatLng(37.785, -122.437),
  new google.maps.LatLng(37.785, -122.435)
];

var map;
var src = 'https://sites.google.com/site/abroadkml/kml/data.kml';

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(-19.257753, 146.823688),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  loadKmlLayer(src, map);
}

function loadKmlLayer(src, map) {
	var kmlOptions = {
  	//suppressInfoWindows: true,
  	preserveViewport: false,
  	map: map
	};
	var kmlLayer = new google.maps.KmlLayer(src, kmlOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

//var kmlUrl = 'https://www.dropbox.com/s/1g2zgzekr4v7oow/data.kml?dl=0';

/*$.ajax('assets/data.kml').done(function(xml) {
    console.log(toGeoJSON.kml(xml));
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});

heatmap.setMap(map);

*/