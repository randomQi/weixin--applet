<!--  -->
<template>
  <scroll-view scroll-y @scrolltolower="handToLower" class="recommend_view" v-if="recommends.length>0">
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <navigator class="recommend_item" v-for="item in recommends" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
        <image class="recommend_image"
          mode="widthFix"
          :src="item.thumb"
        ></image>
      </navigator>
    </view>
    <!-- 推荐结束 -->
    <!-- 推荐 月份 开始 -->
    <view  class="months_wrap">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_info">
            <text>{{months.DD}}/</text>
            {{months.MM}} 月
          </view>
          <view class="months_text">{{months.title}}</view>
        </view>
        <view class="months_title_more">更多 ></view>
      </view>
      <view class="months_content">
        <view class="months_items"
        v-for="(item , index ) in months.items" :key="item.id">
        <goToDetail :list="months.items" :index="index">
    <image  mode="aspectFill" class="months_images" :src="item.thumb+item.rule.replace('$<Height>',360)">
    </image>
        </goToDetail>
        </view>
      </view>
    </view>
    <!-- 推荐 月份 结束 -->
    <!-- 热门 开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hots_images"
          v-for=" (item,index) in hots"
          :key="item.id"
          >
          <goToDetail :list="hots" :index="index">
        <image mode="widthFix" :src="item.thumb"> </image>
          </goToDetail>
        </view>
      </view>
    </view>
    <!-- 热门 结束 -->
  </scroll-view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import momnet from "moment";
import goToDetail from "@/components/goToDetail";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    goToDetail,
  },
  props: {
    ls: String
  },
  data() {
    //这里存放数据
    return {
      recommends: [], //推荐数据
      months: {}, //月份数据
      hots: [], //热门数据
      params: {
        limit: 30,
        order: "hot",
        skip: 0
      },
      hasMore: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //滚动触底事件
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
    },
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params
      }).then(result => {
        //仅第一次请求封装时间
        if (this.recommends.length === 0) {
          console.log(result.res);
          this.recommends = result.res.homepage[1].items;
          this.months = result.res.homepage[2];
          this.months.MM = momnet(this.months.stime).format("MM");
          this.months.DD = momnet(this.months.stime).format("DD");
        }
        //判断是否还有数据
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有数据了",
            icon: "none"
          });
          return;
        }
        //获取热门数据
        this.hots = [...this.hots, ...result.res.vertical];
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
<style <style lang="scss" scoped >
.recommend_view {
  height: calc(100vh - 37px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .recommend_item {
    width: 48%;
    // margin: 2rpx;
    border: 3rpx solid #fff;
    // overflow: auto;
    .recommend_image {
      width: 99%;
      // padding: 2rpx;
      align-self: center;
    }
  }
}
.months_wrap {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .months_title_info {
      display: flex;
      .months_info {
        color: $color;
        font-size: 30rpx;
        font-weight: 600;
        text {
          font-size: 36rpx;
          font-weight: 600;
        }
      }

      .months_text {
        font-size: 34rpx;
        margin-left: 15rpx;
      }
    }

    .months_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;
    .months_items {
      width: 32.3%;
      border: 3rpx solid #fff;
      .months_images {
        width: 99%;
        // padding: 2rpx;
        align-self: center;
      }
    }
  }
}
.hots_wrap {
  .hots_title {
    margin-left: 5rpx;
    padding: 20rpx;
    border-left: 5rpx solid $color;

    text {
      font-size: 32rpx;
      font-weight: 24rpx;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hots_images {
      width: 33.3%;
      border: 3rpx solid #fff;
      image {
        // width: 99%;
        // align-self: center;
      }
    }
  }
}
</style>