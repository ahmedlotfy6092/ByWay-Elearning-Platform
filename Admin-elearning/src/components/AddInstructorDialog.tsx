import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Upload } from 'lucide-react';

interface AddInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (instructor: {
    name: string;
    jobTitle: string;
    description: string;
    rate: number;
    image?: string;
  }) => void;
}

export function AddInstructorDialog({
  open,
  onOpenChange,
  onAdd,
}: AddInstructorDialogProps) {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAdd = () => {
    if (!name || !jobTitle) {
      return;
    }
    
    onAdd({
      name,
      jobTitle,
      description,
      rate,
      image,
    });
    
    // Reset form
    setName('');
    setJobTitle('');
    setDescription('');
    setRate(0);
    setImage(undefined);
    setPreviewUrl(undefined);
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setName('');
    setJobTitle('');
    setDescription('');
    setRate(0);
    setImage(undefined);
    setPreviewUrl(undefined);
    onOpenChange(false);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRate(star)}
            className="focus:outline-none hover:scale-110 transition-transform"
          >
            <svg
              className={`w-8 h-8 ${
                star <= rate ? 'fill-yellow-400' : 'fill-gray-300'
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Instructor</DialogTitle>
          <DialogDescription>
            Create a new instructor profile with details and image
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-muted overflow-hidden border-2 border-border">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Upload className="w-8 h-8" />
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">
              Recommended size: 300x300 pixels
            </p>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter instructor name"
              className="mt-2 bg-white border-border"
            />
          </div>

          {/* Job Title */}
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
              className="mt-2 bg-white border-border"
            />
          </div>

          {/* Rate */}
          <div>
            <Label>Rate</Label>
            <div className="mt-2">{renderStarRating()}</div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-2 bg-white border-border min-h-[120px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              className="bg-[#030213] hover:bg-[#030213]/90 text-white"
              disabled={!name || !jobTitle}
            >
              Add Instructor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
