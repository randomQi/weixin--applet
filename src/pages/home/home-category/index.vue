<!--  -->
<template>
  <view>
    <view class="catrgory_wrap">
      <navigator class="catrgory_items" 
      v-for="item in category" 
      :key="item.id"
      :url="`/pages/imgCategory/index?id=${item.id}`">
        <image :src="item.cover" mode="aspcetFill"></image>
        <view class="catrgory_name">{{ item.name }}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      category: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类"
    });
    this.request({
      url: "http://157.122.54.189:9088/image/v1/vertical/category"
    }).then(result => {
      console.log(result);
      this.category = result.res.category;
      console.log(this.category);
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
.catrgory_wrap {
  display: flex;
  flex-wrap: wrap;
  .catrgory_items {
    //   padding: 10rpx;
    width: 33.33%;
    position: relative;
    border: 3px solid #fff;
    image {
      height: 240rpx;
    }

    .catrgory_name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50rpx;
      color: white;
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 40rpx;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>