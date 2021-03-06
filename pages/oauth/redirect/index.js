import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import Link from "next/link";

const oauthRedirect = () => {
  const router = useRouter();
  const { token, error } = router.query;
  const [cookie, setCookie] = useCookies(["userToken"]);

  useEffect(() => {
    if (token) {
      setCookie("userToken", token, {
        path: "/",
        maxAge: 360000,
      });
    }
    if (error) {
      console.log(error);
    }
    router.push("/");
  }, [token, error]);
  return (
    <>
      <div>
        <p>wonmo cyber google OAuth 2.0</p>
        <Link href="/">to home</Link>
      </div>
    </>
  );
};

export default oauthRedirect;
