import style from "../../styles/Layout.module.css";
import Link from "next/link";

const login = () => {
  const oauth2EndPoint =
    "http://localhost:7000/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/redirect";

  return (
    <>
      <div>login</div>
      <div className={style.card}>
          <Link href={oauth2EndPoint}>oauth 2.0 google test</Link>
      </div>
    </>
  );
};

export default login;
