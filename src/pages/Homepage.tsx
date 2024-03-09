import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Homepage() {
  return (
    <div className="bg-slate-950 w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center w-1/5">
        <div className="">
          <Card className="bg-slate-900 border-0">
            <CardHeader className="text-2xl text-slate-200 font-semibold">
              Join a Room
            </CardHeader>
            <CardContent>
              <div className="text-slate-200 space-y-3">
                <Label>Paste invitation Room Id</Label>
                <Input placeholder="Room Id"></Input>
                <Input placeholder="Username"></Input>
                <div className="flex flex-row-reverse">
                  <Button className="bg-green-800">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
