import { useEffect, useState } from "react";
import { Search, ShoppingCart, ChevronDown, SlidersHorizontal, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/Footer";
import apiInstance from "../utils/axios";

export function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState("The latest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedLectures, setSelectedLectures] = useState("31-45");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState({
    frontend: true,
    backend: false,
    testing: false,
    uiuxDesign: true,
  });

  const sortOptions = ["Highest price", "Lowest price", "The latest", "The oldest"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiInstance.get("Courses"); // عدل المسار حسب الـ API عندك
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* باقي الكود بتاع الـ Navbar والـ Sidebar ... */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">Available Courses</h1>
          <p className="text-muted-foreground">All Development Courses</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters هنا زي ما هو */}

          {/* Courses Grid */}
          <div className="flex-1">
            {/* Sort By هنا زي ما هو */}

            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <a
                    href="#course-detail"
                    key={course.id}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow block"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={`https://your-domain.com${course.imagePath}`} // غيّر حسب API URL عندك
                        alt={course.name}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
                        {course.categoryName}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2">{course.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {course.instructorName}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(course.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {course.level} • {course.enrollmentsCount} Enrollments
                      </p>
                      <p className="text-xl font-semibold text-primary">
                        ${course.discountPrice.toFixed(2)}{" "}
                        <span className="line-through text-gray-400 text-sm">
                          ${course.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
