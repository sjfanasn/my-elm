<template>
<div class="city_container">
    <head-top :head-title="cityName" go-back="true">
        <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
        <div>
            <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model="inputValue">
        </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click="postpois" value="提交">
        </div>
    </form>
    <header v-if="historyTitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
        <li v-for="(item,index) in placeList" @click="nextpage(index,item.geohash)" :key="index">
            <h4 class="pois_name ellipsis">{{item.name}}</h4>
            <p class="pois_address ellipsis">{{item.address}}</p>
        </li>
    </ul>
    <footer v-if="historyTitle && placeList.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
</div>
</template>

<script>
import headTop from "../../components/header/header";
import { currentcity, searchplace } from "../../service/getData";
export default {
  data() {
    return {
      inputValue: "", // 搜索地址
      cityId: "", // 当前城市id
      cityName: "", //当前尝试名称
      placeList: [], // 搜索城市列表
      placeHistory: [], // 访问城市历史记录
      historyTitle: true, //
      placeNone: false
    };
  },
  mounted() {
    this.cityId = this.$route.params.cityId;
    // 获取当前城市名称
    currentcity(this.cityId).then(res => {
      this.cityName = res.data.name;
    });
    this.initData();
  },
  components: {
    headTop
  },
  methods: {
    //   获取历史数据
    initData(){
        if(localStorage.getItem('placeHistory')){
            this.placeList = JSON.parse(localStorage.getItem('placeHistory'));
        }else {
            this.placeList =[];
        }
    },
    // search click
    postpois() {
      if (this.inputValue) {
        searchplace(this.cityId, this.inputValue).then(res => {
          this.historyTitle = false;
          this.placeList = res.data;
          this.placeNone = res.data.length ? false : true;
        });
      }
    },
    /**
     * 点击搜索进入下一个页面前，判断历史记录中是否有当前城市，
     * 如果存在，则不添加到历史记录中，
     * 如果不存在则添加到历史记录中，然后进入下一个页面
     */
    nextpage(index, geohash) {
      let history = localStorage.getItem("placeHistory");
      let choosePlace = this.placeList[index];
      if (history) {
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        for (const item of this.placeHistory) {
          if (item.geohash === geohash) {
            checkrepeat = true;
          }
        }
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace);
        }
      } else {
        this.placeHistory.push(choosePlace);
      }
      localStorage.setItem("placeHistory", JSON.stringify(this.placeHistory));
      this.$router.push({ path: "/msite", query: { geohash } });
    },
    clearAll(){
        if(!localStorage.getItem('placeHistory')) return;
        localStorage.removeItem('placeHistory');
        this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.city_container {
  padding-top: 2.35rem;
}

.change_city {
  right: 0.4rem;
  @include sc(0.6rem, #fff);
  @include ct;
}

.city_form {
  background-color: #fff;
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-top: 0.4rem;

  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;

    .input_style {
      border-radius: 0.1rem;
      margin-bottom: 0.4rem;
      @include wh(100%, 1.4rem);
    }

    .city_input {
      border: 1px solid $bc;
      padding: 0 0.3rem;
      @include sc(0.65rem, #333);
    }

    .city_submit {
      background-color: $blue;
      @include sc(0.65rem, #fff);
    }
  }
}
.pois_search_history {
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
}
.getpois_ul {
  background-color: #fff;
  border-top: 1px solid $bc;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;
    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(0.65rem, #333);
    }
    .pois_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(0.45rem, #999);
    }
  }
}
.search_none_place {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-indent: 0.5rem;
}
.clear_all_history {
  @include sc(0.7rem, #666);
  text-align: center;
  line-height: 2rem;
  background-color: #fff;
}
</style>
