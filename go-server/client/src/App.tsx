import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Entries } from "./components/Entries";
import { EditForm } from "./components/EditForm";
import { NewForm } from "./components/NewForm";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Entries />} />
          <Route path="new" element={<NewForm />} />
          <Route path="edit/:id" element={<EditForm />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
