import LeftSideBar from "@/components/LeftSideBar";
import { clientType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { initSocket } from "@/socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

export default function EditorPage() {
  const socketRef = useRef(null);
  const codeRef = useRef("");
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState<clientType[]>([]);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleEditorChange(v, event) {
    codeRef.current = v;
    if (!event.isFlush) {
      socketRef.current.emit("code_change", { roomId, value: v });
    }
  }

  async function waitForSocketConnection(socket: Socket): Promise<void> {
    return new Promise((resolve) => {
      if (socket.connected) {
        resolve();
      } else {
        socket.on("connect", () => {
          resolve();
        });
      }
    });
  }

  function handleErrors(e) {
    console.error("socket error", e);
    toast.error("Socket connection failed, try again later.");
    navigate("/");
  }

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
      await waitForSocketConnection(socketRef.current);
      try {
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
            socketRef.current.emit("sync_code", {
              value: codeRef.current,
              socketId,
            });
          },
        );

        socketRef.current.on("code_change", ({ value }) => {
          if (value !== null && editorRef.current) {
            editorRef.current.setValue(value);
          }
        });

        socketRef.current.on(
          "disconnected",
          ({ socketId, username }: clientType) => {
            toast.success(`${username} left the room.`);
            setClients((clients) => {
              return clients.filter((client) => client.socketId !== socketId);
            });
          },
        );
      } catch (err) {
        handleErrors(err);
      }
    }
    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off("joined");
      socketRef.current?.off("disconnected");
      socketRef.current?.off("code_change");
    };
  }, []);

  return (
    <div className="bg-slate-900 grid grid-rows-1 grid-cols-10 w-full h-screen text-slate-200">
      <div className="bg-slate-950 col-span-1 h-screen">
        <LeftSideBar clients={clients} roomId={roomId} />
      </div>
      <div className="col-span-9">
        <Editor
          theme="vs-dark"
          language="javascript"
          value={codeRef.current}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
