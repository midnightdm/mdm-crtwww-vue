export default class ManageModel {
    constructor() {
      let self = this;
      self.userID = null;
      self.userPW = null;
      self.userIA = false;
      self.subListActual = [];
      self.subListSelection = {};
      self.actListSelection = {};
      self.subListAvail = [
        { key: 'alphada',  title: 'Alpha Waypoint 3 N Lock 13 Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles north of Lock 13 traveling downriver.', image: 'images/select/sldr-alpha.png'},
        { key: 'alphadp',  title: 'Alpha Waypoint 3 N Lock 13 Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles north of Lock 13 traveling downriver.', image: 'images/select/sldr-alpha.png'},
        { key: 'alphaua',  title: 'Alpha Waypoint 3 N Lock 13 Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles north of Lock 13 traveling upriver.', image: 'images/select/slur-alpha.png'},
        { key: 'alphaup',  title: 'Alpha Waypoint 3 N Lock 13 Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles north of Lock 13 traveling upriver.', image: 'images/select/slur-alpha.png'},      
        { key: 'bravoda',  title: 'Bravo Waypoint Lock 13 Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line at Lock 13 traveling downriver.', image: 'images/select/sldr-bravo.png'},
        { key: 'bravodp',  title: 'Bravo Waypoint Lock 13 Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line at Lock 13 traveling downriver.', image: 'images/select/sldr-bravo.png'},
        { key: 'bravoua',  title: 'Bravo Waypoint Lock 13 Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line at Lock 13 traveling upriver.', image: 'images/select/slur-bravo.png'},
        { key: 'bravoup',  title: 'Bravo Waypoint  Lock 13 Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line at Lock 13 traveling upriver.', image: 'images/select/slur-bravo.png'},      
        { key: 'charlieda',  title: 'Charlie Waypoint RR Bridge Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes the Clinton railroad bridge traveling downriver.', image: 'images/select/sldr-charlie.png'},
        { key: 'charliedp',  title: 'Charlie Waypoint RR Bridge Downriver Passenger', description: 'Notification is sent when a passenger vessel passes the Clinton railroad bridge traveling downriver.', image: 'images/select/sldr-charlie.png'},
        { key: 'charlieua',  title: 'Charlie Waypoint RR Bridge Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes the Clinton railroad bridge traveling upriver.', image: 'images/select/slur-charlie.png'},
        { key: 'charlieup',  title: 'Charlie Waypoint RR Bridge Upriver Passenger', description: 'Notification is sent when a passenger vessel passes the Clinton railroad bridge traveling upriver.', image: 'images/select/slur-charlie.png'},
        { key: 'deltada',  title: 'Delta Waypoint 3 S RR Bridge Downriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles south of the Clinton railroad bridge traveling downriver.', image: 'images/select/sldr-delta.png'},
        { key: 'deltadp',  title: 'Delta Waypoint 3 S RR Bridge Downriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles south of the Clinton railroad bridge traveling downriver.', image: 'images/select/sldr-delta.png'},
        { key: 'deltaua',  title: 'Delta Waypoint 3 S RR Bridge Upriver Any', description: 'Notification is sent when any transponder-equipped vessel passes a line 3 miles south of the Clinton railroad bridge traveling upriver.', image: 'images/select/slur-delta.png'},
        { key: 'deltaup',  title: 'Delta Waypoint 3 S RR Bridge Upriver Passenger', description: 'Notification is sent when a passenger vessel passes a line 3 miles south of the Clinton railroad bridge traveling upriver.', image: 'images/select/slur-delta.png'},

        // { key: 'm489da', title: 'Marker 489 Downriver Any', description: '', image: 'images/select/sldr489.png' }, 
        // { key: 'm489dp', title: 'Marker 489 Downriver Passenger', description: '', image: 'images/select/sldr489.png' },
        // { key: 'm489ua', title: 'Marker 489 Upriver Any', description: '', image: 'images/select/slur489.png' },
        // { key: 'm489up', title: 'Marker 489 Upriver Passenger', description: '', image: 'images/select/slur489.png' }
        // { key: 'm490da', title: 'Marker 490 Downriver Any', description: '', image: 'images/select/sldr490.png' }, 
        // { key: 'm490dp', title: 'Marker 490 Downriver Passenger', description: '', image: 'images/select/sldr490.png' },
        // { key: 'm490ua', title: 'Marker 490 Upriver Any', description: '', image: 'images/select/slur490.png' },
        // { key: 'm490up', title: 'Marker 490 Upriver Passenger', description: '', image: 'images/select/slur490.png' }
        // { key: 'm491da', title: 'Marker 491 Downriver Any', description: '', image: 'images/select/sldr491.png' }, 
        // { key: 'm491dp', title: 'Marker 491 Downriver Passenger', description: '', image: 'images/select/sldr491.png' },
        // { key: 'm491ua', title: 'Marker 491 Upriver Any', description: '', image: 'images/select/slur491.png' },
        // { key: 'm491up', title: 'Marker 491 Upriver Passenger', description: '', image: 'images/select/slur491.png' }
        // { key: 'm492da', title: 'Marker 492 Downriver Any', description: '', image: 'images/select/sldr492.png' }, 
        // { key: 'm492dp', title: 'Marker 492 Downriver Passenger', description: '', image: 'images/select/sldr492.png' },
        // { key: 'm492ua', title: 'Marker 492 Upriver Any', description: '', image: 'images/select/slur492.png' },
        // { key: 'm492up', title: 'Marker 492 Upriver Passenger', description: '', image: 'images/select/slur492.png' }
        // { key: 'm493da', title: 'Marker 493 Downriver Any', description: '', image: 'images/select/sldr493.png' }, 
        // { key: 'm493dp', title: 'Marker 493 Downriver Passenger', description: '', image: 'images/select/sldr493.png' },
        // { key: 'm493ua', title: 'Marker 493 Upriver Any', description: '', image: 'images/select/slur493.png' },
        // { key: 'm493up', title: 'Marker 493 Upriver Passenger', description: '', image: 'images/select/slur493.png' }
        // { key: 'm494da', title: 'Marker 494 Downriver Any', description: '', image: 'images/select/sldr494.png' }, 
        // { key: 'm494dp', title: 'Marker 494 Downriver Passenger', description: '', image: 'images/select/sldr494.png' },
        // { key: 'm494ua', title: 'Marker 494 Upriver Any', description: '', image: 'images/select/slur494.png' },
        // { key: 'm494up', title: 'Marker 494 Upriver Passenger', description: '', image: 'images/select/slur494.png' }
        // { key: 'm495da', title: 'Marker 495 Downriver Any', description: '', image: 'images/select/sldr495.png' }, 
        // { key: 'm495dp', title: 'Marker 495 Downriver Passenger', description: '', image: 'images/select/sldr495.png' },
        // { key: 'm495ua', title: 'Marker 495 Upriver Any', description: '', image: 'images/select/slur495.png' },
        // { key: 'm495up', title: 'Marker 495 Upriver Passenger', description: '', image: 'images/select/slur495.png' }        
        // { key: 'm496da', title: 'Marker 496 Downriver Any', description: '', image: 'images/select/sldr496.png' }, 
        // { key: 'm496dp', title: 'Marker 496 Downriver Passenger', description: '', image: 'images/select/sldr496.png' },
        // { key: 'm496ua', title: 'Marker 496 Upriver Any', description: '', image: 'images/select/slur496.png' },
        // { key: 'm496up', title: 'Marker 496 Upriver Passenger', description: '', image: 'images/select/slur496.png' }
        // { key: 'm497da', title: 'Marker 497 Downriver Any', description: '', image: 'images/select/sldr497.png' }, 
        // { key: 'm497dp', title: 'Marker 497 Downriver Passenger', description: '', image: 'images/select/sldr497.png' },
        // { key: 'm497ua', title: 'Marker 497 Upriver Any', description: '', image: 'images/select/slur497.png' },
        // { key: 'm497up', title: 'Marker 497 Upriver Passenger', description: '', image: 'images/select/slur497.png' }
        // { key: 'm498da', title: 'Marker 498 Downriver Any', description: '', image: 'images/select/sldr498.png' }, 
        // { key: 'm498dp', title: 'Marker 498 Downriver Passenger', description: '', image: 'images/select/sldr498.png' },
        // { key: 'm498ua', title: 'Marker 498 Upriver Any', description: '', image: 'images/select/slur498.png' },
        // { key: 'm498up', title: 'Marker 498 Upriver Passenger', description: '', image: 'images/select/slur498.png' }
        // { key: 'm499da', title: 'Marker 499 Downriver Any', description: '', image: 'images/select/sldr499.png' }, 
        // { key: 'm499dp', title: 'Marker 499 Downriver Passenger', description: '', image: 'images/select/sldr499.png' },
        // { key: 'm499ua', title: 'Marker 499 Upriver Any', description: '', image: 'images/select/slur499.png' },
        // { key: 'm499up', title: 'Marker 499 Upriver Passenger', description: '', image: 'images/select/slur499.png' }
        // { key: 'm500da', title: 'Marker 500 Downriver Any', description: '', image: 'images/select/sldr500.png' }
        // { key: 'm500dp', title: 'Marker 500 Downriver Passenger', description: '', image: 'images/select/sldr500.png' },
        // { key: 'm500ua', title: 'Marker 500 Upriver Any', description: '', image: 'images/select/slur500.png' },
        // { key: 'm500up', title: 'Marker 500 Upriver Passenger', description: '', image: 'images/select/slur500.png' }
        // { key: 'm501da', title: 'Marker 501 Downriver Any', description: '', image: 'images/select/sldr501.png' }, 
        // { key: 'm501dp', title: 'Marker 501 Downriver Passenger', description: '', image: 'images/select/sldr501.png' },
        // { key: 'm501ua', title: 'Marker 501 Upriver Any', description: '', image: 'images/select/slur501.png' },
        // { key: 'm501up', title: 'Marker 501 Upriver Passenger', description: '', image: 'images/select/slur501.png' }        
        // { key: 'm502da', title: 'Marker 502 Downriver Any', description: '', image: 'images/select/sldr502.png' }, 
        // { key: 'm502dp', title: 'Marker 502 Downriver Passenger', description: '', image: 'images/select/sldr502.png' },
        // { key: 'm502ua', title: 'Marker 502 Upriver Any', description: '', image: 'images/select/slur502.png' },
        // { key: 'm502up', title: 'Marker 502 Upriver Passenger', description: '', image: 'images/select/slur502.png' }        

        
        { key: 'm503da', title: 'Marker 503 Downriver Any', description: '', image: 'images/select/sldr503.png' },
        { key: 'm503dp', title: 'Marker 503 Downriver Passenger', description: '', image: 'images/select/sldr503.png' },
        { key: 'm503ua', title: 'Marker 503 Upriver Any', description: '', image: 'images/select/slur503.png' },
        { key: 'm503up', title: 'Marker 503 Upriver Passenger', description: '', image: 'images/select/slur503.png' },
        { key: 'm504da', title: 'Marker 504 Downriver Any', description: '', image: 'images/select/sldr504.png' },
        { key: 'm504dp', title: 'Marker 504 Downriver Passenger', description: '', image: 'images/select/sldr504.png' },
        { key: 'm504ua', title: 'Marker 504 Upriver Any', description: '', image: 'images/select/slur504.png' },
        { key: 'm504up', title: 'Marker 504 Upriver Passenger', description: '', image: 'images/select/slur504.png' },
        { key: 'm505da', title: 'Marker 505 Downriver Any', description: '', image: 'images/select/sldr505.png' },
        { key: 'm505dp', title: 'Marker 505 Downriver Passenger', description: '', image: 'images/select/sldr505.png' },
        { key: 'm505ua', title: 'Marker 505 Upriver Any', description: '', image: 'images/select/slur505.png' },
        { key: 'm505up', title: 'Marker 505 Upriver Passenger', description: '', image: 'images/select/slur505.png' },
        { key: 'm506da', title: 'Marker 506 Downriver Any', description: '', image: 'images/select/sldr506.png' },
        { key: 'm506dp', title: 'Marker 506 Downriver Passenger', description: '', image: 'images/select/sldr506.png' },
        { key: 'm506ua', title: 'Marker 506 Upriver Any', description: '', image: 'images/select/slur506.png' },
        { key: 'm506up', title: 'Marker 506 Upriver Passenger', description: '', image: 'images/select/slur506.png' },
        { key: 'm507da', title: 'Marker 507 Downriver Any', description: '', image: 'images/select/sldr507.png' },
        { key: 'm507dp', title: 'Marker 507 Downriver Passenger', description: '', image: 'images/select/sldr507.png' },
        { key: 'm507ua', title: 'Marker 507 Upriver Any', description: '', image: 'images/select/slur507.png' },
        { key: 'm507up', title: 'Marker 507 Upriver Passenger', description: '', image: 'images/select/slur507.png' },
        { key: 'm508da', title: 'Marker 508 Downriver Any', description: '', image: 'images/select/sldr508.png' },
        { key: 'm508dp', title: 'Marker 508 Downriver Passenger', description: '', image: 'images/select/sldr508.png' },
        { key: 'm508ua', title: 'Marker 508 Upriver Any', description: '', image: 'images/select/slur508.png' },
        { key: 'm508up', title: 'Marker 508 Upriver Passenger', description: '', image: 'images/select/slur508.png' },
        { key: 'm509da', title: 'Marker 509 Downriver Any', description: '', image: 'images/select/sldr509.png' },
        { key: 'm509dp', title: 'Marker 509 Downriver Passenger', description: '', image: 'images/select/sldr509.png' },
        { key: 'm509ua', title: 'Marker 509 Upriver Any', description: '', image: 'images/select/slur509.png' },
        { key: 'm509up', title: 'Marker 509 Upriver Passenger', description: '', image: 'images/select/slur509.png' },
        { key: 'albany',  title: 'Albany Sand Pit Any', description: 'Notification is sent when any transponder-equipped vessel enters the Albany sand pit harbor.', image: 'images/select/sl-albany.png'},
        { key: 'm510da', title: 'Marker 510 Downriver Any', description: '', image: 'images/select/sldr510.png' },
        { key: 'm510dp', title: 'Marker 510 Downriver Passenger', description: '', image: 'images/select/sldr510.png' },
        { key: 'm510ua', title: 'Marker 510 Upriver Any', description: '', image: 'images/select/slur510.png' },
        { key: 'm510up', title: 'Marker 510 Upriver Passenger', description: '', image: 'images/select/slur510.png' },
        { key: 'm511da', title: 'Marker 511 Downriver Any', description: '', image: 'images/select/sldr511.png' },
        { key: 'm511dp', title: 'Marker 511 Downriver Passenger', description: '', image: 'images/select/sldr511.png' },
        { key: 'm511ua', title: 'Marker 511 Upriver Any', description: '', image: 'images/select/slur511.png' },
        { key: 'm511up', title: 'Marker 511 Upriver Passenger', description: '', image: 'images/select/slur511.png' },
        { key: 'camanche',  title: 'Camanche Harbor Any', description: 'Notification is sent when any transponder-equipped vessel enters the Camanche Marina harbor.', image: 'images/select/sl-camanche.png'},
        { key: 'm512da', title: 'Marker 512 Downriver Any', description: '', image: 'images/select/sldr512.png' },
        { key: 'm512dp', title: 'Marker 512 Downriver Passenger', description: '', image: 'images/select/sldr512.png' },
        { key: 'm512ua', title: 'Marker 512 Upriver Any', description: '', image: 'images/select/slur512.png' },
        { key: 'm512up', title: 'Marker 512 Upriver Passenger', description: '', image: 'images/select/slur512.png' },
        { key: 'm513da', title: 'Marker 513 Downriver Any', description: '', image: 'images/select/sldr513.png' },
        { key: 'm513dp', title: 'Marker 513 Downriver Passenger', description: '', image: 'images/select/sldr513.png' },
        { key: 'm513ua', title: 'Marker 513 Upriver Any', description: '', image: 'images/select/slur513.png' },
        { key: 'm513up', title: 'Marker 513 Upriver Passenger', description: '', image: 'images/select/slur513.png' },
        { key: 'm514da', title: 'Marker 514 Downriver Any', description: '', image: 'images/select/sldr514.png' },
        { key: 'm514dp', title: 'Marker 514 Downriver Passenger', description: '', image: 'images/select/sldr514.png' },
        { key: 'm514ua', title: 'Marker 514 Upriver Any', description: '', image: 'images/select/slur514.png' },
        { key: 'm514up', title: 'Marker 514 Upriver Passenger', description: '', image: 'images/select/slur514.png' },
        { key: 'beaverda',  title: 'Beaver Slough Downriver Any', description: 'Notification is sent when any transponder-equipped vessel travels downriver in the Beaver Island slough.', image: 'images/select/sldr-beaver.png'},
        { key: 'beaverua',  title: 'Beaver Slough Upriver Any', description: 'Notification is sent when any transponder-equipped vessel travels upriver in the Beaver Island slough.', image: 'images/select/slur-beaver.png'},    
        { key: 'm515da', title: 'Marker 515 Downriver Any', description: '', image: 'images/select/sldr515.png' },
        { key: 'm515dp', title: 'Marker 515 Downriver Passenger', description: '', image: 'images/select/sldr515.png' },
        { key: 'm515ua', title: 'Marker 515 Upriver Any', description: '', image: 'images/select/slur515.png' },
        { key: 'm515up', title: 'Marker 515 Upriver Passenger', description: '', image: 'images/select/slur515.png' },
        { key: 'm516da', title: 'Marker 516 Downriver Any', description: '', image: 'images/select/sldr516.png' },
        { key: 'm516dp', title: 'Marker 516 Downriver Passenger', description: '', image: 'images/select/sldr516.png' },
        { key: 'm516ua', title: 'Marker 516 Upriver Any', description: '', image: 'images/select/slur516.png' },
        { key: 'm516up', title: 'Marker 516 Upriver Passenger', description: '', image: 'images/select/slur516.png' },
        { key: 'm517da', title: 'Marker 517 Downriver Any', description: '', image: 'images/select/sldr517.png' },
        { key: 'm517dp', title: 'Marker 517 Downriver Passenger', description: '', image: 'images/select/sldr517.png' },
        { key: 'm517ua', title: 'Marker 517 Upriver Any', description: '', image: 'images/select/slur517.png' },
        { key: 'm517up', title: 'Marker 517 Upriver Passenger', description: '', image: 'images/select/slur517.png' },
        { key: 'm518da', title: 'Marker 518 Downriver Any', description: '', image: 'images/select/sldr518.png' },
        { key: 'm518dp', title: 'Marker 518 Downriver Passenger', description: '', image: 'images/select/sldr518.png' },
        { key: 'm518ua', title: 'Marker 518 Upriver Any', description: '', image: 'images/select/slur518.png' },
        { key: 'm518up', title: 'Marker 518 Upriver Passenger', description: '', image: 'images/select/slur518.png' },
        { key: 'm519da', title: 'Marker 519 Downriver Any', description: '', image: 'images/select/sldr519.png' },
        { key: 'm519dp', title: 'Marker 519 Downriver Passenger', description: '', image: 'images/select/sldr519.png' },
        { key: 'm519ua', title: 'Marker 519 Upriver Any', description: '', image: 'images/select/slur519.png' },
        { key: 'm519up', title: 'Marker 519 Upriver Passenger', description: '', image: 'images/select/slur519.png' },
        { key: 'm520da', title: 'Marker 520 Downriver Any', description: '', image: 'images/select/sldr520.png' },
        { key: 'm520dp', title: 'Marker 520 Downriver Passenger', description: '', image: 'images/select/sldr520.png' },
        { key: 'm520ua', title: 'Marker 520 Upriver Any', description: '', image: 'images/select/slur520.png' },
        { key: 'm520up', title: 'Marker 520 Upriver Passenger', description: '', image: 'images/select/slur520.png' },
        { key: 'm521da', title: 'Marker 521 Downriver Any', description: '', image: 'images/select/sldr521.png' },
        { key: 'm521dp', title: 'Marker 521 Downriver Passenger', description: '', image: 'images/select/sldr521.png' },
        { key: 'm521ua', title: 'Marker 521 Upriver Any', description: '', image: 'images/select/slur521.png' },
        { key: 'm521up', title: 'Marker 521 Upriver Passenger', description: '', image: 'images/select/slur521.png' },
        { key: 'm522da', title: 'Marker 522 Downriver Any', description: '', image: 'images/select/sldr522.png' },
        { key: 'm522dp', title: 'Marker 522 Downriver Passenger', description: '', image: 'images/select/sldr522.png' },
        { key: 'm522ua', title: 'Marker 522 Upriver Any', description: '', image: 'images/select/slur522.png' },
        { key: 'm522up', title: 'Marker 522 Upriver Passenger', description: '', image: 'images/select/slur522.png' },
        { key: 'm523da', title: 'Marker 523 Downriver Any', description: '', image: 'images/select/sldr523.png' },
        { key: 'm523dp', title: 'Marker 523 Downriver Passenger', description: '', image: 'images/select/sldr523.png' },
        { key: 'm523ua', title: 'Marker 523 Upriver Any', description: '', image: 'images/select/slur523.png' },
        { key: 'm523up', title: 'Marker 523 Upriver Passenger', description: '', image: 'images/select/slur523.png' },
        { key: 'm524da', title: 'Marker 524 Downriver Any', description: '', image: 'images/select/sldr524.png' },
        { key: 'm524dp', title: 'Marker 524 Downriver Passenger', description: '', image: 'images/select/sldr524.png' },
        { key: 'm524ua', title: 'Marker 524 Upriver Any', description: '', image: 'images/select/slur524.png' },
        { key: 'm524up', title: 'Marker 524 Upriver Passenger', description: '', image: 'images/select/slur524.png' },
        { key: 'm525da', title: 'Marker 525 Downriver Any', description: '', image: 'images/select/sldr525.png' },
        { key: 'm525dp', title: 'Marker 525 Downriver Passenger', description: '', image: 'images/select/sldr525.png' },
        { key: 'm525ua', title: 'Marker 525 Upriver Any', description: '', image: 'images/select/slur525.png' },
        { key: 'm525up', title: 'Marker 525 Upriver Passenger', description: '', image: 'images/select/slur525.png' },
        { key: 'm526da', title: 'Marker 526 Downriver Any', description: '', image: 'images/select/sldr526.png' },
        { key: 'm526dp', title: 'Marker 526 Downriver Passenger', description: '', image: 'images/select/sldr526.png' },
        { key: 'm526ua', title: 'Marker 526 Upriver Any', description: '', image: 'images/select/slur526.png' },
        { key: 'm526up', title: 'Marker 526 Upriver Passenger', description: '', image: 'images/select/slur526.png' },
        { key: 'm527da', title: 'Marker 527 Downriver Any', description: '', image: 'images/select/sldr527.png' },
        { key: 'm527dp', title: 'Marker 527 Downriver Passenger', description: '', image: 'images/select/sldr527.png' },
        { key: 'm527ua', title: 'Marker 527 Upriver Any', description: '', image: 'images/select/slur527.png' },
        { key: 'm527up', title: 'Marker 527 Upriver Passenger', description: '', image: 'images/select/slur527.png' },
        { key: 'm528da', title: 'Marker 528 Downriver Any', description: '', image: 'images/select/sldr528.png' },
        { key: 'm528dp', title: 'Marker 528 Downriver Passenger', description: '', image: 'images/select/sldr528.png' },
        { key: 'm528ua', title: 'Marker 528 Upriver Any', description: '', image: 'images/select/slur528.png' },
        { key: 'm528up', title: 'Marker 528 Upriver Passenger', description: '', image: 'images/select/slur528.png' },
        { key: 'm529da', title: 'Marker 529 Downriver Any', description: '', image: 'images/select/sldr529.png' },
        { key: 'm529dp', title: 'Marker 529 Downriver Passenger', description: '', image: 'images/select/sldr529.png' },
        { key: 'm529ua', title: 'Marker 529 Upriver Any', description: '', image: 'images/select/slur529.png' },
        { key: 'm529up', title: 'Marker 529 Upriver Passenger', description: '', image: 'images/select/slur529.png' },
        { key: 'm530da', title: 'Marker 530 Downriver Any', description: '', image: 'images/select/sldr530.png' },
        { key: 'm530dp', title: 'Marker 530 Downriver Passenger', description: '', image: 'images/select/sldr530.png' },
        { key: 'm530ua', title: 'Marker 530 Upriver Any', description: '', image: 'images/select/slur530.png' },
        { key: 'm530up', title: 'Marker 530 Upriver Passenger', description: '', image: 'images/select/slur530.png' },
        { key: 'm531da', title: 'Marker 531 Downriver Any', description: '', image: 'images/select/sldr531.png' },
        { key: 'm531dp', title: 'Marker 531 Downriver Passenger', description: '', image: 'images/select/sldr531.png' },
        { key: 'm531ua', title: 'Marker 531 Upriver Any', description: '', image: 'images/select/slur531.png' },
        { key: 'm531up', title: 'Marker 531 Upriver Passenger', description: '', image: 'images/select/slur531.png' },
        { key: 'm532da', title: 'Marker 532 Downriver Any', description: '', image: 'images/select/sldr532.png' },
        { key: 'm532dp', title: 'Marker 532 Downriver Passenger', description: '', image: 'images/select/sldr532.png' },
        { key: 'm532ua', title: 'Marker 532 Upriver Any', description: '', image: 'images/select/slur532.png' },
        { key: 'm532up', title: 'Marker 532 Upriver Passenger', description: '', image: 'images/select/slur532.png' },
        { key: 'm533da', title: 'Marker 533 Downriver Any', description: '', image: 'images/select/sldr533.png' },
        { key: 'm533dp', title: 'Marker 533 Downriver Passenger', description: '', image: 'images/select/sldr533.png' },
        { key: 'm533ua', title: 'Marker 533 Upriver Any', description: '', image: 'images/select/slur533.png' },
        { key: 'm533up', title: 'Marker 533 Upriver Passenger', description: '', image: 'images/select/slur533.png' },
        { key: 'm534da', title: 'Marker 534 Downriver Any', description: '', image: 'images/select/sldr534.png' },
        { key: 'm534dp', title: 'Marker 534 Downriver Passenger', description: '', image: 'images/select/sldr534.png' },
        { key: 'm534ua', title: 'Marker 534 Upriver Any', description: '', image: 'images/select/slur534.png' },
        { key: 'm534up', title: 'Marker 534 Upriver Passenger', description: '', image: 'images/select/slur534.png' },
        { key: 'm535da', title: 'Marker 535 Downriver Any', description: '', image: 'images/select/sldr535.png' },
        { key: 'm535dp', title: 'Marker 535 Downriver Passenger', description: '', image: 'images/select/sldr535.png' },
        { key: 'm535ua', title: 'Marker 535 Upriver Any', description: '', image: 'images/select/slur535.png' },
        { key: 'm535up', title: 'Marker 535 Upriver Passenger', description: '', image: 'images/select/slur535.png' },
        { key: 'm536da', title: 'Marker 536 Downriver Any', description: '', image: 'images/select/sldr536.png' },
        { key: 'm536dp', title: 'Marker 536 Downriver Passenger', description: '', image: 'images/select/sldr536.png' },
        { key: 'm536ua', title: 'Marker 536 Upriver Any', description: '', image: 'images/select/slur536.png' },
        { key: 'm536up', title: 'Marker 536 Upriver Passenger', description: '', image: 'images/select/slur536.png' },
        { key: 'm537da', title: 'Marker 537 Downriver Any', description: '', image: 'images/select/sldr537.png' },
        { key: 'm537dp', title: 'Marker 537 Downriver Passenger', description: '', image: 'images/select/sldr537.png' },
        { key: 'm537ua', title: 'Marker 537 Upriver Any', description: '', image: 'images/select/slur537.png' },
        { key: 'm537up', title: 'Marker 537 Upriver Passenger', description: '', image: 'images/select/slur537.png' },
        { key: 'm538da', title: 'Marker 538 Downriver Any', description: '', image: 'images/select/sldr538.png' },
        { key: 'm538dp', title: 'Marker 538 Downriver Passenger', description: '', image: 'images/select/sldr538.png' },
        { key: 'm538ua', title: 'Marker 538 Upriver Any', description: '', image: 'images/select/slur538.png' },
        { key: 'm538up', title: 'Marker 538 Upriver Passenger', description: '', image: 'images/select/slur538.png' },
        { key: 'm539da', title: 'Marker 539 Downriver Any', description: '', image: 'images/select/sldr539.png' },
        { key: 'm539dp', title: 'Marker 539 Downriver Passenger', description: '', image: 'images/select/sldr539.png' },
        { key: 'm539ua', title: 'Marker 539 Upriver Any', description: '', image: 'images/select/slur539.png' },
        { key: 'm539up', title: 'Marker 539 Upriver Passenger', description: '', image: 'images/select/slur539.png' }

        // { key: 'm540dp', title: 'Marker 540 Downriver Passenger', description: '', image: 'images/select/sldr540.png' },
        // { key: 'm540ua', title: 'Marker 540 Upriver Any', description: '', image: 'images/select/slur540.png' },
        // { key: 'm540up', title: 'Marker 540 Upriver Passenger', description: '', image: 'images/select/slur540.png' }
        // { key: 'm541da', title: 'Marker 541 Downriver Any', description: '', image: 'images/select/sldr541.png' }, 
        // { key: 'm541dp', title: 'Marker 541 Downriver Passenger', description: '', image: 'images/select/sldr541.png' },
        // { key: 'm541ua', title: 'Marker 541 Upriver Any', description: '', image: 'images/select/slur541.png' },
        // { key: 'm541up', title: 'Marker 541 Upriver Passenger', description: '', image: 'images/select/slur541.png' }
        // { key: 'm542da', title: 'Marker 542 Downriver Any', description: '', image: 'images/select/sldr542.png' }, 
        // { key: 'm542dp', title: 'Marker 542 Downriver Passenger', description: '', image: 'images/select/sldr542.png' },
        // { key: 'm542ua', title: 'Marker 542 Upriver Any', description: '', image: 'images/select/slur542.png' },
        // { key: 'm542up', title: 'Marker 542 Upriver Passenger', description: '', image: 'images/select/slur542.png' }
        // { key: 'm543da', title: 'Marker 543 Downriver Any', description: '', image: 'images/select/sldr543.png' }, 
        // { key: 'm543dp', title: 'Marker 543 Downriver Passenger', description: '', image: 'images/select/sldr543.png' },
        // { key: 'm543ua', title: 'Marker 543 Upriver Any', description: '', image: 'images/select/slur543.png' },
        // { key: 'm543up', title: 'Marker 543 Upriver Passenger', description: '', image: 'images/select/slur543.png' }
        // { key: 'm544da', title: 'Marker 544 Downriver Any', description: '', image: 'images/select/sldr544.png' }, 
        // { key: 'm544dp', title: 'Marker 544 Downriver Passenger', description: '', image: 'images/select/sldr544.png' },
        // { key: 'm544ua', title: 'Marker 544 Upriver Any', description: '', image: 'images/select/slur544.png' },
        // { key: 'm544up', title: 'Marker 544 Upriver Passenger', description: '', image: 'images/select/slur544.png' }
        // { key: 'm545da', title: 'Marker 545 Downriver Any', description: '', image: 'images/select/sldr545.png' }, 
        // { key: 'm545dp', title: 'Marker 545 Downriver Passenger', description: '', image: 'images/select/sldr545.png' },
        // { key: 'm545ua', title: 'Marker 545 Upriver Any', description: '', image: 'images/select/slur545.png' },
        // { key: 'm545up', title: 'Marker 545 Upriver Passenger', description: '', image: 'images/select/slur545.png' }
        // { key: 'm546da', title: 'Marker 546 Downriver Any', description: '', image: 'images/select/sldr546.png' }, 
        // { key: 'm546dp', title: 'Marker 546 Downriver Passenger', description: '', image: 'images/select/sldr546.png' },
        // { key: 'm546ua', title: 'Marker 546 Upriver Any', description: '', image: 'images/select/slur546.png' },
        // { key: 'm546up', title: 'Marker 546 Upriver Passenger', description: '', image: 'images/select/slur546.png' }
        // { key: 'm547da', title: 'Marker 547 Downriver Any', description: '', image: 'images/select/sldr547.png' }, 
        // { key: 'm547dp', title: 'Marker 547 Downriver Passenger', description: '', image: 'images/select/sldr547.png' },
        // { key: 'm547ua', title: 'Marker 547 Upriver Any', description: '', image: 'images/select/slur547.png' },
        // { key: 'm547up', title: 'Marker 547 Upriver Passenger', description: '', image: 'images/select/slur547.png' }
        // { key: 'm548da', title: 'Marker 548 Downriver Any', description: '', image: 'images/select/sldr548.png' }, 
        // { key: 'm548dp', title: 'Marker 548 Downriver Passenger', description: '', image: 'images/select/sldr548.png' },
        // { key: 'm548ua', title: 'Marker 548 Upriver Any', description: '', image: 'images/select/slur548.png' },
        // { key: 'm548up', title: 'Marker 548 Upriver Passenger', description: '', image: 'images/select/slur548.png' }
        // { key: 'm549da', title: 'Marker 549 Downriver Any', description: '', image: 'images/select/sldr549.png' }, 
        // { key: 'm549dp', title: 'Marker 549 Downriver Passenger', description: '', image: 'images/select/sldr549.png' },
        // { key: 'm549ua', title: 'Marker 549 Upriver Any', description: '', image: 'images/select/slur549.png' },
        // { key: 'm549up', title: 'Marker 549 Upriver Passenger', description: '', image: 'images/select/slur549.png' }
        // { key: 'm550da', title: 'Marker 550 Downriver Any', description: '', image: 'images/select/sldr550.png' }, 
        // { key: 'm550dp', title: 'Marker 550 Downriver Passenger', description: '', image: 'images/select/sldr550.png' },
        // { key: 'm550ua', title: 'Marker 550 Upriver Any', description: '', image: 'images/select/slur550.png' },
        // { key: 'm550up', title: 'Marker 550 Upriver Passenger', description: '', image: 'images/select/slur550.png' }
        // { key: 'm551da', title: 'Marker 551 Downriver Any', description: '', image: 'images/select/sldr551.png' }, 
        // { key: 'm551dp', title: 'Marker 551 Downriver Passenger', description: '', image: 'images/select/sldr551.png' },
        // { key: 'm551ua', title: 'Marker 551 Upriver Any', description: '', image: 'images/select/slur551.png' },
        // { key: 'm551up', title: 'Marker 551 Upriver Passenger', description: '', image: 'images/select/slur551.png' }
        // { key: 'm552da', title: 'Marker 552 Downriver Any', description: '', image: 'images/select/sldr552.png' }, 
        // { key: 'm552dp', title: 'Marker 552 Downriver Passenger', description: '', image: 'images/select/sldr552.png' },
        // { key: 'm552ua', title: 'Marker 552 Upriver Any', description: '', image: 'images/select/slur552.png' },
        // { key: 'm552up', title: 'Marker 552 Upriver Passenger', description: '', image: 'images/select/slur552.png' }

      ];
      self.getSelection  = async function (){
        let qs = document.querySelector('#sub-list-avail');
        let key = qs.value;
        let sel = self.subListAvail.find(o => o.key === key);
        //Build description based on conditions
        if(sel.key.substr(0,1)=='m') {
          let mile = parseInt(sel.key.substr(1,3));
          let dir  = sel.key.substr(4,1);
          let type = sel.key.substr(5,1);
          var dirLine, dirEnd, tStr;
          tStr = type=="p"? "a passenger " : "any transponder-equipped ";
          if(dir == "u" ) {
            dirLine = "bottom ";
            dirEnd  = "upriver.\n";
          } else {
            dirLine = "top ";
            dirEnd  = "downriver.\n";
          }
          
          sel.description = "Notification is sent when " + tStr + "vessel reaches the " + dirLine + "line of the river zone designated by mile marker " + mile + " while traveling " + dirEnd;
        }
        self.subListSelection = sel;
        console.log("subListSelection= ",sel.key);
      };
    }
  }
  