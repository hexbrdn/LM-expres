import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Address not found in logistics network:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:30px_30px]" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[120px]" />

      <div className="container-main relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 mb-12 animate-float">
           <Truck className="w-10 h-10 text-brand-amber" />
        </div>
        
        <h1 className="display-heading text-white text-8xl md:text-[12rem] leading-none mb-4 tracking-tighter">
          404
        </h1>
        
        <div className="max-w-md mx-auto">
          <p className="text-brand-amber font-black uppercase tracking-[0.4em] text-sm mb-8">
            Lost in Transit
          </p>
          <p className="text-white/40 text-lg font-medium mb-12 leading-relaxed">
            The destination address you are looking for does not exist in our global logistics database. 
            Perhaps the route was rerouted?
          </p>
          
          <Button asChild className="h-14 px-10 rounded-2xl bg-brand-amber text-navy-deep hover:bg-white transition-all duration-300 font-black uppercase tracking-widest shadow-xl shadow-brand-amber/10">
            <Link to="/">
              <ArrowLeft className="mr-2 w-5 h-5" /> Back to Base
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
