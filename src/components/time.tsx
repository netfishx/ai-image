"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function Time({ time }: { time: string }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(format(time, "yyyy-MM-dd HH:mm:ss"));
  }, [time]);
  return <span>{date}</span>;
}
