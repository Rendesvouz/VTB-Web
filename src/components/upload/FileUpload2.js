import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Upload,
  X,
  File,
  Image,
  Video,
  FileText,
  Download,
  Play,
  Pause,
} from "lucide-react";

function FileUpload2({
  fileType = "*/*",
  uploadTitle,
  selectedFile,
  previewUrl,
  handleFileChange,
  handleCancel,
  loading,
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [internalPreviewUrl, setInternalPreviewUrl] = useState(null);
  const videoRef = useRef(null);

  // Generate preview URL when file changes
  useEffect(() => {
    if (selectedFile && !previewUrl) {
      const url = URL.createObjectURL(selectedFile);
      setInternalPreviewUrl(url);

      // Cleanup URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
        setInternalPreviewUrl(null);
      };
    } else if (!selectedFile) {
      setInternalPreviewUrl(null);
    }
  }, [selectedFile, previewUrl]);

  // Use provided previewUrl or fallback to internal one
  const currentPreviewUrl = previewUrl || internalPreviewUrl;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        // Create a mock event to pass to handleFileChange
        const mockEvent = {
          target: {
            files: [file],
          },
        };
        handleFileChange?.(mockEvent);
      }
    },
    [handleFileChange]
  );

  const getFileIcon = (type) => {
    if (type?.startsWith("image/"))
      return <Image className="w-12 h-12 text-blue-400" />;
    if (type?.startsWith("video/"))
      return <Video className="w-12 h-12 text-purple-400" />;
    if (type === "application/pdf")
      return <FileText className="w-12 h-12 text-red-400" />;
    return <File className="w-12 h-12 text-gray-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const renderPreview = () => {
    const type = selectedFile?.type;

    if (!selectedFile) return null;

    if (type?.startsWith("video/")) {
      return (
        <div className="relative group">
          <video
            ref={videoRef}
            className="w-full max-h-80 rounded-xl shadow-lg object-cover"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src={currentPreviewUrl} type={type} />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={toggleVideoPlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
          >
            {isVideoPlaying ? (
              <Pause className="w-16 h-16 text-white" />
            ) : (
              <Play className="w-16 h-16 text-white" />
            )}
          </button>
        </div>
      );
    } else if (type?.startsWith("image/")) {
      return (
        <div className="relative group">
          <img
            src={currentPreviewUrl}
            alt="Preview"
            className="w-full max-h-80 rounded-xl shadow-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-xl"></div>
        </div>
      );
    } else if (type === "application/pdf") {
      return (
        <div className="relative">
          <embed
            src={currentPreviewUrl}
            title="PDF Preview"
            className="w-full h-96 rounded-xl shadow-lg border border-gray-200"
          />
          <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center py-8">
          {getFileIcon(type)}
          <p className="text-lg font-medium text-gray-700 mt-4">
            {selectedFile.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {formatFileSize(selectedFile.size)}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {uploadTitle}
      </label>
      {selectedFile ? (
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile.type)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedFile.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatFileSize(selectedFile.size)} •{" "}
                    {selectedFile.type || "Unknown type"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-red-50 group"
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="p-6">{renderPreview()}</div>

          {/* Footer Actions */}
          <div className="bg-gray-50 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>File ready for upload</span>
            </div>
            {currentPreviewUrl && (
              <a
                href={currentPreviewUrl}
                download={selectedFile.name}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-blue-400 bg-blue-50 scale-105"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={!loading ? handleClick : undefined}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

          {/* Upload Icon */}
          <div className="relative z-10">
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                dragActive ? "bg-blue-100 scale-110" : "bg-gray-100"
              }`}
            >
              <Upload
                className={`w-12 h-12 transition-colors duration-300 ${
                  dragActive ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>

            {/* Upload Text */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {dragActive ? "Drop your file here" : "Upload a file"}
              </h3>
              <p className="text-gray-600">
                Drag and drop your file here, or{" "}
                <span className="text-blue-500 font-medium">browse</span>
              </p>
              <p className="text-sm text-gray-500">
                Supports images, videos, PDFs and more
              </p>
            </div>

            {/* File type hints */}
            <div className="flex justify-center space-x-4 mt-8">
              <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
                <Image className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-600">Images</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-600">Videos</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
                <FileText className="w-4 h-4 text-red-400" />
                <span className="text-xs text-gray-600">Documents</span>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={fileType}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
}

export default FileUpload2;
