<script setup>
    import ArrowDownSvg from '@/components/svgs/ArrowDownSvg.vue';
</script>

<template>
    <div id="title-section">

        <div class="bg"></div>

        <div class="container">
            <div class="main">
                <img class="wave" src="/res/basics/wave.svg" alt="">

                <p class="main-title">
                    Écoutez la <br>différence
                </p>

                <h1 class="main-subtitle">
                    By <span class="font-extrabold text-xl sm:text-4xl md:text-5xl">INNERWAV <span class="inline-block font-extralight text-xl -translate-y-1/2">™</span></span>
                </h1>

            </div>
            <div class="secondary">
                <!-- <h3>Ils nous font confiance</h3>
                <ul class="partenaires">
                    <li>
                        <img src="/res/logos/believe.svg" alt="believe">
                    </li>
                    <li>
                        <img src="/res/logos/UMPG.svg" alt="Universal Music Publishing Group">
                    </li>
                    <li>
                        <img src="/res/logos/BB.svg" alt="Buzz Booster">
                    </li>
                    <li>
                        <img src="/res/logos/FUGA.svg" alt="FUGA">
                    </li>
                    <li>
                        <img src="/res/logos/sony-music.png" alt="Sony">
                    </li>
                </ul> -->
                <a href="#presentation-section" class="arrow">
                    <ArrowDownSvg />
                </a>
            </div>
        </div>

    </div>
</template>
