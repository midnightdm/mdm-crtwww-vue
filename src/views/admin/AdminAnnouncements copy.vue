<template>
  <AdminSubMenu class="adminsub"></AdminSubMenu>
  <main class="local">
    <div id="AddVess" class="AddVess">
        <h1>Edit Announcements</h1>
        <p>This page allows you to add or remove announcements that apppear at the bottom of the dashboard.</p>
          <ul class="instruct">
            <li>10 Slots are available for each website.</li>
            <li>Disable unused slots by setting expire date.</li>
            <li> "Day Limit" slots will run on the selected day only if enabled.</li>
            <li>Use <code>&lt;em&gt;&lt;/em&gt;</code> tags in text to enable <span class="high">highlight</span></li>
          </ul>
            
        <form ref="form" @submit.prevent="updateAnnc">
        <fieldset v-if="anncQC">
            <legend>QC Field 01</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f01.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f01.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f01.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f01.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f01.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f01.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f01.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f01.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

        <fieldset v-if="anncQC">
            <legend>QC Field 02</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f02.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f02.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f02.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f02.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f02.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f02.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f02.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f02.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 03</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f03.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f03.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f03.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f03.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f03.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f03.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f03.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f03.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 04</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f04.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f04.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f04.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f04.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f04.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f04.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f04.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f04.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 05</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f05.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f05.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f05.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f05.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f05.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f05.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f05.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f05.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 06</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f06.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f06.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f06.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f06.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f06.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f06.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f06.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f06.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 07</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f07.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f07.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f07.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f07.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f07.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f07.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f07.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f07.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 08</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f08.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f08.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f08.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f08.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f08.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f08.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f08.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f08.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 09</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f09.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f09.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f09.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f09.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f09.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f09.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f09.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f09.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>

                  <fieldset v-if="anncQC">
            <legend>QC Field 10</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="anncQC.f10.text" v-on:change="changeDetectedQC"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="anncQC.f10.hasOnlyDay" v-on:change="changeDetectedQC">
             <span v-if="anncQC.f10.hasOnlyDay" v-bind:class="{'watchOn': anncQC.f10.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="anncQC.f10.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="anncQC.f10.onlyDay" v-on:change="changeDetectedQC">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="anncQC.f10.startTS" v-on:change="changeDetectedQC"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="anncQC.f10.endTS" v-on:change="changeDetectedQC"><br>
          </fieldset>






        <fieldset v-if="annc">
            <legend>QC Field 01</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f01.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f01.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f01.hasOnlyDay" v-bind:class="{'watchOn': annc.f01.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f01.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f01.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f01.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f01.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

        <fieldset v-if="annc">
            <legend>QC Field 02</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f02.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f02.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f02.hasOnlyDay" v-bind:class="{'watchOn': annc.f02.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f02.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f02.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f02.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f02.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 03</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f03.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f03.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f03.hasOnlyDay" v-bind:class="{'watchOn': annc.f03.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f03.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f03.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f03.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f03.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 04</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f04.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f04.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f04.hasOnlyDay" v-bind:class="{'watchOn': annc.f04.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f04.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f04.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f04.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f04.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 05</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f05.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f05.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f05.hasOnlyDay" v-bind:class="{'watchOn': annc.f05.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f05.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f05.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f05.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f05.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 06</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f06.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f06.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f06.hasOnlyDay" v-bind:class="{'watchOn': annc.f06.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f06.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f06.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f06.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f06.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 07</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f07.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f07.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f07.hasOnlyDay" v-bind:class="{'watchOn': annc.f07.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f07.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f07.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f07.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f07.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 08</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f08.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f08.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f08.hasOnlyDay" v-bind:class="{'watchOn': annc.f08.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f08.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f08.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f08.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f08.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 09</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f09.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f09.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f09.hasOnlyDay" v-bind:class="{'watchOn': annc.f09.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f09.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f09.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f09.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f09.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>

                  <fieldset v-if="annc">
            <legend>QC Field 10</legend>
            <input type="text" name="formText" size="100" maxlength="100" placeholder="Text up to 100 Characters" v-model="annc.f10.text" v-on:change="changeDetectedClinton"><br>

            <label for="formHasOnlyDay">Announcement Has Day Limit?</label>&nbsp;
            <input type="checkbox" name="formHasOnlyDay" v-model="annc.f10.hasOnlyDay" v-on:change="changeDetectedClinton">
             <span v-if="annc.f10.hasOnlyDay" v-bind:class="{'watchOn': annc.f10.hasOnlyDay}">True</span>
                         <span v-else>False</span>
            <br>
            <div v-if="annc.f10.hasOnlyDay">
            <label for="formOnlyDay">Choose Day</label>
            <select name="formOnlyDay" v-model="annc.f10.onlyDay" v-on:change="changeDetectedClinton">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday" default>Saturday</option>
            </select>  
            <br>
            </div>
            <label for="formStartTS">Start Date:</label>
            <input type="date" name="formStartTS" v-model="annc.f10.startTS" v-on:change="changeDetectedClinton"><br>
            <label for="formEndTS">End Date:</label>
            <input type="date" name="formEndTS" v-model="annc.f10.endTS" v-on:change="changeDetectedClinton"><br>
          </fieldset>


            
            <button v-if="changedQC" v-on:click="saveQCData()"
              type="submit"
              class="example_b" 
            >Save QC Changes</button>

            <button v-if="changedClinton" v-on:click="saveClintonData()"
              type="submit"
              class="example_b" 
            >Save Clinton Changes</button>
        
        </form>
        <br>
       
          
          
        
    </div>
  </main>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRouter } from 'vue-router'
import { firestore } from '@/store/firebaseApp.js'
import { doc, setDoc } from 'firebase/firestore'

const db = firestore

export default {
    created() {
      this.$store.dispatch("fetchAdminAnnc")
    },
    mounted() { 
      this.$store.commit('setSlate', 'ADMIN')
      this.$store.commit('setPageSelected', 'EditAnnc')
    },
    data: function() {
      return {
        router: useRouter(),
        errorMsg: null,
        admin: null,
        changedClinton: false,
        changedQC: false,
        objTemplate: {
          endTS: 1663045987,
          hasOnlyDay: false,
          startTS: 1660367593,
          text: ""
        } 
      }
    },
    computed: {
      anncQC() {
        return this.$store.state.b.adminAnncQC
      },
      annc() {
        return this.$store.state.b.adminAnnc
      }
    },
    methods: {
      changeDetectedClinton() {
        this.changedClinton = true
      },
      changeDetectedQC() {
        this.changedQC = true
      },
      saveClintonData() {
        //Clone annc obj... 
        let  anncClone = Object.assign({}, this.annc)
        const anncRef = doc(db, 'Announcements', 'dashboard')
        setDoc(anncRef, anncClone, {merge: true})
        this.changedClinton = false
      },
      saveQCData() {
        //Clone annc obj... 
        let  anncQCClone = Object.assign({}, this.anncQC)
        const anncQCRef = doc(db, 'AnnouncementsQC', 'dashboard')
        setDoc(anncQCRef, anncQCClone, {merge: true})
        this.changedQC = false
      } 

    },

    components: {
        AdminSubMenu
    }
}
</script>

<style>
p {
    text-align: justify;
    padding: 0 5rem;
    margin: auto;
}
th {
  padding: 5px;
  background-color: rgb(228, 231, 231);
}

ul.instruct {
  list-style-type: square;
  margin-left: 20%;
  margin-right: auto;
}

ul.instruct > li {
  text-align: left;
}

fieldset {
    width: 250px;
    margin: 10px auto;
    padding: .2rem .5rem;
    line-height: 1.5rem

}
input {
  border-top-style:solid;
  padding: .2rem;
  margin: .2rem;
  line-height: 1rem;
}

span.high {
  background-color: black;
  color: orange;
  padding: .2rem;
}

input:focus {
  background-color: yellow;
}

h4.inTable {
  display: inline;
}

.example_b {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #7c7777;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
}

.example_b:hover {
  background: #434343;
  cursor:grab;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
  box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
  transition: all 0.4s ease 0s;
}

.wider {
  width: 10em;
}
.col_r{
  text-align: right;
  padding-right: 3px;
}

.col_c{
  text-align: center;
  
}

.col_l {
  text-align: left;
}

table {
  width: auto;
}

th, td {
  width: auto;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: rgb(207, 218, 218);
}

tr:nth-child(odd) {
  background-color: rgb(166, 212, 212);
}

tr.isNew {
  background-color:rgb(167, 109, 109);
}

.cent_cont {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.watchOn {
  background-color: forestgreen;
  color:ghostwhite;
  padding: 1px;
  text-align: center;
}

  
h4 {
    margin: 2rem 0rem 1rem;
}
  
.table-image td, .table-image th {    
  vertical-align: middle;
}
  
main.local {
  top: -50px;
  transform: translateY(-50px);
}

/*
#asub {
  background-color: #31363e;
  transform: translateY(140px);
}
*/

@media (max-width: 750px) {
  /*
  #asub {
    transform: translateY(94px);
  }
  */ 
  main#AdminVessels {
    padding-top: var(--menu-pad-mobile);
  }
}

</style>