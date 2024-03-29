<script setup>
import { ref } from 'vue';

const name = ref('');
const artistName = ref('');
const email = ref('');
const password = ref('');
</script>

<template>
    <form action="">

        <div>
            <input id="name" name="name" type="text" autocomplete="none" v-model="name">
            <label for="name">Nom/Prénom :</label>
        </div>

        <div>
            <input id="artist-name" name="artist-name" type="text" v-model="artistName">
            <label for="artist-name">Nom de scène :</label>
        </div>

        <div>
            <input id="email" name="email" type="email" v-model="email">
            <label for="email">E-mail :</label>
        </div>

        <div>
            <textarea id="password" name="password" v-model="password"></textarea>
            <label for="password">Mot de passe :</label>
        </div>

        <div>
            <input type="submit" value="Envoyer">
        </div>

    </form>
</template>