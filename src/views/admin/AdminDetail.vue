<template>
  <AdminSubMenu></AdminSubMenu>
  <main>  
  <div class="AdminDetail">
      {{vessel.vesselName}}
  </div>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'

export default {
    props: ['vesselID'],
    beforeUpdate() {
      this.$store.commit('setSlate', 'Admin')
    },
    data: function() {
        return {
            vessel: this.$store.getters.getVesselDetail(this.vesselID)
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

</style>