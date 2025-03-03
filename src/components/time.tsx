import { format } from "date-fns";

export function Time({ time }: { time: string }) {
  return <span>{format(time, "yyyy-MM-dd HH:mm:ss")}</span>;
}
