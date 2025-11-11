import Image from "next/image";
import ConnectFour from "./components/connectFour";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center">
      <main className="flex flex-col items-center sm:items-start">
        <ConnectFour />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Here there be dragons</p>
      </footer>
    </div>
  );
}
