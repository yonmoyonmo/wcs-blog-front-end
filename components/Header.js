import headerStyles from "../styles/Header.module.css";

const Header = ({props}) => {
  return (
    <div className={headerStyles.title}>
      <h1>wonmo cyber school</h1>
      <p className={headerStyles.descrition}>
        {props}
      </p>
    </div>
  );
};

export default Header;
