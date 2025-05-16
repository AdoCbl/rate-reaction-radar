
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      <div className="text-center p-6 bg-slate-800/70 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-indigo-300">404</h1>
        <p className="text-xl mb-4">Oops! Page not found</p>
        <Button 
          variant="default" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => window.location.href = "/"}
        >
          <Home size={16} />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
