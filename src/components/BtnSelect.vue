<script setup>
    import { ref } from 'vue';
    import ArrowSvg from './svgs/ArrowSvg.vue';

    const props = defineProps({
        width : {
            type: String,
            required: false,
            default: '12rem'
        },
        options : {
            type: Array,
            required: true
        },
        defaultOption : {
            type: String,
            required: false,
        }
    });

    const selected = ref(props.defaultOption ? props.defaultOption : props.options[0]);
    const emit = defineEmits(['selection']);
    const optionList = ref(null);

    function select(option) {
        selected.value = option;
        emit('selection', selected.value);
        optionList.value.classList.remove('active');
    }

    function dropDown() {
        optionList.value.classList.toggle('active');
    }

</script>

<template>
    <div class="btn-select" :style="{ width: props.width }">
        <button @click="dropDown()">
            {{ selected }}
            <ArrowSvg />
        </button>
        <div ref="optionList" class="option-list">
            <button v-for="option in props.options" :key="option" @click="select(option)">
                {{ option }}
            </button>
        </div>
    </div>
</template>