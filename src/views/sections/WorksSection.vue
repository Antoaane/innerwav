<script setup>
import { onMounted } from 'vue';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import Player from '@/components/Player.vue';

import Wave2Svg from '@/components/svgs/Wave2Svg.vue';

const works = [
  {
    id: 0,
    beforeAudio : 'src/assets/res/realisations/larme-de-sel/before.mp3',
    afterAudio : 'src/assets/res/realisations/larme-de-sel/after.mp3',
    coverImage : 'src/assets/res/realisations/larme-de-sel/cover.jpg'
  },
  {
    id: 1,
    beforeAudio : 'src/assets/res/realisations/parle-pas-de-lfaire/before.mp3',
    afterAudio : 'src/assets/res/realisations/parle-pas-de-lfaire/after.mp3',
    coverImage : 'src/assets/res/realisations/parle-pas-de-lfaire/cover.jpg'
  },
  {
    id: 2,
    beforeAudio : 'src/assets/res/realisations/vraiment-a-part/before.mp3',
    afterAudio : 'src/assets/res/realisations/vraiment-a-part/after.mp3',
    coverImage : 'src/assets/res/realisations/vraiment-a-part/cover.jpg'
  },
  {
    id: 3,
    beforeAudio : 'src/assets/res/realisations/pedra/before.mp3',
    afterAudio : 'src/assets/res/realisations/pedra/after.mp3',
    coverImage : 'src/assets/res/realisations/pedra/cover.jpg'
  },
  {
    id: 4,
    beforeAudio : 'src/assets/res/realisations/moi-et-moi/before.mp3',
    afterAudio : 'src/assets/res/realisations/moi-et-moi/after.mp3',
    coverImage : 'src/assets/res/realisations/moi-et-moi/cover.jpg'
  }
]

onMounted(() => {
  new Splide( '.realisations', {
    type   : 'slide',
    perPage: 4,
    perMove: 1,
    padding: {
      right: '1rem',
      left : '1rem',
    },
    gap: '2rem',
    autoplay: true,
    interval : 3000,
    pagination: true,
    arrows: true,
    breakpoints: {
      // 640: {
      //   perPage: 1,
      //   perMove: 1,
      //   gap: '1rem',
      // },
      // 768: {
      //   perPage: 2,
      //   perMove: 1,
      //   gap: '1rem',
      // },
      // 1024: {
      //   perPage: 3,
      //   perMove: 1,
      //   gap: '1rem',
      // },
      // 1280: {
      //   perPage: 4,
      //   perMove: 1,
      //   gap: '1rem',
      // },
      // 1536: {
      //   perPage: 5,
      //   perMove: 1,
      //   gap: '1rem',
      // },
    }
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
            <li class="splide__slide" :key="work.id" v-for="work in works">
              <Player
                :beforeAudio="work.beforeAudio"
                :afterAudio="work.afterAudio"
                :coverImage="work.coverImage"
              />
            </li>
          </ul>
        </div>
      </div>

      <Wave2Svg />

    </div>

  </div>
</template>