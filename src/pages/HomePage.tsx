import { useAuth } from "../hooks/useAuth";
import { useHomeItems } from "../hooks/useHomeItems";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from 'lucide-react';

export const HomePage = () => {
  const { logout } = useAuth();
  const { visibleItems, allItems, loading, error, observerRef } = useHomeItems();
  const { theme, toggleTheme } = useTheme();

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Cargando datos...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-400">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-300 dark:border-gray-700 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            title="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <ul className="space-y-3">
          {visibleItems.map((item) => (
            <li
              key={item.id}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition"
            >
              <strong className="text-indigo-600 dark:text-indigo-400">
                {item.id}.
              </strong>{" "}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        
        {/* div observador cuando entra al final de la lista*/}
        {visibleItems.length < allItems.length && (
          <div ref={observerRef} className="h-12"></div>
        )}

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
          Mostrando {visibleItems.length} de {allItems.length} elementos
        </p>
      </main>
    </div>
  );
};
