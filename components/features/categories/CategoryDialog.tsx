import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function CategoryDialog({ onSubmit }: { onSubmit: (value: string) => void }) {
  console.log("CategoryDialog rendered");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Create New Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category Form</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            autoComplete="off"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button
            onClick={() => {
              onSubmit(category);
              setOpen(false);
            }}
          >
            Create
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryDialog;
