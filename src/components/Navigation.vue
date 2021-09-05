<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name: 'Logs'}">Logs</router-link>
            </div>
            <div class="nav-links">
                <ul>
                    <li><a class="nav-link" :href="urlAbout">ABOUT</a></li>
                    <li><a class="nav-link" :href="urlAlerts">ALERTS</a></li>
                    <li><a class="nav-link" :href="urlLive">LIVE</a></li>
                    <li><router-link to="{name: 'Logs'}" class="nav-link selected" >LOGS</router-link></li>
                    <li><a class="nav-link" :href="urlManage">MANAGE</a></li>
                    <li><a class="nav-link" :href="urlVideo">VIDEO</a></li>
                </ul>
            </div>
        </nav>
        <menuIcon/>
        <transition name="mobile-nav">
            <ul>
                <li><a class="nav-link" :href="urlAbout">ABOUT</a></li>
                <li><a class="nav-link" :href="urlAlerts">ALERTS</a></li>
                <li><a class="nav-link" :href="urlLive">LIVE</a></li>
                <li><router-link to="{name: 'Logs'}" class="nav-link selected" >LOGS</router-link></li>
                <li><a class="nav-link" :href="urlManage">MANAGE</a></li>
                <li><a class="nav-link" :href="urlVideo">VIDEO</a></li>
            </ul>
        </transition>
    </header>    
</template>

<script>
import menuIcon from '../assets/icons/bars-regular.svg'
export default {
    name: 'navigation',
    components: {
        menuIcon
    }
}
</script>

<style lang="scss" scoped>

</style>