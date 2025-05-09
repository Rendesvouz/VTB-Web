import React from "react";
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
import { COLORS } from "../../themes/themes";

function FinancialCharts({ financialData }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Financial & Bookings Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        {/* <div className="bg-white p-4 rounded shadow">
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
        </div> */}

        {/* Bookings Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart
              className="text-purple-500"
              style={{ color: COLORS.vtbBtnColor }}
            />
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
                  fill={COLORS.vtbBtnColor}
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialCharts;
