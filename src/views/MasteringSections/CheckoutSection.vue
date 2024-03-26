<script setup>
    import { ref } from 'vue';
    import FileInput from '../../components/FileInput.vue';
    import TextInput from '../../components/TextInput.vue';
    import TrackForm from '../../components/TrackForm.vue';

    const coverImage = ref([]);
    const albumName = ref('');
    const globalReference = ref('');

    const tracks = ref([1]);

    const price = '0.1';

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-checkout');

    function getCoverImage(e) {
        for (let i = 0; i < e.length; i++) {
            coverImage.value.push(e[i]);
        }
    }

    function getAlbumName(e) {
        albumName.value = e;
    }

    function getGlobalReference(e) {
        globalReference.value = e;
    }

    function addTrack(n = 0) {
        if (!tracks.value.includes(tracks.value.length + 1 + n)) {
            tracks.value.push(tracks.value.length + 1 + n);
            console.log(tracks.value);
        } else {
            addTrack(n + 1);
        }
    }

    function deleteTrack(i) {
        if (tracks.value.length > 1) {
            tracks.value = tracks.value.filter(track => track !== i);
        }
    }
</script>

<template>
    <div class="checkout">

        <div class="upload-section">
            <div class="general-infos">

                <div>
                    <div class="cover">
                        <FileInput 
                            :placeholder="'Ajouter une image'" 
                            :accept="'image/*'"
                            :multiple="true"
                            :button="false"
                            @updateFiles="getCoverImage"
                        />
                    </div>

                    <div class="infos">
                        <TextInput
                            :label="'Nom de l\'album :'"
                            :type="'text'"
                            @updateText="getAlbumName"
                        />
                        <TextInput
                            :label="' Référence musicale globale :'"
                            :type="'textarea'"
                            :max="true"
                            @updateText="getGlobalReference"
                        />
                    </div>
                </div>

            </div>

            <div class="tracks">
                <div v-for="i in tracks" :key="i">
                    <TrackForm />
                    <button
                        class="remove-track"
                        @click="deleteTrack(i)"
                    >
                        -
                    </button>
                </div>
            </div>

            <button @click="addTrack()">+</button>
        </div>

        <div class="checkout-section">
            <div id="paypal-checkout"></div>
        </div>

    </div>
</template>