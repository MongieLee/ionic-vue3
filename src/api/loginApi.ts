import request from "@/utils/request";

const URL = {
  token: "oauth/token", //获取token
  getUserInfo: "api/services/system/User/getUserInfo", //获取当前用户信息
};

export default {
  login(data: any) {
    return request(URL.token, "post", data, {}, true);
  },
  getUserInfo() {
    return request(URL.getUserInfo);
  },
};
