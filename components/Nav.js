import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Nav = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/about">about</Link>
        </li>
        {cookie.userToken ? (
          <Link href="/logout">logout</Link>
        ) : (
          <Link href="login">login</Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
