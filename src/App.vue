<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { loadingState } from './states/loadingState';
import { errorState, errorMessage } from './states/errorState';
import LoadingOverlay from './components/LoadingOverlay.vue';
import ErrorOverlay from './components/ErrorOverlay.vue';
import BtnBad from './components/BtnBad.vue';

import ArrowSvg from './components/svgs/ArrowSvg.vue';
import ProfileSvg from './components/svgs/ProfileSvg.vue';
const baseUrl = import.meta.env.VITE_BASE_URL;

const logged = ref();

if (localStorage.getItem('token')) {
  console.log('token');
  logged.value = true;
} else {
  console.log('no token');
  logged.value = false;
}

function disconnect() {
  localStorage.removeItem('token');
  window.location.href = '/';
}


function triggerMenu() {
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  const bun = document.getElementById('bun');
  const cheese = document.getElementById('cheese');
  const steak = document.getElementById('steak');

  if (menu.classList.contains('active-menu')) {
    menu.classList.remove('active-menu');
    setTimeout(() => {
      menu.classList.remove('flex');
      menu.classList.add('hidden');
    }, 300);
    burger.classList.remove('active-burger');

    bun.style.animation = 'unactiveBun 0.5s ease forwards';
    cheese.style.animation = 'unactiveCheese 0.5s ease forwards';
    steak.style.animation = 'unactiveSteak 0.5s ease forwards';

    setTimeout(() => {
      bun.style.animation = 'pulseBun 1.5s ease infinite';
      cheese.style.animation = 'pulseCheese 1.5s ease infinite';
      steak.style.animation = 'pulseSteak 1.5s ease infinite';
    }, 500);
  } else {
    menu.classList.add('flex');
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.classList.add('active-menu');
    }, 1);
    
    burger.classList.add('active-burger');
    bun.style.animation = 'activeBun 0.5s ease forwards';
    cheese.style.animation = 'activeCheese 0.5s ease forwards';
    steak.style.animation = 'activeSteak 0.5s ease forwards';
  }
}

function hoverItemTopEffect() {
  const hoverItem = document.getElementById('hover-item-top');
  const menu = document.getElementById('nav-list-top')

  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (hoverItem.style.width == '0px' || hoverItem.style.width == 0) {
        hoverItem.style.transition = 'none';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        setTimeout(() => {
          hoverItem.style.transition = 'all 150ms ease-in-out';
          hoverItem.style.width = `${rect.width - 20}px`;
          hoverItem.style.opacity = 1;
        }, 0)
      } else {
        hoverItem.style.transition = 'all 150ms ease-in-out';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        hoverItem.style.width = `${rect.width - 20}px`;
        hoverItem.style.opacity = 1;
      }
    });
  });

  menu.addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item-top');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });

  window.addEventListener('scroll', () => {
    const hoverItem = document.getElementById('hover-item-top');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });
}

function hoverItemFixedEffect() {
  const hoverItem = document.getElementById('hover-item-fixed');
  const menu = document.getElementById('nav-list-fixed')

  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (hoverItem.style.width == '0px' || hoverItem.style.width == 0) {
        hoverItem.style.transition = 'none';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        setTimeout(() => {
          hoverItem.style.transition = 'all 150ms ease-in-out';
          hoverItem.style.width = `${rect.width - 20}px`;
          hoverItem.style.opacity = 1;
        }, 0)
      } else {
        hoverItem.style.transition = 'all 150ms ease-in-out';
        hoverItem.style.left = `${rect.left - item.parentNode.getBoundingClientRect().left + 10}px`;
        hoverItem.style.width = `${rect.width - 20}px`;
        hoverItem.style.opacity = 1;
      }
    });
  });

  menu.addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item-fixed');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });

  window.addEventListener('scroll', () => {
    const hoverItem = document.getElementById('hover-item-fixed');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
  });
}

function fixedTrigger() {
  const fNav = document.getElementById('fixed-nav');
  const scrollToTop = document.getElementById('scroll-to-top');

  if (window.scrollY > 250 && fNav.classList.contains('hide-fixed-nav')) {
    fNav.classList.remove('hide-fixed-nav');
    fNav.classList.add('show-fixed-nav');
    scrollToTop.style.opacity = '1';
    console.log('fixed');
  } 
  
  if (window.scrollY <= 250 && fNav.classList.contains('show-fixed-nav')) {
    fNav.classList.remove('show-fixed-nav');
    fNav.classList.add('hide-fixed-nav');
    scrollToTop.style.opacity = '0';
    console.log('unfixed');
  }
}

onMounted(() => {
  hoverItemTopEffect();
  hoverItemFixedEffect();
})


window.addEventListener('scroll', () => {
  fixedTrigger();
})

function scrollToTop() {
  window.scrollTo(0, 0);
}

const isFooterActive = ref(false);

function goToAccountByRedirect() {
  window.location.href = '/account';
}

</script>

<template>
  <header class="container">

    <nav id="nav" class="main-nav">
      <ul id="nav-list-top" class="desktop hidden lg:flex">

        <span id="hover-item-top"></span>

        <li class="main-nav-item">
          <RouterLink class="nav-text" to="/">Accueil</RouterLink>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="baseUrl + '/#works-section'">Réalisations</a>
        </li>
        <!-- <li class="main-nav-item">
          <a class="nav-text" :href="baseUrl + '/#pricing-section'">Tarifs</a>
        </li> -->
        <li class="main-nav-item">
          <RouterLink class="nav-text" to="/contact">Contact</RouterLink>
        </li>
        <li class="main-nav-item bright">
          <RouterLink class="nav-text" to="/masteriser">Masteriser</RouterLink>
          <!-- <span id="bright"></span> -->
        </li>
        <li class="main-nav-item profile">
          <span v-if="logged" @click="goToAccountByRedirect()">
            <a class="main-nav-item">
              <ProfileSvg />
            </a>
          </span>
          <span v-else>
            <a class="main-nav-item">
              <ProfileSvg />
            </a>
          </span>
          
          <div :class="{'account-submenu' : true, '!hidden' : !logged}">
            <RouterLink to="/account">Mon compte</RouterLink>
            <a @click="disconnect()">Déconnexion</a>
          </div>
          <div :class="{'account-submenu' : true, '!hidden' : logged}">
            <RouterLink to="/register">Inscription</RouterLink>
            <RouterLink to="/login">Connexion</RouterLink>
          </div>
        </li>

      </ul>
      
      <ul id="burger" @click=triggerMenu() class="flex lg:hidden">
        <span id="bun"></span>
        <span id="cheese"></span>
        <span id="steak"></span>
      </ul>

      <ul id="menu" class="mobile hidden lg:hidden">
        <li class="main-nav-item">
          <RouterLink @click=triggerMenu() class="nav-text" to="/">Accueil</RouterLink>
        </li>
        <li class="main-nav-item">
          <a @click=triggerMenu() class="nav-text" :href="baseUrl + '/#works-section'">Réalisations</a>
        </li>
        <!-- <li class="main-nav-item">
          <a @click=triggerMenu() class="nav-text" :href="baseUrl + '/#pricing-section'">Tarifs</a>
        </li> -->
        <li class="main-nav-item">
          <RouterLink @click=triggerMenu() class="nav-text" to="/contact">Contact</RouterLink>
        </li>
        <li class="main-nav-item bright">
          <RouterLink @click=triggerMenu() class="nav-text" to="/masteriser">Masteriser</RouterLink>
        </li>
        <li class="main-nav-item" :class="{'!hidden' : !logged}">
          <RouterLink @click=triggerMenu() class="nav-text" to="/account">Mon compte</RouterLink>
        </li>
        <li class="main-nav-item" :class="{'!hidden' : !logged}">
          <p @click="disconnect(); triggerMenu()" class="nav-text">Se déconnecter</p>
        </li>
        <li class="main-nav-item" :class="{'!hidden' : logged}">
          <RouterLink @click=triggerMenu() class="nav-text" to="/login">Se connecter</RouterLink>
        </li>
        <li class="main-nav-item" :class="{'!hidden' : logged}">
          <RouterLink @click=triggerMenu() class="nav-text" to="/register">Créer un compte</RouterLink>
        </li>
      </ul>
    </nav>

    <button @click="scrollToTop()" id="scroll-to-top" class="logo">
      <ArrowSvg />
    </button>

    <nav id="fixed-nav" class="main-nav-fixed hide-fixed-nav">
      <ul id="nav-list-fixed" class="desktop hidden lg:flex">

        <svg class="fixed-nav-corner left hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>
        <svg class="fixed-nav-corner right hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
          <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
        </svg>

        <span id="hover-item-fixed"></span>

        <li class="main-nav-item">
          <RouterLink class="nav-text" to="/">Accueil</RouterLink>
        </li>
        <li class="main-nav-item">
          <a class="nav-text" :href="baseUrl + '/#works-section'">Réalisations</a>
        </li>
        <!-- <li class="main-nav-item">
          <a class="nav-text" :href="baseUrl + '/#pricing-section'">Tarifs</a>
        </li> -->
        <li class="main-nav-item">
          <RouterLink class="nav-text" to="/contact">Contact</RouterLink>
        </li>
        <li class="main-nav-item bright">
          <RouterLink class="nav-text" to="/masteriser">Masteriser</RouterLink>
          <!-- <span id="bright"></span> -->
        </li>
        <li class="main-nav-item profile">

          <span v-if="logged" @click="goToAccountByRedirect()">
            <a class="main-nav-item">
              <ProfileSvg />
            </a>
          </span>
          <span v-else>
            <a class="main-nav-item block">
              <ProfileSvg />
            </a>
          </span>

          <div :class="{'account-submenu' : true, '!hidden' : !logged}">
            <div>
              <RouterLink to="/account">Mon compte</RouterLink>
              <a @click="disconnect()">Déconnexion</a>
            </div>
          </div>

          <div :class="{'account-submenu' : true, '!hidden' : logged}">
            <div>
              <RouterLink to="/register">Inscription</RouterLink>
              <RouterLink to="/login">Connexion</RouterLink>
            </div>
          </div>

        </li>

      </ul>
    </nav>

  </header>

  <main>
    <RouterView />
  </main>
  
  <footer :class="{'active' : isFooterActive === true, 'inactive' : isFooterActive === false}">

    <!-- <div class="bg"></div> -->

    <div class="white-bg">

    <TransitionGroup name="footer">
      <div v-if="isFooterActive" class="container">
        <BtnBad 
          @click="isFooterActive == false ? isFooterActive = true : isFooterActive = false" 
        />
        <div>
          <p class="title">Nous contacter :</p>
          <p class="info">Par mail : <strong><a href="mailto:contact@innerwav.fr">contact@innerwav.fr</a></strong></p>
          <p class="info">Par téléphone : <strong><a href="telto:0688742600">+33 6 88 74 26 00</a></strong></p>
        </div>
      </div>
      <div v-else class="inactive" @click="isFooterActive == false ? isFooterActive = true : isFooterActive = false">
        <ArrowSvg />
        <p class="info">
          Plus d'infos
        </p>
      </div>
    </TransitionGroup>

    </div>
  </footer>

  <LoadingOverlay :isLoading="loadingState" />
  <ErrorOverlay :isError="errorState" :errorMessage=errorMessage />
</template>

<style scoped>

  .footer-move,
  .footer-enter-active,
  .footer-leave-active {
    transition: all .3s ease-in-out;
  }
  .footer-enter-from,
  .footer-leave-to {
    max-height: 0;
    max-width: 0;
    padding: 0 !important;
    opacity: 0;
  }
  .footer-enter-to,
  .footer-leave-from {
    max-height: 300px;
    max-width: 1536px;
    opacity: 1;
  }

</style>