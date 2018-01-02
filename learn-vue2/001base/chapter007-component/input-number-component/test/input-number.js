function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <button \
                @click="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <input \
                type="text" \
                :value="currentValue" \
                @change="handleChange"> \
            <button \
                @click="handleUp" \
                :disabled="currentValue >= max">+</button> \
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function(val) {
            //和v-model对应的value
            //触发父组件的事件
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function(val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue(val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown() {
            if(this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },
        handleUp() {
            if(this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleChange(event) {
            // 去掉输入值的空格.trim()
            var val = evnet.target.value.trim();

            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if( val > max) {
                    this.currentValue = max;
                } else if ( val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        }
    },
    mounted: function() {
        this.updateValue(this.value);
    }
});