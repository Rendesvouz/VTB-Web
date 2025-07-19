import React, { useRef, useState } from "react";
import { Truck, Save } from "lucide-react";
import MediaUpload from "../../../components/upload/MediaUpload";
import styled from "styled-components";
import axiosInstance from "../../../utils/api-client";
import FormButton from "../../../components/form/FormButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  padding-top: 130px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 60px;
  align-content: center;
  padding: auto;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
    margin-bottom: 0px;
    height: auto;
  }
`;

function CreateTruck() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxTruckCategories = state?.user?.truckCategories;
  console.log("reduxTruckCategories", reduxTruckCategories);

  const [loading, setLoading] = useState(false);

  const [truckInfo, setTruckInfo] = useState({
    carName: "",
    carModel: "",
    carType: "",
    carCapacity: "",
    carLocation: "",
    carDescription: "",
    carPrice: "",
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTruckInfo({
      ...truckInfo,
      [name]: value,
    });
  };

  const handleTruckTypeSelect = (e) => {
    const selectedType = e.target.value;
    const selectedCategory = reduxTruckCategories?.find(
      (cat) => cat.type === selectedType
    );

    if (selectedCategory) {
      setTruckInfo((prev) => ({
        ...prev,
        carType: selectedCategory?.type,
        carPrice: selectedCategory?.baseFare,
        carCapacity: selectedCategory?.capacity,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("filess", files);

    if (files?.length > 0) {
      // Add new files to existing images
      setImages([...images, ...files]);

      // Create preview URLs for new files
      const newPreviewUrls = files?.map((file) => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);

    // Remove image and preview
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const addTruckToListings = async () => {
    setLoading(true);
    const formData = new FormData();

    formData?.append("car_name", truckInfo?.carName);
    formData?.append("model", truckInfo?.carModel);
    formData?.append("type", truckInfo?.carType);
    formData?.append("capacity", truckInfo?.carCapacity);
    formData?.append("location", truckInfo?.carLocation);
    formData?.append("description", truckInfo?.carDescription);
    formData?.append("availability", "available");
    formData?.append("price[]", truckInfo?.carPrice);

    images?.forEach((img, index) => {
      console.log("ddd", img);
      const fileName = `listing-image-${Date.now()}-${index}.png`;
      formData.append("pictures", img);
    });

    console.log("formData:", formData, images);

    try {
      await axiosInstance({
        url: "api/listing/offerings",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("addTruckToListings res", res?.data);
          setLoading(false);
          navigate("/vehicle-listings");
        })
        .catch((err) => {
          console.log("addTruckToListings err", err?.response);
          setLoading(false);
          toast.error(
            "An error occured while creating your truck, please try again later"
          );
        });
    } catch (error) {
      console.log("addTruckToListings error", error?.response);
      setLoading(false);
      toast.error(
        "An error occured while creating your truck, please try again later"
      );
    }
  };

  return (
    <Container>
      <div className="max-w-8xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <Truck className="text-blue-600 mr-2" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Add New Truck</h1>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Left column - Truck Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  name="carName"
                  value={truckInfo?.carName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Ford, Chevrolet, Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={truckInfo.carModel}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. F-150, Silverado, Tundra"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    name="carType"
                    value={truckInfo.carType}
                    onChange={handleTruckTypeSelect}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Truck Type</option>
                    {reduxTruckCategories?.map((category) => (
                      <option key={category?.type} value={category?.type}>
                        {category?.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Capacity
                  </label>
                  <input
                    type="text"
                    name="carCapacity"
                    value={truckInfo?.carCapacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 120 tons"
                    min="0"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Location
                  </label>
                  <input
                    type="text"
                    name="carLocation"
                    value={truckInfo?.carLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Lagos, Nigeria"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Base Fare
                  </label>
                  <input
                    type="number"
                    name="carPrice"
                    value={truckInfo?.carPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 35000"
                    min="0"
                    step="0.01"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Description
                </label>
                <textarea
                  name="carDescription"
                  value={truckInfo.carDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the condition, features, and history of the truck..."
                ></textarea>
              </div>
            </div>

            {/* Right column - Image Upload */}
            {/* <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Truck Images
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => fileInputRef.current.click()}
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

              {previewUrls.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Image Preview
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Truck preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border border-gray-300"
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
                  {images.length} file(s) ready to upload
                </span>
              </div>
            </div> */}
          </div>

          <MediaUpload
            uploadTitle={"Vehicle Images"}
            images={images}
            previewUrls={previewUrls}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <FormButton
              title={"Add Truck"}
              onClick={addTruckToListings}
              loading={loading}
              btnIcon={<Save className="mr-2" size={18} />}
              // opacity={true}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CreateTruck;
