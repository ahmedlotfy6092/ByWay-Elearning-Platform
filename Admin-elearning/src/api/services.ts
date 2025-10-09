import api from "./axios";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  if (res?.data?.token) {
    localStorage.setItem("byway_token", res.data.token);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem("byway_token");
}

export async function getDashboardStats() {
  const res = await api.get("/admin/dashboard");
  return res.data;
}

export async function getCourses(page = 1, pageSize = 20) {
  const res = await api.get(`/courses?page=${page}&pageSize=${pageSize}`);
  return res.data;
}

export async function getInstructors(page = 1, pageSize = 20) {
  const res = await api.get(`/instructors?page=${page}&pageSize=${pageSize}`);
  return res.data;
}

export interface CoursePayload {
  title: string;
  description?: string;
  instructorId?: number;
  // add other course fields as needed
}

export interface InstructorPayload {
  name: string;
  email: string;
  bio?: string;
  // add other instructor fields as needed
}

export async function addCourse(payload: CoursePayload) {
  const res = await api.post(`/courses`, payload);
  return res.data;
}

export async function createCourse(payload: CoursePayload) {
  return addCourse(payload);
}

export interface UpdateCoursePayload {
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  level: string;
  imagePath: string;
  categoryId: number;
  isFeatured?: boolean;
}

export async function updateCourse(id: number, payload: UpdateCoursePayload) {
  const res = await api.put(`/courses/${id}`, payload);
  return res.data;
}

export async function getCourseById(id: number) {
  const res = await api.get(`/courses/${id}`);
  return res.data;
}

export async function deleteCourse(id: number) {
  try {
    const res = await api.delete(`/courses/${id}`);
    return res.status === 204 || res.status === 200;
  } catch (err: unknown) {
    let msg = "Failed to delete course";
    if (typeof err === "object" && err !== null) {
      const maybe = err as { response?: { data?: { message?: unknown } }; message?: unknown };
      const candidate = maybe.response?.data?.message ?? maybe.message;
      if (typeof candidate === "string") msg = candidate;
    } else if (typeof err === "string") {
      msg = err;
    }
    throw new Error(msg);
  }
}

export async function addInstructor(payload: InstructorPayload) {
  const res = await api.post(`/instructors`, payload);
  return res.data;
}

// Admin instructor endpoints (create, update, delete)
export interface CreateInstructorPayload {
  name: string;
  jobTitle: string;
  imagePath: string; // base64 or URL
}

export interface UpdateInstructorPayload {
  name: string;
  jobTitle: string;
  imagePath: string;
}

export async function createInstructor(payload: CreateInstructorPayload) {
  const res = await api.post(`/instructors`, payload);
  return res.data;
}

export async function updateInstructor(id: number, payload: UpdateInstructorPayload) {
  const res = await api.put(`/instructors/${id}`, payload);
  return res.data;
}

export async function deleteInstructor(id: number) {
  try {
    const res = await api.delete(`/instructors/${id}`);
    return res.status === 204 || res.status === 200;
  } catch (err: unknown) {
    let msg = "Failed to delete instructor";
    if (typeof err === "object" && err !== null) {
      const maybe = err as { response?: { data?: { message?: unknown } }; message?: unknown };
      const candidate = maybe.response?.data?.message ?? maybe.message;
      if (typeof candidate === "string") msg = candidate;
    } else if (typeof err === "string") {
      msg = err;
    }
    throw new Error(msg);
  }
}
