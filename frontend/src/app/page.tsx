import Image from "next/image";
import "./styles/Home.scss";

export default function Home() {
  return (
    <main className="Home">
      <h1 className="main_title">Bienvenido a la página de inicio</h1>
      <center>
        <a href="/myusers">
          <button
            style={{
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "1.1rem",
              padding: 16,
              margin: "50px auto",
            }}
          >
            TEST CHAT
          </button>
        </a>
      </center>
    </main>
  );
}
