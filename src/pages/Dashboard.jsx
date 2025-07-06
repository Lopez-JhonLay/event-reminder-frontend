import { Link } from "react-router-dom";
import Header from "@/components/Header";

function Dashboard() {
	return (
		<div>
			<Header />
			<div className="max-w-4xl mx-auto mt-10 p-4">
				<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
				<p className="text-gray-600 mb-6">
					Welcome to your event management dashboard. Here you can view and
					manage your events.
				</p>
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
					<div className="space-y-3">
						<Link
							to="/events"
							className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
						>
							View All Events
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
