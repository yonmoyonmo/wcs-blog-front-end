import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const logout = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);
  const router = useRouter();

  useEffect(() => {
    window.location.reload();
    console.log("use effect");
    router.push("/");
  }, []);
  if (cookie.userToken) {
    console.log("remove cookie");
    removeCookie("userToken");
  }
  return (
    <>
      <div>logout</div>
    </>
  );
};
export default logout;
