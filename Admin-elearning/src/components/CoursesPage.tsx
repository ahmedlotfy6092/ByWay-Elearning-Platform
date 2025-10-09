import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { EditCourseDialog } from "./EditCourseDialog";
import { DeleteCourseDialog } from "./DeleteCourseDialog";
import { AddCourseDialog } from "./AddCourseDialog";
import { ViewCourseDialog } from "./ViewCourseDialog";
import { toast } from "sonner";
import { getCourses, updateCourse, deleteCourse } from "../api/services";

interface Course {
  id: number;
  title?: string;
  name?: string; // some APIs use `name` or `title`
  description?: string;
  price?: number;
  rating?: number;
  image?: string;
  imagePath?: string;
  category?: string;
  categoryName?: string;
  instructor?: string;
  instructorName?: string;
}

interface UpdateCoursePayload {
  name: string;
  description?: string;
  price?: number;
  discountPrice?: number | undefined;
  level?: string;
  imagePath?: string;
  categoryId?: number;
  isFeatured?: boolean;
}

// shape emitted by AddCourseDialog
interface CourseForm {
  title: string;
  instructor: string;
  rating: number;
  totalHours: number;
  lectures: number;
  level: string;
  price: number;
  image: string;
  category: string;
  description: string;
  certification: string;
  contents: { name: string; lecturesNumber: string; time: string }[];
}

// detailed course shape used by ViewCourseDialog
interface CourseDetailed {
  id: number;
  title: string;
  instructor: string;
  instructorId?: number;
  rating: number;
  totalHours: number;
  lectures: number;
  level: string;
  price: number;
  image: string;
  category: string;
  categoryId?: number;
  description: string;
  certification: string;
  contents: { name: string; lecturesNumber: string; time: string }[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<CourseDetailed | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourses(1, 50);
        // API may return { items: [], total } or array directly
        const list = Array.isArray(data) ? data : data?.items ?? [];
        setCourses(list);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const mapApiToDetailed = (api: unknown): CourseDetailed => {
    const a = api as Record<string, unknown>;
    return {
      id: Number(a.id ?? 0),
      title: (a.name ?? a.title ?? "") as string,
      instructor: (a.instructorName ?? a.instructor ?? "") as string,
      instructorId:
        Number(a.instructorId ?? a.instructor?.id ?? 0) || undefined,
      rating: Number(a.rating ?? 0),
      totalHours: Number(a.totalHours ?? 0),
      lectures: Number(a.lectures ?? 0),
      level: (a.level ?? a.levelName ?? "") as string,
      price: Number(a.price ?? 0),
      image: (a.imagePath ?? a.image ?? "") as string,
      category: (a.categoryName ?? a.category ?? "") as string,
      categoryId: Number(a.categoryId ?? a.category?.id ?? 0) || undefined,
      description: (a.description ?? "") as string,
      certification: (a.certification ?? "") as string,
      contents: (a.contents ?? []) as {
        name: string;
        lecturesNumber: string;
        time: string;
      }[],
    };
  };

  const handleSave = async (updated: Course) => {
    try {
      if (!selected) throw new Error("No course selected for update");

      const payload: UpdateCoursePayload = {
        name: updated.name ?? updated.title ?? "",
        description: updated.description ?? selected.description ?? "",
        price: updated.price ?? selected.price ?? 0,
        discountPrice: undefined,
        level: (updated.level as string) || selected.level || "",
        imagePath: updated.imagePath ?? updated.image ?? selected.image ?? "",
        // keep the existing category/instructor ids from the loaded detailed course
        categoryId: selected.categoryId ?? 0,
        isFeatured: false,
      };

      const res = (await updateCourse(selected.id, payload)) as Course;
      setCourses(courses.map((c) => (c.id === res.id ? res : c)));
      toast.success("Course updated");
    } catch (err) {
      console.error("Failed to update course", err);
      // try to extract a backend message if present
      let msg = "Failed to update course";
      if (err && typeof err === "object") {
        const maybe = err as {
          message?: unknown;
          response?: { data?: { message?: unknown } };
        };
        const candidate = maybe.response?.data?.message ?? maybe.message;
        if (typeof candidate === "string") msg = candidate;
      }
      toast.error(msg);
    }
    setEditOpen(false);
  };

  // called by dialog; return true on success, false on failure
  const handleDeleteConfirmed = async (id: number): Promise<boolean> => {
    try {
      const ok = await deleteCourse(id);
      if (ok) {
        setCourses(courses.filter((c) => c.id !== id));
        toast.success("Course deleted");
        return true;
      } else {
        toast.error("Failed to delete course");
        return false;
      }
    } catch (err) {
      console.error("Failed to delete course", err);
      let msg = "Failed to delete course";
      if (err && typeof err === "object") {
        const maybe = err as {
          message?: unknown;
          response?: { data?: { message?: unknown } };
        };
        const candidate = maybe.response?.data?.message ?? maybe.message;
        if (typeof candidate === "string") msg = candidate;
      }
      toast.error(msg);
      return false;
    }
  };

  const handleView = async (course: Course) => {
    try {
      const api = await (
        await import("../api/services")
      ).getCourseById(course.id);
      const detailed = mapApiToDetailed(api);
      setSelected(detailed);
      setViewOpen(true);
    } catch (err) {
      console.error("Failed to load course details", err);
      toast.error("Failed to load course details");
    }
  };

  const handleAddCourse = async (course: CourseForm) => {
    try {
      const payload = {
        name: course.title,
        description: course.description,
        price: course.price || 0,
        discountPrice: undefined,
        level: course.level || "",
        imagePath: course.image || "",
        categoryId: 0,
        instructorId: 0,
        isFeatured: false,
      };
      const res = await (await import("../api/services")).createCourse(payload);
      setCourses([...courses, res]);
      toast.success("Course added");
      setAddOpen(false);
    } catch (err) {
      console.error("Failed to add course", err);
      toast.error("Failed to add course");
    }
  };

  // open edit dialog: fetch full course details then open dialog
  const handleEdit = async (course: Course) => {
    try {
      const api = await (
        await import("../api/services")
      ).getCourseById(course.id);
      const detailed = mapApiToDetailed(api);
      setSelected(detailed);
      setEditOpen(true);
    } catch (err) {
      console.error("Failed to load course for editing", err);
      toast.error("Failed to load course for editing");
    }
  };

  // open delete confirmation and mark selected course
  const handleDelete = (course: Course) => {
    setSelected(course);
    setDeleteOpen(true);
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <h1 className="mb-6">Courses</h1>
      <div className="bg-white border border-border rounded-xl p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Title</TableHead>
              <TableHead className="text-muted-foreground">
                Instructor
              </TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {course.instructorName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {course.categoryName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => handleView(course)}>View</Button>
                    <Button onClick={() => handleEdit(course)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(course)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">All Courses</h2>
          <Button
            onClick={() => setAddOpen(true)}
            className="bg-[#030213] text-white"
          >
            Add Course
          </Button>
        </div>

        {selected && (
          <>
            <ViewCourseDialog
              open={viewOpen}
              onOpenChange={setViewOpen}
              course={selected as CourseDetailed}
            />
            <EditCourseDialog
              open={editOpen}
              onOpenChange={setEditOpen}
              course={selected as Course}
              onSave={handleSave}
            />
            <DeleteCourseDialog
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              course={{
                id: selected.id,
                title: selected.title ?? selected.name ?? "",
              }}
              onDelete={handleDeleteConfirmed}
            />
          </>
        )}

        <AddCourseDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          onAdd={handleAddCourse}
        />
      </div>
    </div>
  );
}
