import LeftSideBar from "@/components/LeftSideBar";
import { clientType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { initSocket } from "@/socket";

export default function EditorPage() {
  const socketRef = useRef(null);
  const [clients, setClients] = useState<clientType[]>([
    { socketId: "1", username: "McACE007" },
    { socketId: "2", username: "McACE008" },
    { socketId: "2", username: "McACE008" },
    { socketId: "2", username: "McACE008" },
    { socketId: "2", username: "McACE008" },
  ]);

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
    }
    init();
  }, []);

  return (
    <div className="bg-slate-900 grid grid-rows-1 grid-cols-10 w-full h-screen text-slate-200">
      <div className="bg-slate-950 col-span-1 h-screen">
        <LeftSideBar clients={clients} />
      </div>
      <div className="col-span-9">
        <Editor theme="vs-dark" />
      </div>
    </div>
  );
}
