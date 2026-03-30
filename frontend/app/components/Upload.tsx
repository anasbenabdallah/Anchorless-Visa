import { useState, useRef } from "react";
import axios from "axios";

export default function Upload({
  onUploadSuccess,
}: {
  onUploadSuccess?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState("passport");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    setUploading(true);
    setStatus({ type: null, msg: "" });

    try {
      await axios.post("http://127.0.0.1:8000/api/upload", formData);
      setStatus({ type: "success", msg: " Success!" });
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      setTimeout(() => setStatus({ type: null, msg: "" }), 4000);
    } catch {
      setStatus({
        type: "error",
        msg: " Failed. Check size (<4MB) and type.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div onDragOver={preventDrag} onDrop={preventDrag} style={containerStyle}>
      <h3 style={{ marginTop: 0 }}>New Document</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={sectionStyle}>
          <label style={labelStyle}>1. Select File</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={dropzoneStyle}
          >
            <span style={{ fontWeight: "600" }}>
              {file ? ` ${file.name}` : "Click to upload"}
            </span>
            <small>PDF, PNG, JPG (Max 4MB)</small>
            <small style={{ color: "#999" }}>* Drag & drop disabled</small>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept=".pdf,.png,.jpg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div style={sectionStyle}>
          <label style={labelStyle}>2. Category</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={selectStyle}
          >
            <option value="passport">Passport</option>
            <option value="photo">Photo</option>
            <option value="financial">Financial</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          style={{
            ...btnStyle,
            backgroundColor: uploading || !file ? "#eee" : "#000",
            color: uploading || !file ? "#999" : "#fff",
          }}
        >
          {uploading ? "Uploading..." : "Confirm & Upload"}
        </button>

        {status.msg && (
          <div
            style={{
              ...statusStyle,
              color: status.type === "success" ? "#16a34a" : "#dc2626",
              backgroundColor:
                status.type === "success" ? "#f0fdf4" : "#fef2f2",
            }}
          >
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  padding: "25px",
  border: "1px solid #eee",
  borderRadius: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
};
const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};
const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#888",
  textTransform: "uppercase",
};
const dropzoneStyle: React.CSSProperties = {
  padding: "30px",
  border: "2px dashed #ddd",
  borderRadius: "12px",
  backgroundColor: "#fafafa",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};
const selectStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  width: "100%",
  maxWidth: "250px",
};
const btnStyle: React.CSSProperties = {
  padding: "12px 25px",
  borderRadius: "10px",
  border: "none",
  fontWeight: "700",
  cursor: "pointer",
  alignSelf: "flex-start",
};
const statusStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
};
