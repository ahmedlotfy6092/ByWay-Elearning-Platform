import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";
import apiInstance from "../utils/axios"; // Adjust the path as needed
import {Link} from "react-router-dom" 
export function Courses() {
   const [courses, setCources] = useState([])
  
      useEffect(() => {
          
      
          apiInstance.get(`public/top-courses`).then((res) => {
            console.log(res.data)
            
            setCources(res.data)
          })
        
        },[])
  // const courses = [
  //   {
  //     image: "https://images.unsplash.com/photo-1629813573901-864d55dc463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjBkZXNrfGVufDF8fHx8MTc1OTkyMzAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     badge: "Best Seller",
  //     title: "Beginner's Guide to Design",
  //     author: "By Ronald Richards",
  //     rating: 5.0,
  //     reviews: 1200,
  //     price: "$45.00",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1629813573901-864d55dc463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjBkZXNrfGVufDF8fHx8MTc1OTkyMzAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     badge: "Best Seller",
  //     title: "Beginner's Guide to Design",
  //     author: "By Ronald Richards",
  //     rating: 5.0,
  //     reviews: 1200,
  //     price: "$45.00",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1629813573901-864d55dc463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjBkZXNrfGVufDF8fHx8MTc1OTkyMzAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     badge: "Best Seller",
  //     title: "Beginner's Guide to Design",
  //     author: "By Ronald Richards",
  //     rating: 5.0,
  //     reviews: 1200,
  //     price: "$45.00",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1629813573901-864d55dc463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjBkZXNrfGVufDF8fHx8MTc1OTkyMzAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     badge: "Best Seller",
  //     title: "Beginner's Guide to Design",
  //     author: "By Ronald Richards",
  //     rating: 5.0,
  //     reviews: 1200,
  //     price: "$45.00",
  //   },
  // ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">Top Courses</h2>
          <div className="flex items-center gap-4">
            <a href="#" className="text-blue-600 hover:underline">
              See All
            </a>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Link
             to={`/course-detail/${course.id}`}
              key={index}
              className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block"
            >
              <div className="relative">
                <ImageWithFallback
                  src={course.imagePath}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-orange-100 text-orange-700 hover:bg-orange-100">
                  {/* {course.badge} */}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="mb-2">{course.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{course.instructorName}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{course.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({course.reviews})
                    </span>
                  </div>
                </div>
                <div className="text-xl">{course.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
