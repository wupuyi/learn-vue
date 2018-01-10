// animation.vue 

<template>
    <div>
        <button @click="show = !show">
            Toggle
        </button>
        <transition name="slide-fade">
            <p v-if="show">Hello, World!</p>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show : true
            };
        }
    }
</script>


<style scoped>
        .slide-fade-enter-active  {
            transition: all .3s ease;
        }
        
        .slide-fade-levae-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }

        .slide-fade-enter, .slide-fade-levae-to {
            transform: translateX(10px);
            opacity: 0;
        }
</style>
