import Image from "next/image";
import styles from "./page.module.css";
import AllMemes from '../component/post/allMemes'

export default function Home() {
  return (
    <main className={styles.main}>
      <AllMemes />
    </main>
  );
}
