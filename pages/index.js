import Head from "next/head";
import { Home } from "../components";

export default function Bonus() {
  return (
    <>
      <Head>
        <title>Bonus Trap</title>
        <meta name="description" content="Bonus Trap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
