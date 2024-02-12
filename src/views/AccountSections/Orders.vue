<script setup>
    import OrderItem from '@/components/OrderItem.vue';
    import { ref } from 'vue';

    const orders = ref([
        {
            id: 1,
            date: '12/03/2024',
            name: 'Eyes Wide Open',
            price: 442,
            status: 3,
            versions: [
                {
                    id: 1,
                    price: 0,
                    date: '15/03/2024',
                    link: '',
                    feedback : "Les basses sont profondes et riches, mais je pense que les aigus pourraient être un peu plus clairs pour vraiment faire briller le mix.",
                    edited : "",
                    status: 0,
                },
                {
                    id: 2,
                    price: 0,
                    date: '20/03/2024',
                    link: '',
                    feedback : "Peut-être trouver un entre-deux pour les basses, elles sont un peu trop présentes à mon goût.",
                    edited : "Comme demandé, j'ai retravaillé les aigus pour les rendre plus clairs. J'ai légèrement augmenté les basses pour équilibrer le tout. J'espère que cela vous conviendra",
                    status: 0,
                },
                {
                    id: 3,
                    price: 0,
                    date: '25/03/2024',
                    link: '',
                    feedback : "",
                    edited : "J'ai pris en compte votre remarque et j'ai retravaillé les basses pour les rendre légèrement moins présentes. J'espère que cela vous conviendra.",
                    status: 3,
                }
            ]
        },
        {
            id: 2,
            date: '10/06/2024',
            name: 'Skin',
            price: 816,
            status: 3,
            versions: [
                {
                    id: 1,
                    price: 0,
                    date: '30/01/2025',
                    link: '',
                    feedback : "C'est nickel !",
                    edited : "",
                    status: 3,
                }
            ]
        },
        {
            id: 3,
            date: '26/01/2025',
            name: 'Arrived Anxious, Left Bored',
            price: 510,
            status: 1,
            versions: [
                {
                    id: 1,
                    price: 0,
                    date: '15/06/2024',
                    link: '',
                    feedback : "J'aimerai que les basses soient plus présentes, elles sont un peu trop en retrait par rapport au reste du mix.",
                    edited : "",
                    status: 0,
                },
                {
                    id: 2,
                    price: 0,
                    date: '20/06/2024',
                    link: '',
                    feedback : "",
                    edited : "",
                    status: 1,
                },
            ]
        },
        {
            id: 3,
            date: '04/02/2025',
            name: 'Led by Ancient Light',
            price: 663,
            status: 2,
            versions: [
                {
                    id: 1,
                    price: 0,
                    date: '15/06/2024',
                    link: '',
                    feedback : "Je préfère généralement les basses plus présentes, mais je pense que le mix est bon tel quel.",
                    edited : "",
                    status: 0,
                },
                {
                    id: 2,
                    price: 0,
                    date: '20/06/2024',
                    link: '',
                    feedback : "",
                    edited : "J'ai retravaillé les basses pour les rendre légèrement plus présentes. J'espère que ça vous convient mieux.",
                    status: 2,
                },
            ]
        },
    ]);
</script>

<template>
    <div class="orders-container">
        <OrderItem 
            v-for="order in orders" 
            :key="order.id" 
            :order="order"
        />
    </div>
</template>
