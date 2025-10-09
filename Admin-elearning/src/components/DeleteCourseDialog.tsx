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

interface DeleteCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    id: number;
    title: string;
  };
  // should return true on success, false on failure
  onDelete: (id: number) => Promise<boolean>;
}

export function DeleteCourseDialog({
  open,
  onOpenChange,
  course,
  onDelete,
}: DeleteCourseDialogProps) {
  const handleDelete = async () => {
    try {
      const ok = await onDelete(course.id);
      if (ok) {
        onOpenChange(false);
      }
    } catch {
      // parent shows toast; keep dialog open so user can retry or cancel
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Course</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{course.title}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              void handleDelete();
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
