import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ViewInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: {
    id: number;
    name: string;
    jobTitle: string;
    description: string;
    rate: number;
    image?: string;
  };
}

export function ViewInstructorDialog({
  open,
  onOpenChange,
  instructor,
}: ViewInstructorDialogProps) {
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Instructor Details</DialogTitle>
          <DialogDescription>
            View detailed information about the instructor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-muted overflow-hidden">
              {instructor.image ? (
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                  {instructor.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Name
            </label>
            <p className="text-foreground">{instructor.name}</p>
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Job Title
            </label>
            <p className="text-foreground">{instructor.jobTitle}</p>
          </div>

          {/* Rate */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Rate
            </label>
            {renderStars(instructor.rate)}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Description
            </label>
            <p className="text-foreground whitespace-pre-wrap">
              {instructor.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
