import { useEffect, useState } from "react";
import axios from "axios";

interface FileData {
  id: number;
  name: string;
  path: string;
  type: string;
}

export default function FileList() {
  const [files, setFiles] = useState<Record<string, FileData[]>>({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/files");
      setFiles(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setFileToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/files/${fileToDelete}`);
      setStatus({ type: "success", msg: "✓ Removed" });
      fetchFiles();
    } catch (error) {
      setStatus({ type: "error", msg: "✕ Failed" });
    } finally {
      setIsModalOpen(false);
      setFileToDelete(null);
      setTimeout(() => setStatus({ type: null, msg: "" }), 3000);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Delete?</h3>
            <p>Are you sure you want to remove this document?</p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={btnCancelStyle}
              >
                Cancel
              </button>
              <button onClick={confirmDelete} style={btnDeleteStyle}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {status.msg && (
        <div
          style={{
            ...toastStyle,
            backgroundColor: status.type === "success" ? "#f0fdf4" : "#fef2f2",
            color: status.type === "success" ? "#16a34a" : "#dc2626",
          }}
        >
          {status.msg}
        </div>
      )}

      {Object.keys(files).map((category) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h4 style={categoryTitleStyle}>{category}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {files[category].map((file) => (
              <div key={file.id} style={fileRowStyle}>
                <div>📄 {file.name}</div>
                <button
                  onClick={() => openDeleteModal(file.id)}
                  style={btnRemoveStyle}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  width: "300px",
};
const btnCancelStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  cursor: "pointer",
};
const btnDeleteStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ff4d4f",
  color: "white",
  cursor: "pointer",
};
const toastStyle: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  zIndex: 2000,
};
const categoryTitleStyle = {
  color: "#888",
  fontSize: "12px",
  textTransform: "uppercase",
  marginBottom: "8px",
};
const fileRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  background: "#fcfcfc",
  border: "1px solid #eee",
  borderRadius: "10px",
};
const btnRemoveStyle = {
  color: "#ff4d4f",
  border: "none",
  background: "none",
  cursor: "pointer",
  fontWeight: "600",
};
