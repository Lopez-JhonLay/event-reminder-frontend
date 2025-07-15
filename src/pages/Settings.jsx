import React from "react";
import { Palette } from "lucide-react";

import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function Settings() {
	return (
		<div>
			<Header />
			<div className="max-w-4xl mx-auto mt-10 p-4">
				<h1 className="text-3xl font-bold mb-8">Settings</h1>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Palette className="h-5 w-5" />
								Appearance
							</CardTitle>
							<CardDescription>
								Customize how the application looks and feels
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">Theme</h3>
									<p className="text-sm text-muted-foreground">
										Switch between light and dark mode
									</p>
								</div>
								<ThemeToggle />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Settings;
