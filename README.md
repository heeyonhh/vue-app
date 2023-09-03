# Vue 메모앱

v-mode
v-if
v-click @click
v-model
v-class :class

- 메모 저장 / 수정

            save: function () {
            var id = this.memos.length + 1;

            //쓰는 중일때 모드 write memos에 추가
            if (this.mode === 'write') {
                this.memos.push({
                    id: id,
                    content: this.memo.content,
                    regDate: new Date()
                });
            }
            //수정 중일때 모드 edit id 값 찾아서 수정
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
        
- 메모 내용 로컬스토리지에 저장
  
            localStorage.setItem

- 앱이 실행될때 로컬스토리지에서 받아오기

            created: function () {
            var memos = localStorage.getItem('memos');
            if (memos) {
            this.memos = JSON.parse(memos);
            }
            }
  
- 메모 리스트에서 선택해서 열때
    
            //매개변수로 id 받아서 열기
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

- 메모 쓸 때 내용 초기화

            write: function () {
              this.mode = "write"
              //메모 내용 초기화
              this.memo = {
                  id: null,
                  content: null,
                  regDate: null
              }}

- 메모 삭제

            remove: function () {
            if (confirm('삭제하시겠습니까?')) {
            for (var i in this.memos) {
                if (this.memos[i].id === this.memo.id) {
                    this.memos.splice(i, 1);
                    break;
                }
            }
            }
            //id값으로 찾아서 삭제 후 로컬스토리지 삭제
            this.mode = "list"
            localStorage.setItem('memos', JSON.stringify(this.memos));
            }
