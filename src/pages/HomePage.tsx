import { useAuth } from "../hooks/useAuth";
import { useHomeItems } from "../hooks/useHomeItems";

export const HomePage = () => {
  const { logout } = useAuth();
  const { visibleItems, allItems, loading, error, observerRef } = useHomeItems();

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
        {visibleItems.map((item) => (
          <li
            key={item.id + "-" + Math.random()}
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

      {/* div observador cuando entra al final de la lista*/}
      {visibleItems.length < allItems.length && (
        <div ref={observerRef} style={{ height: "40px" }} />
      )}

      <p style={{ textAlign: "center" }}>
        Mostrando {visibleItems.length} de {allItems.length} elementos
      </p>
    </div>
  );
};
