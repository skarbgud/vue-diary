<template>
    <!-- 템플릿안에 바로 템플릿 사용 못한다-->
    <div>   
      <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
      <!-- 형제 div가 된다. -->
      <template v-show="result.length">  
          <!-- v-if인 경우 태그가 없고 v-show는 태그는 있지만 display:none으로 처리된다. -->
          <div>평균시간: {{average}}ms</div>  <!--평균 구하는 코드-->
          <button @click="onReset">리셋</button>
      </template>
    </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
    data(){
        return{
           result :[],
           state:'waiting',
           message:'클릭해서 실행하세요.',
        }
    },
    computed:{  //computed를 쓰는 이유 값이 캐싱이 되서 나온다.
                //message가 바뀌면 전체부분이 다시 렌더링 되는데 
                //result까지 다시 재실행된다. 
                //계산이 복잡해지고 10초 걸리면 다시 계산 하는데 computed로 하면 기존에 캐싱된 average가 computed(계산)된다.
                //성능상에 중요한 문제, 데이터가 가공된다.
        average(){
            return this.result.reduce((a,c)=> a+c,0) /this.result.length || 0
        }
    },
    methods:{
       onReset(){
           this.result = [];
           this.state = 'waiting';
           this.message ="클릭하여 실행하세요"
       },
       onClickScreen(){
           if(this.state === 'waiting'){
               this.state = 'ready';
               this.message = '초록색이 되면 클릭하세요';
               timeout = setTimeout(() => {
                   this.state = 'now';
                   this.message = '지금 클릭!';
                   startTime = new Date();
               },Math.floor(Math.random() * 1000) + 2000);  //2~3초
           }
           else if(this.state === 'ready'){
               clearTimeout(timeout);
               this.state = 'wating';
               this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
           }
           else if(this.state ==='now'){
               endTime = new Date();
               this.state = 'waiting';
               this.message = '클릭해서 시작하세요.';
               this.result.push(endTime - startTime);
           }
       }
    }
}
</script>

<style scoped>
    #screen{
        width: 300px;
        height: 300px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting{
        background-color: aqua;
    }
    #screen.ready{
        background-color: red;
    }
    #screen.now{
        background-color: greenyellow;
    }
</style>