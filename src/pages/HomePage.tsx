import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "../api/axiosConfig";
import type { Item } from "../types/global";

export const HomePage = () => {
  const { logout } = useAuth();
  const [items, setItems] = useState<Item>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/posts");
        // JSONPlaceholder devuelve 100 → los duplicamos hasta 2000
        const data = Array.from({ length: 20 }, () => res.data).flat();
        setItems(data);
      } catch {
        setError("Error al obtener datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Home</h2>
      <button
        onClick={logout}
        style={{ padding: "6px 12px", marginBottom: "20px", cursor: "pointer" }}
      >
        Cerrar sesión
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.slice(0, 50).map((item) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "5px",
            }}
          >
            <strong>{item.id}.</strong> {item.title}
          </li>
        ))}
      </ul>
      <p style={{ textAlign: "center" }}>Mostrando 50 de {items.length} elementos</p>
    </div>
  );
};
