<script setup>
import CheckoutSection from './MasteringSections/CheckoutSection.vue'
import QuestionComponent from './MasteringSections/QuestionComponent.vue';

</script>

<template>
    <div id="masteriser">

        <div class="bg"></div>

        <div class="track">
            <div class="container tab">
                <QuestionComponent />
            </div>
            <div class="container tab">
                <CheckoutSection />
            </div>
        </div>
    </div>
</template>
