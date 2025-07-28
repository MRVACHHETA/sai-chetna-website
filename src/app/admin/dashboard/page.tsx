import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Wrench, Clock, PackageCheck, Pencil } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center sm:text-left">
        📊 Admin Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Total Bookings</h2>
              <p className="text-2xl font-bold text-blue-600 mt-1">45</p>
            </div>
            <ClipboardList className="text-blue-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Completed Repairs</h2>
              <p className="text-2xl font-bold text-green-600 mt-1">30</p>
            </div>
            <PackageCheck className="text-green-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Pending Requests</h2>
              <p className="text-2xl font-bold text-yellow-600 mt-1">10</p>
            </div>
            <Clock className="text-yellow-600 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Spare Parts</h2>
              <p className="text-2xl font-bold text-purple-600 mt-1">120</p>
            </div>
            <Wrench className="text-purple-600 w-8 h-8" />
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          📝 Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 whitespace-nowrap">Device</th>
                <th className="px-4 py-3 whitespace-nowrap">Problem</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: "Rahul Sharma", device: "iPhone 11", issue: "Screen Crack", status: "In Progress" },
                { name: "Priya Patel", device: "Samsung M21", issue: "Battery Issue", status: "Completed" },
                { name: "Amit Mehra", device: "Realme X2", issue: "Charging Port", status: "Pending" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.device}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{item.issue}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
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
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm shadow-sm transition-all duration-200 transform active:scale-95 flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4 mr-1 inline" /> Edit
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