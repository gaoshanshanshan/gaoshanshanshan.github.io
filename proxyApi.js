// 显示隐藏字段
document.querySelector(".el-card").style.display = "block";

// 代理验证ip接口
const proxyGet = axios.get.bind(axios);
axios.get = (...args) => {
  const path = args[0];
  console.log("proxyGet", path);
  if (
    path === "https://dalu.yibiao163.cn/nai/lowcode/editor/v1/questionnaire/ip"
  ) {
    console.log("拦截验证ip成功");
    return Promise.resolve({
      data: {
        status: 0,
        message: "success",
        data: "218.57.140.130, 124.70.126.44, 172.16.21.60",
      },
    });
  }
  return proxyGet(...args);
};

const proxyPost = axios.post.bind(axios);
axios.post = (...args) => {
  const path = args[0];
  console.log("proxyPOST", path);
  if (path.includes("/submit")) {
    console.log("拦截submit", ...args);
    return Promise.resolve({
      data: {
        status: 0,
        message: "success",
        data: "success",
      },
    });
  }
  return proxyPost(...args);
};
