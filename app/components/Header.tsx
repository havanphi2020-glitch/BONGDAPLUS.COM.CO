import Link from "next/link";
export default function Header() {
  return (
    <header>
      {/* TOP BAR */}
      <div
        style={{
          background: "#0a8f2f",
          color: "white",
          padding: "15px",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt="Bongdaplus Logo"
              style={{
                height: 40,
                width: "auto",
                display: "block",
                cursor: "pointer",
              }}
            />
          </Link>

          {/* TEXT PHỤ */}
        </div>
      </div>

      {/* MENU */}
      <nav style={{ background: "#16a34a" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            padding: "12px",
            fontWeight: "bold",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={menuStyle}>
            TRANG CHỦ
          </Link>

          <Link href="/bong-da-viet-nam" style={menuStyle}>
            BÓNG ĐÁ VIỆT NAM
          </Link>

          <Link href="/bong-da-the-gioi" style={menuStyle}>
            BÓNG ĐÁ THẾ GIỚI
          </Link>

          <Link href="/ngoai-hang-anh" style={menuStyle}>
            NGOẠI HẠNG ANH
          </Link>

          <Link href="/bat-dong-san" style={menuStyle}>
            BẤT ĐỘNG SẢN
          </Link>

          <Link href="/vinanext" style={menuStyle}>
            VINANEXT
          </Link>
        </div>
      </nav>
    </header>
  );
}

const menuStyle = {
  color: "white",
  textDecoration: "none",
} as const;