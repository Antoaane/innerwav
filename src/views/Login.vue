<script setup>
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// const name = ref('');
// const artistName = ref('');
const email = ref('');
const password = ref('');
// const passwordConfirm = ref('');

function sendData() {
    console.log(email);
    console.log(password);

    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    axios.post(`${apiUrl}/api/login`, formData, {
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

                <!-- <div class="double-input-container">
                    <div class="input-container">
                        <input id="artist-name" name="artist-name" type="text" v-model="artistName">
                        <label for="artist-name">Nom de scène :</label>
                    </div>

                    <div class="input-container">
                        <input id="name" name="name" type="text" autocomplete="none" v-model="name">
                        <label for="name">Nom/Prénom :</label>
                    </div>
                </div> -->

                <div class="input-container">
                    <input id="email" name="email" type="email" v-model="email">
                    <label for="email" :class="{'filled': email !== ''}">E-mail</label>
                </div>

                <div class="input-container">
                    <input id="password" name="password" type="password" v-model="password">
                    <label for="password" :class="{'filled': password !== ''}">Mot de passe</label>
                </div>

                <!-- <div class="input-container">
                    <input id="password-confirm" name="password-confirm" type="password">
                    <label for="password-confirm">Confirmer le mot de passe :</label>
                </div> -->

                <button @click="sendData">Se connecter</button>

            </div>
        </div>
    </div>
</template>