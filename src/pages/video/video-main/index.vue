<!--  -->
<template>
  <view>
    <scroll-view
      scroll-y
      enable-flex
      @scrolltolower="handleclick"
      class="video_warp"
    >
      <view class="video_items" v-for="item in videowp" :key="item.id" @click="goToVideo(item)">
        <image mode="widthFIx" :src="item.img"></image>
      </view>
    </scroll-view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    urlobj: Object
  },
  data() {
    //这里存放数据
    return {
      videowp: [],
      hasMore: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 视频图片点击事件
    goToVideo(item){
      
        console.log(item);
        // 存储数据到全局共享里
        getApp().globalData.video=item;
         uni.navigateTo({
        url:"/pages/videoPlay/index"
      });
    },
    getlist() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      }).then(result => {
        if (result.res.videowp.length === 0) {
          this.hasMore = false;
          uni.showToast({ title: "没有数据了", icon: "none" });
          return;
        }
        this.videowp = [...this.videowp, ...result.res.videowp];
      });
    },
    handleclick() {
      if (this.hasMore) {
        this.urlobj.params.skip += this.urlobj.params.limit;
        this.getlist();
      } else {
        uni.showToast({ title: "没有数据了", icon: "none" });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getlist();
  },
  watch: {
    urlobj() {
      this.videowp = [];
      this.getlist();
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script >
<style lang='scss' scoped >
.video_warp {
  display: flex;
  flex-wrap: wrap;
  border: 3rpx solid #fff;
  height: calc(100vh - 36px);
  .video_items {
    width: 33.33%;
    padding: 5rpx;
    image {
    }
  }
}
</style>