import Header from "../components/Header";

export default function page404() {
  return (
    <>
      <Header props={"원모 싸이버 스쿨 2.0"}></Header>
      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">404</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p style={{ fontSize: "1.0rem" }}>404 : not found</p>
          </div>
        </div>
      </div>
    </>
  );
}
