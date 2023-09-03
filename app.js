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
        write: function () {
            this.mode = "write"
            //메모 내용 초기화
            this.memo = {
                id: null,
                content: null,
                regDate: null
            }
        },
        remove: function () {
            if (confirm('삭제하시겠습니까?')) {
                for (var i in this.memos) {
                    if (this.memos[i].id === this.memo.id) {
                        this.memos.splice(i, 1);
                        break;
                    }
                }
            }

            this.mode = "list"
            localStorage.setItem('memos', JSON.stringify(this.memos));
        },
        save: function () {
            var id = this.memos.length + 1;

            //쓰는 중일때
            if (this.mode === 'write') {
                this.memos.push({
                    id: id,
                    content: this.memo.content,
                    regDate: new Date()
                });
            }
            //수정 중일때 id 값 찾아서 수정
            else if (this.mode === 'edit') {
                for (var i in this.memos) {
                    if (this.memos[i].id === this.memo.id) {
                        this.memos[i] = this.renew(this.memo);
                        break;
                    }
                }
            }

            this.mode = "list";

            localStorage.setItem('memos', JSON.stringify(this.memos));
            //메모 저장하면서 로컬스토리지에 저장
        },
        //메모 열었을때 매개변수로 id 받아서 열기
        open: function (id) {
            // console.log(id);
            // index 번호로 id 찾아서 memo 넣고 나가기
            for (var i in this.memos) {
                if (this.memos[i].id === id) {
                    this.memo = this.memos[i];
                    break;
                }
            }
            this.mode = 'edit';
        },
        //입력 받은 값을 값으로 처리하기 위해 새롭게 처리
        renew: function (val) {
            return JSON.parse(JSON.stringify(val));
        }
    },

    //앱이 생성될때 실행
    created: function () {
        var memos = localStorage.getItem('memos');
        if (memos) {
            this.memos = JSON.parse(memos);
        }
    }
})