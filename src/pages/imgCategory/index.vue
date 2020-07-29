<!--  -->
<template>
  <view class="yeyx"
    ><view class="home_tab">
      <view class="category_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :values="items.map(v => v.title)"
            :current="current"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <scroll-view
        @scrolltolower="handleclick"
        scroll-y
        enable-flex
        class="category_tab_content"
      >
        <view class="category_items" v-for="item in vertical" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  //import引入的组件需要注入到对象中才能使用

  components: {
    uniSegmentedControl
  },
  data() {
    //这里存放数据
    return {
      items: [{ title: "最新", order: "new" }, { title: "热门", order: "hot" }],
      current: 0,
      id: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      vertical: [],
      hasMore: true
    };
  },
  onLaunch() {},
  onLoad(options) {
    this.id = options.id;
    // this.id = "4e4d610cdf714d2966000000";
    this.getList();
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleclick() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }else{
          return;
      }
      this.params.order = this.items[e.currentIndex].order;
      this.params.skip=0;
      this.vertical=[];
      this.getList();
    },
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${
          this.id
        }/vertical`,
        data: this.params
      }).then(result => {
        // console.log(result);
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有数据了",
            icon: "none"
          });
          return;
        }
        this.vertical = [...this.vertical, ...result.res.vertical];
      });
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script >
<style lang="scss" scoped>
.home_tab {
  .category_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .category_tab_content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .category_items {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>