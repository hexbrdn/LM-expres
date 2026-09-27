import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PageLoader() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress (~0.5s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 100);
          return 100;
        }
        return prev + 25;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-navy-deep via-navy-mid to-navy-deep flex items-center justify-center">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-blue/5 rounded-full blur-[100px] animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-sky-blue/20 rounded-full blur-2xl animate-pulse" />
          <img
            src="/lm-express-logo.png"
            alt="LM Express"
            width="512"
            height="379"
            className="h-32 w-auto object-contain relative z-10 animate-fade-in"
          />
        </div>

        {/* Animated truck icon */}
        <div className="relative">
          <Truck className="w-12 h-12 text-sky-blue animate-bounce" />
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-sky-blue/30 rounded-full">
            <div
              className="h-full bg-sky-blue rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white text-sm font-semibold mb-2">{t("loader.loading")}</p>
          <p className="text-white/50 text-xs">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
