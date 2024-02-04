<script setup>

</script>

<template>
    <div id="contact">
        <div class="bg"></div>
        <div class="container">
            <form action="">
                <label for="name">Votre nom :</label>
                <input id="name" name="name" placeholder="Nassim Mouloud" type="text">
                <label for="artist-name">Votre nom de scène :</label>
                <input id="artist-name" name="artist-name" placeholder="Nassim 3x filtré" type="text">
                <label for="email">Votre email :</label>
                <input id="email" name="email" placeholder="nassim@filtrage-quali.bif" type="email">
                <label for="message">Votre message :</label>
                <textarea id="message" name="message" placeholder="Dites-nous tout !"></textarea>
                <input type="submit" value="Envoyer">
            </form>
        </div>
    </div>
</template>