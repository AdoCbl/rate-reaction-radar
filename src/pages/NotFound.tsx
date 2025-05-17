
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-text)]">
      <div className="text-center p-6 bg-white/90 backdrop-blur-lg border border-[var(--color-border)] rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-[var(--color-primary)]">404</h1>
        <p className="text-xl mb-4">Oops! Page not found</p>
        <Button 
          variant="default" 
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
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
