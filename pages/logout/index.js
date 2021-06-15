import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const logout = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);
  const router = useRouter();

  useEffect(() => {
    if (cookie.userToken != null) {
      removeCookie("userToken");
      router.push("/");
    }
  }, []);
  return (
    <>
      <div>logout</div>
    </>
  );
};
export default logout;
