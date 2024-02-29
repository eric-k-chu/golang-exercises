import { FormEvent, useState } from "react";
import { Container } from "./Container";
import { postNewEntry } from "../lib/api";
import { useNavigate } from "react-router";

export function NewForm() {
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  async function createNewEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !photoUrl || !notes) {
      alert("Some fields are empty.");
      return;
    }

    try {
      await postNewEntry({ title, photoUrl, notes });
      navigate("/");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "An unknown error has occured.",
      );
    }
  }

  return (
    <Container>
      <form className="space-y-6" onSubmit={createNewEntry}>
        <strong className="text-xl md:text-3xl">New Entry</strong>
        <section className="flex flex-wrap">
          <div className="flex basis-full items-center justify-center overflow-hidden rounded-md md:basis-1/2">
            <img
              src={photoUrl || "/placeholder-image-square.jpg"}
              alt="placeholder"
            />
          </div>
          <div className="basis-full px-4 md:basis-1/2">
            <label>
              Title
              <input
                className="my-4 w-full rounded-md bg-white px-2 leading-10 ring-1 ring-neutral-300"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </label>
            <label>
              Photo URL
              <input
                className="my-4 w-full rounded-md bg-white px-2 leading-10 ring-1 ring-neutral-300"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.currentTarget.value)}
              />
            </label>
          </div>
        </section>
        <section>
          <label>
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.currentTarget.value)}
              className="mt-4 w-full resize-none rounded-md bg-white p-2 leading-6 ring-1 ring-neutral-400"
              rows={8}
            />
          </label>
        </section>
        <section className="flex justify-end">
          <button className="rounded-md bg-c-purple px-2 py-1 uppercase text-white">
            Save
          </button>
        </section>
      </form>
    </Container>
  );
}
