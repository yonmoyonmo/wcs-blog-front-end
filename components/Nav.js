import Link from "next/link";
import { useRouter } from "next/router";


const Nav = () => {
  const router = useRouter();
  return (
    <div className="window" style={{margin:"1rem"}}>
      <div className="title-bar">
        <div className="title-bar-text">Wonmo Cyber School 2</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body" style={{ textAlign: "center", padding:"1rem"}}>
          <button>
            <Link href="/">home</Link>
          </button>
          <button>
            <Link href="/notification">notification</Link>
          </button>
          <button>
            <Link href="/user/profile">your_profile</Link>
          </button>
          <button>
            <Link href="/about">about</Link>
          </button>
      </div>
    </div>
  );
};

export default Nav;
