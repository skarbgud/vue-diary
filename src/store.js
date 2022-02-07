import Vue from "vue";
import Vuex from "vuex";
import Constant from "./constant";

Vue.use(Vuex);

//vuex
export const store = new Vuex.Store({
  state: { //저장하는 값들
    name: '남규형', //사용자이름
    no: 0, //인덱스
    list: [] //목록리스트
  },
  mutations: {
    [Constant.CLEAR_LIST]: (state) => {
      state.list = [];
    },
    [Constant.DELETE_DIARY]: (state, payload) => {  //다이어리글 삭제
      state.list.splice(payload.index, 1); //payload.index -> 지울려고하는 인덱스 값
    },
    [Constant.REVISE_DIARY]: (state, payload) => { //다이어리 글 수정
      state.list[payload.list.no] = payload.list; //payload.no 값으로 인덱스 지정 후 payload의 리스트로 저장
    }
  }
});