import { ChevronLeft, ChevronRight, Lightbulb, LayoutGrid, Briefcase, Mail } from "lucide-react";
import { Button } from "./ui/button";

export function Categories() {
  const categories = [
    {
      icon: Lightbulb,
      name: "Flatwork",
      courses: "43 Courses",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: LayoutGrid,
      name: "Backend",
      courses: "43 Courses",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Briefcase,
      name: "Frontend",
      courses: "43 Courses",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      icon: Mail,
      name: "UI/UX Design",
      courses: "43 Courses",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">Top Categories</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`${category.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <category.icon className={`w-8 h-8 ${category.iconColor}`} />
              </div>
              <h3 className="mb-1">{category.name}</h3>
              <p className="text-muted-foreground text-sm">{category.courses}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
