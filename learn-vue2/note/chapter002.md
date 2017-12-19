## 1. vue实例与数据绑定

1. el用于指定页面中已存在的DOM元素来挂在Vue实例，它可以是HTMLElement，也可以是CSS选择器，

``` 
    选项
    DOM元素
        el: document.getElementById('app')
    CSS选择器
        el: '#app'            
    上述方法均可
```

2. `$el`

```javascript
var app = new Vue({
    el: '#app',
    data: {

    }
})

// app.$el可以用来访问id为app的元素
```

3. 生命周期

[Vue生命周期图（中文参考）](http://www.jianshu.com/p/d61f55da98fb)


4. `v-pre`跳过这个元素和它的子元素的编译过程

```html
<span v-pre>{{ 这里的内容是不会被编译的 }}</span>
```

5. 过滤器

```html
    <div id="app">
        {{ date | formatDate }}
    </div>
```


```javascript
        //10以下添加0
        var padDate = function(value) {
            return value < 10 ? '0' + value : value;
        }

        var app = new Vue({
            el: '#app',
            data: {
                date: new Date()
            },
            filters: {
                formatDate: function(value) {  //这里的value是需要过滤的数据
                    var date = new Date(value);
                    var year = date.getFullYear();
                    var month = padDate(date.getMonth() + 1);
                    var day = padDate(date.getDate());
                    var hours = padDate(date.getHours());
                    var minutes = padDate(date.getMinutes());
                    var seconds = padDate(date.getSeconds());
                    //整理好的数据返回出去
                    return year + '-' + month + '-' + day + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds; 

                }
            },
            mounted: function() {
                var _this = this;
                this.timer = setInterval(function() {
                    _this.date = new Date();  //修改数据date
                }, 1000);
            },
            beforeDestroy: function() {
                if (this.timer) {
                    clearInterval(this.timer); //销毁Vue实例前，清除定时器。
                }
            }
        })
```

## 2. 指令与事件

1. `v-if`

```html
<p v-if="show">显示这段文本</p>
```

2. `v-on`

```html
<button v-on:click="handleClose">点击隐藏</button>
<button @click="handleClose">点击隐藏</button>
```

3. `v-bind`

```html
<a v-bind:href="url">github</a>
<a :href="url">github</a>
```
