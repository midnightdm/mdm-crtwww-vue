<template>
  <main class="text-center">
    <h1>MANAGE NOTIFICATIONS</h1>
    <p>On this browser push notifications are <span id="status" class="badge rounded-pill bg-warning text-dark">was php $status</span></p>
    <p><button class="pushtoglbtn" disabled>Enable Push</button>
    <button class="sendpushbtn">Send Notification</button></p>
  <script defer src="../js/manage.js"></script>
  <div style="margin: auto; width: 35em; align: center; background-color: #dccce0; padding: 1em; border-spacing: 5px;">
    <h3>Subscribed Events</h3>

    <ol id="actualOL" class="list-group list-group-numbered">
    </ol>

    <p id="actualNone" class="badge rounded-pill bg-warning text-dark">None</p>
    
  </div>
  <div style="margin: auto; width: 35em; align: center; background-color: #cce0e0; padding: 1em">
    <h3>Available Events</h3>  
    <select name="sub-list-avail" id="sub-list-avail" class="form-select" size="5" data-bind="foreach: $root.subListAvail">
      <option data-bind="text: title, value: key"></option>
    </select> <br>   
    <br> 
    <!-- Button to trigger modal --> 
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#availModal">View Details</button>
    <br/>
    <!--
    <div>Selection <span data-bind="text: $root.subListSelection().title"></span></div>
    -->
  </div>
  <div style="margin: auto; width: 35em; align: center; background-color: #cce0e0; padding: 1em">
  Consider where along the river you like to watch riverboats. Choose one marker a few miles above your spot for downriver notices. Pick another below your spot for upriver notices. Passenger vessel events will trigger much less often than the "Any" vessel events which occur many times daily.
  
  </div>
</main>

</template>

<script>
export default {

}
</script>

<style>

</style>