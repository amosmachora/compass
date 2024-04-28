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
import { Path, Resource } from "@/types/global_types";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useMutation } from "convex/react";
import { Checkbox } from "./ui/checkbox";
import { api } from "@/convex/_generated/api";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

type FormData = Omit<Resource, "freeOrPaid"> & { isFree: CheckedState };

export const NewResource = ({ path }: { path: Path }) => {
  const form = useForm<FormData>();
  const { register, control, handleSubmit, watch } = form;

  const createResource = useMutation(api.resources.createResource);

  const [open, setOpen] = useState(false);

  const isFree = watch("isFree");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setOpen(false);
    await createResource({
      freeOrPaid: data.isFree ? "FREE" : "PAID",
      level: data.level,
      pathId: path._id,
      time: data.time,
      URL: data.URL,
      price: data.isFree ? undefined : parseInt(data.price.toString()),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          New Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Resource</DialogTitle>
          <DialogDescription>
            Create a new resource for {path.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={control}
                {...register("URL")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://.." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                {...register("level")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                {...register("time")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input placeholder="50 mins" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                {...register("isFree")}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Free?</FormLabel>
                      <FormDescription>
                        Check if the resource is free otherwise leave it blank.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {!isFree && (
                <FormField
                  control={control}
                  {...register("price")}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input placeholder="100 USD" {...field} type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
