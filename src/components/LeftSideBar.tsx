import { clientType } from "@/types";
import Client from "./Client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LeftSideBar({
  clients,
  roomId,
}: {
  clients: clientType[];
  roomId: string;
}) {
  const navigate = useNavigate();
  async function handleCopyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id has been copied to your clipboard");
    } catch (e) {
      toast.error("Could not copy the Room Id");
      console.log(e);
    }
  }

  function handleLeaveRoom() {
    navigate("/");
  }

  return (
    <div className="flex flex-col h-screen justify-between p-4">
      <div className="">
        <div className="font-semibold text-xl mb-3 border-b border-slate-700">
          Connected
        </div>
        <div className="flex gap-4 flex-wrap py-2">
          {clients.map((client) => {
            return <Client client={client} key={client.socketId} />;
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button className="" onClick={handleCopyRoomId}>
          Copy Room Id
        </Button>
        <Button
          className="bg-green-700 hover:bg-green-800"
          onClick={handleLeaveRoom}
        >
          Leave
        </Button>
      </div>
    </div>
  );
}
