<template>
<main>
  <div class="title4 mb2">    
    <h2>Administrator Login Required</h2>
    <form @submit.prevent="handleSubmit">

        <w-input
        class="mb2"
        label="Email"
        name="email"
        type="email"
        placeholder="email"
        label-position="left"
        outline
        inner-icon-left="mdi mdi-account">
        </w-input>

        <w-input 
        class="mb2"
        placeholder="password"
        label="Password"
        name="password"
        label-position="left"
        :type="isPassword ? 'password' : 'text'"
        :inner-icon-left="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
        :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
        @click:inner-icon-right="isPassword = !isPassword">
        </w-input>
        <button type="submit">Login</button>
    </form>
</div>
</main>
</template>

<script>

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
import store from '@/store/index.js'

export default {
    setup() {
        const auth = getAuth()
        const router = useRouter()

        const handleSubmit = async e => {
            const { email, password } = e.target.elements
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value)
                .then((adminCredentials) => {
                    store.commit('saveAdminCredentials', adminCredentials)
                    console.log('adminUser: ', adminCredentials)
                    router.push('/admin/all')
                })
                .catch((error) => {
                    alert(error.message)
                })
            } catch(e) {
                alert(e.message)
            }
        }
        return { handleSubmit }
    },
    data: function() {
        return {
            isPassword: true
        }
    }
}
</script>

<style>
fieldset {
    width: 5em;
    padding: 1em;
}
</style>