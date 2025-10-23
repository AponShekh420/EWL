"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
export function DeleteModal({
  children,

  deleteAction,
}: {
  children: ReactNode;
  deleteAction: () => void;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Once deleted, the item will be
              permanently removed from your records.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => deleteAction()}
              className="cursor-pointer"
              variant="destructive"
              type="submit"
            >
              Delete Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
