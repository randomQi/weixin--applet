<!--  -->
<template>
<view>
    <view class="video_tab">
      <view class="video_tab_title">
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
      <view class="video_tab_content">
          <view v-if="current<4">
              <videomain :urlobj="{url:items[current].url,params:items[current].params}" >  </videomain>
          </view>
          <view v-if="current===4">
              <videocategory></videocategory>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videomain from "./video-main/index";
import videocategory from "./video-category/index";

export default {
//import引入的组件需要注入到对象中才能使用

components: {
    uniSegmentedControl,
    videomain,
    videocategory,

},
data() {
//这里存放数据
return {
      items: [
        { title: "推荐" , url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"}},
        { title: "娱乐" , url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"}},
        { title: "最新" , url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"}},
        { title: "热门" , url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"}},
        { title: "分类" , url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/${id}",params:{}},
      ],
      current: 0,
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
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" >
.video_tab{
  .video_tab_title{
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
  .video_tab_content{}
}
</style>