import navStyles from "../styles/Nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/notification">notification</Link>
        </li>
        <li>
          <Link href="/user/profile">user profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
