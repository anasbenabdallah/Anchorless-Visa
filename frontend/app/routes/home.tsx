import { useState } from "react";
import Upload from "../components/Upload";
import FileList from "../components/FileList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>VISA Dossier Management</h1>
      </header>

      <main>
        <Upload onUploadSuccess={handleRefresh} />

        <div style={dividerStyle} />

        <section>
          <h2 style={sectionTitleStyle}>Your Documents</h2>
          <FileList key={refreshKey} />
        </section>
      </main>
    </div>
  );
}

const layoutStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
  fontFamily: "Inter, system-ui, sans-serif",
};

const headerStyle = {
  marginBottom: "40px",
  textAlign: "center" as const,
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "800",
  letterSpacing: "-0.5px",
};

const sectionTitleStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#333",
};

const dividerStyle = {
  height: "1px",
  backgroundColor: "#eee",
  margin: "40px 0",
};
