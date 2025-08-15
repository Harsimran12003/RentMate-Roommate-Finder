import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";

const stats = [
  {
    name: "Total Properties",
    value: 12,
    icon: BuildingOffice2Icon,
    color: "bg-[#00ACC1]/10 text-[#00ACC1]",
  },
  {
    name: "Total Matches",
    value: 8,
    icon: UserGroupIcon,
    color:
      "bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400",
  },
  {
    name: "Messages",
    value: 27,
    icon: ChatBubbleLeftRightIcon,
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-800/30 dark:text-yellow-400",
  },
  {
    name: "Total Expenses",
    value: "₹5,200",
    icon: CurrencyRupeeIcon,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-800/30 dark:text-rose-400",
  },
];

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ name, value, icon: Icon, color }) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 flex items-center gap-4 hover:shadow-md transition"
            >
              <div
                className={`p-3 rounded-full ${color} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You recently matched with 2 new roommates and added a new property.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
