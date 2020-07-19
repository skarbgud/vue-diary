<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<script>
const rspCoord = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};
const scores = {
    가위:1,
    바위:0,
    보:-1
};
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoord).find(function(v){
        return v[1] === imgCoord;
    })[0];
}
let interval = null;
export default {
    data(){
        return{
          result :'',
          score:0,
          imgCoord: rspCoord.바위,
        };
    },
    computed:{  
        computedStyleObject(){
            return{
                background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
            }
        }
    },
    methods:{
        changeHand(){ 
            interval = setInterval(() => {
                if(this.imgCoord === rspCoord.바위){
                    this.imgCoord = rspCoord.가위;
                }
                else if(this.imgCoord === rspCoord.가위){
                    this.imgCoord = rspCoord.보;
                }
                else if(this.imgCoord === rspCoord.보){
                    this.imgCoord = rspCoord.바위;
                }
            },100);
        },
        onClickButton(choice){
           clearInterval(interval);
           const myScore = scores[choice];
           const computerScore = scores[computerChoice(this.imgCoord)];
           const diff = myScore - computerScore;
           if(diff === 0){
               this.result = '비겼습니다.';
           }else if(diff === -1){
               this.result = '이겼습니다.'
               this.score += 1;
           }else{
               this.result = '졌습니다.';
               this.score -= 1;
           }
           setTimeout(() => {
               this.changeHand();
           },1000);
       }
    },
    beforeCreate(){
        console.log('Before created'); //컴포넌트가 생성되기 전
    },
    created(){
        console.log('created'); //컴포넌트가 생성될 때
    },
    //created : 인스턴스가 작성된 후 동기적으로 호출된다. 이 단계에서 인스턴스는 데이터 처리, 계산된 속성,
    //메서드, 감시/이벤트 콜백 등과 같은 옵션 처리를 완료한다. 그러나 마운트가 시작되지 않았으므로 $el 속성을 아직 사용할 수 없다.
    //virtual dom을 사용할 수 없다.
    //created에서 이제 data와 events가 활성화 되어 접근할 수 있다. 여전히 템플릿과 가상돔은 마운트 및 렌더링 되지 않은 상태이다.
    beforeMount(){
        console.log('Before mounted'); //컴포넌트가 화면에 그려지기 전
    },
    mounted(){
        console.log('mounted'); //컴포넌트가 화면에 그러질 때
        this.changeHand();
    },
    //mounted: el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출된다. 루트 인스턴스가
    //문서 내의 엘리먼트에 마운트 되어 있으면, mounted가 호출 될 때 vm.$el로 문서 안에 있게 된다.
    //virtual dom을 사용할 수 있다.
    //컴포넌트, 템플릿, 렌더링된 돔에 접근 가능
    beforeUpdate(){
        console.log('Before updated');  //컴포넌트가 화면에 업데이트 되기 전
    },
    updated(){
        console.log('updated'); //컴포넌트의 화면이 업데이트 될 때
    },
    beforeDestroy(){    //컴포넌트가 사라졌는데 계속해서 interval이 계속됨 -> 메모리 누수 발생(쓸데없는게 계속 실행)
        console.log('Before destroyed'); //컴포넌트가 사라지기 전
        clearInterval(interval);
    },
    destroyed(){
        console.log('destroyed'); //컴포넌트가 사라질 때
    }
}
</script>

<style scoped>
   #computer{
       width: 142px;
       height: 200px;
       background-position: 0 0;
   }
</style>