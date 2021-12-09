<template>
  <AdminSubMenu></AdminSubMenu>
  <main class="AddVess"> 
    <ul class="event-list" v-for="event in this.$store.state.b.subscribedEventsList" :key="event.name">
        <li><span class="label">{{event.name}}</span> :&nbsp;&nbsp; <span class="value">{{event.count}}</span></li>
    </ul>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'

export default {
    created: function () {
        this.$store.dispatch("fetchAllSubscribedEvents")
        this.$store.commit('setPageSelected', 'Subscriptions')
    },
    data: function() {
        return {
            //
        }
        
    },
    methods: {
    },
    components: {
        AdminSubMenu
    }
}
</script>

<style>
ul.event-list li {
  display: flex;
  flex-wrap: wrap;
  float: left;
  justify-content: space-betweeen;
  list-style: none;
  margin: 10px;
  padding: 10px;
  width: 125px;
  background-color: rgb(26, 99, 26);
  color: white; 
}  
  
.label {
  font-weight: bolder;
  float: left;
  
}  

.value {
  float:right;
}
</style>