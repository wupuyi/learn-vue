## `v-for index`

```html
    <div id="app">
        <ul>
            <!-- <li v-for="book in books">{{ book.name }}</li> -->
            <li v-for="(book, index) in books">{{ index }} - {{ book.name }}</li>
        </ul>
    </div>
```

```javascript
        var app = new Vue({
            el: '#app',
            data: {
                books: [
                    { name: '《Vue.js实战》' },
                    { name: '《JavaScript语言精粹》' },
                    { name: '《JavaScript高级程序设计》'}
                ]
            }
        })

        var a = {
            book: 'lala',
            name: 'haha'
        }
```

## 数组更新

```html
    <div id="app">
        <template v-for="book in books">
            <li>书名：{{ book.name }}</li>
            <li>作者：{{ book.author }}</li>
        </template>

        <span v-for="value in user"> {{ value }}</span>

        <ul>
            <li v-for="(value, key, index) in user">
                {{ index }} - {{ key }} : {{ value }}
            </li>
        </ul>

        <span v-for="n in 10"> {{ n }} </span>
    </div>
```

```javascript
var app = new Vue({
            el: '#app',
            data: {
                books: [{
                    name: '《Vue.js实战》',
                    author: '梁灏'
                },
                {
                    name: '《JavaScript语言精粹》',
                    author: 'Douglas Crockford'

                },
                {
                    name: '《JavaScript高级程序设计》',
                    author: 'Nicholas C.Zakas'
                }
                ],
                user: {
                    name: 'Aresn',
                    gender: '男',
                    age: 26
                }
            }
        })

        var a = {
            book: 'lala',
            name: 'haha'
        }

        app.books.push({
            name: '《CSS揭秘》',
            author: '[希] Lea Verou'
        });

        app.books.filter(function(item) {
            return item.name.match(/JavaScript/);
        })
```

## 过滤与排序

```html
    <div id="app">
        <ul>
            <template v-for="book in filterBooks">
                <li>书名：{{ book.name }}</li>
                <li>作者：{{ book.author }}</li>
            </template>
            <template v-for="book in sortedBooks">
                <li>书名：{{ book.name }}</li>
                <li>作者：{{ book.author }}</li>
            </template>
        </ul>
    </div>
```


```javascript
        var app = new Vue({
            el: '#app',
            data: {
                books: [{
                        name: '《Vue.js实战》',
                        author: '梁灏'
                    },
                    {
                        name: '《JavaScript语言精粹》',
                        author: 'Douglas Crockford'

                    },
                    {
                        name: '《JavaScript高级程序设计》',
                        author: 'Nicholas C.Zakas'
                    }
                ]
            },
            computed: {
                filterBooks: function () {
                    return this.books.filter(function (book) {
                        return book.name.match(/JavaScript/);
                    });
                },
                sortedBooks: function () {
                    return this.books.sort(function (a, b) {
                        return a.name.length < b.name.length;
                    })
                }
            }
        })
```


## 事件

```html
<div id="app">
        点击次数： {{ counter }}
        <!-- <button @click="counter++"> +1 </button> -->

        <button @click="handleAdd()"> +1 </button>
        <button @click="handleAdd(10)"> +10 </button>
    </div>
```

```javascript
        var app = new Vue({
            el: '#app',
            data: {
                counter: 0
            },
            methods: {
                handleAdd: function(count) {
                    count = count || 1;
                    // this指向当前Vue实例app
                    this.counter += count;
                }
            }
        })
```


## 修饰符

```html
    <div id="app">
        <a href="http://www.apple.com" @click="handleClick('禁止打开', $event)">打开链接</a>

        <form @submit.prevent>
            <input type="text" name="" value="">
            <button type="submit" >提交</button>
        </form>
        <a href="http://www.baidu.com" @click.prevent>我是百度</a>
    </div>
```

```javascript
        var app = new Vue({
            el: '#app',
            methods: {
                handleClick: function(message, event) {
                    event.preventDefault();
                    window.alert(message);
                },
                abc: function(event) {
                    event.preventDefault();
                    window.alert('胡咧咧');
                }
            }
        })
```