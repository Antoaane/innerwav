<script setup>
    import { ref } from 'vue';
    import FileInput from '../../components/FileInput.vue';
    import TextInput from '../../components/TextInput.vue';
    import TrackForm from '../../components/TrackForm.vue';

    const coverImage = ref([]);
    const albumName = ref('');
    const globalReference = ref('');

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

    function upload() {
        console.log(coverImage.value);
        console.log(albumName.value);
        console.log(globalReference.value);
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
                <TrackForm />
            </div>
        </div>

        <div class="checkout-section">
            <div id="paypal-checkout"></div>
        </div>

    </div>
</template>