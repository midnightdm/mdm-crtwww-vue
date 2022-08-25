/*   *   *   *   *   *   *   *   *   *
 
Contains all code for static page small.html which customizes CRT data for KiOS or other really small screen.

 *   *   *   *   *   *   *   *   *   *



-- Begin class definitions --
*/

//LiveScanModel holds view data
function LiveScanModel() {
  let self = this;

  /* * * Config values * * * /

  /**
   * Rather than reading 'livescans' firestore db directly, we use a cloud function to push updates to a json file which is fetched at this url:
   */
  //self.fetchUrl  = "https://us-central1-mdm-qcrt-demo-1.cloudfunctions.net/livescans/json"; 
  self.livescansFetchUrl   = process.env.VUE_APP_LIVESCANS_FETCH_URL;
  self.milemarkersFetchUrl = process.env.VUE_APP_MILEMARKERS_FETCH_URL;
  //self.mapCenter   = {lat: 41.857202, lng:-90.184084};
  self.mapCenter = {lat: process.env.VUE_APP_MAPCENTER_LAT, lng: process.env.VUE_APP_MAPCENTER_LNG };
  self.red       = "#ff0000";
  self.green     = "#34A16B";
  
  //Starting value of loop clock
  self.tock      =  0;

  //Allowed Geographic segments (To ignore vessels outside app's featured region)
  self.segments = process.env.VUE_APP_SEGMENTS_ARRAY.split(',')

  //For single character google map icon labels. Loaded as needed in listed order (first ignored)
  self.lab        = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ*#@&~1234567890abcdefghijklmnopqrstuvwxyz";
  self.labelIndex = 0;

  //self.passSpriteUrl = "https://storage.googleapis.com/www.clintonrivertraffic.com/images/ship-icon-sprite-yellow.png";
  self.passSpriteUrl = process.env.VUE_APP_PASSENGER_SPRITE_URL;
  //self.allSpriteUrl  = "https://storage.googleapis.com/www.clintonrivertraffic.com/images/ship-icon-sprite-cyan.png";
  self.allSpriteUrl = process.env.VUE_APP_ALL_SPRITE_URL;
  //self.mileMarkerIconUrl = "https://storage.googleapis.com/www.clintonrivertraffic.com/images/green.png";
  self.mileMarkerIconUrl = process.env.VUE_APP_MILEMARKER_ICON_URL;

  //Loaded data store
  self.liveScans         = [];
  self.map               = {};
  self.polylines         = {};
  self.announcement      = {};
  self.waypoint          = {};
  self.mileMarkersList   = [];
  self.mileMarkersLabels = [];
  self.alertsPass = [
    {apubVesselName: "loading", apubID:"loading", date: new Date()}
  ];
  self.alertsAll = [
    {apubVesselName: "loading", apubID:"loading", date: new Date()}
  ];

  //Status vars
  self.numVessels    = 0;
  prevWaypoint       = {};
  prevVpubID         = 0;
  self.selectedView  = {view: "list", idx: null };
  //Starting value for selected map position same is map center default
  self.focusPosition = {lat: process.env.VUE_APP_MAPCENTER_LAT, lng: process.env.VUE_APP_MAPCENTER_LNG };
  self.nowPage       = "list";
  self.lastPage      = "list";
  self.mapZoom       = 12;
  self.markersOn     = false;
  self.voiceOn       = false;  

  //Page elements
  self.pageInsert    = document.getElementById("page-insert");
  self.vessList      = document.getElementById("vess-list");
  self.allVessels    = document.getElementById("all-vessels");
  self.totVessels    = document.getElementById("total-vessels");
  self.mapDiv        = document.getElementById("map");
  
  //Method assigns data to Livescan objects
  self.mapper = function(o, dat, isNew) {
    const m1 = self.map
    //const m2 = this.map2
    o.transponderTS  = parseInt(dat.transponderTS);
    o.position = new google.maps.LatLng(dat.liveLastLat, dat.liveLastLon);
    o.lat  = dat.liveLastLat;
    o.lng  = dat.liveLastLon;
    o.id   = parseInt(dat.liveVesselID);
    o.name = dat.liveName;
    o.liveLocation = dat.liveLocation || "Not Calculated";
    o.dir   = dat.liveDirection;
    o.dirImg = o.setDirImg();
    o.speed  = dat.liveSpeed;
    o.course = dat.liveCourse;
    o.segment = dat.liveSegment;
    o.imageUrl = dat.imageUrl;
    o.type   = dat.type;
        
    //FOR SHIP ICON MOVEMENT
    let coords = self.getShipSpriteCoords(o.course), icon;
    if(dat.type=="Passenger") {
      icon = {
        url: self.passSpriteUrl,
        origin: { x: coords[0], y: coords[1] }, 
        size: {width: 55, height: 55 }
      };
    } else {
      icon = {
        url: self.allSpriteUrl,
        origin: { x: coords[0], y: coords[1] }, 
        size: {width: 55, height: 55 }
      };
    }


    if(isNew) {
      o.lat = dat.liveInitLat;
      o.lng = dat.liveInitLon;
      o.mapLabel = self.lab[++self.labelIndex];
      //Marker start pos is just a point out of current view
      o.mapMarker = new google.maps.Marker({
        position: new google.maps.LatLng(43.116055, -94.679274),
        title: o.name, 
        label: o.mapLabel, 
        icon: icon,
        map: m1
      });
      o.mapMarker.setPosition(o.position)
      o.lastMovementTS = new Date();
      o.liveLastScanTS = new Date(dat.liveLastTS*1000);
     } else {
      //If this is update
      o.mapMarker.setPosition(o.position) 
      o.mapMarker.setIcon(icon);
      

      if(o.speed>0.9) { //If transponder reported movement...
        if((o.lng != o.prevLng) || (o.lat != o.prevLat)) { //...did its location change?           
          //Yes means the transponder report is current. Update time value.
          let now = Date.now()          
          o.lastMovementTS.setTime(now)
          o.isMoving = true
          //Reported speed with no position change means stale data. Don't update time value.
        } else {
          o.isMoving = false
        }
      } //0 speed & 0 movement is ok. Just means vessel is idle
      o.prevLat = o.lat
      o.prevLng = o.lng
    }
    return o;    
  };

  //Method used by mapper()
  self.getShipSpriteCoords= function(course) {
    //Sprite has 24 frames to cover 360 deg of heading
    if(course >=   0 && course <=  15) return [  0,   0];
    if(course >=  16 && course <=  30) return [ 55,   0];
    if(course >=  31 && course <=  45) return [110,   0];
    if(course >=  46 && course <=  60) return [165,   0];
    if(course >=  61 && course <=  75) return [220,   0];
    if(course >=  76 && course <=  90) return [275,   0];
    if(course >=  91 && course <= 105) return [  0,  55];
    if(course >= 106 && course <= 120) return [ 55,  55];
    if(course >= 121 && course <= 135) return [110,  55];
    if(course >= 136 && course <= 150) return [165,  55];
    if(course >= 151 && course <= 165) return [220,  55];
    if(course >= 166 && course <= 180) return [275,  55];
    if(course >= 181 && course <= 195) return [  0, 110];
    if(course >= 196 && course <= 210) return [ 55, 110];
    if(course >= 211 && course <= 225) return [110, 110];
    if(course >= 226 && course <= 240) return [165, 110];
    if(course >= 241 && course <= 255) return [220, 110];
    if(course >= 256 && course <= 270) return [275, 110];
    if(course >= 271 && course <= 285) return [  0, 165];
    if(course >= 286 && course <= 300) return [ 55, 165];
    if(course >= 301 && course <= 315) return [110, 165];
    if(course >= 316 && course <= 330) return [165, 165];
    if(course >= 331 && course <= 345) return [220, 165];
    if(course >= 346)                  return [275, 165];
    else                               return [  0,   0];
  };

  self.initalizeMap = function() {
    //create maps
    self.map = new google.maps.Map(
      self.mapDiv, 
      {
        zoom: 12, 
        center: {lat: process.env.VUE_APP_MAPCENTER_LAT, lng: process.env.VUE_APP_MAPCENTER_LNG}, 
        mapTypeId: "hybrid",
        disableDefaultUI: true
      }
    );

    //Add waypoint lines
    self.polylines = {
      alphaLine: new google.maps.Polyline({
        path: [
          {lat: process.env.VUE_APP_ALPHALINE_LATA, lng: process.env.VUE_APP_ALPHALINE_LNGA},
          {lat: process.env.VUE_APP_ALPHALINE_LATB, lng: process.env.VUE_APP_ALPHALINE_LNGB}
        ],
        strokeColor: self.red,
        strokeWeight: 2
      }), 
      bravoLine:  new google.maps.Polyline({
        path: [
          {lat: process.env.VUE_APP_BRAVOLINE_LATA, lng: process.env.VUE_APP_BRAVOLINE_LNGA},
          {lat: process.env.VUE_APP_BRAVOLINE_LATB, lng: process.env.VUE_APP_BRAVOLINE_LNGB}
        ],
        strokeColor: self.red,
        strokeWeight: 2
      }), 
      charlieLine: new google.maps.Polyline({
        path: [
          {lat: process.env.VUE_APP_CHARLIELINE_LATA, lng: process.env.VUE_APP_CHARLIELINE_LNGA}, 
          {lat: process.env.VUE_APP_CHARLIELINE_LATB, lng: process.env.VUE_APP_CHARLIELINE_LNGB}
        ],
        strokeColor: self.red,
        strokeWeight: 2
      }), 
      deltaLine: new google.maps.Polyline({
        path: [
          {lat: process.env.VUE_APP_DELTALINE_LATA, lng: process.env.VUE_APP_DELTALINE_LNGA}, 
          {lat: process.env.VUE_APP_DELTALINE_LATB, lng: process.env.VUE_APP_DELTALINE_LNGB}
        ],
        strokeColor: self.red,
        strokeWeight: 2
      }),
      echoLine: new google.maps.Polyline({
        path: [
          {lat:process.env.VUE_APP_ECHOLINE_LATA, lng: process.env.VUE_APP_ECHOLINE_LNGA}, 
          {lat: process.env.VUE_APP_ECHOLINE_LATB, lng:-process.env.VUE_APP_ECHOLINE_LNGB}
        ],
        strokeColor: this.red,
        strokeWeight: 2
      }),
      foxtrotLine: new google.maps.Polyline({
        path: [
          {lat:process.env.VUE_APP_FOXTROTLINE_LATA, lng: process.env.VUE_APP_FOXTROTLINE_LNGA}, 
          {lat: process.env.VUE_APP_FOXTROTLINE_LATB, lng:-process.env.VUE_APP_FOXTROTLINE_LNGB}
        ],
        strokeColor: this.red,
        strokeWeight: 2
      }),
      golfLine: new google.maps.Polyline({
        path: [
          {lat:process.env.VUE_APP_GOLFLINE_LATA, lng: process.env.VUE_APP_GOLFLINE_LNGA}, 
          {lat: process.env.VUE_APP_GOLFLINE_LATB, lng:-process.env.VUE_APP_GOLFLINE_LNGB}
        ],
        strokeColor: this.red,
        strokeWeight: 2
      }),
      hotelLine: new google.maps.Polyline({
        path: [
          {lat:process.env.VUE_APP_HOTELLINE_LATA, lng: process.env.VUE_APP_HOTELLINE_LNGA}, 
          {lat: process.env.VUE_APP_HOTELLINE_LATB, lng:-process.env.VUE_APP_HOTELLINE_LNGB}
        ],
        strokeColor: this.red,
        strokeWeight: 2
      })  
    };
    self.polylines.alphaLine.setMap(self.map);
    self.polylines.bravoLine.setMap(self.map);
    self.polylines.charlieLine.setMap(self.map);
    self.polylines.deltaLine.setMap(self.map);
    self.polylines.echoLine.setMap(self.map);
    self.polylines.foxtrotLine.setMap(self.map);
    self.polylines.golfLine.setMap(self.map);
    self.polylines.hotelLine.setMap(self.map);
         
    //Add mile marker lines
    const myHeaders = new Headers({ 'Content-Type': 'application/json'});
    let response = await fetch(self.milemarkersFetchUrl,  { headers: myHeaders });
    if(response.status===200) {
      let dat = await response.json();
    }  
    /*  Mile Markers imported as json from milemarkersFetchUrl as referenced above, and formatted as below: 
    [
      {"id":486, "lngA":-90.50971806363766, "latA":41.52215220467504, "lngB":-90.5092203536731, "latB":41.51372097487243}, 
      {"id":487, "lngA":-90.48875678287305, "latA":41.521402024002950, "lngB":-90.48856266269104, "latB":41.5145424556308},
      {"id":488, "lngA":-90.47251555885472, "latA":41.52437816051497, "lngB":-90.47036467716465, "latB":41.51537456609466}
    ]
    */
    if(self.mileMarkersList.length == 0) {
      for(let i=0, len=dat.length; i<len; i++) {
        self.mileMarkersList.push(new google.maps.Polyline({
            name: "Mile "+dat[i].id,            
            path: [
                {lat: dat[i].latA, lng: dat[i].lngA},
                {lat: dat[i].latB, lng: dat[i].lngB}
            ],
            strokeColor: self.green,
            strokeWeight: 2,
            map: self.map
        }));
        self.mileMarkersLabels.push(new google.maps.Marker({
            position: {lat: dat[i].latA, lng: dat[i].lngA },
            title: "Mile "+dat[i].id, 
            label: String(dat[i].id),
            icon: {
              url: self.mileMarkerIconUrl,
              labelOrigin: {x: 24, y: 15},
              scaledSize: {width: 50, height: 50}
            },
            map: self.map
        })); 
      }
    }
    //After building maps, init the db
    initLiveScan();  
  };

  self.goToPage = function(name="list", index) {
    //console.log("goToPage()", name, index);
    let lastView;
    switch(name) {
      case "detail": {
        // lastView = self.nowPage;
        self.selectedView = {view: 'detail', idx: index};
        self.map.setCenter(self.liveScans[index].position);
        self.map.setZoom(14);
        self.outputDetail(index);
        break;
      }
      case "list": {
        // lastView = self.nowPage;
        self.selectedView = {view: 'list', idx: index} ;
        // self.nowPage = 'list';
        self.outputAllVessels();
        break;
      }
    }
  };

  self.outputDetail = function(index) {
    self.mapDiv.classList.add("active");
    self.vessList.classList.remove("active");
    let obj = self.liveScans[index];
    obj.spd = "";
    if(obj.dir !=="undetermined") {
      obj.spd = Math.round(obj.speed);
    }
    //Contingency for null lat/lng
    let lat = obj.lat ==="" ? "" : obj.lat.toFixed(7);
    let lng = obj.lng ==="" ? "" : obj.lng.toFixed(7);
    let detailOutput =     
    `<ul>
        <li>
        <div class="list-wrap">
          <h4 class="map-label">${obj.mapLabel}</h4>
          <button onClick="liveScanModel.goToPage('list')">LIST</button>
          <h4 class="tile-title">${obj.name}</h4> 
          <div class="dir-container">
            <img class="dir-img" src="${obj.dirImg}"/>
            <span class="speed">${obj.spd}</span>
          </div>               
        </div>
        <div class="data-cont grid2-container">
          <div id="data-table">
            <ul id="selected-vessel">
              <li class="dataPoint"><span class="th">TYPE:</span> <span class="td">${obj.type}</span></li>
              <li class="dataPoint"><span class="th">MMSI #:</span> <span class="td">${obj.id}</span></li>
              <li class="dataPoint"><span class="th">COURSE:</span> <span class="td">${obj.course}°</span></li>
              <li class=dataPoint><span class=th>SPEED:</span> <span class=td>${obj.speed} Knots</span></li>
              <li class="dataPoint"><span class="th">DIRECTION:</span> <span class="td dir">${obj.dir}</span>  </li>
              <li class="dataPoint"><span class="th">COORDINATES:</span> <span class="td dir">${lat}, ${lng}</span>  
              </li>
            </ul>
          </div>
          <div id="img-frame"><img id="data-image" src="${obj.imageUrl}"></div><br>
        </div>
        <h5>${obj.liveLocation}</h5>
        </li>
    </ul>`;
    self.pageInsert.innerHTML = detailOutput;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  self.outputAllVessels = async function() {
    self.mapDiv.classList.remove("active");
    self.vessList.classList.add("active");
    let allVesselsOutput = "", i, j;
    //Order vessels by river segment
    let segments = [ [], [], [], [], [] ];
    for(let vessel in self.liveScans) {
      let obj = self.liveScans[vessel];
      obj.spd = "";
      if(obj.dir !=="undetermined") {
        obj.spd = Math.round(obj.speed);
      }
      switch(obj.segment) {
        //Each website covers 5 segments above, below or between waypoints
        case 0:
        case 5: { segments[0].push(obj); break; }
        case 1:
        case 6: { segments[1].push(obj); break; }
        case 2:
        case 7: { segments[2].push(obj); break; }
        case 3:
        case 8: { segments[3].push(obj); break; }
        case 4: 
        case 9: { segments[4].push(obj); break; }
      }
    }
    //Build output string for each segment
    const maplines = [
      ``,
      `<li><span class="waypoint">${process.env.VUE_APP_DELTALINE_LABEL}</span></li>`,
      `<li><span class="waypoint">${process.env.VUE_APP_CHARLIELINE_LABEL}</span></li>`,
      `<li><span class="waypoint">${process.env.VUE_APP_BRAVOLINE_LABEL}</span></li>`,
      `<li><span class="waypoint">${process.env.VUE_APP_ALPHALINE_LABEL}</span></li>`
    ];
    for(i=4; i>-1; i--) {
      if(segments[i].length) {
        segments[i] = segments[i].sort(compareSeg);
        for(j=0; j<segments[i].length; j++) {
          obj = segments[i][j];
          allVesselsOutput+= 
          `<li>
            <div class="list-wrap">
              <h4 class="map-label">${obj.mapLabel}</h4>
              <button onClick="liveScanModel.goToPage('detail',${obj.key})">MAP</button> 
              <h4 class="tile-title">${obj.name}</h4> 
              <div class="dir-container">
                <img class="dir-img" src="${obj.dirImg}"/>
                <span class="speed">${obj.spd}</span>
              </div>               
            </div>
            <h5>${obj.liveLocation}</h5>
          </li>`;
        }
      }
      allVesselsOutput+= maplines[i];
    }       
    self.totVessels.innerHTML = liveScanModel.liveScans.length+" Vessels"; //Total Vessels Title
    self.allVessels.innerHTML = allVesselsOutput;     //List of All transponders in range
    self.pageInsert.innerHTML = "";
  }
}





//LiveScan class defintion
class LiveScan {
  constructor() {
    //this.state          = state //callback
    this.liveLastScanTS = null
    this.transponderTS  = null
    this.plotTS         = null
    this.position       = null
    this.lat            = null
    this.lng            = null
    this.id             = null
    this.name           = null
    this.liveLocation   = null
    this.segment        = null
    this.region         = null
    this.mapLabel       = null
    this.btnText        = "+"
    this.dir            = "undetermined"
    this.dirImg         = null
    this.callsign       = null
    this.timerOutput    = null
    this.speed          = null
    this.course         = null
    this.length         = null
    this.width          = null
    this.draft          = null
    this.mapMarker      = null
    this.hasImage       = null
    this.imageUrl       = null
    this.type           = null
    this.liveIsLocal    = false
    this.liveMarkerAlphaWasReached = false
    this.liveMarkerAlphaTS         = null
    this.liveMarkerBravoWasReached = false
    this.liveMarkerBravoTS         = null
    this.liveMarkerCharlieWasReached = false
    this.liveMarkerCharlieTS         = null
    this.liveMarkerDeltaWasReached = false
    this.liveMarkerDeltaTS         = null
    this.expandedViewOn            = false
    this.lastMovementTS            = new Date()
    this.dataAge                   = "age-green"
    this.prevLat                   = null
    this.prevLng                   = null
    this.isMoving                  = false
    this.localVesselText           = () => {
      if(this.liveIsLocal==1) {
        return "Passages are not logged for this local operations vessel as it doesn't cross all four monitored waypoints.";
      } else if(this.liveIsLocal==0) {
        return "";
      }
    }
    this.toggleExpanded = () => {
      this.expandedViewOn = !this.expandedViewOn
    }

    this.lastMovementAgo           = () => {
      var now  = Date.now();
      var diff = Math.floor((now - this.lastMovementTS.getTime())/60000)
      //return "now: "+now +"last: " + this.lastMovementTS().getTime() + "now - diff = "+diff;
      return diff>1 ? diff + " Minutes Ago" : "Current";
    }
    
    this.url = () => {
      return "../logs/history/" + this.id;
    }
    this.setDirImg = ()=> {
      switch(this.dir) {
        //case "undetermined": return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/qmark.png"; break;
        case "undetermined": return process.env.VUE_APP_IMG_URL+"/images/qmark.png"; break;
        //case "upriver"     : return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/uparr.png"; break;
        case "upriver"     : return process.env.VUE_APP_IMG_URL+"/images/uparr.png"; break;
        //case "downriver"   : return "https://storage.googleapis.com/www.clintonrivertraffic.com/images/dwnarr.png"; break;
        case "downriver"   : return process.env.VUE_APP_IMG_URL+"/images/dwnarr.png"; break;
      }
    }
    this.alphaTime = () => {
      if(this.liveMarkerAlphaTS===null) {
        return "Not Yet Reached";
      } else {
      return formatTime(this.liveMarkerAlphaTS);
      }
    } 
    this.bravoTime = ()=> {
      if(this.liveMarkerBravoTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerBravoTS);
      }       
    } 
    this.charlieTime = ()=> {
      if(this.liveMarkerCharlieTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerCharlieTS);
      }      
    } 
    this.deltaTime = ()=> {
      if(this.liveMarkerDeltaTS===null) {
        return "Not Yet Reached";
      } else {
        return formatTime(this.liveMarkerDeltaTS);
      }     
    } 
  }
}


/* * * * * * * * *
* Functions  
*/
function initLiveScan() {  
  /*   *   *   *   *   *   *   *   *   *   *  *  *   *
   * Begin a 60 sec master clock for loop control    */
  setInterval( async ()=> {

    //Reset clock to 0 every 1 min (& increment minute)
    if(liveScanModel.tock==60) {
      liveScanModel.tock = 0
    }
    //Events below to fire on specific intervals (Modulas % determines multiples)

    //Get livescan transponders every 20 sec
    if(liveScanModel.tock%20==0) {
      const myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      
      let response = await fetch(liveScanModel.fetchUrl,  {
        headers: myHeaders
      });
      if(response.status===200) {
        let data = await response.json();
        let key, obj, len;
        
       
        data.forEach( (dat) => {
          //Skip vessels not in target region
          if (dat.liveRegion != process.env.VUE_APP_REGION) {
            console.log("Vessel "+dat.liveName+" in region "+dat.liveRegion+" skipped.");
            return
          }
          if(!liveScanModel.liveScans.length){
            key = -1;
          } else {
            key = getKeyOfId(liveScanModel.liveScans, dat.liveVesselID);
          }
          
          //Create & push
          if(key==-1) {
            obj = liveScanModel.mapper(new LiveScan(), dat, true);
            obj.key = liveScanModel.liveScans.length;
            liveScanModel.liveScans.push(obj);
          }
          //Find & Update
          else {
            liveScanModel.liveScans[key] = liveScanModel.mapper(liveScanModel.liveScans[key], dat, false)
            //Has num of vessels changed?
            if(liveScanModel.liveScans.length != liveScanModel.numVessels) {
              //Store new vessels quantity
              liveScanModel.numVessels = liveScanModel.liveScans.length;              
            }
          }  
        });
      

      } 
    }
    //Advance clock every 1 sec
    liveScanModel.tock++
    //Advance moving vessel icons predictively
    predictMovement() 
  }, 1000);
  /*  END OF CLOCK LOOP   */ 
}

function getKeyOfId(arr, id) {
  let key = -1;
  arr.forEach(function (currentVal, idx) {
    if(id == currentVal.id) {
      key = idx;
    }
  });
  return key;  
}



//Function used in initLiveScan()
function formatTime(ts) {
  var d, day, days, dh, h, m, merd, str;
  if(ts=="Not Yet Reached") { return ts; }
  ts = new Date(ts);
  h = ts.getHours();
  m = ts.getMinutes();
  if(m < 10) { m = "0" + m; }
  d = ts.getDay();
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  day  = days[d];
  merd = h>=12 ? 'pm':'am';
  if(h>12) { 
    dh = h-12; 
  } else if(h==0) {
    dh = 12;
  } else {
    dh = h;
  }
  str = dh +":"+m+merd+" "+day;
  return str;
}

function predictMovement() {
  //console.log('predictMovement()')
  var speed, distance, bearing, point, coords, icon;
  //Loop through live vessels
  liveScanModel.liveScans.forEach( (o) => {
    //Skip if vessel not moving or bogus position data
    
    if( o.isMoving && (o.lat > 1) && (-o.lng > 1)) {
      //console.log(o.name+" moving->"+o.isMoving);
      //Remove 'kts' from speed & change to int 
      speed = parseInt(o.speed);
      //Multiply knots by 1.852 to get KPH
      speed = speed * 1.852;
      //Ignore unrealistic speed reports.
      if(speed > 50) {
        return;
      }
      //Divide KPH by 3600 to get kilometers traveled in one second
      distance = speed / 3600;
      //Clean course 
      bearing = parseInt(o.course);
      //Predict next point
      point = calculateNewPositionFromBearingDistance(o.lat, o.lng, bearing, distance);
  
      //Update map view & object lat/lng
      liveScanModel.liveScans[o.key].mapMarker.setPosition(new google.maps.LatLng(point[0], point[1]));
      
      liveScanModel.liveScans[o.key].lat = point[0];
      liveScanModel.liveScans[o.key].lng = point[1];
      //console.log(o.name, point[0], point[1]);
    } 
    
  });  
}

function calculateNewPositionFromBearingDistance(lat, lng, bearing, distance) {
  var R = 6371; // Earth Radius in Km
  var lat2 = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
  var lon2 = Math.PI / 180 * lng + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(lat2));
  var rLat = 180 / Math.PI * lat2;
  var rLng = 180 / Math.PI * lon2; 
  return [ rLat.toFixed(6), rLng.toFixed(6) ];
}

function compareSeg(a, b) {
  return b.lat - a.lat;
}

function initMap() {
  liveScanModel.initalizeMap();
}


/*  *  *
 *   Constants for DOM references
 */
const liveScanModel = new LiveScanModel();
window.liveScanModel = liveScanModel;
window.initMap = initMap;
window.initLiveScan = initLiveScan;




