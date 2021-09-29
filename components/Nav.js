import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="window" style={{ margin: "1rem" }}>
      <div className="title-bar">
        <div className="title-bar-text">Wonmo Cyber School 2</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div
        className="window-body"
        style={{ textAlign: "center", padding: "1rem" }}
      >
        <Link href="/">
          <button>home</button>
        </Link>

        <Link href="/notification">
          <button>notification</button>
        </Link>

        <Link href="/user/profile">
          <button>your_profile</button>
        </Link>

        <Link href="/about">
          <button>about</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
