export const getToken = () => {
  const Authentication: any = localStorage.getItem("persist:root");
  const authenString = JSON.parse(Authentication);
  const authData = JSON.parse(authenString.Authentication);
  const { token } = authData;
  return token;
};
export const parseJwt = (token: any) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(atob(base64));
  return JSON.parse(jsonPayload);
};
