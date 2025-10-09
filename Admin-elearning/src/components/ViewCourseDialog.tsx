import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ViewCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: {
    id: number;
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
    contents: {
      name: string;
      lecturesNumber: string;
      time: string;
    }[];
  };
}

export function ViewCourseDialog({
  open,
  onOpenChange,
  course,
}: ViewCourseDialogProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400' : 'fill-gray-300'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
          <DialogDescription>
            View detailed information about this course
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Course Image */}
          <div className="w-full h-64 rounded-lg bg-muted overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Course Name
              </label>
              <p className="text-foreground">{course.title}</p>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Category
              </label>
              <p className="text-foreground">{course.category}</p>
            </div>

            {/* Instructor */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Instructor
              </label>
              <p className="text-foreground">{course.instructor}</p>
            </div>

            {/* Level */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Level
              </label>
              <p className="text-foreground">{course.level}</p>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Cost
              </label>
              <p className="text-foreground">${course.price.toFixed(2)}</p>
            </div>

            {/* Total Hours */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Total Hours
              </label>
              <p className="text-foreground">{course.totalHours}</p>
            </div>

            {/* Rate */}
            <div className="col-span-2">
              <label className="text-sm text-muted-foreground mb-1 block">
                Rate
              </label>
              {renderStars(course.rating)}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Description
            </label>
            <p className="text-foreground whitespace-pre-wrap">
              {course.description}
            </p>
          </div>

          {/* Certification */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Certification
            </label>
            <p className="text-foreground whitespace-pre-wrap">
              {course.certification}
            </p>
          </div>

          {/* Course Contents */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Course Contents
            </label>
            <div className="space-y-3">
              {course.contents.map((content, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg bg-muted/30"
                >
                  <p className="font-medium mb-2">{content.name}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{content.lecturesNumber} Lectures</span>
                    <span>•</span>
                    <span>{content.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
