Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function() {
                return [];
            }
        },
        data: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data: function() {
        return {
            // 组件所有操作在这两个数据上完成，不对原始数据做任何处理
            currentColumns: [],
            currentData: []
        }
    },
    methods: {
        makeColumns: function() {
            this.currentColums = this.columns.map(function(col, index) {
                // 添加一个字段标识当前列排序的状态，后续使用
                col._sortType = 'normal';
                // 添加一个字段标识当前列在数组中的索引，后续使用
                col._index = index;
                return col;
            });
        },
        makeData: function() {
            this.currentData = this.data.map(function(row, index) {
                // 添加一个字段标识当前行在数组中的索引，后续使用
                row._index = index;
                return row;
            })
        }
    },
    mounted() {
        // v-table 初始化时调用
        this.makeColumns();
        this.makeData();
    },
    render: function(h) {
        var ths = [];
        var trs = [];
        return h('table', [
            h('thead',[
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    }
});