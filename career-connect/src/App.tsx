import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import ApplyForm from "./pages/ApplyForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/apply/:id" element={<ApplyForm />} />
    </Routes>
  );
}

export default App;
