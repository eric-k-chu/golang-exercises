import { Outlet, useNavigate } from "react-router";
import { Container } from "./Container";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-c-purple">
        <Container>
          <h1
            className="text-xl font-semibold text-white hover:cursor-pointer md:text-3xl"
            onClick={() => navigate("/")}
          >
            Code Journal
          </h1>
        </Container>
      </header>
      <Outlet />
    </>
  );
}
