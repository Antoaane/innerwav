<script setup>
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const name = ref('');
const artistName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const passwordConfirm = ref('');

async function sendData() {
    
    if (password.value !== passwordConfirm.value) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('artist_name', artistName.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('password', password.value);
    formData.append('confirm_password', passwordConfirm.value);

    await axios.post(`${apiUrl}/api/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    })
    .catch(error => {
        console.log(error);
    })
    .then(response => {
        console.log(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        window.history.back();
    })
}
</script>

<template>
    <div id="login">

        <div class="bg"></div>

        <div class="container">

            <h1>Inscription</h1>

            <div>

                <div class="double-input-container">
                    <div class="input-container">
                        <input id="name" name="name" type="text" autocomplete="none" v-model="name">
                        <label for="name" :class="{'filled': name !== ''}">Nom/Prénom :</label>
                    </div>
                    
                    <div class="input-container">
                        <input id="artist-name" name="artist-name" type="text" v-model="artistName">
                        <label for="artist-name" :class="{'filled': artistName !== ''}">Nom de scène :</label>
                    </div>
                </div>

                <div class="input-container">
                    <input id="phone" name="phone" type="phone" v-model="phone">
                    <label for="phone" :class="{'filled': phone !== ''}">Numéro de téléphone</label>
                </div>

                <div class="input-container">
                    <input id="email" name="email" type="email" v-model="email">
                    <label for="email" :class="{'filled': email !== ''}">E-mail</label>
                </div>

                <div class="input-container">
                    <input id="password" name="password" type="password" v-model="password">
                    <label for="password" :class="{'filled': password !== ''}">Mot de passe</label>
                </div>

                <div class="input-container">
                    <input id="password-confirm" name="password-confirm" type="password" v-model="passwordConfirm">
                    <label for="password-confirm"  :class="{'filled': passwordConfirm !== ''}">Confirmer le mot de passe :</label>
                </div>

                <button @click="sendData">Créer mon compte</button>

            </div>
        </div>
    </div>
</template>