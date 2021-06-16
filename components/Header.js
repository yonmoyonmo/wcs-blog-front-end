import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={headerStyles.title}>
      <h1>wonmo cyber school</h1>
      <p className={headerStyles.descrition}></p>
    </div>
  );
};

export default Header;
