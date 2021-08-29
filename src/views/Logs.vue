<template>
  <div id="main" class="logs">
      <h1>List of Vessels Logged</h1>
    <p>The transponder-equipped vessels below passed Clinton most recently on the date shown. Select a vessel to view all its passages.</p>
    <suspense>
    <template #default>
      <ul class="vessels-list" v-for="vessel in this.$store.state.passagesList" :key="vessel.id">
        <li>
        <router-link :to="{ name: 'Detail', params: { id: vessel.id }}"><h4>{{ vessel.name}}</h4>
          <div class="shipBox">
            <img class="img-fluid img-thumbnail" :src="vessel.image" :alt="'Shows an image of vessel '+ vessel.name"   width="200">
            <div class="shipBoxData">
                <span>{{vessel.date}}</span>
            </div>
          </div></router-link>
        </li>    
      </ul>  
    </template>
    <template #fallback>
      <h4>Please wait while all the vessels load.</h4>
      <p>This could take several seconds...</p>
    </template>
    </suspense>
  </div>
</template>
