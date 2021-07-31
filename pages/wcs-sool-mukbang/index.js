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
    <div className="window" style={{ width: "100%" }}>
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
              style={{ width: "300px", margin: "1rem" }}
              type="text"
              maxLength="20"
              placeholder="방제목을 입력하세요"
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
        </form>
      </div>
    </div>
  );

  const content = (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ color: "red" }}>ON AIR</h4>
      <p>아래 링크를 통해 술먹방에 참여할 수 있습니다.</p>
      <p>술먹방을 끝내고 싶으시면 그냥 브라우저를 종료하시면 됩니다.</p>
      <p>
        브라우저 간 P2P 연결방식이므로 브라우저를 종료하면 비디오, 오디오
        데이터를 송수신이 종료됩니다.
      </p>
      {roomlist.success ? (
        <div style={{ margin: "1rem" }}>
          {roomlist.data.map((room) => {
            return (
              <div
                key={room.id}
                className={style.card}
                style={{ fontSize: "1.5rem" }}
              >
                <Link href={room.roomLink}>{room.roomName}</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h4>술먹방 중인 칭구들 없음</h4>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ justifyContent: "center", padding: "2rem", width: "100%" }}>
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
