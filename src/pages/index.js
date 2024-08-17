import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1>this is the iframe</h1>
      <div>
        <iframe className="i" src="./usdz" width="100%" height="600px"></iframe>
      </div>
    </>
  );
}
