import { useState } from "react";
import {
  Truck,
  Map,
  DollarSign,
  Calendar,
  Check,
  X,
  Clock,
  User,
  Edit,
  Trash,
  Plus,
  Search,
  TrendingUp,
  BarChart,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for demonstration
const initialVehicles = [
  {
    id: 1,
    name: "Truck A",
    type: "Heavy Duty",
    capacity: "20 tons",
    status: "Available",
  },
  {
    id: 2,
    name: "Van B",
    type: "Light",
    capacity: "2 tons",
    status: "In Transit",
  },
  {
    id: 3,
    name: "Truck C",
    type: "Medium",
    capacity: "10 tons",
    status: "Maintenance",
  },
  {
    id: 4,
    name: "Truck D",
    type: "Heavy Duty",
    capacity: "25 tons",
    status: "Available",
  },
];

// Financial and bookings data for charts
const financialData = [
  { name: "Jan", income: 24000, expenses: 18000, bookings: 42 },
  { name: "Feb", income: 26000, expenses: 17500, bookings: 45 },
  { name: "Mar", income: 27500, expenses: 19000, bookings: 48 },
  { name: "Apr", income: 26000, expenses: 20000, bookings: 46 },
  { name: "May", income: 28000, expenses: 21000, bookings: 52 },
  { name: "Jun", income: 32000, expenses: 22000, bookings: 58 },
  { name: "Jul", income: 34000, expenses: 22500, bookings: 62 },
  { name: "Aug", income: 36000, expenses: 23000, bookings: 65 },
  { name: "Sep", income: 34000, expenses: 22000, bookings: 60 },
  { name: "Oct", income: 32000, expenses: 21000, bookings: 56 },
  { name: "Nov", income: 30000, expenses: 20000, bookings: 52 },
  { name: "Dec", income: 28000, expenses: 19000, bookings: 48 },
];

const initialRoutes = [
  {
    id: 1,
    origin: "New York",
    destination: "Boston",
    distance: "215 miles",
    estimatedTime: "4 hours",
  },
  {
    id: 2,
    origin: "Chicago",
    destination: "Detroit",
    distance: "283 miles",
    estimatedTime: "4.5 hours",
  },
  {
    id: 3,
    origin: "Los Angeles",
    destination: "San Francisco",
    distance: "382 miles",
    estimatedTime: "6 hours",
  },
];

const initialPricing = [
  {
    id: 1,
    route: "New York - Boston",
    basePrice: "$450",
    rushPrice: "$600",
    bulkyPrice: "$550",
  },
  {
    id: 2,
    route: "Chicago - Detroit",
    basePrice: "$500",
    rushPrice: "$650",
    bulkyPrice: "$600",
  },
  {
    id: 3,
    route: "Los Angeles - San Francisco",
    basePrice: "$650",
    rushPrice: "$800",
    bulkyPrice: "$750",
  },
];

const initialBookings = [
  {
    id: 1,
    customer: "John Smith",
    route: "New York - Boston",
    vehicle: "Truck A",
    date: "2025-05-10",
    status: "Pending",
    specialRequirements: "Fragile goods",
  },
  {
    id: 2,
    customer: "Jane Doe",
    route: "Chicago - Detroit",
    vehicle: "Van B",
    date: "2025-05-08",
    status: "In Transit",
    specialRequirements: "None",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    route: "Los Angeles - San Francisco",
    vehicle: "Truck D",
    date: "2025-05-07",
    status: "Fulfilled",
    specialRequirements: "Refrigeration required",
  },
  {
    id: 4,
    customer: "Sarah Williams",
    route: "New York - Boston",
    vehicle: "Truck C",
    date: "2025-05-15",
    status: "Pending",
    specialRequirements: "Heavy machinery",
  },
];

export default function LogisticsDashboard() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // State for search queries
  const [searchQuery, setSearchQuery] = useState("");

  // State for data
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [routes, setRoutes] = useState(initialRoutes);
  const [pricing, setPricing] = useState(initialPricing);
  const [bookings, setBookings] = useState(initialBookings);

  // State for editing
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Filter data based on search query
  const filteredData = () => {
    const query = searchQuery.toLowerCase();

    switch (activeTab) {
      case "vehicles":
        return vehicles.filter(
          (vehicle) =>
            vehicle.name.toLowerCase().includes(query) ||
            vehicle.type.toLowerCase().includes(query) ||
            vehicle.status.toLowerCase().includes(query)
        );
      case "routes":
        return routes.filter(
          (route) =>
            route.origin.toLowerCase().includes(query) ||
            route.destination.toLowerCase().includes(query)
        );
      case "pricing":
        return pricing.filter((price) =>
          price.route.toLowerCase().includes(query)
        );
      case "bookings":
        return bookings.filter(
          (booking) =>
            booking.customer.toLowerCase().includes(query) ||
            booking.route.toLowerCase().includes(query) ||
            booking.status.toLowerCase().includes(query) ||
            booking.date.includes(query)
        );
      default:
        return [];
    }
  };

  // Handle delete item
  const handleDelete = (id) => {
    switch (activeTab) {
      case "vehicles":
        setVehicles(vehicles.filter((item) => item.id !== id));
        break;
      case "routes":
        setRoutes(routes.filter((item) => item.id !== id));
        break;
      case "pricing":
        setPricing(pricing.filter((item) => item.id !== id));
        break;
      case "bookings":
        setBookings(bookings.filter((item) => item.id !== id));
        break;
      default:
        break;
    }
  };

  // Update booking status
  const updateBookingStatus = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "fulfilled":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "available":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Dashboard Header
  const Header = () => (
    <div className="bg-blue-600 text-white p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Logistics Dashboard</h1>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-blue-500 rounded text-sm">
            Admin Mode
          </span>
          <div className="flex items-center space-x-2">
            <User size={18} />
            <span>Admin User</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Stats
  const Stats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <Truck className="text-blue-500" />
          <span className="font-semibold">Vehicles</span>
        </div>
        <p className="text-2xl font-bold mt-2">{vehicles.length}</p>
        <p className="text-sm text-gray-500">
          {vehicles.filter((v) => v.status === "Available").length} available
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
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
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <DollarSign className="text-yellow-500" />
          <span className="font-semibold">Revenue (Est.)</span>
        </div>
        <p className="text-2xl font-bold mt-2">$5,250</p>
        <p className="text-sm text-gray-500">From {bookings.length} bookings</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <Calendar className="text-purple-500" />
          <span className="font-semibold">Pending Bookings</span>
        </div>
        <p className="text-2xl font-bold mt-2">
          {bookings.filter((b) => b.status === "Pending").length}
        </p>
        <p className="text-sm text-gray-500">Next 7 days</p>
      </div>
    </div>
  );

  // Navigation Tabs
  const Tabs = () => (
    <div className="flex flex-wrap border-b mb-4">
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "dashboard"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("dashboard")}
      >
        <div className="flex items-center space-x-1">
          <BarChart size={16} />
          <span>Dashboard</span>
        </div>
      </button>

      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "vehicles"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("vehicles")}
      >
        <div className="flex items-center space-x-1">
          <Truck size={16} />
          <span>Vehicles</span>
        </div>
      </button>

      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "routes"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("routes")}
      >
        <div className="flex items-center space-x-1">
          <Map size={16} />
          <span>Routes</span>
        </div>
      </button>

      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "pricing"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("pricing")}
      >
        <div className="flex items-center space-x-1">
          <DollarSign size={16} />
          <span>Pricing</span>
        </div>
      </button>

      <button
        className={`px-4 py-2 font-medium ${
          activeTab === "bookings"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("bookings")}
      >
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>Bookings</span>
        </div>
      </button>
    </div>
  );

  // Search and Actions Bar
  const ActionBar = () => (
    <div className="flex flex-col sm:flex-row justify-between mb-4">
      <div className="relative mb-4 sm:mb-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="pl-10 pr-4 py-2 border rounded w-full sm:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center space-x-1"
        onClick={() => {
          // Add new item logic would go here
          alert(
            `Add new ${activeTab.slice(
              0,
              -1
            )} functionality would be implemented here`
          );
        }}
      >
        <Plus size={16} />
        <span>Add {activeTab.slice(0, -1)}</span>
      </button>
    </div>
  );

  // Financial Dashboard Charts
  const FinancialDashboard = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Financial & Bookings Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-blue-500" />
            <h3 className="font-semibold">Monthly Income & Expenses</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={financialData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "0.375rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "none",
                  }}
                  formatter={(value) => [`${value.toLocaleString()}`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart className="text-purple-500" />
            <h3 className="font-semibold">Monthly Bookings</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                data={financialData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "0.375rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="bookings"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profit Summary */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="text-green-500" />
          <h3 className="font-semibold">Profit Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded p-4 text-center">
            <p className="text-gray-500 mb-1">Total Income (YTD)</p>
            <p className="text-2xl font-bold text-blue-600">
              $
              {financialData
                .reduce((sum, month) => sum + month.income, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-gray-500 mb-1">Total Expenses (YTD)</p>
            <p className="text-2xl font-bold text-red-600">
              $
              {financialData
                .reduce((sum, month) => sum + month.expenses, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="border rounded p-4 text-center">
            <p className="text-gray-500 mb-1">Net Profit (YTD)</p>
            <p className="text-2xl font-bold text-green-600">
              $
              {(
                financialData.reduce((sum, month) => sum + month.income, 0) -
                financialData.reduce((sum, month) => sum + month.expenses, 0)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Content based on active tab
  const renderContent = () => {
    const data = filteredData();

    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <Stats />
            <FinancialDashboard />
          </>
        );

      case "vehicles":
        return (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Truck size={18} className="text-gray-500 mr-2" />
                        <span>{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          vehicle.status
                        )}`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "routes":
        return (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {route.origin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {route.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {route.distance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {route.estimatedTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(route.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "pricing":
        return (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rush Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bulky Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((price) => (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {price.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {price.basePrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {price.rushPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {price.bulkyPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(price.id)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "bookings":
        return (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        {booking.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.vehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {booking.status === "Pending" && (
                          <>
                            <button
                              className="p-1 text-green-600 hover:text-green-800"
                              onClick={() =>
                                updateBookingStatus(booking.id, "In Transit")
                              }
                              title="Mark as In Transit"
                            >
                              <Clock size={16} />
                            </button>
                            <button
                              className="p-1 text-red-600 hover:text-red-800"
                              onClick={() =>
                                updateBookingStatus(booking.id, "Cancelled")
                              }
                              title="Cancel Booking"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {booking.status === "In Transit" && (
                          <button
                            className="p-1 text-green-600 hover:text-green-800"
                            onClick={() =>
                              updateBookingStatus(booking.id, "Fulfilled")
                            }
                            title="Mark as Fulfilled"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            alert(`View details for booking #${booking.id}`);
                          }}
                          title="View Details"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded shadow text-center">
            <p>Select a tab to view data</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-4 md:p-6">
        <div className="bg-white p-4 rounded shadow mb-6">
          <Tabs />
          {activeTab !== "dashboard" && <ActionBar />}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
