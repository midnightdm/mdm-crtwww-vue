<template>
  <div id="main" class="detail">
    <h1>This is the Detail page for {{ $route.params.vesselName }}</h1>
  </div>
</template>

<script>
export default {
    props: ["vesselName", "vesselID"],
        
}

</script>
