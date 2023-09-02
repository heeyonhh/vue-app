var app = new Vue({
    el: '#app',
    data: {
        mode: 'list',
        memos: [],
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

            localStorage.setItem('memos', JSON.stringify(this.memos));
            //메모 저장하면서 로컬스토리지에 저장
        }
    },
    //앱이 생성될때 실행
    created: function(){
        var memos = localStorage.getItem('memos');
        if(memos){
            this.memos = JSON.parse(memos);
        }
    }
})