<!--  -->
<template>
  <view>
    <!-- 用户信息开始 -->
    <view class="img_title_wrap">
      <view class="user_icon">
        <image mode="widthFix" :src="imageDetail.user.avatar"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{ imageDetail.user.name }}</view>
        <view class="user_time">{{ imageDetail.ctime }}</view>
      </view>
    </view>
    <!-- 用户 信息 结束 -->
    <!-- 高清图 开始 -->
    <view class="heigth_image">
      <swiperAction @swiperAction="handleswiperAction">
      <image :src="imageDetail.thumb" mode="widthFix"></image>
      </swiperAction>
    </view>
    <!-- 高清图 结束 -->
    <!-- 带赞 收藏 开始 -->
    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{ imageDetail.rank }}</text>
      </view>
      <view class="collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 带赞 收藏 结束 -->
    <!-- 列表 开始 -->
    <view class="list_wrap" v-if="album.length">
      <!-- 标题 -->
      <view class="list_title">相关</view>
      <view class="list_item" v-for="item in album" :key="item.id">
        <view class="list_img">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="album_info">
          <view class="album_info_text">专辑</view>
          <view class="album_info_name">{{ item.name }}</view>
          <text class="iconfont iconiconfontjiantou4"></text>
        </view>
      </view>
    </view>
    <!-- 列表 结束 -->
    <!-- 评论开始 -->
    <!-- <view class="comment hot">
      <view class="comment_title">
        <text class="iconfont iconhot1"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list"> </view>
    </view> -->
<!-- 最热 -->
<view
      class="comment hot"
      v-if="hot.length"
    >
      <view class="comment_title">
        <text class="iconfont iconhot1"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view
          class="comment_item"
          v-for="item in hot"
          :key="item.id"
        >
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image
                mode="widthFix"
                :src="item.user.avatar"
              ></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for=" item2 in  item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              ></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新 -->
    <view
      class="comment new"
      v-if="comment.length"
    >
      <view class="comment_title">
        <text class="iconfont iconpinglun"></text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view
          class="comment_item"
          v-for="item in comment"
          :key="item.id"
        >
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image
                mode="widthFix"
                :src="item.user.avatar"
              ></image>
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{item.user.name}}</view>
              <view class="user_time">{{item.cnTime}}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for=" item2 in  item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              ></image>
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>  
    </view>
    <!-- 评论结束 -->
    <!-- 下载图片 -->
      <view class="image_download">
        <view class="download_button" @click="handledownload">
          下载图片
        </view>
      </view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment";
import swiperAction from "@/components/swiperAction";
moment.locale("zh-cn");
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    swiperAction,
  },
  data() {
    //这里存放数据
    return {
      //获取缓存中的数据
      imageDetail: {},
      album: [], //专辑数据
      comment: [], //最新评论
      hot: [], //热门评论
      imgindex: 0, //图片索引
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //下载图片
    // uni.downloadfile

    async handledownload(){
      await uni.showToast({title:"下载中",icon:"loading"});
      const result1=await uni.downloadFile({url:this.imageDetail.thumb});
      console.log(result1);
      const {tempFilePath}=result1[1];
      const result2=await uni.saveImageToPhotosAlbum({filePath:tempFilePath});
      uni.hideToast;
      await uni.showToast({title:"下载成功",icon:"success"});
    },
    getDate(){
      const { imglist } = getApp().globalData;
    this.imageDetail = imglist[this.imgindex];
    // this.imageDetail.newThumb =
      // this.imageDetail.thumb + this.imageDetail.rule.replace("$<Height>", 360);
    this.imageDetail.ctime = moment(this.imageDetail.atime * 1000).fromNow();
    this.request({
      url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${
        this.imageDetail.id
      }/comment`
    }).then(reulst => {
      console.log(reulst);
      this.album = reulst.res.album;
      this.comment = reulst.res.comment;
      this.hot = reulst.res.hot;
    });
    console.log(this.imageDetail);
    },
    handleswiperAction(e){
      const { imglist } = getApp().globalData;
      if (e.direction==="left"&&this.imgindex<imglist.length-1){
        this.imgindex++;
        this.getDate();
      }else if(e.direction==="right"&&this.imgindex>0){
        this.imgindex--;
        this.getDate();
      }else{
        uni.showToast({
          title:'没有数据了',
          icon:"none",
        })
      }
      console.log(e);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  onLoad() {
    console.log(getApp().globalData);
    //获取缓存中的数据

    const {  imgindex } = getApp().globalData;
    this.imgindex=imgindex;
    this.getDate();
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
.img_title_wrap {
  display: flex;
  padding: 20rpx;
  .user_icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
      color: black;
      font-weight: 600;
    }

    .user_time {
      font-size: 24rpx;
      color: #ccc;
      padding: 10rpx 0;
    }
  }
}
.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 1px solid #ccc;
  .rank {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text.iconfont.icondianzan {
    }
  }

  .collect {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text.iconfont.iconshoucang {
    }
  }
}
.list_wrap {
  padding: 20rpx;
  .list_title {
  }

  .list_item {
    display: flex;
    padding: 10rpx 0;
    border-bottom: 3rpx solid #ccc;
    .list_img {
      flex: 1;
      image {
        width: 180rpx;
        height: 180rpx;
      }
    }

    .album_info {
      position: relative;
      flex: 3;
      padding-left: 10rpx;
      .album_info_text {
        background-color: $color;
        width: 100rpx;
        height: 50rpx;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .album_info_name {
        padding: 10rpx 0;
        color: #888;
      }
      .iconfont {
        position: absolute;
        font-size: 24rpx;
        top: 50%;
        transform: translateY(-50%);
        right: 10%;
        color: black;
      }
    }
  }
}
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }

  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eee;
      // 用户信息
      .comment_user {
        display: flex;
        padding: 20rpx 0;
        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }

        .user_name {
          flex: 1;
          .user_nickname {
            color: #777;
          }

          .user_time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }
      // 评论数据
      .comment_desc {
        display: flex;
        padding: 30rpx 0;
        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }

        .comment_like {
          text-align: right;
          .icondianzan {
          }
        }
      }
    }
  }
}

// 最新评论
.new {
  .iconpinglun {
    color: aqua !important;
  }
}
.image_download {
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download_button {
    height: 60%;
    width: 90%;
    // border-radius: 35%;
    background-color:$color;
    color: white;
    font-size: 30rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;



  }
}
</style>