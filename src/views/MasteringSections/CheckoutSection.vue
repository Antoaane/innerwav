<script setup>
    import FileInput from '../../components/FileInput.vue';
    import TextInput from '../../components/TextInput.vue';

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
                            :button="false"
                        />
                    </div>
                    <div class="infos">
                        <TextInput
                            :label="'Nom de l\'album :'"
                            :type="'text'"
                        />
                        <TextInput
                            :label="' Référence musicale globale :'"
                            :type="'textarea'"
                            :max="true"
                        />
                    </div>
                </div>
            </div>
            <div class="tracks">

            </div>
        </div>

        <div class="checkout-section">
            <div id="paypal-checkout"></div>
        </div>

    </div>
</template>