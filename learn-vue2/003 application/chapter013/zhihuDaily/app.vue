<template>
    <div class="daily">
        <v-title title='123'></v-title>
        <v-button></v-button>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';

    export default {

        components: {
            vTitle,
            vButton
        },
        methods: {
            handleClick (e) {
                console.log(e);
            }
        }
    }
</script>