import { clientType } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export default function Client({ client }: { client: clientType }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Avatar className="text-zinc-900 uppercase font-semibold text-lg">
        <AvatarFallback>{client.username[0]}</AvatarFallback>
      </Avatar>
      <Label className="mt-2">{client.username}</Label>
    </div>
  );
}
