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

