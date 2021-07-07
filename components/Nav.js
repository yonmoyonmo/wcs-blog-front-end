import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <>
      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">WONMO CYBER SCHOOL 2.0</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <p style={{ textAlign: "center" }}>MENU</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <Link href="/">HOME</Link>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/notification");
              }}
            >
              <Link href="/notification">NOTIFICATION</Link>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/user/profile");
              }}
            >
              <Link href="/user/profile">MY PROFILE</Link>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/about");
              }}
            >
              <Link href="/about">ABOUT</Link>
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Nav;
