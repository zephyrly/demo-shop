<template>
    <div id="app">
        <keep-alive :include="keepAliveComponents">
            <router-view></router-view>
        </keep-alive>
        <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        <Service-worker-update-popup/>
    </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup'

export default {
    name: 'app',
    components: {
        ServiceWorkerUpdatePopup
    },
    computed: {
        ...mapState({
            keepAliveComponents: (state) => {
                state.global.keepAliveComponents
            },
        }),
    },
}
</script>

<style lang="scss" scoped></style>
