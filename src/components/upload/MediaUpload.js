import React, { useRef, useState } from "react";
import { Camera, Truck, X, Upload, Save } from "lucide-react";

function MediaUpload({
  uploadTitle,
  handleImageUpload,
  previewUrls,
  removeImage,
  images,
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {uploadTitle}
        </label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => fileInputRef?.current?.click()}
        >
          <Camera className="text-gray-400 mb-2" size={36} />
          <p className="text-gray-600 text-center">
            Click to upload truck images
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG or GIF up to 5MB
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
            multiple
          />
        </div>
      </div>

      {previewUrls?.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Image Preview</p>
          <div className="grid grid-cols-2 gap-3">
            {previewUrls?.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Truck preview ${index + 1}`}
                  className="w-full h-32 object-contain rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mt-6">
        <Upload className="text-blue-600 mr-2" size={20} />
        <span className="text-sm text-gray-600">
          {images?.length} file(s) ready to upload
        </span>
      </div>
    </div>
  );
}

export default MediaUpload;
