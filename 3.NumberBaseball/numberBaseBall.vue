<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit.prevent="onSubmitForm">
            <input ref="answer" type="text" minlength="4" maxlength="4" v-model="value">
            <button>입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for(let i = 0; i < 4; i+=1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }
export default {
    data(){
        return{
            answer: getNumbers(),   //ex [1,2,3,4]
            tries:[],
            value:'',
            result:'',
        }
    },
    methods:{
        onSubmitForm(){
            if(this.value === this.answer.join('')){    //정답 맞췄으면
                this.tries.push({
                    try: this.value,
                    result: '홈런'
                });
                this.result = '홈런';
                alert('게임을 다시 실행합니다.');
                this.answer = getNumbers();
                this.value = '';
                this.tries = [];
                this.$refs.answer.focus();
            }else{  //틀렸을때 
                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v => parseInt(v));
                for(let i=0; i<4; i+=1){
                    if(answerArray[i] === this.answer[i]){  //숫자 자리수 모두 정답
                        strike++;
                    }
                    else if(this.answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크 ${ball}볼입니다.`,
                });
                if(this.tries.length >= 9){ //10번째 시도일때
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다.`;
                    alert('게임을 다시 시작합니다.');
                    this.answer = getNumbers();
                    this.value='';
                    this.tries=[];
                    this.$refs.answer.focus();
                }
                
            }
            
            this.value='';
            this.$refs.answer.focus();
        }
    }
}
</script>

<style scoped>

</style>