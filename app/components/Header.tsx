"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header>
      <div style={topBarStyle}>
        <div style={containerStyle}>
          {/* LOGO */}
          <Link href="/" style={logoWrapStyle}>
            <img src="/logo.png" alt="Bongdaplus Logo" style={logoStyle} />
          </Link>

          {/* ĐỒNG HỒ */}
          <div className="clock-box" style={clockBoxStyle}>            
            <span style={clockLabelStyle}>Hôm nay</span>
            <span style={clockTextStyle}>{time}</span>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav style={navStyle}>
        <div style={menuContainerStyle}>
          <Link href="/" style={menuStyle}>TRANG CHỦ</Link>
          <Link href="/bong-da-viet-nam" style={menuStyle}>BÓNG ĐÁ VIỆT NAM</Link>
          <Link href="/bong-da-the-gioi" style={menuStyle}>BÓNG ĐÁ THẾ GIỚI</Link>
          <Link href="/ngoai-hang-anh" style={menuStyle}>NGOẠI HẠNG ANH</Link>
          <Link href="/bat-dong-san" style={menuStyle}>BẤT ĐỘNG SẢN</Link>
          <Link href="/bien-dong-moi-ngay" style={menuStyle}>BIẾN ĐỘNG MỖI NGÀY</Link>
          <Link href="/vinanext" style={menuStyle}>VINANEXT</Link>
        </div>
      </nav>
    </header>
  );
}

const topBarStyle = {
  background: "#0a8f2f",
} as const;

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "14px 16px",
  display: "flex",
  justifyContent: "center", // 👈 đổi dòng này
  alignItems: "center",
} as const;

const logoWrapStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  borderRadius: 20,
  background: "linear-gradient(145deg, #ffffff, #e0f7ff)",
  border: "2px solid #38bdf8",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
} as const;

const logoStyle = {
  height: 140,
  width: "auto",
} as const;

/* KHUNG ĐỒNG HỒ */
const clockBoxStyle = {
  background: "linear-gradient(145deg, #ffffff, #e0f7ff)",
  border: "2px solid #38bdf8",
  borderRadius: 18,
  padding: "10px 18px",
  minWidth: 320,
  textAlign: "center",
  boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
} as const;

const clockLabelStyle = {
  display: "block",
  color: "#16a34a",
  fontSize: 13,
  fontWeight: 900,
  marginBottom: 4,
} as const;

const clockTextStyle = {
  display: "block",
  color: "#075985",
  fontSize: 16,
  fontWeight: 900,
} as const;

const navStyle = {
  background: "#16a34a",
} as const;

const menuContainerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 28,
  padding: "12px 10px",
  fontWeight: "bold",
  flexWrap: "wrap",
} as const;

const menuStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 16,
  whiteSpace: "nowrap",
} as const;