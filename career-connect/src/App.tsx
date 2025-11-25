import { Routes, Route, BrowserRouter } from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import About from "./pages/About"; //

function App() {
  return (
    <JobProvider> 

        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="*" element={<p className="text-center mt-20 text-xl">404: Page Not Found</p>} />
            </Routes>
          </main>

          <Footer />
        </div>
     
    </JobProvider>
  );
}

export default App;