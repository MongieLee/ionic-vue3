/**
 * @description: 校验token有效时长
 * @param {void} void
 * @return {boolean} boolean
 */
const hasExpired = (): boolean => {
  const accessToken = window.localStorage.getItem("access_token");
  const expiresTime = Date.parse(
    window.localStorage.getItem("expires_time") ?? ""
  );
  const expired = !(expiresTime >= Date.now());
  return accessToken === undefined || accessToken === "undefined" || expired;
};

export { hasExpired };
