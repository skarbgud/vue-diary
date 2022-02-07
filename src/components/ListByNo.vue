<template>
<el-row>
    <el-row class="content-top" type="flex" justify="center">
      <el-col :span="14">
        <!--날짜-->
        <el-row  class="date">
          {{getDate}}
        </el-row>

        <!-- 제목, 날씨, 기분 -->
        <el-row>
          <span>{{lists[no].title}}</span>
          <span class="weather-feel-icon">(<i :class="weather"></i> {{lists[no].feel}})</span>
        </el-row>
      </el-col>  

      <!-- 아이콘 모음 -->
      <el-col :span="4" class="icon-area">
        <el-button icon="el-icon-back" circle @click="back()"></el-button>  <!-- 뒤로가기 버튼 -->
        <el-button class="el-icon-edit" circle @click="revise()"></el-button> <!-- 수정하기 버튼 -->
        <el-button type="info" icon="el-icon-delete" circle @click="remove()"></el-button> <!-- 삭제 버튼 -->
      </el-col>
    </el-row>
    
    <!-- 하단 내용 부분 -->
    <el-row>
      <el-row justify="center" type="flex">
        <el-col :span="18">
          <el-divider></el-divider> <!--경계선-->
        </el-col>
      </el-row>
        
      <el-row justify="center" type="flex" class="content"> 
        <el-col :span="17">
          {{lists[no].content}}
        </el-col>
      </el-row>
      
    </el-row>
    <!-- 하단 입력부 끝 -->
  </el-row>
</template>

<script>
import constant from '../constant';

export default {
  name: "ListByNo",
  data() {
    return {
      lists: this.$store.state.list,    //이 리스트의 값을 store의 리스트값으로 넣는다.
    };
  },
  computed:{
    getDate(){  //날짜는 계산된 채로 불러오기 때문에 계산된 값으로 computed에 넣어서 캐싱처리
      let dateDay;
      let yearMonthDay = `${this.lists[this.no].date.getFullYear()}년
                          ${this.lists[this.no].date.getMonth()+1}월
                          ${this.lists[this.no].date.getDate()}일`;
      let hours = this.lists[this.no].date.getHours();
      let minutes = this.lists[this.no].date.getMinutes();
      
      if(minutes < 10) {minutes = `0${minutes}`;}
      
      if(hours > 12){
        hours = hours-12;
        if(hours < 10) {hours = `0${hours}`;}
        dateDay = `${yearMonthDay} 오후 ${hours}시 ${minutes}분`;
      }
      else{
        if(hours < 10) {hours = `0${hours}`;}
        dateDay = `${yearMonthDay} 오전 ${hours}시 ${minutes}분`;
      }
      return dateDay;
    },
    weather(){   //날씨 아이콘 클래스 바인딩하기 위해 사용
      return ('el-icon-'+this.lists[this.no].weather);
    }
  },
  props:['no'],
  methods: {
    back(){ //뒤로가기 버튼: 목록으로 전환
      let router = this.$router;
      router.push('/diary');
    },
    revise(){ //수정 버튼
      let router = this.$router;
      router.push(`/diary/write/${this.no}`);
    },
    remove() {  //삭제 버튼
      this.$store.commit(constant.DELETE_DIARY, {index: this.no});
      let router = this.$router;
      router.push('/diary');
      this.$message({
        type:'info',
        message: '일기를 삭제하였습니다.'
      });
    }
  }
}
</script>

<style scoped>
  .content-top{
    margin-top:2%;
    padding:0 40px 0 40px;
  }
  .date, .weather-feel-icon{
    color: gray;
  }
  .icon-area{
    text-align: right;
  }
  .el-icon-edit{
    background-color: #9C97F0;
    color: white;
  }
  .content{
    height: 500px;
    overflow-y: auto;
    overflow-x: auto;
    width: 100%;
  }
</style>
