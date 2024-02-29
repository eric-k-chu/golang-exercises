import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchEntries } from "../lib/api";
import { Container } from "./Container";

export function Entries() {
  const [entries, isLoading, error] = useFetch(fetchEntries);

  if (isLoading) {
    return (
      <Container>
        <strong className="text-center">Loading...</strong>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <strong>
          {error instanceof Error
            ? error.message
            : "An unknown error has occured."}
        </strong>
      </Container>
    );
  }

  return (
    <Container>
      <section className="flex items-center justify-between">
        <strong className="text-xl md:text-3xl">Entries</strong>
        <Link
          to="/"
          className="rounded-md bg-c-purple px-2 py-1 uppercase text-white"
        >
          New
        </Link>
      </section>
      {entries?.map((n) => (
        <div key={n.id} className="mb-10 flex flex-wrap">
          <div className="flex basis-full items-center justify-center overflow-hidden rounded-md md:basis-1/2">
            <img
              src={n.photoUrl}
              alt={n.title}
              className="size-64 md:size-96"
            />
          </div>
          <div className="basis-full md:basis-1/2">
            <div className="flex items-center justify-between">
              <strong>{n.title}</strong>
              <p>Edit</p>
            </div>
            <p>{n.notes}</p>
          </div>
        </div>
      ))}
    </Container>
  );
}
