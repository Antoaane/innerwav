<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FileInput from '../components/FileInput.vue';
    import TextInput from '../components/TextInput.vue';
    import TrackForm from '../components/TrackForm.vue';
    import BtnSelect from '../components/BtnSelect.vue';
    const apiUrl = import.meta.env.VITE_API_URL;

    const props = defineProps({
        orderId: {
            type: String,
            required: true
        }
    });

    const order = ref([]);
    order.value.project_type = 'single';
    order.value.support = 'str';
    console.log(order.value);

    const coverImage = ref([]);
    const albumName = ref('');
    const globalReference = ref('');

    const tracks = ref([0]);

    const trackFormComponents = ref([]);


    // ------------------------ PUSH ORDER INFOS ------------------------

    async function pushOrderInfos() {
        loadingState.value = true;

        const data = {
            "fieldsToUpdate": ["project_type", "support"],
            "project_type": order.value.project_type,
            "support": order.value.support,
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
        } catch (error) {
            console.log(error);
        } finally {
            loadingState.value = false;
        }
    }



    // ------------------------ GET POJECT INFOS ------------------------

    function getProjectType(e) {
        order.value.project_type = e;
        setMinimumTracks(order.value.project_type)
        console.log(order.value.project_type);
    }

    function getSupport(e) {
        order.value.support = e;
    }

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

    function setMinimumTracks(projectType) {
        const trackNumber = tracks.value.length;
        const setMinimumTracks = {
            'single': 1,
            'ep': 2,
            'album': 5
        };

        if (trackNumber < setMinimumTracks[projectType]) {
            for (let i = trackNumber; i < setMinimumTracks[projectType]; i++) {
                addTrack(i);
            }
        } else if (projectType === 'single' && trackNumber > 1) {
            tracks.value.splice(0, trackNumber - 1);
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
    <div id="masteriser">

        <div class="bg"></div>

        <div class="container">

            <h1>Ajoutez vos pistes</h1>

            <div>

                <div class="order-options">
                    <div>
                        <p>Je fait masteriser un </p>
                        <BtnSelect 
                            :width="'9rem'"
                            :options="[
                                { optionName: 'Single', optionValue: 'single' },
                                { optionName: 'EP', optionValue: 'ep' },
                                { optionName: 'Album', optionValue: 'album' }
                            ]"
                            @selection="getProjectType($event)"
                        />
                    </div>
                    <div>
                        <p>Je publie mon projet en </p>
                        <BtnSelect 
                            :width="'13rem'"
                            :options="[
                                { optionName: 'Streaming', optionValue: 'str' },
                                { optionName: 'Streaming & CD', optionValue: 'strcd' }
                            ]"
                            @selection="getSupport($event)"
                        />
                    </div>
                </div>
                
            <Transition name="general-infos">
                <div v-if="order.project_type === 'ep' || order.project_type === 'album'" class="general-infos">
                    <div>
                        <div v-if="order.support === 'strcd'" class="cover">
                            <FileInput 
                                :placeholder="order.project_type === 'ep' ? 'Ajouter la cover de l\'EP' : 'Ajouter la cover de l\'album'" 
                                :accept="'image/*'"
                                :multiple="true"
                                :button="false"
                                @update-files="getCoverImage($event)"
                            />
                        </div>

                        <div class="infos">
                            <TextInput
                                :label="order.project_type === 'ep' ? 'Nom de l\'EP' : 'Nom de l\'album :'"
                                :type="'text'"
                                @update-text="getAlbumName($event)"
                            />

                            <TextInput
                                :label="' Référence musicale globale :'"
                                :type="'textarea'"
                                :max="true"
                                @update-text="getGlobalReference($event)"
                            />
                        </div>
                    </div>
                </div>
            </Transition>

                <ul class="tracks">
                    <TransitionGroup name="tracklist">
                        <li v-for="track in tracks" :key="track">
                            <TrackForm 
                                :orderId="order.value"
                                :projectType="order.project_type"
                                :support="order.support"
                                :ref="setTrackRef"
                                @trigger-delete="deleteTrack(track)"
                            />
                        </li>
                    </TransitionGroup>
                </ul>

            <Transition name="btn">
                <div v-if="order.project_type != 'single'" class="add-track-button">
                    <button @click="addTrack()">+</button>
                </div>
            </Transition>
                
                <br><br>
                <button @click="setMinimumTracks('album')">Push</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn-move,
    .btn-enter-active,
    .btn-leave-active {
        transition: all 0.25s;
    }

    .btn-enter-from,
    .btn-leave-to {
        opacity: 0;
    }

    .btn-enter-to,
    .btn-leave-from {
        opacity: 1;
    }


    .tracklist-move,
    .tracklist-enter-active,
    .tracklist-leave-active {
        transition: all 0.25s;
    }

    .tracklist-enter-from,
    .tracklist-leave-to {
        margin-top: 0 !important;
        max-height: 0;
        opacity: 0;
    }

    .tracklist-enter-to,
    .tracklist-leave-from {
        margin-top: 0.75rem !important;
        max-height: 200px;
        opacity: 1;
    }


    .general-infos-move,
    .general-infos-enter-active,
    .general-infos-leave-active {
        transition: all 0.5s;
    }

    .general-infos-enter-from,
    .general-infos-leave-to {
        max-height: 0;
        opacity: 0;
    }

    .general-infos-enter-to,
    .general-infos-leave-from {
        max-height: 15rem;
        opacity: 1;
    }
</style>