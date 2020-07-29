<!--  -->
<template>
  <view>
    <view class="home_tab">
      <view class="home_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :values="items.map(v=>v.title)"
            :current="current"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <view class="home_tab_content">
        <view v-if="current === 0">
          <homerecommend></homerecommend>
        </view>
        <view v-if="current === 1">
          <homecategory></homecategory>
        </view>
        <view v-if="current === 2">
          <homenew></homenew>
        </view>
        <view v-if="current === 3">
          <homealbum></homealbum>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import { homealbum } from "./home-album/index";
import { homecategory } from "./home-category/index";
import { homenew } from "./home-new/index";
import { homerecommend } from "./home-recommend/index";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    homealbum,
    homecategory,
    homenew,
    homerecommend,
    uniSegmentedControl
  },
  data() {
    //这里存放数据
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" }
      ],
      current: 0,
      ls:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  onLoad() {
    // this.request({
    //   url: "http://www.baidu.com",
    // }).then(res=>this.ls=res.data)
  }
};
</script>
<style lang="scss" >
.home_tab{
  .home_tab_title{
    position: relative;
    .title_inner{
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .home_tab_content{}
}
</style>
