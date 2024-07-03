<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { loadingState } from '../states/loadingState';
    import LoadingOverlay from '../components/LoadingOverlay.vue';
    import FileInput from '../components/FileInput.vue';
    import TextInput from '../components/TextInput.vue';
    import TrackForm from '../components/TrackForm.vue';
    import BtnSelect from '../components/BtnSelect.vue';
    const apiUrl = import.meta.env.VITE_API_URL;

    const order = ref([]);
    order.value.id = 'no id yet';
    order.value.project_name = 'Project test name';
    order.value.project_type = 'single';
    order.value.support = 'str';

    console.log(order.value.id);

    const formData = ref(new FormData());
    formData.value.append('project_type', order.value.project_type);
    formData.value.append('support', order.value.support);

    const minimumTracks = ref(1);
    const tracks = ref([0]);

    const trackFormComponents = ref([]);




    // ------------------------ GET POJECT INFOS ------------------------

    function addToFormData(name, e) {
        if (formData.value.has(name)) {
            formData.value.delete(name);
        }
        formData.value.append(name, e);
        order.value[name] = e;

        // formData consol.log
        for (let pair of formData.value.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        if (name === 'project_type') {
            setMinimumTracks(order.value.project_type)
        }
    }



    // ------------------------ PUSH ORDER INFOS ------------------------

    async function pushOrderInfos() {
        loadingState.value = true;

        // formData consol.log
        for (let pair of formData.value.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
            const response = await axios.post(`${apiUrl}/api/order/start`,
                formData.value,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            console.log(response);
            order.value.id = response.data.order.order_id;
        } catch (error) {
            console.log(error);
        } finally {
            loadingState.value = false;
        }
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
        if (tracks.value.length > minimumTracks.value) {
            tracks.value = tracks.value.filter(track => track !== item);
        }
    }

    function setMinimumTracks(projectType) {
        const trackNumber = tracks.value.length;
        const minimumTracksTab = {
            'single': 1,
            'ep': 2,
            'album': 5
        };

        minimumTracks.value = minimumTracksTab[projectType];

        if (trackNumber < minimumTracksTab[projectType]) {
            for (let i = trackNumber; i < minimumTracksTab[projectType]; i++) {
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

        await pushOrderInfos();

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
                            @selection="addToFormData('project_type', $event)"
                        />
                    </div>
                    <div>
                        <p>Je publie mon projet en </p>
                        <BtnSelect 
                            :width="'16rem'"
                            :options="[
                                { optionName: 'Streaming', optionValue: 'str' },
                                { optionName: 'Streaming & CD', optionValue: 'strcd' }
                            ]"
                            @selection="addToFormData('support', $event)"
                        />
                    </div>
                </div>

            <Transition name="general-infos">
                <div v-if="order.project_type === 'ep' || order.project_type === 'album'" class="general-infos">
                    <div>
                    <Transition name="cover">
                        <div v-if="order.support === 'strcd'" class="cover">
                            <FileInput 
                                :placeholder="order.project_type === 'ep' ? 'Ajouter la cover de l\'EP' : 'Ajouter la cover de l\'album'" 
                                :accept="'image/*'"
                                :multiple="true"
                                :button="false"
                                @update-files="addToFormData('cover_img', $event)"
                            />
                        </div>
                    </Transition>

                        <div class="infos">
                            <TextInput
                                :label="order.project_type === 'ep' ? 'Nom de l\'EP' : 'Nom de l\'album :'"
                                :type="'text'"
                                @update-text="addToFormData('project_name', $event)"
                            />

                            <TextInput
                                :label="' Référence musicale globale :'"
                                :type="'textarea'"
                                :max="true"
                                @update-text="addToFormData('global_ref', $event)"
                            />
                        </div>
                    </div>
                </div>
            </Transition>

                <ul class="tracks">
                <TransitionGroup name="tracklist">
                    <li v-for="track in tracks" :key="track">
                        <TrackForm 
                            :orderId="order.id"
                            :projectType="order.project_type"
                            :support="order.support"
                            :ref="setTrackRef"
                            @trigger-delete="deleteTrack(track)"
                            @trigger-project-name="addToFormData('project_name', $event)"
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
                <button @click="pushTracks()">Push</button>
            </div>
        </div>
        <LoadingOverlay />
    </div>
</template>

<style scoped>
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



    .cover-enter-active,
    .cover-leave-active {
        transition: all 0.5s;
    }
    .cover-enter-from,
    .cover-leave-to {
        max-width: 0;
        margin-right: 0 !important;
        opacity: 0;
    }
    .cover-enter-to,
    .cover-leave-from {
        max-width: 15rem;
        margin-right: 0.75rem;
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
</style>