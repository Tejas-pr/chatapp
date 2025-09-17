"use client"
import styles from "./page.module.css";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <div className={`${styles.page}`}>
      <LandingPage />
    </div>
  );
}
