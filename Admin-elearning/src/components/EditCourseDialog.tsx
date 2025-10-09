import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, ArrowLeft, Trash2, HelpCircle } from "lucide-react";

interface Course {
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
  contents: {
    name: string;
    lecturesNumber: string;
    time: string;
  }[];
}

interface EditCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  onSave: (course: Course) => void;
}

export function EditCourseDialog({
  open,
  onOpenChange,
  course,
  onSave,
}: EditCourseDialogProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(course.title);
  const [category, setCategory] = useState(course.category);
  const [level, setLevel] = useState(course.level);
  const [instructor, setInstructor] = useState(course.instructor);
  const [price, setPrice] = useState(course.price.toString());
  const [totalHours, setTotalHours] = useState(course.totalHours.toString());
  const [rating, setRating] = useState(course.rating);
  const [description, setDescription] = useState(course.description);
  const [certification, setCertification] = useState(course.certification);
  const [image, setImage] = useState(course.image);
  const [previewUrl, setPreviewUrl] = useState(course.image);
  const [contents, setContents] = useState(course.contents);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setTitle(course.title);
      setCategory(course.category);
      setLevel(course.level);
      setInstructor(course.instructor);
      setPrice(course.price.toString());
      setTotalHours(course.totalHours.toString());
      setRating(course.rating);
      setDescription(course.description);
      setCertification(course.certification);
      setImage(course.image);
      setPreviewUrl(course.image);
      setContents(course.contents);
    }
  }, [open, course]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContent = () => {
    setContents([...contents, { name: "", lecturesNumber: "", time: "" }]);
  };

  const handleRemoveContent = (index: number) => {
    if (contents.length > 1) {
      setContents(contents.filter((_, i) => i !== index));
    }
  };

  const handleContentChange = (
    index: number,
    field: "name" | "lecturesNumber" | "time",
    value: string
  ) => {
    const newContents = [...contents];
    newContents[index][field] = value;
    setContents(newContents);
  };

  const handleNext = () => {
    if (!title || !category || !level || !instructor) {
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSave = () => {
    const totalLectures = contents.reduce(
      (sum, content) => sum + (parseInt(content.lecturesNumber) || 0),
      0
    );

    onSave({
      ...course,
      title,
      instructor,
      rating,
      totalHours: parseInt(totalHours) || 0,
      lectures: totalLectures,
      level,
      price: parseFloat(price) || 0,
      image,
      category,
      description,
      certification,
      contents: contents.filter((c) => c.name),
    });
  };

  const handleCancel = () => {
    setStep(1);
    onOpenChange(false);
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none hover:scale-110 transition-transform"
          >
            <svg
              className={`w-7 h-7 ${
                star <= rating ? "fill-yellow-400" : "fill-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>Step {step} of 2</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 mt-4">
            <h3>Course details</h3>

            {/* Image Upload */}
            <div className="flex gap-6">
              <div className="w-48 h-32 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">Upload Image</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm mb-1">Size: 700x430 pixels</p>
                <p className="text-sm text-muted-foreground mb-3">
                  File Support: .jpg, .jpeg, png, or .gif
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Course Name */}
            <div>
              <Label htmlFor="title">Course Name</Label>
              <Input
                id="title"
                placeholder="Write here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 bg-white border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2 bg-white border-border">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Level */}
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="mt-2 bg-white border-border">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Instructor */}
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Select value={instructor} onValueChange={setInstructor}>
                  <SelectTrigger className="mt-2 bg-white border-border">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ronald Richards">
                      Ronald Richards
                    </SelectItem>
                    <SelectItem value="Jason Fahd">Jason Fahd</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cost */}
              <div>
                <Label htmlFor="price">Cost</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Write here"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-2 bg-white border-border"
                />
              </div>

              {/* Total Hours */}
              <div>
                <Label htmlFor="totalHours">Total hours</Label>
                <Input
                  id="totalHours"
                  type="number"
                  placeholder="Write here"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="mt-2 bg-white border-border"
                />
              </div>

              {/* Rate */}
              <div>
                <Label>Rate</Label>
                <div className="mt-2">{renderStars()}</div>
              </div>
            </div>

            {/* Description and Certification */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 min-h-[150px] bg-white border-border"
                />
              </div>
              <div>
                <Label htmlFor="certification">Certification</Label>
                <Textarea
                  id="certification"
                  placeholder="Write here"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  className="mt-2 min-h-[150px] bg-white border-border"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-red-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#030213] hover:bg-[#030213]/90 text-white px-12"
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            <h3>Edit Content</h3>

            {contents.map((content, index) => (
              <div
                key={index}
                className="space-y-4 pb-6 border-b border-border last:border-b-0"
              >
                {/* Name */}
                <div>
                  <Label htmlFor={`content-name-${index}`}>Name</Label>
                  <Input
                    id={`content-name-${index}`}
                    placeholder="Write here"
                    value={content.name}
                    onChange={(e) =>
                      handleContentChange(index, "name", e.target.value)
                    }
                    className="mt-2 bg-white border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Lectures Number */}
                  <div>
                    <Label htmlFor={`lectures-${index}`}>Lectures Number</Label>
                    <Input
                      id={`lectures-${index}`}
                      placeholder="Write here"
                      value={content.lecturesNumber}
                      onChange={(e) =>
                        handleContentChange(
                          index,
                          "lecturesNumber",
                          e.target.value
                        )
                      }
                      className="mt-2 bg-white border-border"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <Label htmlFor={`time-${index}`}>Time</Label>
                    <Input
                      id={`time-${index}`}
                      placeholder="Write here"
                      value={content.time}
                      onChange={(e) =>
                        handleContentChange(index, "time", e.target.value)
                      }
                      className="mt-2 bg-white border-border"
                    />
                  </div>
                </div>

                {contents.length > 1 && (
                  <button
                    onClick={() => handleRemoveContent(index)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            {/* Add Another Content */}
            <button
              onClick={handleAddContent}
              className="w-full py-3 border border-dashed border-border rounded-lg text-muted-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
            >
              Add Another Content
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-red-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#030213] hover:bg-[#030213]/90 text-white px-12"
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
