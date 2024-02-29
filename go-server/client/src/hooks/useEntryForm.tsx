import { useEffect, useState } from "react";
import { fetchEntryById } from "../lib/api";

export function useEntryForm(entryId: string | undefined) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const { id, title, photoUrl, notes } = await fetchEntryById(entryId);
        setId(id);
        setTitle(title);
        setPhotoUrl(photoUrl);
        setNotes(notes);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  return {
    id: {
      get: id,
      set: setId,
    },
    title: {
      get: title,
      set: setTitle,
    },
    photoUrl: {
      get: photoUrl,
      set: setPhotoUrl,
    },
    notes: {
      get: notes,
      set: setNotes,
    },
    isLoading,
    error,
  };
}
