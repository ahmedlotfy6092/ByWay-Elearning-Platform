import { useEffect, useState } from "react";
import { Search, Eye, Edit2, Trash2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ViewInstructorDialog } from "./ViewInstructorDialog";
import { EditInstructorDialog } from "./EditInstructorDialog";
import { DeleteInstructorDialog } from "./DeleteInstructorDialog";
import { AddInstructorDialog } from "./AddInstructorDialog";
import { toast } from "sonner";
import {
  getInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../api/services";

interface Instructor {
  id: number;
  name: string;
  jobTitle: string;
  description: string;
  rate: number;
  image?: string;
}

export function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);

  // helper to extract error message from unknown errors (including axios-like responses)
  const getErrorMessage = (err: unknown): string => {
    if (!err) return "An error occurred";
    if (typeof err === "object" && err !== null) {
      const maybeAxios = err as {
        response?: { data?: { message?: unknown } };
      };
      const msg = maybeAxios.response?.data?.message;
      if (typeof msg === "string") return msg;
    }
    if (err instanceof Error) return err.message;
    return String(err);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getInstructors(currentPage);
        setInstructors(Array.isArray(data) ? data : data?.items ?? []);
      } catch (e) {
        console.error("Failed to load instructors", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);

  const handleView = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setViewDialogOpen(true);
  };

  const handleEdit = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setEditDialogOpen(true);
  };

  const handleDelete = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = (updatedInstructor: Instructor) => {
    (async () => {
      try {
        // map UI shape to API payload
        const payload = {
          name: updatedInstructor.name,
          jobTitle: updatedInstructor.jobTitle,
          imagePath: updatedInstructor.image ?? "",
        };
        const res = await updateInstructor(updatedInstructor.id, payload);
        // update local state with server response
        setInstructors(
          instructors.map((inst) => (inst.id === res.id ? res : inst))
        );
        toast.success("Instructor updated successfully");
      } catch (err) {
        console.error("Failed to update instructor", err);
        toast.error(getErrorMessage(err) || "Failed to update instructor");
      }
    })();
  };

  const handleConfirmDelete = async (id: number): Promise<boolean> => {
    try {
      const ok = await deleteInstructor(id);
      if (ok) {
        setInstructors(instructors.filter((inst) => inst.id !== id));
        toast.success("Instructor deleted successfully");
        return true;
      } else {
        toast.error("Failed to delete instructor");
        return false;
      }
    } catch (err) {
      console.error("Failed to delete instructor", err);
      toast.error(getErrorMessage(err) || "Failed to delete instructor");
      return false;
    }
  };

  const handleAdd = (newInstructor: Omit<Instructor, "id">) => {
    (async () => {
      try {
        const payload = {
          name: newInstructor.name,
          jobTitle: newInstructor.jobTitle,
          imagePath: newInstructor.image ?? "",
        };
        const res = await createInstructor(payload);
        setInstructors([...instructors, res]);
        toast.success("Instructor added successfully");
      } catch (err) {
        console.error("Failed to add instructor", err);
        toast.error(getErrorMessage(err) || "Failed to add instructor");
      }
    })();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400" : "fill-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading instructors...</div>;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span className="text-blue-600">Dashboard</span>
        <span>/</span>
        <span>Instructors</span>
      </div>

      <h1 className="mb-8">Instructors</h1>

      {/* Header with search and actions */}
      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3>Instructors</h3>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm text-muted-foreground">
              {instructors.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="bg-[#030213] hover:bg-[#030213]/90 text-white"
              onClick={() => setAddDialogOpen(true)}
            >
              Add Instructor
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for Instructors"
                className="pl-10 w-[300px] bg-white border-border"
              />
            </div>
            <Button variant="outline" size="icon" className="border-border">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Job Title</TableHead>
              <TableHead className="text-muted-foreground">Rate</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {instructor.jobTitle}
                </TableCell>
                <TableCell>{renderStars(instructor.rate)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      onClick={() => handleView(instructor)}
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      onClick={() => handleEdit(instructor)}
                    >
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      onClick={() => handleDelete(instructor)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-[#030213] text-white"
                  : "hover:bg-accent"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dialogs */}
      {selectedInstructor && (
        <>
          <ViewInstructorDialog
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
            instructor={selectedInstructor}
          />
          <EditInstructorDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            instructor={selectedInstructor}
            onSave={handleSaveEdit}
          />
          <DeleteInstructorDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            instructor={selectedInstructor}
            onDelete={handleConfirmDelete}
          />
        </>
      )}
      <AddInstructorDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={handleAdd}
      />
    </div>
  );
}
