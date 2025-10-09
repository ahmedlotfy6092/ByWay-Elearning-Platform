import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface DeleteInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: {
    id: number;
    name: string;
  };
  // should return true on success, false on failure
  onDelete: (id: number) => Promise<boolean>;
}

export function DeleteInstructorDialog({
  open,
  onOpenChange,
  instructor,
  onDelete,
}: DeleteInstructorDialogProps) {
  const handleDelete = async () => {
    try {
      const ok = await onDelete(instructor.id);
      if (ok) {
        onOpenChange(false);
      }
      // if not ok, parent already shows toast; keep dialog open
    } catch {
      // parent shows toast; keep dialog open so user can retry or cancel
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Instructor</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{instructor.name}</strong>?
            This action cannot be undone and will permanently remove the
            instructor from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
