<template>
  <el-row type="flex" justify="center">
    <el-col>
      <!-- 상단 타이틀 -->
      <el-row class="content-top-margin" type="flex" justify="center">
        <el-col :span="1">
          <i class="el-icon-back" @click="cancel"></i>  <!--뒤로가기 아이콘-->
        </el-col>

        <el-col :span="16">
          <span>일기 작성</span>
        </el-col>
      </el-row>    
      <!-- /상단 타이틀 끝-->

      <!-- 하단 입력부 -->
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-divider></el-divider> <!--경계선-->

          <el-row>
            <el-col :span="24" class="content-area">

              <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" class="demo-ruleForm">
                <el-form-item label="제목" prop="title">    <!-- 제목 입력 -->
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
            
                <el-form-item label="날씨" prop="weather">    <!-- 날씨 선택 -->
                  <el-radio-group v-model="ruleForm.weather">
                    <el-radio-button label="sunny"><i class="el-icon-sunny"></i></el-radio-button>
                    <el-radio-button label="cloudy"><i class="el-icon-cloudy"></i></el-radio-button>
                    <el-radio-button label="heavy-rain"><i class="el-icon-heavy-rain"></i></el-radio-button>
                    <el-radio-button label="light-rain"><i class="el-icon-light-rain"></i></el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="기분" prop="feel">   <!-- 기분 선택 -->
                  <el-select v-model="ruleForm.feel" placeholder="기분을 선택하세요">
                    <el-option label="기쁨" value="기쁨"></el-option> 
                    <el-option label="우울" value="우울"></el-option>
                    <el-option label="화남" value="화남"></el-option>
                  </el-select>
                </el-form-item>
                          
                <el-form-item label="내용" prop="content">  <!-- 내용 입력 -->
                  <el-input type="textarea" v-model="ruleForm.content" :rows="10"></el-input>
                </el-form-item>

                <el-form-item class="submit"> <!--버튼 가운데 정렬-->
                  <el-button type="primary" @click="save('ruleForm')">저장</el-button>  <!-- 저장 버튼 -->
                  <el-button @click="cancel">취소</el-button>   <!-- 취소 버튼(목록가기) -->
                </el-form-item>
              </el-form>          
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 하단 입력부 끝 -->
    </el-col>
  </el-row>
</template>

<script>
import constant from '../constant';

export default {
  name: "DiaryWrite",
  data() {
    return {
      no: this.$route.params.no,  //라우터 파라미터 값을 받아온다.
      ruleForm:{
        title: '',
        content: '',
        weather: '',
        feel: ''
      },
      rules:{   //유효성 검사
        title:[
          {required: true, message: '제목을 입력해 주세요.', trigger: 'blur'}
        ],
        content:[
          {required: true, message: '내용을 입력해 주세요.', trigger: 'blur'}
        ],
        weather:[
          {required: true, message: '날씨를 선택해 주세요.', trigger: 'chagne'} //변경시 trigger 감지
        ],
        feel:[
          {required: true, message: '기분을 선택해 주세요.', trigger: 'change'} //변경시 trigger 감지
        ]
      }
    };
  },
  methods: {
    save(formName){   //폼 저장 버튼 클릭
      this.$refs[formName].validate((valid) => {
        if(valid){
          let date = new Date();
          let router = this.$router;

          if(this.no!=null){  //라우터 값이 있어서 no값이 null이 아니면
            let listItem ={
                          'no':this.no,
                          'title':this.ruleForm.title,
                          'content':this.ruleForm.content,
                          date,
                          'weather':this.ruleForm.weather,
                          'feel':this.ruleForm.feel
                          };
            this.$store.commit(constant.REVISE_DIARY, {list:listItem});
            this.$message({ //수정 메세지 출력
              type:'info',
              message: '일기를 수정하였습니다.'
            });
          }
          else{   //현재글이 수정이 아니라 처음 작성이라면 
            this.$store.state.list.push({ //store의 리스트에 no,title,content,date,weather,feel를 넣는다
              'no': this.$store.state.no++, //no값을 처음에 0을 통해 넣고 ++을 통한 증감 연산자를 통해서 다음 값을 증가해서 다음 등록때에는 no값이 증가
              'title': this.ruleForm.title,
              'content': this.ruleForm.content,
              date,
              'weather':this.ruleForm.weather,
              'feel':this.ruleForm.feel
            });
            this.$message({ //작성 메세지 출력
              type:'info',
              message: '일기를 작성하였습니다.'
            });
          }
          router.push('/diary');
        } 
        else{
          return false;
        }
      });
    },
    fetchData(){  //이미 작성한 글의 데이터를 data에 바인딩
      if(this.no != null){
        this.ruleForm.title = this.$store.state.list[this.no].title;
        this.ruleForm.content = this.$store.state.list[this.no].content;
        this.ruleForm.weather = this.$store.state.list[this.no].weather;
        this.ruleForm.feel = this.$store.state.list[this.no].feel;
      }
    },
    cancel() {    //취소버튼
      let router = this.$router;
      if(this.no != null){
        router.back();  //취소시에 리스트로 이동
      }
      else{  
        router.push('/diary');  //취소시에 리스트로 이동
      }
    }
  },
  created(){
    //뷰가 생성되고 데이터가 이미 감시 되고 있을 때 데이터를 가져온다.
    this.fetchData()
  }
}
</script>

<style scoped>
  .content-top-margin{
    margin-top:2%;
  }
  .content-area{
    padding: 0 5% 0 0;  
  }
  .submit {
    text-align: center;
  }
</style>
