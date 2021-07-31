import Link from "next/link";
import { endpointMania } from "../../util/enpointMania";
import { useState } from "react";
import { useRouter } from "next/router";
import style from "../../styles/Layout.module.css";

const wcsSoolMukbang = ({ roomlist }) => {
  const [roomName, setRoomName] = useState("");
  const [nameError, setNameError] = useState("");

  const router = useRouter();

  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"\ ]/gi;

  const roomPostEndpoint = endpointMania("/api/public/chat-room");

  const submitRoom = async (e) => {
    e.preventDefault();

    const link = `https://wonmocyberschool.com/vchat/${roomName}`;
    try {
      const response = await fetch(roomPostEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          roomLink: link,
        }),
      });
      const data = await response.json();
      if (data && data.success) {
        console.log("room creation success");
        window.location.reload();
      } else {
        setNameError("방 만들기 실패!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createRomm = (
    <div className="window" style={{ width: "300px" }}>
      <div className="title-bar">
        <div className="title-bar-text">
          <p>술먹방만들긔</p>
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div
        className="field-row"
        style={{ justifyContent: "center", padding: "1rem" }}
      >
        <form onSubmit={submitRoom}>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <input
              style={{ width: "250px", margin: "1rem" }}
              type="text"
              maxLength="12"
              placeholder="set a nickname"
              value={roomName}
              onChange={(e) => {
                if (regExp.test(e.target.value)) {
                  setNameError("특수문자 포함 불가능");
                  setRoomName(e.target.value.replace(regExp, ""));
                  return;
                }
                setRoomName(e.target.value);
              }}
            ></input>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <input type="submit" value="원모 싸이버 술먹방 생성하기"></input>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>
              생성된 방은 주기적으로 제가 삭제합니다... 귀찮아서 이정도로만
              하겠습니다...
            </p>
            <p>빵빵한 인터넷 없으면 연결이 잘 안됩니다. 기다리다보면 언젠간 연결됩니다만 몇 명씩은 빠져있을 수도 있습니다. 현재 누군가 새로고침 하면 멈춰있는 화면이 생기는 문제가 있는데 재밌어서 그냥 두겠습니다. 행복한 싸이버 되세요~~
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  const content = (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ color: "red" }}>ON AIR</h4>
      {roomlist.success ? (
        <div style={{ margin: "1rem" }}>
          {roomlist.data.map((room) => {
            return (
              <div key={room.id} className={style.card} style={{ fontSize: "1.5rem" }}>
                <Link href={room.roomLink}>{room.roomName}</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>술먹방 중인 칭구들 없음</div>
      )}
    </div>
  );

  return (
    <div>
      <br />
      <br />
      {createRomm}
      {content}
    </div>
  );
};

export default wcsSoolMukbang;

export async function getServerSideProps() {
  try {
    const res = await fetch(endpointMania("/api/public/roomlist"), {
      method: "GET",
    });
    try {
      const roomlist = await res.json();
      return {
        props: {
          roomlist,
        },
      };
    } catch (e) {
      console.log("room list page getServerSideProps catch 1");
      console.log(e);
      const roomlist = { success: false };
      return { props: { roomlist } };
    }
  } catch (e) {
    console.log("room list getServerSideProps catch 2");
    console.log(e);
    const roomlist = { success: false };
    return { props: { roomlist } };
  }
}
