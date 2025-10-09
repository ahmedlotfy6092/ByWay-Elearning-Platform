import { Star, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import apiInstance from "../utils/axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  enrollmentsCount: number;
  imagePath: string;
  level: string;
  isFeatured: boolean;
  createdAt: string;
  categoryId: number;
  categoryName: string;
  instructorId: number;
  instructorName: string;
  instructorImagePath?: string;
}

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export function CourseDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]); // Assuming reviews are fetched or static

  const loadCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get(`/courses/${id}`);
      setCourse(response.data);
      
      // Load similar courses from the same category
      const similarResponse = await apiInstance.get(`/public/top-courses`, {
        params: {
          categoryId: response.data.categoryId,
          exclude: id
        }
      });
      setSimilarCourses(similarResponse.data);

      // Mock reviews or fetch them
      setReviews([
        { name: "John Doe", rating: 5, date: "2023-10-01", text: "Great course!" },
        { name: "Jane Smith", rating: 4, date: "2023-10-02", text: "Very informative." },
      ]);
    } catch (err) {
      setError('Failed to load course details');
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-muted-foreground">{error || 'Course not found'}</p>
        </div>
      </div>
    );
  }

  // Mock rating distribution data
  const ratingData = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
              <span className="text-xl font-bold">Byway</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/#courses" className="text-foreground hover:text-muted-foreground transition-colors">
                Courses
              </a>
              <Button variant="outline" onClick={() => (window.location.hash = "signin")}>
                Log In
              </Button>
              <Button onClick={() => (window.location.hash = "signup")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/#courses" className="hover:text-foreground">Category</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl mb-4">{course.name}</h1>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              
              {/* Course stats */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">{course.rating.toFixed(1)}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= Math.round(course.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-300 text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({course.enrollmentsCount} students)</span>
                </div>
                <span className="text-sm text-muted-foreground">Level: {course.level}</span>
              </div>

              {/* Instructor info */}
              <div className="flex items-center gap-2 mb-8">
                <ImageWithFallback
                  src={course.instructorImagePath || '/default-instructor.jpg'}
                  alt="Instructor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm">
                    Created by <span className="text-blue-600">{course.instructorName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Category: {course.categoryName}</p>
                </div>
              </div>

              {/* Course content tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="description" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Course Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="instructor" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4">Course Description</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-4">Course Details</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Category: {course.categoryName}</p>
                        <p>Level: {course.level}</p>
                        <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                        <p>Enrolled Students: {course.enrollmentsCount}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4">What you'll learn</h3>
                      <div className="bg-muted/30 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">Become a UX designer.</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">You will be able to add UX designer to your CV</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">Become a UI designer.</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">Build & test a full website design.</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">Learn to design websites & mobile phone apps.</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm">You'll learn how to choose colors.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instructor Bio */}
                    <div>
                      <h3 className="mb-4">Instructor</h3>
                      <div className="border border-border rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <ImageWithFallback
                            src={course.instructorImagePath || '/default-instructor.jpg'}
                            alt={course.instructorName}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{course.instructorName}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{course.categoryName} Expert</p>
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <span>{course.rating.toFixed(1)} Rating</span>
                              </div>
                              <div>
                                <span>{course.enrollmentsCount} Students</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expert instructor in {course.categoryName} with proven experience in delivering high-quality educational content.
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="mb-4">Content</h3>
                      <div className="space-y-2">
                        <div className="border border-border rounded-lg p-4 flex justify-between items-center">
                          <span>Introduction to UX Design</span>
                          <span className="text-sm text-muted-foreground">1 Lectures . 1hour</span>
                        </div>
                        <div className="border border-border rounded-lg p-4 flex justify-between items-center">
                          <span>Basics of User-Centered Design</span>
                          <span className="text-sm text-muted-foreground">5 Lectures . 1hour</span>
                        </div>
                        <div className="border border-border rounded-lg p-4 flex justify-between items-center">
                          <span>Elements of User Experience</span>
                          <span className="text-sm text-muted-foreground">5 Lectures . 1hour</span>
                        </div>
                        <div className="border border-border rounded-lg p-4 flex justify-between items-center">
                          <span>Visual Design Principles</span>
                          <span className="text-sm text-muted-foreground">5 Lectures . 1hour</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                      <p className="text-muted-foreground">{course.description}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Instructor Information</h3>
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={course.instructorImagePath || '/default-instructor.jpg'}
                          alt={course.instructorName}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">{course.instructorName}</h4>
                          <p className="text-sm text-muted-foreground">{course.categoryName} Expert</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                      <div className="flex gap-8 mb-6">
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-2">{course.rating.toFixed(1)}</div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= Math.round(course.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-300 text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{course.enrollmentsCount} students enrolled</div>
                        </div>
                        <div className="flex-1 space-y-2">
                          {ratingData.map((item) => (
                            <div key={item.stars} className="flex items-center gap-3">
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= item.stars
                                        ? "fill-amber-500 text-amber-500"
                                        : "fill-gray-300 text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-amber-500 h-2 rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        {reviews.map((review, index) => (
                          <div key={index} className="border-b border-border pb-4">
                            <div className="flex gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white">
                                {review.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4>{review.name}</h4>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-500 text-amber-500' : 'fill-gray-300 text-gray-300'}`}
                                      />
                                    ))}
                                    <span>{review.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                                <p className="text-sm">{review.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-6">
                        <Button variant="outline">View more Reviews</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Similar Courses */}
              <div className="mt-12">
                <h3 className="mb-6">Similar Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarCourses.map((similarCourse) => (
                    <div key={similarCourse.id} className="border border-border rounded-lg overflow-hidden">
                      <div className="relative">
                        <ImageWithFallback
                          src={similarCourse.imagePath}
                          alt={similarCourse.name}
                          className="w-full h-40 object-cover"
                        />
                        {similarCourse.isFeatured && (
                          <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {similarCourse.categoryName}
                          </span>
                        </div>
                        <h4 className="text-sm mb-2">{similarCourse.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">By {similarCourse.instructorName}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-3 h-3 ${star <= Math.round(similarCourse.rating) ? 'fill-amber-500 text-amber-500' : 'fill-gray-300 text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs">({similarCourse.enrollmentsCount} students)</span>
                        </div>
                        <div className="text-lg">
                          ${similarCourse.price.toFixed(2)}
                          {similarCourse.discountPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${similarCourse.discountPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <div className="border border-border rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={course.imagePath}
                    alt={course.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <div className="text-3xl">${course.price.toFixed(2)}</div>
                      {course.discountPrice && (
                        <div className="text-xl text-muted-foreground line-through">
                          ${course.discountPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full mb-3" 
                      onClick={() => window.location.href = `/checkout?courseId=${course.id}`}
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = `/cart/add/${course.id}`}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Course Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Full lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Access on mobile and desktop
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Certificate of completion
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center gap-3">
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="#4285F4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 border border-border rounded flex items-center justify-center hover:bg-muted">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}