
var map, thePos, marker, infoWindow;
var i = 0;
var radarInterval;
var trafficLayer;
var timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];

function initMap() {
  
    // Set Variables
    trafficLayer = new google.maps.TrafficLayer();
    infoWindow = new google.maps.InfoWindow();
  
    // Center for map
    thePos = {lat: 42.0308, lng: -93.6319};
    
    // Create map
    map = new google.maps.Map($('#map')[0], {
      zoom: 6,
      center: thePos
    });
    
    // Create marker at center map location
    marker = new google.maps.Marker({
      position: thePos,
      map: map
    });
    
    //Get location of user
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        
        map.setCenter(pos);
        marker = new google.maps.Marker({
          position: pos,
          animation: google.maps.Animation.DROP,
          map: map
        });
      }, function() {
        // Throws error if user location cannot be found
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    
    
    
}

// Handle errors for locating user
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Turn on/off Weather Radar
$('#mapRadar').click(function(){
  
  if($(this).val() === 'Turn on Weather Radar'){
    i = 0;
    $(this).val('Turn off Weather Radar');
    radarInterval = setInterval(startAnimation, 500);
  }else{
    $(this).val('Turn on Weather Radar');
    clearInterval(radarInterval);
    map.overlayMapTypes.clear();
  }
  
})

// Turn on/off Traffic
$('#mapTraffic').click(function(){
  
  if($(this).val() === 'Turn on Traffic'){
    $(this).val('Turn off Traffic');
    trafficLayer.setMap(map)
  } else{
    $(this).val('Turn on Traffic');
    trafficLayer.setMap(null);
  }
  
})

// Animate the Weather Radar
function startAnimation(){
    map.overlayMapTypes.clear();
    map.overlayMapTypes.push(null);
    tileNEX = new google.maps.ImageMapType({
      getTileUrl: function(tile, zoom) {
          return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-" + timestamps[i] + "/" + zoom + "/" + tile.x + "/" + tile.y +".png"; 
      },
      tileSize: new google.maps.Size(256, 256),
      opacity:0.60,
      name : 'NEXRAD',
      isPng: true
    });
    map.overlayMapTypes.setAt("0", tileNEX);
  
    i++;
    if (i > 10 ){
      i = 0;
    }
}
