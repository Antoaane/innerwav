<script setup>
import { onMounted } from 'vue';
// import _ from 'lodash';

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

function hoverItemEffect() {
  document.querySelectorAll('.desktop .main-nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const hoverItem = document.getElementById('hover-item');
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

  document.querySelector('.desktop').addEventListener('mouseleave', () => {
    const hoverItem = document.getElementById('hover-item');
    hoverItem.style.opacity = 0;
    hoverItem.style.width = 0;
    console.log(hoverItem.style.width)
  });
}

function fixedTrigger() {
  const nav = document.getElementById('desk-nav');
  const menu = document.getElementById('desk-menu');

  if (window.scrollY > 400 && nav.classList.contains('main-nav')) {
    nav.classList.add('main-nav-fixed');
    nav.classList.remove('main-nav');
  } 
  
  if (window.scrollY <= 400 && nav.classList.contains('main-nav-fixed')) {
        // menu.style.transform = 'scaleY(0)';
        nav.classList.remove('main-nav-fixed');
        nav.classList.add('main-nav');
        // menu.style.transform = 'scaleY(1)';
        hoverItemEffect();
  }
}

onMounted(() => {
  hoverItemEffect();
})


window.addEventListener('scroll', () => {
  // _.throttle(() => {
  //   console.log("yey")}, 
  // 200);
  fixedTrigger();
})

</script>

<template>
  <header class="container">
      <nav id="desk-nav" class="main-nav">
        <ul id="desk-menu" class="desktop hidden lg:flex">
          <svg class="fixed-nav-corner left hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
            <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
          </svg>
          <svg class="fixed-nav-corner right hidden" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1483.82 1000">
            <path d="m0,0s529.52,0,741.91,500,741.91,500,741.91,500V0H0Z"/>
          </svg>
          <span id="hover-item"></span>
          <li class="main-nav-item">
            <a class="nav-text" href="#presentation-section">Informations</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="#works-section">Nos Réalisations</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Masteriser</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Tarifs</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Contact</a>
          </li>
          <li class="main-nav-item profile">
            <a class="main-nav-item" href="">
              <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M14.1274 15C12.1849 15 10.522 14.3083 9.13869 12.925C7.75538 11.5417 7.06372 9.8788 7.06372 7.93628C7.06372 5.99376 7.75538 4.33084 9.13869 2.94753C10.522 1.56421 12.1849 0.872559 14.1274 0.872559C16.07 0.872559 17.7329 1.56421 19.1162 2.94753C20.4995 4.33084 21.1912 5.99376 21.1912 7.93628C21.1912 9.8788 20.4995 11.5417 19.1162 12.925C17.7329 14.3083 16.07 15 14.1274 15ZM0 29.1274V24.1828C0 23.1821 0.257531 22.2624 0.772594 21.4236C1.28766 20.5848 1.97196 19.9446 2.82549 19.5031C4.65028 18.5907 6.50451 17.9064 8.38817 17.4502C10.2718 16.994 12.1849 16.7659 14.1274 16.7659C16.07 16.7659 17.9831 16.994 19.8667 17.4502C21.7504 17.9064 23.6046 18.5907 25.4294 19.5031C26.2829 19.9446 26.9672 20.5848 27.4823 21.4236C27.9974 22.2624 28.2549 23.1821 28.2549 24.1828V29.1274H0Z" 
                  fill="white"
                />
              </svg>
            </a>
          </li>
        </ul>
        <ul id="burger" @click=triggerMenu() class="flex lg:hidden">
          <span id="bun"></span>
          <span id="cheese"></span>
          <span id="steak"></span>
        </ul>
        <ul id="menu" class="mobile hidden lg:hidden">
          <li class="main-nav-item">
            <a class="nav-text" href="#presentation-section">Informations</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="#works-section">Nos Réalisations</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Masteriser</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Tarifs</a>
          </li>
          <li class="main-nav-item">
            <a class="nav-text" href="">Contact</a>
          </li>
          <li class="main-nav-item profile">
            <a class="main-nav-item" href="">
              <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M14.1274 15C12.1849 15 10.522 14.3083 9.13869 12.925C7.75538 11.5417 7.06372 9.8788 7.06372 7.93628C7.06372 5.99376 7.75538 4.33084 9.13869 2.94753C10.522 1.56421 12.1849 0.872559 14.1274 0.872559C16.07 0.872559 17.7329 1.56421 19.1162 2.94753C20.4995 4.33084 21.1912 5.99376 21.1912 7.93628C21.1912 9.8788 20.4995 11.5417 19.1162 12.925C17.7329 14.3083 16.07 15 14.1274 15ZM0 29.1274V24.1828C0 23.1821 0.257531 22.2624 0.772594 21.4236C1.28766 20.5848 1.97196 19.9446 2.82549 19.5031C4.65028 18.5907 6.50451 17.9064 8.38817 17.4502C10.2718 16.994 12.1849 16.7659 14.1274 16.7659C16.07 16.7659 17.9831 16.994 19.8667 17.4502C21.7504 17.9064 23.6046 18.5907 25.4294 19.5031C26.2829 19.9446 26.9672 20.5848 27.4823 21.4236C27.9974 22.2624 28.2549 23.1821 28.2549 24.1828V29.1274H0Z" 
                  fill="white"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
  </header>

  <RouterView />
  
  <footer>
  </footer>
</template>