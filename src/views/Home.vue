<script setup>
import { onMounted } from 'vue';

const triggerPlayerTop = () => {
  const playerSwitch = document.getElementById('player-switch');

  if (!playerSwitch.classList.contains('top-active')) {
    playerSwitch.classList.remove('bottom-active');
    playerSwitch.classList.add('top-active');
  }
}

const triggerPlayerBottom = () => {
  const playerSwitch = document.getElementById('player-switch');

  if (!playerSwitch.classList.contains('bottom-active')) {
    playerSwitch.classList.remove('top-active');
    playerSwitch.classList.add('bottom-active');
  }
}

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
      <div class="splide">
        <div class="work-container">
          <div class="player-position">
            <div class="player-container">
              <div id="player-switch">

              </div>
              <button class="btn-switch" @click=triggerPlayerTop() id="play-top">before</button>
              <button class="btn-switch" @click=triggerPlayerBottom() id="play-bottom">after</button>
            </div>
            
          </div>
          <div class="cover-container">
            <img class="cover-img" src="../assets/res/realisations/covers/image 1.png" alt="">
            <img class="play-btn" src="../assets/res/pictos/play.svg" alt="play">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>