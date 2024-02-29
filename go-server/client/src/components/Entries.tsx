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
    <Container className="space-y-6">
      <section className="flex items-center justify-between">
        <strong className="text-xl md:text-3xl">Entries</strong>
        <Link
          to="/new"
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
          <div className="basis-full px-4 md:basis-1/2">
            <div className="flex items-center justify-between">
              <strong>{n.title}</strong>
              <Link to={`/edit/${n.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </Link>
            </div>
            <p>{n.notes}</p>
          </div>
        </div>
      ))}
    </Container>
  );
}
