## 1. Vue组件的3个API来源

1. props传递数据

2. events出发时间

3. slot内容分发


## 2. Vue 特殊属性挂载组件

eg: table中由于规定不能直接使用模板的时候。

```html
<table>
    <tbody>
        <test-component></test-component>
        <!-- 直接这么写渲染不到tbody里面 -->
    </tbody>
</table>
```

解决办法：

```html
<table>
    <tbody>
        <tr is="test-component"></tr>
    </tbody>
</table>
```

## 3. 组件中使用data

### 3.1
```javascript
Vue.component('test-component', {
    template: '<div>Hello: {{ name }} !</div>',
    data: function() {
        return {
            name: 'Puyi Wu'
        }
    }
})
```

### 3.2 组件中公用data和单独的data

[点击查看源代码](../001base/chapter007/test005.html)


## 4. 使用`props`传递数据

### 4.1 基本数组用法

```html
<hello-component name="Puyi Wu" my-title="你好，欢迎你"></hello-component>
```

```javascript
//这里注意驼峰写法！！！
Vue.component('hello-component', {
    props: ['name', 'myTitle'],
    template: '<h2>Hello, {{ name }} ! {{ myTitle }}</h2>'
})
```

### 4.2 v-bind动态绑定props

```html
<p>
    <label>请输入你的名字：</label>
    <input type="text" 
            v-model="myName">
</p>
<p>
    <label>请开始你的表演：</label>
    <input type="text"
            v-model="myNameTitle">
</p>
<test-component v-if="myName !== '' && myNameTitle !== ''"
                :name="myName" 
                :name-title="myNameTitle"></test-component>
```

```javascript
Vue.component('test-component', {
    //这里注意html属性的驼峰写法！！！
    props: ['name', 'nameTitle'],
    template: '<h2>{{ name }}, {{ nameTitle }}！</h2>'
})
var app = new Vue({
    el: '#app',
    data: {
        myName: '',
        myNameTitle: ''
    }
})
```

### 4.3 使用props传递数据的时候，直接传递过去的是字符串，如果要传递数字、布尔值、数组、对象等，需要使用v-bind

eg：

```html
<!-- 注意v-bind 不使用v-bind传递的是字符串 -->
<!-- message.length = 9 -->
<my-component message="[1, 2, 3]"></my-component>       
<!-- message.length = 3 -->
<my-component :message="[1, 2, 3]"></my-component>
```

### 4.4 单项数据流的两种情况。

[点击查看代码](../001base/chapter007/test009.html)


## 5 组件通信

### 5.1 自定义事件

子组件用#emit()出发时间，父组件用$on()来监听子组件的事件。

父组件也可以直接在子组件的自定义标签上使用v-on来监听子组件出发的自定义事件。

```html
<h1>看我大不大{{ myNum }}</h1>
<test-component
    @myincrease="getMyNumbHandler"
    @myreduce="getMyNumbHandler"></test-component>
```

```javascript
Vue.component('test-component', {
    template: '\
        <div>\
            <button @click="addHandler">+1</button>\
            <button @click="reduceHandler">-1</button>\
        </div>',
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        // 组件中的事件
        // 当按钮点击时，触发相应事件，触发父组件的事件
        addHandler() {
            this.counter++;
            // 子组件触发事件
            console.log(this.counter);
            this.$emit('myincrease', this.counter);
        },
        reduceHandler() {
            this.counter--;
            //子组件触发事件
            console.log(this.counter);
            this.$emit('myreduce', this.counter);
        }
    }
});
var app = new Vue({
    el: '#app',
    data: {
        myNum: 0
    },
    methods: {
        getMyNumbHandler: function(myNum) {
            this.myNum = myNum;
        }
    }
})
```

### 5.3 使用`v-model`

可以看作input事件的语法糖。比较如下：

HTML:

```html
<p>数字是：{{ num }}</p>
<test-component v-model="num"></test-component>
```

```html
<p>总数：{{ total }}</p>
<my-component @input="updateValue"></my-component>
```


JavaScript:

```javascript
Vue.component('test-component', {
    template: '\
        <div>\
            <button @click="addClick">+1</button>\
            <button @click="reduceClick">-1</button>\
        </div>',
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        addClick() {
            this.counter++;
            this.$emit('input', this.counter);
        },
        reduceClick() {
            this.counter--;
            this.$emit('input', this.counter);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        num: 0
    }
})
```

```javascript
Vue.component('my-component', {
    template: '\
        <div>\
            <button @click="addClick">+1</button>\
            <button @click="reduceClick">-1</button>\
        </div>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        addClick () {
            this.counter++;
            //触发父组件的input事件，将this.counter传入
            this.$emit('input', this.counter);
        },
        reduceClick() {
            this.counter--;
            this.$emit('input', this.counter);
        }

    }
});

var app = new Vue({
    el: '#app',
    data: {
        total: 0
    },
    methods: {
        updateValue(total) {
            this.total = total;
        }
    }

})
```

### 5.4 `v-model`创建自定义的表单输入组件，进行数据双向绑定



## 6 非父子组件通信

### 6.1 使用空Vue实例作为中央事件总线（bus）

```html
<div id="app">
    {{ message }}
    <component-a></component-a>
</div> 
```

```javascript
//空Vue实例用作中央事件总线（bus）
var bus = new Vue();

Vue.component('component-a', {
    template: '<button @click="handleEvent">传递事件</button>',
    methods: {
        handleEvent: function() {
            // 通过bus把事件on-message发出去
            bus.$emit('on-message', '来自组件component-a的内容，惊不惊喜，意不意外');
        }
    }
});
var app = new Vue({
    el: '#app',
    data: {
        message: ''
    },
    mounted: function() {
        var _this = this;
        //在实例初始化时，监听来自bus实例的on-message事件
        bus.$on('on-message', function(msg) {
            _this.message = msg;
        })
    }
})
```

### 6.2 父链

在子组件中，使用this.$parent可以直接访问该组件的父实例或组件，父组件也可以通过this.$children访问它所有的子组件，而且可以递归向上或向下无线访问，知道根实例或最内容层的组件。

推荐父子组件通信通过`props`和`$emit`进行通信，可以避免父子组件紧耦合

```html

<div id="app">
    <h1>{{ information }}</h1>
    <component-b></component-b>
</div>

```

```javascript

Vue.component('component-b', {
    template: '<button @click="changeMsg">给我改变那个文字</button>',
    methods: {
        changeMsg: function() {
            // 访问父链后，可以做任何操作，比如直接修改数据
            this.$parent.information = '给你变，给你变，给你变。'
        }
    }
})

var app = new Vue({
    sel: '#app',
    data: {
        message: '',
        information: ''
    }
})

```

### 6.3 子组件索引

```html

<div id="app">
    <button @click="handleRef">通过ref获取子组件实例</button>
    <component-a ref="comA"></component-a>
</div>

```

```javascript

Vue.component('component-a', {
    template: '<div>子组件</div>',
    data: function() {
        return {
            message: '子组件内容'
        }
    }
});

var app = new Vue({
    el: '#app',
    methods: {
        handleRef: function() {
            // 父组件内通过this.$refs访问指定名称的子组件。
            // 通过$refs来访问指定的实例
            var msg = this.$refs.comA.message;
            console.log(msg)

        }
    }
})

```

## 7 使用slot分发内容

slot  中文意为插槽

### 7.1 单个slot

```html

<my-component>
    <h1>我是老虎。</h1>
</my-component>
<!-- 结果为，我是老虎 -->

<my-component></my-component>
<!-- 结果为山中无老虎，猴子称霸王 -->

```

```javascript

Vue.component('my-component', {
    template: '\
        <div>\
            <slot>\
                <h1>父组件没有插入内容，我就会出现</h1>\
                <h2>{{ saying }}</h2>\
            </slot>\
        </div>',
    data: function() {
        return {
            saying: '山中无老虎，猴子称霸王。'
        }
    }
});

var app = new Vue({
    el: '#app',
})

```


### 7.2 作用域

slot分发的内容，作用域实在父组件上的！！！


### 7.3 具名slot

```html

<div id="app">
    <my-component>
        <h1 slot="header">Hello, World!</h1>
        <p>哈哈哈哈哈喽</p>
        <h2 slot="footer">这是我的脚！</h2>
        <p>这个匿名的肯定在匿名slot里面！</p>
    </my-component>
</div>

```


```javascript

Vue.component('my-component', {
    template: '\
        <div class="container">\
            <div class="header">\
                <slot name="header"></slot>\
            </div>\
            <div class="main">\
                <slot></slot>\
            </div>\
            <div calss="footer">\
                <slot name="footer"></slot>\
            </div>\
        </div>'
})
var app = new Vue({
    el: '#app'
})

```

## 7.4 作用于插槽


### 7.4.1 基本用法

```html

    <div id="app">
        <child-component>
            <template scope="props">
                <p>来组父组件的内容</p>
                <p>{{ props.msg }}</p>
            </template>
        </child-component>
        <my-component>
            <!-- 从此处props只是一个临时变量，类似v-for="item in items"里面的item -->
            <template scope="props">
                <p>我是父组件，父组件，父组件</p>
                <p>{{ props.msg }}</p>
            </template>
        </my-component>
    </div>

```

```javascript

Vue.component('my-component', {
    template: '\
        <div class="main">\
            <slot msg="我是子组件的内容噢噢噢噢"></slot>\
        </div>'
})

var app = new Vue({
    el: '#app'
})

```


### 7.4.2 代表用例——列表组件

