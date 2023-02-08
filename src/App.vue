<template>
    <div id="app">
        <keep-alive :include="keepAliveComponents">
            <router-view></router-view>
        </keep-alive>
        <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'

export default {
    name: 'app',
    components: {},
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
