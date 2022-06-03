<template>
  
  <main id="AlertsRss">
    <section>
      <h1>RSS Feeds</h1>
      <p>The links below are for use by an RSS reader.  The information in this alternate format duplicates the human readable waypoint passage information as displayed on the All and Passenger pages linked on the menu above.</p>
      <ol>
        <li class="f1"><a href="https://storage.googleapis.com/www.clintonrivertraffic.com/any.rss">Clinton River Traffic-ALL VESSELS</a></li>
        <li class="f1"><a href="https://storage.googleapis.com/www.clintonrivertraffic.com/passenger.rss">Clinton River Traffic-PASSENGER VESSELS</a></li>
      </ol>
    </section>
  </main>
</template>

<script>
import AlertsSubMenu from '@/components/AlertsSubMenu.vue'

export default {
  created: function () {
    this.$store.dispatch("fetchAllAlerts")
  },
  mounted() {
    this.$store.commit('setSlate', 'ALERTS')
    this.$store.commit('setAlertsLinkActive', true)
    this.$store.commit('setPageSelected', 'AlertsRss')
  },
  unmounted() {
    this.$store.commit('setAlertsLinkActive', false)
    this.$store.commit('setPageSelected', null)
  },

  components: {
    AlertsSubMenu
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400');


#AlertsRss section {
  padding-top: 220px;
}


p {
  margin: 1rem;
  padding: 1rem;
  text-align: justify;
}

ol {
  margin-left: 5%;
  text-align: left; 
}

li.f1 {
  margin-left: 3rem;
}
@media (max-width: 750px) {
  #AlertsRss section {
    padding-top: var(--menu-pad-mobile);
  }
  .mobile {
    padding-bottom: 5px;
    visibility: visible;
  }

  li:first-child.card {
    margin-top: 5px;
  }
}

li.card {
    list-style: none;
    color: black;
    font-family: 'Fira Sans';
    background-color: aquamarine;
    margin: 5px;
    border-radius: 30px;
    border: 5px solid red;
    margin: 25px;
    cursor: grab;
    
}

li.card h4 {
   
   padding: 0px 5px 0px 25px;

}

li.card p {
  font-family: Arial;
  padding: 0px 5px 25px 25px;
}

li.time {
  display: block;
  padding-left: 25px;
}

</style>