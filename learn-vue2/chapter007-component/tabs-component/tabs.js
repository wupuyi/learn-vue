// 标签页外层的组件tabs
Vue.component('tabs', {
    template: '\
        <div class="tabs"> \
            <div class="tabs-bar"> \
                <!-- 标签页标题, 这里要用v-for --> \
                <div \
                    :class="tabCls(item)" \
                    v-for="(item, index) in navList" \
                    @click="handleChange(index)"> \
                    {{ item.label }} \
                </div> \
            </div>\
            <div class="tabs-content"> \
                <!-- 这里的slot就是嵌套的pane --> \
                <slot></slot> \
            </div> \
        </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function() {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        //ES6写法
        getTabs() {
            // 通过遍历子组件,得到所有的pane组件
            return this.$children.filter(function(item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            //设置对this的引用,在function回调里,this指向的并不是vue实例
            var _this = this;

            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                //如果没有给pane 设置 name, 默认设置它的索引
                if(!pane.name) pane.name = index;
                //设置当前选中的tab的索引,在后面介绍
                if(index === 0) {
                    if(!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;
            //显示当前讯中的tab对应的pane组件,隐藏没有选中的
            tabs.forEach(function(tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        },
        handleChange: function(index) {
            var nav = this.navList[index];
            var name = nav.name;

            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        },
        watch: {
            value: function(val) {
                this.currentValue =val;
            },
            currentValue: function() {
                this.updateStatus();
            }
        }
    }
})