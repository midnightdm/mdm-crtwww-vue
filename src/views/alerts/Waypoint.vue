<template>
   <div id="wrapper" >
    <div id="main">
        <div v-if="mapOn" id="map"></div> 
        <div v-else id="shadow1">
            <img id="mapImg" :src="bgMap" title="A Google Earth map shows a representation of a tow vessel at the noted waypoint location along the river.">
        </div>
        <div id="shadow2">
            <img id="vesselImg" :src="vesselImg" title="Image of the vessel {{vesselName}}">
        </div>
        <div id="shadow3" v-if="supImg">
            <img id="supImg" :src="supimg" :title="supalt">
        </div>
        <div id="shadow4">
            <h1 id="overlay1">{{text}}</h1>            
        </div>
           <router-link v-if="vesselID != ''" id="history" :to="{ name: 'Detail',  params: { id: vesselID}}">History</router-link>
    </div>
  </div>  
  <!--
  <script src="<?php echo getEnv('BASE_URL');?>js/waypoint.js"></script>
  <script defer async
src="https://maps.googleapis.com/maps/api/js?key=<?php echo getEnv('MDM_CRT_MAP_KEY');?>&callback=initMap">
</script>
<script type="text/javascript">
  var vesselPos  = JSON.parse(' $position ');
  var vesselName = "$vesselName ";
</script>
--> 
<h2 v-if="!this.apubID" style="color: red; position: absolute; top:175px;">ERROR: ID not found.</h2>

</template>

<script>
import format from 'date-fns/format'
import { firestore } from '@/store/firebaseApp.js'
import { doc, getDocs, collection, query, where } from 'firebase/firestore'

const db = firestore

export default {
    data() {
        return {
            text: "",
            event: "",
            direction: "",
            vesselName: "",
            vesselID: "",
            pubDate: "",
            vesselImg: "",
            bgMap: "",
            supimg: "",
            supalt: "",
            mapOn: false,
            base: process.env.VUE_APP_IMG_URL,
            bgImg: { backgroundImage: "url("+ process.env.VUE_APP_IMG_URL+"images/bg-pattern-blue.png)"}            
        }
    },
    props: [ 'apubID'],
    mounted() {
        document.body.style.backgroundImage = process.env.VUE_APP_IMG_URL+'images/bg-pattern-blue.png'
        this.getData()
        this.$store.commit('setSlate', 'WAYPOINT')
        this.$store.commit('setPageSelected', 'Waypoint')
    },
    methods: {
        async getData() {
            let id = parseInt(this.apubID)
            const q = query(collection(db, 'Alertpublish'), where('apubID', '==', id))
            let cnt = 0
            const apubSnapshot = await getDocs(q)
            apubSnapshot.forEach( (ret) => {
                if(cnt>0) { return }
                let data = ret.data()
                this.text = data['apubText']
                this.vesselID = data['apubVesselID']
                this.direction = data['apubDir']
                this.event    =  data['apubEvent']
                this.pubDate  = format(new Date(parseInt(data['apubTS'])*1000), "iii MMM d, yyyy")
                this.vesselImg = data['apubVesselImageUrl']
                this.vesselName = data['apubVesselName']
                cnt++
            })
            //Fail gracefully if apubID not found
            if(cnt==0) {
                this.event = "Not Found"
                this.bgMap = this.base + "images/charlie-up-map.png";

            } else {
                //Determine background map by event and direction data
                let dir = this.direction.includes('wn') ? "down" : "up"
                //Strip waypoint basename as event name
                this.event = this.event.substr(0, this.event.length-2)
                let str = this.event + "-" + dir + "-map.png"
                this.bgMap = this.base +"images/"+str
            }

            //Determine dam or bridge image by event
            switch(this.event) {
                case 'alpha': {
                    this.supimg = this.base+"images/lock13.jpg"; 
                    this.supalt = "Image of Lock and Dam 13.";
                    this.mapOn  = false;  
                    break;  
                }
                case 'bravo':   {
                    this.supimg = this.base+"images/lock13.jpg"; 
                    this.supalt = "Image of Lock and Dam 13.";
                    this.mapOn  = false;  
                    break;
                }			
                case 'charlie': {
                    this.supimg = this.base+"images/drawbridge.jpg";
                    this.supalt = "Image of the railroad drawbridge.";
                    this.mapOn  = false;  
                    break;
                }
                case 'delta':  {
                    this.supimg = this.base+"images/drawbridge.jpg";
                    this.supalt = "Image of the railroad drawbridge.";
                    this.mapOn  = false;  
                    break;
                } 
                case 'detected': {
                    this.supimg = this.base+"images/compass.png"
                    this.supalt = "Decorative drawing of a compass."
                    this.mapOn  = true; 
                    //$data['position']  = stringToMapPosition($row['apubText']);
                    //$data['text'] = convertUrlToLink($data['text']); 
                    break;
                }
                case 'Not Found': {
                    this.supimg = false
                    this.supalt = "Decorative drawing of a compass."
                    this.mapOn = false
                    this.vesselImg = process.env.VUE_APP_NOIMG_URL
                    this.text = "Alert event "+this.apubID+" was not found. The data may have expired."
                    this.vesselName = "Not Found"
                }
            }
        }
    }
}
    /*
		$str    = "D, j M Y G:i:s \C\D\T"; 
		$offset = getTimeOffset();
		$time   = time();
    */ 

</script>

<style>



#shadow1 {
    position: absolute;
    top: 1rem;
    left: 50px;
    width: auto;
    height: 900px;
    overflow: clip;
    background-color: black;
    z-index: -3;
}

#mapImg {
    position: relative;
    width: auto;
    height: 100%;
    top: -20px;
    left: -20px;
    z-index: -2;
}

#map {
    position: absolute;
    width: 1000px;
    height: 800px;
    top: 30rem;
    left: 30rem;
    z-index: -3;
}

#shadow2 {
    position: absolute;
    top: 170px;
    left: 70%;
    width: 30%;
    height: auto;
    background-color: black;
    z-index: -3;  
}

#vesselImg {
    position: relative;
    width: 100%;
    height: auto;
    top: -20px;
    left: -20px;
    z-index: -2;
}


#shadow3 {
    position: absolute;
    top: 55%;
    left: 70%;
    width: 30%;
    height: auto;
    background-color: black;
    z-index: -3;  
}

#supImg {
    position: relative;
    width: 100%;
    height: auto;
    background-color: white;
    top: -20px;
    left: -20px;
    z-index: -2;
}

#shadow4 {
    position: absolute;
    top: 85%;
    left: 8%;
    width: 75%;
    height: auto;
    background-color: black;
    z-index: -3;
    transform: translate(550px, -150px);  
}

#overlay1 {
    position: relative;
    background-color: skyblue;
    width: 100%;
    height: 100%;    
    padding: 25px;
    top: -20px;
    left: -20px;
    z-index: -2;
}

#history {
    background-color: greenyellow;
    border: 4px solid black;
    text-align: center;
    border-radius: 10%; 
    padding: 10px;

    font-weight: bold;
    position: fixed;
    bottom: 30px;
    right: 15px;

}

/* Phone */
@media (max-width: 800px) {
    #map {
        width: 260px;
        height: 700px;
        top: 9rem;
        left: 0px;
    }
    #shadow1 {
        left:-60%;
    }
    #shadow3 {
        top: 40%;
        left: 70%;
        width: 30%;
        height: auto;  
    }
    
    #vesselImg {
        max-width:80%;
        
    }

    #shadow4 {
        top: 75%;
        left: 10px;
        width: 55%;
        height: 8rem;
        transform: translate(15px, 35px);  
    }
    
    #overlay1 {
        font-size: 1rem;
    }
}

 /* Tablet */
 @media (min-width: 801px) {
    #map {
        width: 350px;
        height: 900px;
        top: 11rem;
        left: 5%;
    }
    
    #shadow1 {
        left: -10%;
    }
    
    #shadow2 {
        top: 18rem
    }

    #shadow3 {
        top: 40%;
        left: 70%;
        width: 30%;
        height: auto;  
    }  
    #shadow4 {
        top: 80%;
        left: 10px;
        width: 55%;
        transform: translate(15px, 35px);   
    }  
    #overlay1 {
        font-size: 1rem;
    }


 }

 /* Desktop*/
 @media (min-width: 1920px) {
    #map {
        width: 475px;
        height: 1000px;
        top: 12rem;
        left: 5%;
    }
    
    #shadow1 {
        left: 0px;
    }
    #shadow3 {
        top: 50%;
        left: 70%;
        width: 30%;
        height: auto;  
    }
    #shadow4 {
        top: 80%;
        left: 5%;
        width: 50%; 
        transform: translate(550px, -140px); 
    }  
    #overlay1 {
        font-size: 1rem;
    }
 }

 
 /* Wide Screen*/
 @media (min-width: 2800px){
    #map {
        width: 1000px;
        height: 800px;
        top: 12rem;
        left: 30px;
    }
 
    #shadow1 {    
        left: 10px;   
    }
  
    #shadow3 {
        top: 55%;
        left: 70%;
        width: 20%;
        height: auto;  
    }  
    #shadow4 {
        top: 85%;
        left: 5%;
        width: 60%; 
    }  
    #overlay1 {
        font-size: 1.5rem;
    }
 }

 /* Even Wider */
 @media(min-width: 1500px) {
    #map {
        width: 1400px;
        height: 1000px;
        top: 12rem;
        left: 30px;
    }
 
 }
</style>