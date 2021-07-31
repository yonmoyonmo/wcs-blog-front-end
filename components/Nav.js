import Link from "next/link";
import { useRouter } from "next/router";
import navStyle from "../styles/Nav.module.css";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Wonmo Cyber School 2</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className={navStyle.nav}>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/notification">NOTIFICATION</Link>
          </li>
          <li>
            <Link href="/user/profile">MY_PROFILE</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
