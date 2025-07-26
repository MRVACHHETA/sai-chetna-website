import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Wrench, Clock, PackageCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Total Bookings</h2>
              <p className="text-3xl font-bold text-blue-600 mt-1">45</p>
            </div>
            <ClipboardList className="text-blue-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Completed Repairs</h2>
              <p className="text-3xl font-bold text-green-600 mt-1">30</p>
            </div>
            <PackageCheck className="text-green-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Pending Requests</h2>
              <p className="text-3xl font-bold text-yellow-600 mt-1">10</p>
            </div>
            <Clock className="text-yellow-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border border-gray-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Spare Parts</h2>
              <p className="text-3xl font-bold text-purple-600 mt-1">120</p>
            </div>
            <Wrench className="text-purple-600 w-8 h-8" />
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Device</th>
                <th className="px-4 py-2">Problem</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: "Rahul Sharma", device: "iPhone 11", issue: "Screen Crack", status: "In Progress" },
                { name: "Priya Patel", device: "Samsung M21", issue: "Battery Issue", status: "Completed" },
                { name: "Amit Mehra", device: "Realme X2", issue: "Charging Port", status: "Pending" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.device}</td>
                  <td className="px-4 py-3">{item.issue}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`${
                        item.status === "Completed"
                          ? "border-green-500 text-green-600"
                          : item.status === "Pending"
                          ? "border-yellow-500 text-yellow-600"
                          : "border-blue-500 text-blue-600"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}