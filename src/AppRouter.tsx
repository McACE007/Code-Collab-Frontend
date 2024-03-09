import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EditorPage from "./pages/EditorPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/editor/:editorId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
