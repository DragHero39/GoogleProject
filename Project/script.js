// Code goes here

//
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYhI5DKGX1t8Oref8HdsUXWsA9a25NXCg&libraries=places"></script>

//&callback=initMap

// Traffic layer
 var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    
    
    // My Version Weather
    var imageMapType = new google.maps.ImageMapType({
      
      getTileUrl: function(tile,zoom) {
         /* Include date at the end as a cachebuster */
         return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/"
         + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
      },
      opacity: 0.5
    });
    
    map.overlayMapTypes.push(imageMapType);
    
    
// Iowa State's version Weather
  
  tileNEX = new google.maps.ImageMapType({
            getTileUrl: function(tile, zoom) {
                return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
            },
            tileSize: new google.maps.Size(256, 256),
            opacity:0.60,
            name : 'NEXRAD',
            isPng: true
        });
        map.overlayMapTypes.setAt("1",tileNEX);

        goes = new google.maps.ImageMapType({
            getTileUrl: function(tile, zoom) {
                return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-east-vis-1km-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
            },
            tileSize: new google.maps.Size(256, 256),
            opacity:0.60,
            name : 'GOES East Vis',
            isPng: true
        });
        

        map.overlayMapTypes.push(null); // create empty overlay entry
        map.overlayMapTypes.setAt("0",goes);
        map.overlayMapTypes.push(null); // create empty overlay entry
        
  //Making radar move
  if(map.overlayMapTypes.length == 0){
        tileNEX = new google.maps.ImageMapType({
          getTileUrl: function(tile, zoom) {
            debugger;
              return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-" + timestamps[i] + "/" + zoom + "/" + tile.x + "/" + tile.y +".png"; 
          },
          tileSize: new google.maps.Size(256, 256),
          opacity:0.60,
          name : 'NEXRAD',
          isPng: true
        });
        map.overlayMapTypes.push(null);
        map.overlayMapTypes.setAt("0", tileNEX);
      } else{
        map.overlayMapTypes.clear();
      }