"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username === "admin" && password === "123456") {

      localStorage.setItem("admin_login", "true");

      router.push("/admin");

    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  }

  return (
    <main className="login-page">
      <div className="login-box">

        <h1>Đăng nhập quản trị</h1>

        <input
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Đăng nhập
        </button>

      </div>
    </main>
  );
}