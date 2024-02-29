import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Entries } from "./components/Entries";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Entries />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
