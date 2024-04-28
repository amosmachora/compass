import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { createPath } from "@/convex/paths";
import { Path } from "@/types/global_types";
import { useMutation } from "convex/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

export const NewPath = () => {
  const form = useForm<Path>();

  const { register, handleSubmit } = form;

  const createPath = useMutation(api.paths.createPath);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<Path> = async (data) => {
    setIsOpen(false);
    const toastRes = toast({
      description: `Creating ${data.name}!`,
    });
    await createPath({ description: data.description, name: data.name });
    // toastRes.dismiss();
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-max ml-auto">
          Create Path
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Path</DialogTitle>
          <DialogDescription>
            Create a path for other learners!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="SpringBoot"
                className="col-span-3"
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="name"
                placeholder="description"
                className="col-span-3"
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
