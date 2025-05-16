import React, { useRef, useState } from "react";
import { Camera, Truck, X, Upload, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import MediaUpload from "../../../components/upload/MediaUpload";
import axiosInstance from "../../../utils/api-client";
import FormButton from "../../../components/form/FormButton";
import { clearEditTruckListingData } from "../../../redux/features/user/userSlice";

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

function EditTruck() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("useParamsId", id);

  const reduxEditTruckData = state?.user?.editTruckListing;
  console.log("reduxEditTruckData", reduxEditTruckData);

  const [loading, setLoading] = useState(false);

  const [truckInfo, setTruckInfo] = useState({
    carName: reduxEditTruckData?.car_name ? reduxEditTruckData?.car_name : "",
    carModel: reduxEditTruckData?.model ? reduxEditTruckData?.model : "",
    carType: reduxEditTruckData?.type ? reduxEditTruckData?.type : "",
    carCapacity: reduxEditTruckData?.capacity
      ? reduxEditTruckData?.capacity
      : "",
    carLocation: reduxEditTruckData?.location
      ? reduxEditTruckData?.location
      : "",
    carDescription: reduxEditTruckData?.description
      ? reduxEditTruckData?.description
      : "",
    carPrice: reduxEditTruckData?.price ? reduxEditTruckData?.price?.[0] : "",
  });

  const [images, setImages] = useState(
    reduxEditTruckData?.pictures ? reduxEditTruckData?.pictures : []
  );
  const [previewUrls, setPreviewUrls] = useState(
    reduxEditTruckData?.pictures ? reduxEditTruckData?.pictures : []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTruckInfo({
      ...truckInfo,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Truck Info:", truckInfo);
    console.log("Images:", images);

    // For demonstration, show an alert
    alert("Truck information submitted successfully!");
  };

  const editTruckToListings = async () => {
    setLoading(true);
    const formData = new FormData();

    formData?.append("car_name", truckInfo?.carName);
    formData?.append("model", truckInfo?.carModel);
    formData?.append("type", truckInfo?.carType);
    formData?.append("capacity", truckInfo?.carCapacity);
    formData?.append("location", truckInfo?.carLocation);
    formData?.append("description", truckInfo?.carDescription);
    formData?.append("availability", "available");
    formData?.append("price[]", [truckInfo?.carPrice]);
    formData?.append("pictures", images);

    // images?.map((image, i) => {
    //   formData?.append(`pictures[${i}]`, image);
    // });

    console.log("formData:", formData, images);

    try {
      await axiosInstance({
        url: `api/listing/offerings/${reduxEditTruckData?.id}`,
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("editTruckToListings res", res?.data);
          setLoading(false);
          dispatch(clearEditTruckListingData());
          navigate("/truck-listings");
        })
        .catch((err) => {
          console.log("editTruckToListings err", err?.response);
          setLoading(false);
          toast.error(
            "An error occured while creating your truck, please try again later"
          );
        });
    } catch (error) {
      console.log("editTruckToListings error", error?.response);
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
          <h1 className="text-2xl font-bold text-gray-800">Edit Truck</h1>
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
                  <input
                    type="text"
                    name="carType"
                    value={truckInfo.carType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 2022"
                    min="1900"
                    max="2030"
                  />
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
                    Vehicle Price Rate
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
              title={"Edit Truck"}
              onClick={editTruckToListings}
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

export default EditTruck;
