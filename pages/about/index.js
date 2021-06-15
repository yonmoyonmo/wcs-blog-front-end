import { useCookies } from "react-cookie";
import style from "../../styles/Layout.module.css";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  return (
    <div className={style.container}>
      about
      <p>아시발귀찮아</p>
      <a href="/">to home</a>
      <p className={style.card}>{token}</p>
    </div>
  );
};

export default about;
