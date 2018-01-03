var app = new Vue({
    el: '#app',
    //构造数据
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                // 列内容字段名
                key: 'age',
                // 选填字段，说明是否需要排序
                sortable: true
            }
        ],
        data: [
            {
                name: '王小明',
                age: 18,
                birthday: '1999-02-21',
                address: '北京市朝阳区芍药居'
            }
        ]
    }
})