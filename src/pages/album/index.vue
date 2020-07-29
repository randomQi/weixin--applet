<!--  -->
<template>
  <view>
    <!-- 专辑 背景 开始 -->
    <view class="detail_image">
      <image mode="widthFix" :src="album.cover"> </image>
      <view class="detail_info">
        <view class="detail_name">{{ album.name }}</view>
        <view class="detail_button" >关注专辑</view>
      </view>
    </view>
    <!-- 专辑 背景 结束 -->
    <!-- 专辑 详情  开始-->
    <view class="album_author">
      <view class="album_info">
        <image mode="widthFix" :src="album.user.avatar"></image>
        <view class="album_author">{{ album.user.name }}</view>
      </view>
      <view class="album_desc">
        <text class="album_detial">{{ album.desc }}</text>
      </view>
    </view>
    <!-- 专辑 详情  结束-->
    <!-- 专辑 列表  开始-->
    <view class="album_list">
        <view class="album_items" v-for="(item,index) in wallpaper" :key="item.id">
          <goToDetail :list="wallpaper" :index="index">
            <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
          </goToDetail>
        </view>
    </view>
    <!-- 专辑 列表  结束-->
    
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import goToDetail from "@/components/goToDetail";

export default {
  //import引入的组件需要注入到对象中才能使用
  
  components: {
    goToDetail,
  },
  data() {
    //这里存放数据
    return {
      //请求参数
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1
      },
      //数据id
      id: -1,
      album: {},
      wallpaper: [],
      hasMore:true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getList() {
    
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${
          this.id
        }/wallpaper`,
        data: this.params
      }).then(result => {
        console.log(result);
        if (Object.keys(this.album).length===0){
            this.album = result.res.album;
        };
        if (result.res.wallpaper.length===0){
        this.hasMore=false;
        uni.showToast({
              title:"没有数据了",
              icon:"none",
          })
        return;
    };
        this.wallpaper = [...this.wallpaper,...result.res.wallpaper];
      });
    }
  },
  onLoad(options) {
    console.log(options);
    // this.id = "5e5cf679e7bce739db1281e4";
    this.id=options.id;
    this.getList();
  },
  onReachBottom(){
      if (this.hasMore){
          this.params.first=0;
          this.params.skip+=this.params.limit;
          this.getList();
      }else{
          uni.showToast({
              title:"没有数据了",
              icon:"none",
          })
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
<style lang='scss'  scoped>
.detail_image {
  position: relative;
  image {
  }

  .detail_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: white;
    padding: 0 15rpx;
    .detail_name {
      font-style: 40rpx;
    }

    .detail_button {
      background-color: $color;
      height: 50rpx;
      width: 152rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
.album_author {
    padding: 10rox;
  .album_info {
    display: flex;
    padding: 10rpx 0;
    image {
        width:50rpx;
    }

    .album_author {
        color: black;
        margin-left: 15rpx;
    }
  }

  .album_desc {
      padding: 10rpx;
    .album_detial {
    }
  }
}
.album_list {
    display: flex;
    flex-wrap: wrap;
  .album_items {
      width: 33.33%;
      border: 3rpx solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>