import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const logoData = await readFile(path.join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#001435",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* PR flag red triangle — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 0 320px 380px",
            borderColor: "transparent transparent rgba(232,25,44,0.18) transparent",
          }}
        />

        {/* Red top stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#E8192C",
          }}
        />

        {/* Gold bottom stripe */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#C8952C",
          }}
        />

        {/* Content row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "64px",
            padding: "0 80px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "5px solid #C8952C",
              boxShadow: "0 0 60px rgba(200,149,44,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#001435",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={320}
              height={320}
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              width: 3,
              height: 200,
              backgroundColor: "#E8192C",
              flexShrink: 0,
              opacity: 0.6,
            }}
          />

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
            }}
          >
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                color: "white",
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                letterSpacing: "-2px",
              }}
            >
              Rican Rice
            </div>

            <div
              style={{
                fontSize: 32,
                color: "#C8952C",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                marginTop: 12,
              }}
            >
              La Casa del Arroz
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 24,
              }}
            >
              <div style={{ width: 32, height: 2, backgroundColor: "#E8192C" }} />
              <div
                style={{
                  fontSize: 20,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "Georgia, serif",
                }}
              >
                Puerto Rican Catering · Madison, WI
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
