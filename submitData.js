(function () {
  const debug = false;
  const submit = false;
  const contextMap = {
    // 测试环境
    debug,
    // 是否提交数据，不提交数据打印最新提交数据
    submit,
    domain: debug ? "http://lctest.yibiao163.cn" : "https://dalu.yibiao163.cn",
    appCode: debug ? "nI8PKx4NO8YHp5X" : "TyQff7e3hi9Tw3k",
    moduleCode: debug ? "Y16Z5wtHbinqz4Z" : "tGuHzGbamoytfYt",
    name: debug ? "dfsfj" : "王高山",
    dept: debug ? "xxsdfjkl" : "研发部",
    signature: debug
      ? "https://ybpt-public.obs.cn-north-4.myhuaweicloud.com/a5212b6393234525444b38d4cee1d358/ykCust/be28a25044034baa838d4c3343d08bcd/%E7%AD%BE%E5%90%8D_b4b736ad69c5456a8919dabc2ee2b330.png"
      : "https://ybpt-public.obs.cn-north-4.myhuaweicloud.com/a5212b6393234525444b38d4cee1d358/ykCust/473db1f05b804751848db089a9bea588/签名_0a72caa304494e59bbd397bd1142c1ed.png",
    queId: "",
    queCode: "",
    theme: "",
    formDesignVersion: "",
  };
  function getQueInfo() {
    Promise.all([
      axios.get(
        `${contextMap.domain}/nai/lowcode/editor/v1/questionnaire/last/${contextMap.appCode}/${contextMap.moduleCode}`
      ),
      axios.get(
        `${contextMap.domain}/nai/lowcode/editor/v1/formDesign/code?moduleCode=${contextMap.moduleCode}&appCode=${contextMap.appCode}`
      ),
    ]).then(([queResp, designResp]) => {
      console.log("getQueInfo", queResp, designResp);
      if (queResp.data && queResp.data.status == "0") {
        const data = queResp.data.data;
        contextMap.queId = data.id;
        contextMap.queCode = data.queCode;
        contextMap.theme = data.content.theme;
      }
      if (designResp.data && designResp.data.status == "0") {
        const data = designResp.data.data;
        contextMap.formDesignVersion = data.version;
      }
      console.log("getQueInfo after", contextMap);
      submitData();
    });
  }

  function submitData() {
    if (contextMap.submit) {
      const { queId, theme, name, dept, signature, formDesignVersion } =
        contextMap;
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      axios
        .post(
          `${contextMap.domain}/nai/lowcode/editor/v1/questionnaire/bd/${contextMap.appCode}/${contextMap.moduleCode}/${contextMap.queCode}/submit`,
          {
            content: {
              theme,
              name,
              dept,
              signature,
              uuid,
              sign: `QD_${queId}_${uuid}`,
              queId,
              ipAddress: "218.57.140.130, 124.70.126.44, 172.16.21.60",
              isWx: "是",
              ua: "mozilla/5.0 (linux; android 11; redmi k60 build/rkq1.200826.002; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/126.0.6478.122 mobile safari/537.36 xweb/1260053 mmwebsdk/20240501 mmwebid/959 micromessenger/8.0.50.2701(0x28003252) wechat/arm64 weixin nettype/wifi language/zh_cn abi/arm64 edg/126.0.0.0",
            },
            formDesignVersion,
            token: "",
            openId: "",
          }
        )
        .then((res) => {
          if (res.data && res.data.status == "0") {
            console.log("🎉🎉🎉 提交成功");
            fetchNewData();
          } else {
            console.log("💔💔💔 提交失败", res);
          }
        });
    } else {
      fetchNewData();
    }
  }

  function fetchNewData() {
    axios
      .post(
        `${contextMap.domain}/nai/lowcode/editor/v1/questionnaire/bd/${contextMap.appCode}/${contextMap.moduleCode}/getLastDetailByFormField`,
        {
          fieldCode: "name",
          fieldValue: contextMap.name,
        }
      )
      .then((res) => {
        if (res.data && res.data.status == "0") {
          console.log("最新提交数据为：", res.data);
        } else {
          console.log("没有获取到最新数据", res);
        }
      });
  }
  getQueInfo();
})();
