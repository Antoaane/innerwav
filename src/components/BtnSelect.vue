<script>
    let id = 0;
</script>

<script setup>
    import { onMounted, ref } from 'vue';
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

    const uniqueElementId = ref(id++);
    const optionList = ref(null);

    onMounted(() => {
        optionList.value = document.getElementById('select-' + uniqueElementId.value);
    });

    function select(option) {
        selected.value = option;
        emit('selection', selected.value);
        optionList.value.classList.remove('active');
    }

    function toggleDropDown() {
        optionList.value.classList.toggle('active');
    }

    function disableDropDown() {
        optionList.value.classList.remove('active');
    }

</script>

<template>
    <div class="btn-select" :style="{ width: props.width }" v-click-outside="disableDropDown">
        <button @click="toggleDropDown">
            {{ selected }}
            <ArrowSvg />
        </button>
        <div :id="'select-' + uniqueElementId" class="option-list">
            <button v-for="option in props.options" :key="option" @click="select(option)">
                {{ option }}
            </button>
        </div>
    </div>
</template>