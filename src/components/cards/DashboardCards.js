import { useState } from "react";
import { Truck, Map, DollarSign, Calendar, User } from "lucide-react";

function DashboardCards({ vehicles, vehicleCount, bookings, onTruckClick }) {
  return (
    // Dashboard Stats
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow" onClick={onTruckClick}>
        <div className="flex items-center space-x-2">
          <Truck className="text-blue-500" />
          <span className="font-semibold">Vehicles</span>
        </div>
        <p className="text-2xl font-bold mt-2">{vehicleCount}</p>
        {/* <p className="text-sm text-gray-500">
          {vehicles.filter((v) => v.status === "Available").length} available
        </p> */}
      </div>

      {/* <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <Map className="text-green-500" />
          <span className="font-semibold">Active Routes</span>
        </div>
        <p className="text-2xl font-bold mt-2">{routes.length}</p>
        <p className="text-sm text-gray-500">
          Covering{" "}
          {routes.reduce((acc, route) => acc + parseInt(route.distance), 0)}{" "}
          miles
        </p>
      </div> */}

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <DollarSign className="text-yellow-500" />
          <span className="font-semibold">Revenue (Est.)</span>
        </div>
        <p className="text-2xl font-bold mt-2">$5,250</p>
        <p className="text-sm text-gray-500">
          From {bookings?.length} bookings
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <Calendar className="text-purple-500" />
          <span className="font-semibold">Pending Bookings</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {bookings?.filter((b) => b.status === "request")?.length}
        </p>
        {/* <p className="text-sm text-gray-500">Next 7 days</p> */}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <User className="text-purple-500" />
          <span className="font-semibold">Truck Owners</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {bookings?.filter((b) => b?.status === "Pending")?.length}
        </p>
        {/* <p className="text-sm text-gray-500">Next 7 days</p> */}
      </div>
    </div>
  );
}

export default DashboardCards;
