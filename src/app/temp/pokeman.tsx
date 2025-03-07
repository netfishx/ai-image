"use client";

import { useEffect, useRef, useState } from "react";

// 定义列表项的类型
interface Item {
  id: number;
  content: string;
}

export default function InfiniteScrollList() {
  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      content: `Item ${i + 1}`,
    })),
  );
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    });

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  const loadMoreItems = async (): Promise<void> => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    try {
      // 假设这是从API获取数据的函数
      const newItems = await fetchItems(page);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  };

  // 模拟API调用
  const fetchItems = async (page: number): Promise<Item[]> => {
    // 实际应用中这里会调用你的API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      content: `Item ${(page - 1) * 10 + i + 1}`,
    }));
  };

  return (
    <div className="p-4">
      <ul className="grid h-screen grid-cols-2 gap-2 overflow-y-auto">
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
            className="h-50 border bg-green-700"
          >
            {item.content}
          </li>
        ))}
      </ul>
      {loading && (
        <div className="absolute bottom-0">Loading more items...</div>
      )}
      {!hasMore && items.length > 0 && (
        <div className="absolute bottom-0">No more items to load</div>
      )}
    </div>
  );
}
