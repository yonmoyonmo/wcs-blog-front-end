import { useCookies } from "react-cookie";
import { endpointMania } from "../../util/enpointMania";
import { useEffect } from "react";
import React, { useState } from "react";

const adminHome = () => {
  const [cookie, setCookie] = useCookies(["adminToken"]);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const tokenEndpoint = endpointMania("/admin/wonmo/login");

  useEffect(()=>{
    if(cookie.adminToken){
      setToken(cookie.adminToken);
    }
  },[])

  const getAdminToken = async (e) => {
    e.preventDefault();
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wonmo: email,
        wonmokey: password,
      }),
    });
    const adminTokenData = await response.json();
    if(adminTokenData && adminTokenData.success){
      setCookie("adminToken", adminTokenData.data, {
        path:"/",
        maxAge: 3600000,
      });
      window.location.reload();
    }else{
      setLoginError("뭔가 잘못됨")
    }
  };

  return (
    <div>
      <p>admin home</p>
      <hr />
      <form onSubmit={getAdminToken}>
        <input
          type="text"
          value={email}
          placeholder="admin account"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="login" />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </div>
  );
};
export default adminHome;
