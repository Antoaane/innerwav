<script setup>
    import { ref } from 'vue';

    const name = ref('');
    const artistName = ref('');
    const email = ref('');
    const message = ref('');

</script>

<template>
    <form action="">

        <div :class="{ 'filled' : name !== ''}">
            <input id="name" name="name" type="text" autocomplete="none" v-model="name">
            <label for="name">Votre nom :</label>
        </div>

        <div :class="{ 'filled' : artistName !== ''}">
            <input id="artist-name" name="artist-name" type="text" v-model="artistName">
            <label for="artist-name">Votre nom de scène :</label>
        </div>

        <div :class="{ 'filled' : email !== ''}">
            <input id="email" name="email" type="email" v-model="email">
            <label for="email">Votre email :</label>
        </div>

        <div :class="{ 'filled' : message !== ''}">
            <textarea id="message" name="message" v-model="message"></textarea>
            <label for="message">Votre message :</label>
        </div>

        <div>
            <input type="submit" value="Envoyer">
        </div>

    </form>
</template>