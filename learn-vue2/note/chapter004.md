## 1. 绑定class的几种方法

1. 对象语法

1.1 单个属性

```html
    <div id="app">
        <div :class="{ 'active': isActive }"></div>
    </div>
```

```javascript
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true
        }
    })
```

1.2 多个属性

```html
    <div id="app">
        <div class="static" :class="{ 'active': isActive, 'error': isError }"></div>
    </div>
```

```javascript
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            isError: false
        }
    })
```

1.3 计算属性写法

```html
    <div id="app">
        <div :class="classes">
        </div>
    </div>
```

```javascript
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            error: null
        },
        computed: {
            classes: function() {
                return {
                    active: this.isActive && !this.error,
                    'text-fail': this.error && this.error.type === 'fail'
                }
            }
        }
    })
```

2. 数组语法

```html
    <!-- 数组写法 -->
    <div id="app">
        <div :class="[activeCls, errorCls]">
        </div>
    </div>
    <!-- 三元表达式 -->
    <div id="app1">
        <div :class="[isActive ? activeCls2 : '', errorCls2]">
        </div>
    </div>

    <!-- 在数组语法中用对象语法 -->
    <div id="app2">
        <div :class="[{ 'active': isActive3 }, errorCls3]">
        </div>
    </div>
```

```javascript
       var app = new Vue({
            el: '#app',
            data: {
                activeCls: 'active',
                errorCls: 'error'
            }
        });
        var app1 = new Vue({
            el: '#app1',
            data: {
                isActive: true,
                activeCls2: 'active',
                errorCls2: 'error'
            }
        });
        var app2 = new Vue({
            el: '#app2',
            data: {
                isActive3: true,
                errorCls3: 'error'
            }
        })
```


**计算属性写法**

```html
<div id="app">
        <button :class="classes"></button>
</div>
```

```javascript
        var app = new Vue({
            el: '#app',
            data: {
                size: 'large',
                disabled: true
            },
            computed: {
                classes: function() {
                    return [
                        'btn',
                        {
                            ['btn-' + this.size]: this.size !== '',
                            ['btn-disabled']: this.disabled
                        }
                    ];
                }
            }
        })
```


3. 在组件上使用

```html
<div id="app">
    <my-component :class="{ 'active': isActive }"></my-component>
    <lala-component :class="[{'lala': isLala}, haha]"></lala-component>
    <haha-component :class="classes"></haha-component>
</div>
```

```javascript
Vue.component('my-component', {
            template: '<p class="article">一些文本</p>'
        });

        Vue.component('lala-component', {
            template: '<p class="article">啦啦啦啦啦啦啦</p>'
        });

        Vue.component('haha-component', {
            template: '<p class="article">啦啦啦啦啦啦啦</p>'
        });

        var app = new Vue({
            el: '#app',
            data: {
                isActive: true,
                // lala: 'lalala',
                isLala: true,
                haha: 'hahaha'
            },
            computed: {
                classes: function() {
                    return [
                        'haha',
                        {
                            ['haha' + this.haha]: this.haha,
                        }
                    ]
                }
            }
        })
```

4. 绑定内联样式

```html
<div id="app">
    <div :style="{'color': color, 'fontSize': fontSize + 'px', }">
        文本文本文本
    </div>
    <div :style="styles">
        文本2文本2文本2
    </div>
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        color: 'red',
        fontSize: '30',
        styles: {
            color: 'blue',
            fontSize: 32 + 'px'
        }
    }
})
```