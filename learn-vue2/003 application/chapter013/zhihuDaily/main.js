import Vue from 'vue';
import App from './app.vue';
import './css/normalize.css'
import './css/style.css';

new Vue({
    el: '#app',
    render: h => {
        return h(App)
    }
});