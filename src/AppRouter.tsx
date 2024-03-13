import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";

export default function AppRouter() {
  return (
    <>
      <div>
        <Toaster position="top-right"></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
