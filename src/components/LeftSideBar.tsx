import { clientType } from "@/types";
import Client from "./Client";
import { Button } from "@/components/ui/button";

export default function LeftSideBar({ clients }: { clients: clientType[] }) {
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
        <Button className="">Copy Room Id</Button>
        <Button className="bg-green-700 hover:bg-green-800">Leave</Button>
      </div>
    </div>
  );
}
