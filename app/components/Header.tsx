import Link from "next/link";

export default function Header() {
  return (
    <header>
  <div style={topBarStyle}>
  <div style={containerStyle}>
    {/* LOGO BÊN TRÁI */}
    <Link href="/" style={logoWrapStyle}>
      <img src="/logo.png" alt="Bongdaplus Logo" style={logoStyle} />
    </Link>

    {/* NGÀY GIỜ BÊN PHẢI */}
    <div style={dateStyle}>
      {new Date().toLocaleString("vi-VN")}
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
  justifyContent: "space-between", // 👈 trái - phải
  alignItems: "center",
} as const;

const logoWrapStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as const;

const logoStyle = {
  height: 90, // 👈 tăng size
  width: "auto",
  display: "block",
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