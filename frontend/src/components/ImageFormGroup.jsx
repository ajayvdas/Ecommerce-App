import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ImageFormGroup = ({ image, setImage, onFileUpload, loadingUpload }) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div>
                <Input id="imageFile" type="file" onChange={onFileUpload} className="cursor-pointer" />
            </div>
            {loadingUpload && (
                <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            )}
        </div>
    );
};

export default ImageFormGroup;