//此块代码需要优化:ffi的调用api应统一管理，
//1.日志输出应跟axios以及socket输出保持一致
//2.本身函数的callback形式不够有优雅,dll的对接应该保持统一的返回格式,方便 callback的封装以及错误抛出

import ffi from 'ffi'
import {
  Buffer
} from 'buffer';

let iconv = require("iconv-lite");

let dllApi;
try {
  dllApi = ffi.Library('./static/test1.dll', {
    'test': ['string', ['string']], //立即返回
    //'test_await': ['string', ['string']], //延时3秒返回需async调用
  })
} catch (error) {
  dllApi = {}
}
//api type callback:执行done之后调用通过callback函数
//调用dll内的函数，直到满足callback_check条件返回结果

//api type async:可通过done.async执行,dll内结束后调用js内的callback

//api type direct:可通过done执行,dll直接返回结果

const connectDevice = {
  done: dllApi.connectDevice,
  type: "async",
  callback_check: dllApi.mount,
}


// const connectDevice = {
//     done:dllApi.connectDevice,
//     type:"callback",
//     callback:dllApi.mount,
//     callback_check:dllApi.mount,
// }



export default {
  /**dll是否引入成功 */
  canUse: !!dllApi.test,
  /** 
   * @param {String} input  输入的字符串
   * @returns {String} 
   */
  test: (input) => {

    let ret = dllApi.test(iconv.encode(input, 'gbk'))

    return ret
  },

  /** 
   * @param {String} input  输入的字符串
   * @returns {Promise} Promise string
   */
  // test_await: (input) => {
  // return dllApi.test_await.async(iconv.encode(input, 'gbk'))
  // },


}
