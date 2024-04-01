<script setup>
import { ref, defineComponent } from 'vue';
import CheckoutSection from './MasteringSections/CheckoutSection.vue'
import QuestionsComponent from './MasteringSections/QuestionsComponent.vue';

const scrollLevel = ref(0);

function scrollNext() {
    scrollLevel.value = scrollLevel.value + window.innerWidth;

    document.getElementById('track').scrollTo({
        left: scrollLevel.value,
        behavior: 'smooth'
    });
}
function scrollPrev() {
    if (scrollLevel.value > 0) {
        scrollLevel.value = scrollLevel.value - window.innerWidth;
    }

    document.getElementById('track').scrollTo({
        left: scrollLevel.value,
        behavior: 'smooth'
    });
}

</script>

<template>
    <div id="masteriser">

        <h1 class="absolute -z-10 opacity-0">Masteriser</h1>

        <div class="bg"></div>

        <div id="track">
            <div id="train">
                <QuestionsComponent 
                    @answered="scrollNext"
                />
                <div class="tab">
                    <div class="container">
                        <CheckoutSection />
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
            <button @click="scrollPrev" class="p-2 rounded-full shadow-lg">Prev</button>
            <button @click="scrollNext" class="p-2 rounded-full shadow-lg">Next</button>
        </div>
    </div>
</template>
