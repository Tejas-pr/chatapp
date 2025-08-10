"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const navigate = useRouter();
  const [roomId, SetRoomId] = useState("");

  return (
    <div className={`${styles.page} ${styles.mainContainer}`}>
      <input type="text" placeholder="room id..." value={roomId} onChange={e => {
        SetRoomId(e.target.value);
      }}/>
      <button onClick={() => {
        navigate.push(`/room/${roomId}`)
      }}>Join room</button>
    </div>
  );
}
