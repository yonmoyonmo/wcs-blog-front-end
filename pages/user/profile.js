import { useCookies } from "react-cookie";
import Link from "next/link";

const profile = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);

  return (
    <div>
      {cookie.userToken ? (
        <Link href="/logout">logout</Link>
      ) : (
        <Link href="/login">login</Link>
      )}
    </div>
  );
};

export default profile;
