

var alert_component = {
    template: '<button @click="on_click">弹弹弹</button>',
    methods: {
        on_click: function () {
            alert("Yo.");
        }
    }
}

var seg1 = new Vue({
    el: '#seg1',
    components: {
        alert: alert_component
    }
});

// var seg2 = new Vue({el: '#seg2'});