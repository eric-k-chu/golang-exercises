import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEntryForm } from "../hooks/useEntryForm";
import { deleteEntry, updateEntry } from "../lib/api";
import { Container } from "./Container";

export function EditForm() {
  const { id: entryId } = useParams();
  const navigate = useNavigate();
  const { title, photoUrl, notes, isLoading, error } = useEntryForm(entryId);
  const [isOpen, setIsOpen] = useState(false);

  async function editEntry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await updateEntry(entryId, {
        title: title.get,
        photoUrl: photoUrl.get,
        notes: notes.get,
      });
      navigate("/");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "An unknown error has occured.",
      );
    }
  }

  async function confirmEntryDeletion() {
    try {
      await deleteEntry(entryId);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "An unknown error has occured.",
      );
    }
  }

  if (isLoading) {
    <Container>
      <strong className="text-center">Loading...</strong>
    </Container>;
  }

  if (error) {
    return (
      <Container>
        <strong className="text-center">
          {error instanceof Error
            ? error.message
            : "An unknown error has occured."}
        </strong>
      </Container>
    );
  }

  return (
    <Container>
      <form className="space-y-6" onSubmit={editEntry}>
        <strong className="text-xl md:text-3xl">Edit Entry</strong>
        <section className="flex flex-wrap">
          <div className="flex basis-full items-center justify-center overflow-hidden rounded-md md:basis-1/2">
            <img
              src={photoUrl.get || "/placeholder-image-square.jpg"}
              alt="placeholder"
            />
          </div>
          <div className="basis-full px-4 md:basis-1/2">
            <label>
              Title
              <input
                className="my-4 w-full rounded-md bg-white px-2 leading-10 ring-1 ring-neutral-300"
                value={title.get}
                onChange={(e) => title.set(e.currentTarget.value)}
              />
            </label>
            <label>
              Photo URL
              <input
                className="my-4 w-full rounded-md bg-white px-2 leading-10 ring-1 ring-neutral-300"
                value={photoUrl.get}
                onChange={(e) => photoUrl.set(e.currentTarget.value)}
              />
            </label>
          </div>
        </section>
        <section>
          <label>
            Notes
            <textarea
              value={notes.get}
              onChange={(e) => notes.set(e.currentTarget.value)}
              className="mt-4 w-full resize-none rounded-md bg-white p-2 leading-6 ring-1 ring-neutral-400"
              rows={8}
            />
          </label>
        </section>
        <section className="flex items-center justify-between">
          <button
            className="px-2 py-1 uppercase text-red-500 underline"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            Delete
          </button>
          <button className="rounded-md bg-c-purple px-2 py-1 uppercase text-white">
            Save
          </button>
        </section>
      </form>
      {isOpen && (
        <dialog className="absolute inset-0 z-10 flex size-96 flex-col items-center justify-center rounded-md bg-neutral-50 text-black">
          <strong className="flex basis-1/2 items-end">
            Delete this Entry?
          </strong>
          <section className="mt-auto flex w-full items-center justify-around p-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-500/80"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-green-500 px-2 py-1 hover:bg-green-500/80"
              onClick={confirmEntryDeletion}
            >
              Confirm
            </button>
          </section>
        </dialog>
      )}
    </Container>
  );
}
