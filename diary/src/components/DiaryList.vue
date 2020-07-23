<template>
<el-row type="flex" justify="center" class="list-main">
  <el-col :span="16">
    <!--리스트형,카드형,작성 검색 영역  -->
    <el-row>
        <!-- 작성(Write)로 이동 -->
        <el-col :span="19">
          <!-- (타임라인,카드) 토글 -->
          <el-radio-group v-model="radio" class="radio-group">
            <el-radio-button size="small" label="list"><i class="el-icon-tickets"></i></el-radio-button>
            <el-radio-button size="small" label="card"><i class="el-icon-menu"></i></el-radio-button>
          </el-radio-group>

          <!-- 작성 버튼 -->
          <el-button size="small" class="el-icon-edit" @click="write" circle></el-button>
        </el-col>

        <!-- 검색 부분 -->
        <el-col :span="5">
          <!-- 검색(input) -->
          <el-input v-model="search" placeholder="검색" prefix-icon="el-icon-search " 
          size="small" v-on:keyup.enter.native="submit(search)">
            <!-- 클리어 아이콘 -->
            <i slot="suffix" class="el-input__icon el-icon-circle-close el-input__clear"
              @click="reset" v-if="search !== ''"></i>
          </el-input>
        </el-col>
        <!-- /검색 부분 끝 -->
    </el-row>
    <!--/라디오 버튼(토글), 작성, 검색 영역 끝 -->

    <el-divider></el-divider><!--구분선-->
    
    <!-- 타임라인 형태 시작 -->
    <el-row v-show="radio==='list'">
      <!-- 다이어리 목록 출력 부분 -->
      <div class="scroll-box">
        <el-timeline class="scroll">
          <el-timeline-item :timestamp="getDateTime(index)" placement="top" v-for="(list,index) in lists" :key="index">
            <el-card @click.native="detail(index)">
              <div>
                <!-- 타임라인 제목 -->
                <h4>{{list.title}}</h4> 
                <!-- 타임라인 카드 날짜 년 월 일 시 분 -->
                <p class="card-date">
                  {{getCardDate(index)}}
                </p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>        
      </div>
      <!-- /다이어리 목록 출력 부분 -->
    </el-row>
    <!-- 타임라인 형태 끝 -->

    <!-- 카드 형태 시작 -->
    <el-row v-show="radio==='card'" class="scroll-box">
      <!-- 다이어리 목록 출력 부분 -->
      <el-row class="scroll" :gutter="12">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" :span="8" v-for="(list,index) in lists" :key="index">
          <!-- 카드영역 -->
          <div @click="detail(index)" class="card">
            <el-card shadow="hover">
              <div class="card-date">
                {{getDateTime(index)}} 
                <span><i @click.stop="remove(index)" class="el-icon-error"></i></span>
              </div>
              <div class="card-title">{{list.title}}</div>
              <div class="card-content">{{list.content}}</div>
            </el-card>
          </div>
          <!-- 카드영역 끝 -->
        </el-col>
      </el-row>
    </el-row>
    <!-- 카드 형태 끝 -->
    
  </el-col>
</el-row>
</template>

<script>
import Constant from '../constant'

export default {
  name: "DiaryList",
  data() {
    return {
      lists: this.$store.state.list,
      no: 0,
      search: '',
      radio: 'list',  //radio버튼
    };
  },
  created: function() {
    this.no = this.$store.state.list.no;  
  },
  methods: {
    write() {   //작성 버튼
      let router = this.$router;
      router.push({
        path: '/diary/write'
      })
    },
    reset() { //검색 초기화 버튼(claerable)
      this.search = '';
      this.lists = this.$store.state.list;
    },
    submit(search) {  //검색 enter 메소드
      let newArr = this.$store.state.list.filter(it => it.title.includes(search)); //새 리스트를 만들어서 원래의 리스트의 제목과 입력받은(search)이 포함된것 리턴
      this.lists = newArr;  //연결된 리스트에 찾은 리스트를 넣는다.
    },
    remove(index) { //다이어리 목록의 리스트 항목을 제거
      this.$store.commit(Constant.DELETE_DIARY, {index: index});
      this.$message({
        type:'info',
        message: '삭제하였습니다.'
      });
    },
    detail(no) {    //목록의 자세히 보기 버튼
      let router = this.$router;
      router.push(`/diary/${no}`);
    },
    getDateTime(index){  //날짜 타임스탬프 사용 메소드
      let date = `${this.lists[index].date.getFullYear()}년 ${this.lists[index].date.getMonth()+1}월 ${this.lists[index].date.getDate()}일`;
      return date;
    },
    getCardDate(index){ //타임라인 년월일 시분초
      let date;
      let hours = this.lists[index].date.getHours();
      let minutes = this.lists[index].date.getMinutes();
      
      if(minutes < 10) {minutes = `0${minites}`;}

      if(hours > 12){
        hours = hours-12;
        if(hours < 10) {hours = `0${hours}`;}
        date = `${this.getDateTime(index)}
                오후 ${hours}시 ${minutes}분 작성`;
      }
      else{
        if(hours < 10) {hours = "0"+hours;}
        date = `${this.getDateTime(index)}
                오전 ${hours}시 ${minutes}분 작성`;
      }
      return date;
    }
  }
}
</script>

<style scoped>
  .list-main{
    margin-top: 2%;
  }
  .el-divider--horizontal{
    margin:10px 0px 40px 0px;
  }
  .el-icon-edit{
    background-color: #9C97F0;
    color:white;
  }
  .el-icon-edit:hover{
    color:black;
  }
  .radio-group{
    margin-right: 20px;
  }
  .card{
    margin-top: 5%;
  }
  .card-date{
    font-size: 13px;
    color:#9C97F0;
  }
  .card-title,.card-content{
    margin-top: 5%;
    font-size: 13px;
  }
  .card-content{
    color: gray;
  }
  .scroll-box{
    height:500px; 
    overflow:overlay;
    overflow-x: hidden;
  }
  .scroll{
    overflow:auto;
    padding: 0 4% 0 3%;
  }
  .el-icon-error{
    float:right;
    color: gray;
  }
  .el-icon-error{
    visibility: hidden;
  }
  .el-card__body:hover .el-icon-error{
    visibility: visible;
  }
  .el-card:hover{
    background-color: #F6F7FD;
  }
</style>