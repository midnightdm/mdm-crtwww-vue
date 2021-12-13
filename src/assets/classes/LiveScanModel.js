export default class LiveScanModel {
  constructor(google) {
    let self = this;
    self.google = google;
    self.livescans = [];
    self.clinton   = {lat: 41.857202, lng:-90.184084};
    //self.url       = "..livescanjson";
    self.INTERVAL  = 20000;
    self.labelIndex = 0;

    //Status vars
    self.selectedView = {view: 'viewList', idx: null};//ko.observable
    self.nowPage      = 'list'; //ko.observable
    self.lastPage     = 'list'; //ko.observable
    self.mapZoom      = 12;  //ko.observable
    self.markerList   = [];
    self.markersOn    = false; //ko.observable
    self.infoOn       = false; //ko.observable

    self.toggleMileLabels = function() {
      if(self.infoOn()==false) {
        self.infoOn(true);
        console.log("Opening markers...");
        for(var i=0, len=liveScanModel.markerList.length; i<len; i++) {
          liveScanModel.markerList[i].info.open(map, liveScanModel.markerList[i].line.path);
        }  
        map.setZoom(14);
        //map.center(liveScanModel.clinton);
        //map.center(liveScanModel.clinton);
      } else {
        self.infoOn(false);
        console.log("Closing markers..");
        for(var i=0, len=liveScanModel.markerList.length; i<len; i++) {
            liveScanModel.markerList[i].info.close();
        }
      }
      //map.setCenter(liveScanModel.clinton);
    };

    //Function used by initLiveScan()
    self.getShipSpriteCoords = function(course) {
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
    };

    self.mapper = function(o, dat, isNew, state) {
      o.position = new self.google.maps.LatLng(dat.liveLastLat, dat.liveLastLon)
      o.lat = dat.liveLastLat
      o.lng = dat.liveLastLon
      o.id = dat.liveVesselID
      o.name = dat.liveName
      o.liveLocation = dat.liveLocation
      o.mapLabel = state.lab[++state.liveScanModel.labelIndex]
      o.dir = dat.liveDirection
      //o.callsign  deprecated
      //o.liveIsLocal deprecated
      o.speed = dat.liveSpeed
      o.course = dat.liveCourse
      //o.width deprecated
      //o.length deprecated
      //o.draft deprecated
      //o.hasImage deprecated
      o.imageUrl //NEEDS SOURCE
      o.type     //NEEDS SOURCE
      o.otherDataLabel = "od"+dat.liveVesselID
      o.lastMovementTS = new Date()
      //FOR SHIP ICON MOVEMENT
      let coords = self.getShipSpriteCoords(o.course)
      let icon = {
        url: "https://storage.googleapis.com/www.clintonrivertraffic.com/www.clintonrivertraffic.com/images/ship-icon-sprite-cyan.png",
        origin: new self.google.maps.Point(coords[0], coords[1]),
        size: new self.google.maps.Size(55, 55)
      }
      if(isNew) {
        o.liveLastScanTS = new Date(dat.liveLastTS*1000)
        let marker = new self.google.maps.Marker({
          position: o.position,
          title: o.name, 
          label: o.mapLabel, 
          icon: icon,
          map: state.map
        })
        o.marker = marker
      } else {
        o.liveLastScanTS.setTime(dat.liveLastTS*1000)
        o.marker.setPosition(new self.google.maps.LatLng(o.lat, o.lng))
        o.marker.setIcon(icon);
        if(o.speed>0) { //If transponder reported movement...
          if((o.lng != o.prevLng) || (o.lat != o.prevLat)) { //...did its location change?           
            //Yes means the transponder report is current. Update time value.
            now = Date.now();          
            o.lastMovementTS.setTime(now);
            //Reported speed with no position change means stale data. Don't update time value.
          }
        } //0 speed & 0 movement is ok. Just means vessel is idle
        o.prevLat = o.lat
        o.prevLng = o.lng

      }
      o.liveMarkerAlphaWasReached = dat.liveMarkerAlphaWasReached
      if(o.liveMarkerAlphaWasReached) {
        if(dat.liveMarkerAlphaTS != null) {
          o.liveMarkerAlphaTS = new Date(dat.liveMarkerAlphaTS * 1000)
        }
      }  
      o.liveMarkerBravoWasReached = dat.liveMarkerBravoWasReached
      if(o.liveMarkerBravoWasReached) {
        if(dat.liveMarkerBravoTS != null) {
          o.liveMarkerBravoTS = new Date(dat.liveMarkerBravoTS * 1000)
        }
      }      
      o.liveMarkerCharlieWasReached = dat.liveMarkerCharlieWasReached
      if(o.liveMarkerCharlieWasReached) {
        if(dat.liveMarkerCharlieTS != null) {
          o.liveMarkerCharlieTS = new Date(dat.liveMarkerCharlieTS * 1000)
        }
      }     
      o.liveMarkerDeltaWasReached = dat.liveMarkerDeltaWasReached
      if(o.liveMarkerDeltaWasReached) {
        if(dat.liveMarkerDeltaTS != null) {
          o.liveMarkerDeltaTS = new Date(dat.liveMarkerDeltaTS * 1000)
        }
      }
      return o 
    }
  }
}