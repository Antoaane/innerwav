<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        orderId: {
            type: String,
            required: true
        }
    });

    const order = ref([]);

    async function getOrderInfos() {
        try {
            await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
            const response = await axios.get(`${apiUrl}/api/order/${props.orderId}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json'
                    }
                }
            );
            console.log(response);
            order.value.push(response.data.name);
            order.value.push(response.data.project_type);
            order.value.push(response.data.file_type);
            order.value.push(response.data.support);
            order.value.push(response.data.price);
            console.log(order);
        } catch (error) {
            console.log(error);
        }
    }


    // ------------------------ PAYPAL CHECKOUT ------------------------
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '0.1'
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

        <div class="bg"></div>

        <div class="container">
            <div class="checkout-section">
                <div id="paypal-checkout"></div>
            </div>
        </div>
    </div>
</template>