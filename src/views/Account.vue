<script setup>
    import Wave3Svg from '@/components/svgs/Wave3Svg.vue';
</script>

<template>
    <div id="account">
        
        <div class="bg"></div>
        <Wave3Svg />

        <div class="container">

            <div class="global">
            
                <div class="title">
                    <h1>
                        Mon compte
                    </h1>
                    
                    <p>
                        Hello Nassim 3x filtré
                    </p>
                </div>
                <nav>
                    <ul>
                        <li>
                            <RouterLink to="/account/infos">
                                Informations personnelles
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/account/orders">
                                Mes commandes
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/account">
                                Support client
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/account">
                                Politique de Confidentialité
                            </RouterLink>
                        </li>
                    </ul>

                    <button>
                        Se déconnecter
                    </button>
                </nav>

            </div>

            <div class="content">
                <div>
                    <RouterView />
                </div>
            </div>    

        </div>

    </div>
</template>