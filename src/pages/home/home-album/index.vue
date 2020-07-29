<!--  -->
<template>
  <scroll-view scroll-y @scrolltolower="handToLower" class="album_scroll_view">
    <!-- 专辑 轮播图 开始 -->
    <view class="album_wrap">
      <view class="ablum_scrollimage">
        <swiper indicator-dots autoplay circular>
          <swiper-item v-for="item in banner" :key="item.id">
            <image :src="item.thumb"></image>
          </swiper-item>
        </swiper>
      </view>
      <!-- 专辑 轮播图 结束 -->
    </view>
    <!-- 专辑 列表 开始 -->
    <view class="ablum_itemswrap">
      <navigator
        :url="`/pages/album/index?id=${item.id}`"
        class="item_list"
        v-for="item in album"
        :key="item.id"
      >
        <view class="item_image">
          <image mode="aspectFIll" :src="item.cover"> </image>
        </view>
        <view class="item_info">
          <view class="item_title">{{ item.name }}</view>
          <view class="item_content">{{ item.desc }}</view>
          <view class="item_buntton">
            <view class="item_attention">关注</view>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 专辑 列表 结束 -->
  </scroll-view>
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
      //请求参数
      params: {
        limit: 30,
        order: "new",
        skip: 0
      },
      //轮播图数据
      banner: [],
      //列表数据
      album: [],
      //是否含有分页数据
      hasMore: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //获取数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params
      }).then(result => {
        console.log(result);

        if (this.banner.length === 0) {
          this.banner = result.res.banner;
        }
        if (result.res.album.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有数据了",
            icon: "none"
          });
          return;
        }
        this.album = [...this.album, ...result.res.album];
      });
    },
    //出发事件 分页加载数据
    handToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑"
    });
    this.getList();
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
<style lang="scss"  scoped>
.album_scroll_view {
  height: calc(100vh - 37px);
}
.album_wrap {
  .ablum_scrollimage {
    swiper {
      height: calc(750rpx / 2.23);
      swiper-item {
        image {
          height: 100%;
        }
      }
    }
  }
}
.ablum_itemswrap {
  padding: 10rpx;
  .item_list {
    display: flex;
    // flex-wrap: wrap;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #ccc;
    .item_image {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .item_info {
      flex: 2;
      padding: 20 10rpx;
      overflow: hidden;
      view.item_title {
        font-size: 30rpx;
        font-weight: 24rpx;
        color: black;
        padding: 20 0rpx;
      }

      .item_content {
        margin: 10rpx 0;
        padding: 10 0rpx;
        font-size: 24rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .item_buntton {
        padding: 10rpx;
        margin: 10rpx 0;
        display: flex;
        justify-content: flex-end;
        .item_attention {
          border: 3rpx solid $color;
          color: $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>