import { Entries } from "./types";

export async function fetchEntries(): Promise<Entries[]> {
  const res = await fetch("http://localhost:8080/entries");
  if (!res.ok) throw new Error("Unable to retrieve entries");
  return await res.json();
}
