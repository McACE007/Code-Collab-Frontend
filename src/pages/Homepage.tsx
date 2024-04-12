import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export default function Homepage() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  function handleCreateRoom() {
    const roomId = v4();
    setRoomId(roomId);
    toast.success("Created a new Room");
  }

  function handleJoinRoom() {
    if (!roomId || !username) {
      toast.error("Room Id & Username is required");
    }
    navigate(`editor/${roomId}`, {
      state: {
        username,
      },
    });
  }

  return (
    <div className="bg-slate-950 w-full h-screen flex justify-center items-center">
      <div className="min-w-4 md:w-96">
        <Card className="bg-slate-900 border-0">
          <CardHeader className="text-2xl text-slate-200 font-semibold">
            Join a Room
          </CardHeader>
          <CardContent>
            <div className="text-slate-200 space-y-3">
              <Label>Paste invitation Room Id</Label>
              <Input
                type="text"
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room Id"
                value={roomId}
              ></Input>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                value={username}
                type="text"
              ></Input>
              <Button
                onClick={handleJoinRoom}
                className="w-full bg-green-700 hover:bg-green-800"
              >
                Join
              </Button>
            </div>
            <div className="text-slate-200 mt-4 flex justify-center items-center">
              <Label className="">Don't have an Room Id?</Label>
              <Button
                onClick={handleCreateRoom}
                className="text-green-700 hover:underline"
              >
                Create One
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
