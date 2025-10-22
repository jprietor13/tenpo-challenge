import { useEffect, useRef, useState } from "react";
import axios from "../api/axiosConfig";
import type { Item } from "../types/global";

const ITEMS_PER_PAGE = 50;

export const useHomeItems = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch inicial
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/posts");
        const data = Array.from({ length: 20 }, (_, i) =>
          res.data.map((item: Item) => ({
            ...item,
            id: item.id + i * 100, // ⚡️ Desfase de 100 por cada lote
          }))
        ).flat();
        setAllItems(data);
        setVisibleItems(data.slice(0, ITEMS_PER_PAGE));
      } catch {
        setError("Error al obtener datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Observer para paginación infinita
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log("➡️ Cargando más elementos...");
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [observerRef.current]); //reacciona cuando el ref cambia

  // Actualizar items visibles
  useEffect(() => {
    if (page > 1) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newItems = allItems.slice(start, end);
      if (newItems.length > 0) {
        setVisibleItems((prev) => [...prev, ...newItems]);
      }
    }
  }, [page, allItems]);

  return { visibleItems, allItems, loading, error, observerRef };
};
