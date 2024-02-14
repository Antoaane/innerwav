<script setup>

</script>

<template>
    <div id="contact">

        <div class="bg"></div>

        <div class="container">
            <form action="">

                <div>
                    <label for="name">Votre nom :</label>
                    <input id="name" name="name" type="text">
                </div>
                
                <div>
                    <label for="artist-name">Votre nom de scène :</label>
                    <input id="artist-name" name="artist-name" type="text">
                </div>
                
                <div>
                    <label for="email">Votre email :</label>
                    <input id="email" name="email" type="email">
                </div>
                
                <div>
                    <label for="message">Votre message :</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                
                <div>
                    <input type="submit" value="Envoyer">
                </div>
                
            </form>
        </div>

    </div>
</template>