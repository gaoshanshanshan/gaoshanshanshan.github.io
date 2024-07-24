/**
 * 验证ip逻辑
 */
var DSV = this.getGlobalDsv();
//获取IP地址
axios
  .get("https://dalu.yibiao163.cn/nai/lowcode/editor/v1/questionnaire/ip")
  .then((r) => {
    if (r.data) {
      var ip = r.data.data;
      if (DSV && DSV.formPageStatus === "0") {
        this.getWidgetRef("ipAddress").setValue(ip);
      }
      var title = this.getWidgetRef("theme").getValue();
      var queId = this.getWidgetRef("queId").getValue();
      if (!ip.includes("218.57.140.131") && !ip.includes("218.57.140.130")) {
        this.$message.error("请连接公司WIFI后再次签到");
      } else {
        var isWx = this.getWidgetRef("isWx").getValue();
        if (isWx && isWx === "否") {
          this.$message.error("请使用微信扫码签到");
        } else {
          var uuid = getUuid();
          axios({
            method: "post",
            url:
              DSV.apiServer +
              "/nai/lowcode/editor/v1/questionnaire/bd/TyQff7e3hi9Tw3k/tGuHzGbamoytfYt/getLastDetailByFormField",
            data: { fieldCode: "sign", fieldValue: "QD_" + queId + "_" + uuid },
          }).then((res) => {
            if (res.data.data && res.data.data !== {}) {
              var createTime = res.data.data.createTime;
              var now = new Date().getTime();
              var duringTime = now - createTime;
              //4小时后可以在同样的签到标识下继续签到
              if (duringTime > 14400000) {
                callback(); //pass
              } else {
                this.$message.error("本机已签到，请勿重复签到");
                //callback(new Error('本机已签到，请勿重复签到'))  //fail
              }
            } else {
              callback(); //pass
            }
          });
        }
      }
    } else {
      callback(new Error("校验错误"));
    }
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

/**
 * test
 */
const proxyPOST = axios.post.bind(axios);
axios.post = (...args) => {
  console.log("xxxxxx post", ...args);
  return proxyPOST(...args);
};

// 问卷地址
const teest =
  "https://dalu.yibiao163.cn/lowcode/editor/survey/TyQff7e3hi9Tw3k/tGuHzGbamoytfYt/qQIhL7TSzsaGrZQ/1713489028090";

// 问卷提交地址
const requestUrl =
  "http://dalu.yibiao163.cn/nai/lowcode/editor/v1/questionnaire/bd/TyQff7e3hi9Tw3k/tGuHzGbamoytfYt/qQIhL7TSzsaGrZQ/submit";

// 问卷提交结构
const a = {
  content: {
    theme: "数据中台方法论概述探讨会-马树成",
    name: "王高山",
    dept: "研发部",
    signature:
      "https://ybpt-public.obs.cn-north-4.myhuaweicloud.com/a5212b6393234525444b38d4cee1d358/ykCust/fd98fc58160349cab1dbf13e623664ab/签名_f11c5aa054ff4191aee3766f95a21ec8.png",
    uuid: "74165397-82ba-4bed-8c8c-40534df1924e",
    sign: "QD_538bcd1b2b7eeb5ade0180cd0f04d956_74165397-82ba-4bed-8c8c-40534df1924e",
    queId: "538bcd1b2b7eeb5ade0180cd0f04d956",
    ipAddress: "218.57.140.130, 124.70.126.44, 172.16.21.60",
    isWx: "是",
    ua: "mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/126.0.0.0 safari/537.36 edg/126.0.0.0 micromessenger",
  },
  formDesignVersion: "1712829630182",
  token: "a3aeeac3680ce45a2dfd0d5a07d4d58a",
  openId: "",
};

const aa = {
  queId: "538bcd1b2b7eeb5ade0180cd0f04d956",
  signature:
    "https://ybpt-public.obs.cn-north-4.myhuaweicloud.com/a5212b6393234525444b38d4cee1d358/ykCust/473db1f05b804751848db089a9bea588/签名_0a72caa304494e59bbd397bd1142c1ed.png",
  name: "王高山",
  sign: "QD_538bcd1b2b7eeb5ade0180cd0f04d956_8e0119d8-beb6-4815-bfd0-06aace9ba61e",
  ipAddress: "218.57.140.131, 124.70.125.51, 172.16.21.73",
  isWx: "是",
  theme: "数据中台方法论概述探讨会-马树成",
  dept: "研发部",
  ua: "mozilla/5.0 (linux; android 11; redmi k30 pro build/rkq1.200826.002; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/126.0.6478.122 mobile safari/537.36 xweb/1260053 mmwebsdk/20240501 mmwebid/959 micromessenger/8.0.50.2701(0x28003252) wechat/arm64 weixin nettype/wifi language/zh_cn abi/arm64",
  uuid: "8e0119d8-beb6-4815-bfd0-06aace9ba61e",
};
/**
 * 最新版逻辑
 */
// 从二维码页面拿到queid和id来获取问卷二维码变化地址
// http://localhost:9527/lowcode/editor/survey/3VvJGSfAz9SepeN/QFqHLxYjZ0CuX10/BF9toSh50czdiiR/xSFLecwkappiKD1W7347YQ
// http://localhost:9527/lowcode/editor/qrcode/3VvJGSfAz9SepeN/QFqHLxYjZ0CuX10/BF9toSh50czdiiR/0b3c370ee3c2d144700d1a3dd5ccb998/1721641583338

// // https://dalu.yibiao163.cn/nai/lowcode/editor/v1/questionnaire/last/3VvJGSfAz9SepeN/QFqHLxYjZ0CuX10
