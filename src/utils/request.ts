import axios, { Method } from "axios";
import Qs from "qs";
import showToast from "@/utils/showToast";

axios.defaults.baseURL = "https://www.baiz.cn:4433";

const updateToken = (
  accessToken: string,
  refresh_token: string,
  expires: number
): void => {
  window.localStorage.setItem("access_token", accessToken);
  window.localStorage.setItem("refresh_token", refresh_token);
  const expires_time = new Date(Date.now() + expires * 1000).toString();
  window.localStorage.setItem("expires_time", expires_time);
};

const removeToken = (): void => {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
  window.localStorage.removeItem("expires_time");
};

const BizRequest = (
  url: string,
  method: Method = "get",
  data: any = {},
  params: any = {},
  isToken = false
) => {
  let options = {
    url,
    method,
    data,
    params,
    headers: {},
  };

  if (isToken) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: Qs.stringify({
        grant_type: "password",
        client_id: "BizClient",
        client_secret: "BizClient",
        ...data,
      }),
    };
  }

  return new Promise((resolve, reject) => {
    const tokenString = window.localStorage.getItem("access_token");
    if (tokenString) {
      axios.defaults.headers["Authorization"] = "Bearer " + tokenString;
    }
    axios(options)
      .then(async (response: any) => {
        if (response.status === 200) {
          if (isToken) {
            updateToken(
              response.data.access_token,
              response.data.refresh_token,
              response.data.expires_in
            );
            resolve(response);
          } else {
            resolve(response.data);
          }
        } else {
          showToast({
            message: "请求失败",
          });
          reject(response);
        }
      })
      .catch(async (err: any) => {
        showToast({
          message: err.response?.data.error_description || err.message,
        });
        reject(err);
      });
  });
};

export default BizRequest;
export { removeToken };
