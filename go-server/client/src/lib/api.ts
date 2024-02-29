import { Entry } from "./types";

export async function fetchEntries(): Promise<Entry[]> {
  const res = await fetch("http://localhost:8080/entries");
  if (!res.ok) throw new Error("Unable to retrieve entries");
  return await res.json();
}

export async function fetchEntryById(id: string | undefined): Promise<Entry> {
  const res = await fetch(`http://localhost:8080/entries/${id}`);
  if (!res.ok) throw new Error("Unable to retrieve entry");
  return await res.json();
}

export async function postNewEntry(entry: Partial<Entry>): Promise<void> {
  const res = await fetch("http://localhost:8080/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error("Unable to create a new entry");
}
