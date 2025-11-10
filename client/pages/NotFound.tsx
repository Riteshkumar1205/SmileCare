import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="flex items-center justify-center py-32 md:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
            404
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/assess"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition"
            >
              Assess Teeth <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <p className="text-gray-600 font-medium mb-6">Quick Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link
                to="/"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <p className="font-semibold text-gray-900">Home</p>
                <p className="text-sm text-gray-600">Back to main page</p>
              </Link>
              <Link
                to="/assess"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <p className="font-semibold text-gray-900">Assess</p>
                <p className="text-sm text-gray-600">Check teeth health</p>
              </Link>
              <Link
                to="/doctors"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <p className="font-semibold text-gray-900">Find Doctor</p>
                <p className="text-sm text-gray-600">Connect with dentists</p>
              </Link>
              <Link
                to="/reports"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <p className="font-semibold text-gray-900">Reports</p>
                <p className="text-sm text-gray-600">View your history</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
