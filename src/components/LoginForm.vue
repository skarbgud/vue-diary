<template>
<div class="form">
  <div class="center">
    <div>
      <span>vue-diary</span>   
    </div>

    <div>
     <el-input label="사용자" placeholder="사용자 이름 (남규형 입력)" v-model="name" v-on:keyup.enter.native="login()"></el-input>
    </div>

    <div>   <!--로그인 버튼-->
      <el-button type="info" size="medium"  @click="login" class="button-style">Sign In</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      name: ''
    };
  },
  methods: {
    login() {     //로그인버튼
      let router = this.$router;
      if (this.name != '' && this.name == this.$store.state.name) {   //입력한 값이 있고, store의 name의 값과 일치하면 /diary path로 
        router.push('/diary');
        this.$store.state.name = this.name;

        this.$message({
          type:'info',
          message: `${this.name}님 반갑습니다.`
        });    
      }
    }
  }
}
</script>

<style scoped>
  .form{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9C97F0;
    background-color:#9C97F0;
    }
  .center{
    justify-content: center;
    align-items: center;
    background-color:white; 
    padding: 10px 60px 10px 60px; 
    text-align:center;
  }
  .center div{
    margin-bottom: 6px;
  }
  .el-row{
    margin: 10px;
  }
  .button-style{
    width: 300px; 
    background-color:#9C97F0;
  }
</style>
