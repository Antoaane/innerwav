<script setup>
import { ref, onMounted } from 'vue';
const baseUrl = import.meta.env.VITE_BASE_URL;

import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import Player from '@/components/Player.vue';

import Wave2Svg from '@/components/svgs/Wave2Svg.vue';

const works = ref([
  {
    id: 0,
    beforeAudio : '/assets/realisations/larme-de-sel/before.mp3',
    afterAudio : '/assets/realisations/larme-de-sel/after.mp3',
    coverImage : '/assets/realisations/larme-de-sel/cover.jpg',
  },
  {
    id: 1,
    beforeAudio : '/assets/realisations/parle-pas-de-lfaire/before.mp3',
    afterAudio : '/assets/realisations/parle-pas-de-lfaire/after.mp3',
    coverImage : '/assets/realisations/parle-pas-de-lfaire/cover.jpg',
  },
  {
    id: 2,
    beforeAudio : '/assets/realisations/pedra/before.mp3',
    afterAudio : '/assets/realisations/pedra/after.mp3',
    coverImage : '/assets/realisations/pedra/cover.jpg',
  },
  {
    id: 3,
    beforeAudio : '/assets/realisations/moi-et-moi/before.mp3',
    afterAudio : '/assets/realisations/moi-et-moi/after.mp3',
    coverImage : '/assets/realisations/moi-et-moi/cover.jpg',
  }
]);

const activePlayerId = ref(null);

function setActivePlayer(id) {
    activePlayerId.value = id;
}

onMounted(() => {
  new Splide( '.realisations', {
    type   : 'slide',
    perPage: 4,
    perMove: 1,
    padding: {
      right: '1rem',
      left : '1rem',
    },
    breakpoints : {
      560: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
    },
    gap: '2rem',
    pagination: true,
    arrows: true,
    arrowPath: 'M1.73704 40L13.9258 20L1.73704 0L0.000324558 1.06291L11.5466 20L0.000324558 38.9371L1.73704 40Z',
  } ).mount();
})
</script>

<template>
    <div id="works-section">

        <div class="bg"></div>

        <div class="container">

            <h2>
                Quelques exemples
            </h2>
            <p class="subtitle">
                Un avant goût de ce que le <strong>fait-main</strong> pourrait apporter à vos titres
            </p>

            <div class="splide realisations w-full flex">
                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide" v-for="work in works" :key="work.id">
                            <Player 
                                :id="work.id" 
                                :beforeAudio="work.beforeAudio" 
                                :afterAudio="work.afterAudio" 
                                :coverImage="work.coverImage"
                                @click="setActivePlayer(work.id)"
                                :activePlayer="activePlayerId"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <Wave2Svg />

        </div>

    </div>
</template>
