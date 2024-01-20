<script setup>
import Player from '../components/Player.vue';

const works = [
  {
    id: 0,
    beforeAudio : 'src/assets/res/realisations/larme-de-sel/before.wav',
    afterAudio : 'src/assets/res/realisations/larme-de-sel/after.wav',
    coverImage : 'src/assets/res/realisations/larme-de-sel/cover.jpg'
  },
  {
    id: 1,
    beforeAudio : 'src/assets/res/realisations/parle-pas-de-lfaire/before.wav',
    afterAudio : 'src/assets/res/realisations/parle-pas-de-lfaire/after.wav',
    coverImage : 'src/assets/res/realisations/parle-pas-de-lfaire/cover.jpg'
  },
  {
    id: 2,
    beforeAudio : 'src/assets/res/realisations/vraiment-a-part/before.wav',
    afterAudio : 'src/assets/res/realisations/vraiment-a-part/after.wav',
    coverImage : 'src/assets/res/realisations/vraiment-a-part/cover.jpg'
  },
  {
    id: 3,
    beforeAudio : 'src/assets/res/realisations/pedra/before.wav',
    afterAudio : 'src/assets/res/realisations/pedra/after.wav',
    coverImage : 'src/assets/res/realisations/pedra/cover.jpg'
  },
  {
    id: 4,
    beforeAudio : 'src/assets/res/realisations/moi-et-moi/before.wav',
    afterAudio : 'src/assets/res/realisations/moi-et-moi/after.wav',
    coverImage : 'src/assets/res/realisations/moi-et-moi/cover.jpg'
  }
]

</script>

<template>
  <main>
    <div id="home-section" class="container">
      <p class="main-title wave">
        Innerwav
      </p>
      <h1 class="subtitle">
        Mastering audio professionnel
      </h1>
    </div>

    <div id="works-section" class="container !my-40">
      <div class="splide flex">
        <Player 
          v-for="work in works"
          :key="work.id"
          :beforeAudio="work.beforeAudio"
          :afterAudio="work.afterAudio"
          :coverImage="work.coverImage"
        />
      </div>
    </div>
  </main>
</template>