<script setup>
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// const name = ref('');
// const artistName = ref('');
const email = ref('');
const password = ref('');
// const passwordConfirm = ref('');

async function sendData() {
    // console.log(email);
    // console.log(password);

    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    await axios.post(`${apiUrl}/api/login`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    })
    .catch(error => {
        console.log(error);
        alert('Identifiants incorrects');
    })
    .then(response => {
        // console.log(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        window.history.back();
    })
}
</script>

<template>
    <div id="login">

        <div class="bg"></div>

        <div class="container">

            <h1>Connexion</h1>

            <div>
                <div class="input-container">
                    <input id="email" name="email" type="email" v-model="email">
                    <label for="email" :class="{'filled': email !== ''}">E-mail</label>
                </div>

                <div class="input-container">
                    <input id="password" name="password" type="password" v-model="password">
                    <label for="password" :class="{'filled': password !== ''}">Mot de passe</label>
                </div>

                <div class="submit">
                    <button @click="sendData">Se connecter</button><RouterLink to="/register">Je n'ai pas de compte</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>