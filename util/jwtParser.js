const jwtParser = (token) => {
  if (!token) {
    return "no token";
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const parsed = JSON.parse(window.atob(base64));
  return parsed.email;
};
export default jwtParser;