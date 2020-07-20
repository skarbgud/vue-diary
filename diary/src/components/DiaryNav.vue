<template>
<div>
  <el-container>
    <!-- header 사용자이름 [로그아웃] -->
    <el-header height="45px">
      <el-row>
        <el-col :span="5">vue-diary</el-col>
        <el-col :span="19" class="nav-right">
          <span class="nav-name">{{this.name}}</span>
          <el-button class="logout" @click="logout" size="mini" type="info">Sign out</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- header /사용자이름 [로그아웃] -->

    <el-main>
      <!-- 동적으로 라우팅될 부분(DiaryWrite,DiaryList,ListByNo) -->
      <router-view></router-view>
    </el-main>

  </el-container>
</div>

</template>

<script>
import Constant from '../constant'

export default {
  name: "DiaryNav",
  data() {
    return {
      name: this.$store.state.name
    };
  },
  methods: {
    logout() {    //로그아웃 버튼
      this.$store.commit(Constant.CLEAR_LIST);//로그아웃시 기존의 리스트를 비운다.
      let router = this.$router;
      router.push('/'); //메인으로 이동
    }
  }
}
</script>

<style scoped>
  .nav-right{
    text-align: right; 
    font-size: 10px;
  }
  .nav-name{
    margin-right: 8px;
  }
  .el-header {
    padding: 6px 20px 6px 20px;
    background-color: #9C97F0;
    color: white;
  }
  .logout{
    background-color: white;
    color: #9C97F0;
  }
</style>
