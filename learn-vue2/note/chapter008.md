# 自定义指令复盘

## 8.1 基本用法

### 8.1.1 注册方法

1. 全局注册

```javascript

//全局注册
Vue.directive('focus', {
    //指令选项
});

```

2. 局部注册

```javascript
var app = new Vue({
    el: '#app',
    directives: {
        focus: {
            //指令选项
        }
    }
})
```

### 8.1.2 用法举例：

eg1:

```html

<div id="app">
    <input type="text" v-focus>
    <h2 v-niupi></h2>
</div>

```

``` javascript

// 注册自定义指令v-focus
//全局注册
Vue.directive('focus', {
    //指令选项
    //钩子函数inserted,被绑定元素插入父节点时调用
    inserted: function(el) {
        // 聚焦元素
        el.focus();
    }
});
Vue.directive('niupi', {
    inserted: function(el) {
        el.innerHTML = '牛皮牛皮牛皮';
    }
});

var app = new Vue({
    el: '#app'
})

```


## 8.2 

更多参考[Vue文档](https://cn.vuejs.org/v2/guide/custom-directive.html#%E7%AE%80%E4%BB%8B)