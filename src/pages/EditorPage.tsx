import { clientType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { initSocket } from "@/socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FileExplorer from "@/components/FileExplorer";
import LeftSideBar from "@/components/LeftSideBar";

export default function EditorPage() {
  const socketRef = useRef(null);
  const codeRef = useRef("");
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState<clientType[]>([]);
  const editorRef = useRef(null);

  const [isOpenLeftSideBar, setIsOpenLeftSideBar] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const languages = [
    {
      value: "javascript",
      label: "Javascript",
      snippet:
        "console.log('Hello, world!');\nconsole.log('This is a simple JavaScript code snippet.');",
    },
    {
      value: "c++",
      label: "C++",
      snippet:
        '#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!" << std::endl;\n    std::cout << "This is a simple C++ code snippet." << std::endl;\n    return 0;\n}',
    },
    {
      value: "c",
      label: "C",
      snippet:
        '#include <stdio.h>\n\nint main() {\n    printf("Hello, world!\\n");\n    printf("This is a simple C code snippet.\\n");\n    return 0;\n}',
    },
    {
      value: "python",
      label: "Python",
      snippet:
        "print('Hello, world!')\nprint('This is a simple Python code snippet.')",
    },
  ];

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
    <div className="text-slate-200 h-screen w-screen">
      <Navbar setIsOpenLeftSideBar={setIsOpenLeftSideBar} />

      <main className="w-full min-h-[calc(100vh-64px)] ">
        <LeftSideBar
          clients={clients}
          roomId={roomId || ""}
          isOpen={isOpenLeftSideBar}
        />
      </main>

      {/* <div className="flex w-full h-[calc(100vh-64px)]"> */}
      {/* <div className="w-full h-full flex-1"> */}
      {/*   <ResizablePanelGroup direction="vertical" className=""> */}
      {/*     <ResizablePanel defaultSize={65}> */}
      {/*       <Editor */}
      {/*         theme="vs-dark" */}
      {/*         language={selectedLanguage} */}
      {/*         value={codeRef.current} */}
      {/*         onMount={handleEditorDidMount} */}
      {/*         onChange={handleEditorChange} */}
      {/*       /> */}
      {/*     </ResizablePanel> */}
      {/*     <ResizableHandle /> */}
      {/*     <ResizablePanel defaultSize={35}> */}
      {/*       <div className=""> */}
      {/*         <ResizablePanelGroup direction="horizontal" className=""> */}
      {/*           <ResizablePanel className="w-full h-screen" defaultSize={50}> */}
      {/*             <Textarea className="h-screen bg-sky-800" /> */}
      {/*           </ResizablePanel> */}
      {/*           <ResizableHandle /> */}
      {/*           <ResizablePanel defaultSize={50}> */}
      {/*             <Textarea className="h-screen bg-sky-800" /> */}
      {/*           </ResizablePanel> */}
      {/*         </ResizablePanelGroup> */}
      {/*       </div> */}
      {/*     </ResizablePanel> */}
      {/*   </ResizablePanelGroup> */}
      {/* </div> */}
      {/* <aside className="sticky right-0 mr-2 p-2 w-10 min-w-10 h-screen bg-zinc-950 flex flex-col"> */}
      {/*   sdfsdf sdfsdf */}
      {/* </aside> */}
      {/* </div> */}
    </div >
  );
}
