import LeftSideBar from "@/components/LeftSideBar";
import { clientType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { initSocket } from "@/socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState<clientType[]>([]);

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.error("socket error", e);
        toast.error("Socket connection failed, try again later.");
        navigate("/");
      }

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username || "Mc",
      });

      socketRef.current.on(
        "joined",
        ({
          clients,
          username,
          socketId,
        }: {
          clients: clientType[];
          username: string;
          socketId: string;
        }) => {
          if (username !== location.state.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
        },
      );

      socketRef.current.on(
        "disconnected",
        ({ socketId, username }: clientType) => {
          toast.success(`${username} left the room.`);
          setClients((clients) => {
            return clients.filter((client) => client.socketId !== socketId);
          });
        },
      );
    }
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
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
