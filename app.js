var app = new Vue({
    el: '#app',
    data: {
        mode: 'list',
        memos: [
            {
                id: 1,
                content: 'Memo #1',
                regDate: new Date()
            },
            {
                id: 2,
                content: 'Memo #2',
                regDate: new Date()
            },
            {
                id: 3,
                content: 'Memo #3',
                regDate: new Date()
            },
        ],
        memo: {
            id: null,
            content: null,
            regDate: null
        }
    },
    methods: {
        write: function(){
            this.mode = "write"
        },
        cancel: function(){
            this.mode = "list"
        },
        save: function(){
            var id = this.memos.length + 1;
            this.memos.push({
                id: id,
                content: this.memo.content,
                regDate: new Date()
            });
            this.memo.content = null;
            this.mode = "list";
        }
    }
})