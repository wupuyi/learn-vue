## 1. 计算属性的两种写法

1. 默认写法

```html
    <div id="app">
        总价：{{ prices }}
    </div>
```

```javascript
var app = new Vue({
            el: '#app',
            data: {
                package1: [
                    {
                        name: 'iPhone 7',
                        price: 7199,
                        count: 2
                    },
                    {
                        name: 'iPad',
                        price: 2888,
                        count: 1
                    }
                ],
                package2: [
                    {
                        name: 'apple',
                        price: 3,
                        count:5
                    },
                    {
                        name: 'banana',
                        price: 2,
                        count: 10
                    },
                    {
                        name: 'orange',
                        price: 1,
                        count: 20
                    }
                ]
            },
            computed: {
                prices: function(){
                    var prices = 0;
                    for (let i = 0; i < this.package1.length; i++) {
                        prices += this.package1[i].price * this.package1[i].count;
                    }
                    for (var i = 0; i < this.package2.length; i++ ){
                        prices += this.package2[i].price * this.package2[i].count;
                    }
                    return prices;
                }
            }
        })
```

2. setter和getter写法

```html
    <div id="app">
        姓名: {{ fullName }}
    </div>
```

```javascript
        var app = new Vue({
            el: '#app',
            data: {
                firstName: 'Jack',
                lastName: 'Green'
            },
            computed: {
                fullName: {
                    // getter，用于读取
                    get: function() {
                        return this.firstName + ' ' + this.lastName;
                    },

                    //setter, 写入时触发
                    set: function(newValue) {
                        var names = newValue.split(' ');
                        this.firstName = names[0];
                        this.lastName = names[names.length - 1];
                    }
                }
            }
        });
```

`app.fullName = 'steven jobs';` 可以调用getter方法。

## 2. 计算属性可以依赖其他计算属性

## 3. 计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据。

```html
    <div id="app1"></div>
    <div id="app2">
        {{ reversedText }}
    </div>
```

```javascript
var app1 = new Vue({
    el: '#app1',
    data: {
        text: '123,456'
    }
    });
    var app2 = new Vue({
        el: '#app2',
        computed: {
            reversedText: function() {
                //这里依赖的是实例app1的数据text
                return app1.text.split(',').reverse().join(',');
            }
        }
    })
```

## 4. 计算属性computed和methods的区别，计算属性有缓存。