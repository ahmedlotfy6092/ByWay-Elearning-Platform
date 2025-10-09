import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";
import apiInstance from "../utils/axios"; // Adjust the path as needed

export function Instructors() {

 const [instructors, setInstructors] = useState([])
  
      useEffect(() => {
          
      
          apiInstance.get(`public/top-instructors`).then((res) => {
            console.log(res.data)
            
            setInstructors(res.data)
          })
        
        },[])


  // const instructors = [
  //   {

  //     image: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg5MTkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     name: "Ronald Richards",
  //     role: "UI/UX Designer",
  //     rating: 4.9,
  //     students: 2400,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg5MTkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     name: "Ronald Richards",
  //     role: "UI/UX Designer",
  //     rating: 4.9,
  //     students: 2400,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg5MTkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     name: "Ronald Richards",
  //     role: "UI/UX Designer",
  //     rating: 4.9,
  //     students: 2400,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg5MTkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     name: "Ronald Richards",
  //     role: "UI/UX Designer",
  //     rating: 4.9,
  //     students: 2400,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg5MTkyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     name: "Ronald Richards",
  //     role: "UI/UX Designer",
  //     rating: 4.9,
  //     students: 2400,
  //   },
  // ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">Top Instructors</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative mb-4">
                <ImageWithFallback
                  src={instructor.imagePath}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="mb-1">{instructor.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{instructor.role}</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{instructor.rating}</span>
                </div>
                <div className="text-muted-foreground">
                  {/* {instructor.students} Students */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
