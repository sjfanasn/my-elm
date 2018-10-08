<template>
<div>
    <head-top signin-up="msite">
        <router-link :to="'/search/geohash'" class="link_search" slot="search">
            <icon name="icon-search"></icon>
        </router-link>
        <router-link to="/home" slot="msite-title" class="msite_title">
            <span class="title_text ellipsis">{{msiteTitle}}</span>
        </router-link>
    </head-top>
    <nav class="msite_nav">
        <div class="swiper-container" v-if="foodTypes.length">
            <div class="swiper-wrapper">
                <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
                    <!-- :to="{path:'/food',query:{geohash,title:foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" -->
                    <router-link :to="{path:'food'}"  v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                        <figure>
                            <img :src="imgBaseUrl + foodItem.image_url" alt="图片">
                            <figcaption>{{foodItem.title}}</figcaption>
                        </figure>
                    </router-link>
                </div>
            </div>
             <div class="swiper-pagination"></div>
        </div>
        <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import headTop from "../../components/header/header";
import { cityGuess, msiteAddress, msiteFoodTypes } from "../../service/getData";
import { mapMutations, Store } from "vuex";
export default {
  data() {
    return {
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...",
      hasGetData: false,
      foodTypes: [], // 食品分类列表
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cityGuess();
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    // 保存geohash到vuex
    this.SAVE_GEOHASH(this.geohash);
    // 获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.data.name;

    // 记录当前经纬度
    this.RECORD_ADDRESS(res.data.latitude, res.data.longitude);
    this.hasGetData = true;
  },
  components: {
    headTop
  },
  mounted() {
    // 获取导航食品列表
    msiteFoodTypes(this.geohash)
      .then(res => {
        // this.foodTypes = res.data;
        let resArr = [...res.data];
        let foodArr = [];
        for (let i = 0, j = 0; i < res.data.length; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      })
      .then(() => {
        new Swiper(".swiper-container", {
          pagination: ".swiper-pagination",
          loop: true
        });
      });
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.link_search {
  left: 0.8rem;
  @include wh(1.2rem, 1.5rem);
  @include ct;
  color: #fff;
}

.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;

  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}

.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;

  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;

    .swiper-pagination {
      bottom: 0.2rem;
    }
  }

  .fl_back {
    @include wh(100%, 100%);
  }
}

.food_types_container {
  display: flex;
  flex-wrap: wrap;

  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);

    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }

      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}

.shop_list_container {
  margin-top: 0.4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;

  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }

    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
</style>
