import { promises } from "fs";
import { resolve } from "url";
import { unionTypeAnnotation } from "@babel/types";

export default (params)=>{
    //加载中
     uni.showLoading({
        title:"加载中" 
     });
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success(res){
                resolve(res.data);
            },
            fail(reject){
                reject(res.data);
            },
            complete(){
                uni.hideLoading()
            }
        }
        )
    })
}