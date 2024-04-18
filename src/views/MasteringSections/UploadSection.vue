<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FileInput from '../../components/FileInput.vue';
    import TextInput from '../../components/TextInput.vue';
    import TrackForm from '../../components/TrackForm.vue';

    const props = defineProps({
        orderId: {
            type: String,
            required: true
        }
    });
    const order = ref([{
        project_type : '',
        file_type : '',
        support : ''
    }]);

    const apiUrl = import.meta.env.VITE_API_URL;

    const coverImage = ref([]);
    const albumName = ref('');
    const globalReference = ref('');

    const tracks = ref([0]);

    const trackFormComponents = ref([]);


    // ------------------------ GET ORDER INFOS ------------------------
    // defineExpose({ getOrderInfos })
    // async function getOrderInfos() {
    //     try {
    //         await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
    //         const response = await axios.get(`${apiUrl}/api/order/${props.orderId}`,
    //             {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //                     'Accept': 'application/json'
    //                 }
    //             }
    //         );
    //         console.log(response);
    //         order.value.project_type = response.data.order.project_type;
    //         order.value.file_type = response.data.order.file_type;
    //         order.value.support = response.data.order.support;
    //         console.log(order);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // ------------------------ SET ORDER INFOS ------------------------
    async function update(field, type) {
        loadingState.value = true;

        const data = {
            "fieldsToUpdate": [field],
            [field] : type
        };

        try {
            await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
            const response = await axios.patch(`${apiUrl}/api/order/update/${props.orderId}`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            console.log(response);
            emit('answered');
        } catch (error) {
            console.log(error);
        } finally {
            loadingState.value = false;
        }
    }

    // ------------------------ GET ALBUM INFOS ------------------------
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


    // ---------------------- HANDLE TRACK NUMBER ----------------------
    function addTrack(n = 0) {
        if (!tracks.value.includes(tracks.value.length + 1 + n)) {
            tracks.value.push(tracks.value.length + 1 + n);
            console.log(tracks.value);
        } else {
            addTrack(n + 1);
        }
    }

    function deleteTrack(item) {
        if (tracks.value.length > 1) {
            tracks.value = tracks.value.filter(track => track !== item);
        }
    }

    // -------------------------- PUSH TRACKS --------------------------
    function setTrackRef(el) {
        if (el && !trackFormComponents.value.includes(el)) {
            trackFormComponents.value.push(el)
        }
    }

    async function pushTracks() {
        for (const trackFormComponent of trackFormComponents.value) {
            await trackFormComponent.sendData()
            console.log('pushed');
        }
    }

</script>

<template>
    <div class="checkout">

        <div class="bg"></div>

        <div class="container">
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
                    <TransitionGroup name="track" tag="div" class="tracks-container">
                        <div v-for="track in tracks" :key="track" class="track-item">
                            <TrackForm 
                                :orderId="props.orderId"
                                :ref="setTrackRef"
                            />
                            <button
                                class="remove-track"
                                @click="deleteTrack(track)"
                            >
                                -
                            </button>
                        </div>
                    </TransitionGroup>
                </div>

                <button @click="addTrack()">+</button>
                <br><br>
                <button @click="pushTracks">Push</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s;
    }

    .v-enter-from,
    .v-leave-to {
        max-height: 0;
    }

    .v-enter-to,
    .v-leave-from {
        max-height: 400px;
    }

    .track-enter-active, .track-leave-active {
        transition: opacity 0.5s;
    }
    .track-enter, .track-leave-to /* .track-fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
</style>
