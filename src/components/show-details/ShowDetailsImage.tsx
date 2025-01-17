import { useState } from "react";
import zoomIcon from "../../assets/images/zoom-icon.png";

type ShowDetailsImageProps = {
  src: string;
};

const ShowDetailsImage = ({ src }: ShowDetailsImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleImageZoom = () => {
    setIsZoomed(true);
    setIsExiting(false);
    setIsEntering(true);

    setTimeout(() => {
      setIsEntering(false);
    }, 50);
  };

  const handleCloseZoom = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsZoomed(false);
    }, 500);
  };

  return (
    <>
      <div className="border-[1px] w-[20%] border-gray-medium/60 rounded-md flex relative overflow-hidden">
        <img src={src} alt="image" className="object-contain w-full p-4" />
        <button onClick={handleImageZoom}>
          <img
            src={zoomIcon}
            alt="zoom icon"
            className="absolute right-4 bottom-4 cursor-pointer"
          />
        </button>
      </div>

      {isZoomed && (
        <div
          className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-all duration-500 ${
            isEntering
              ? "opacity-0 scale-95"
              : isExiting
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100"
          }`}
        >
          <button
            onClick={handleCloseZoom}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          >
            ✕
          </button>
          <img
            src={src}
            alt="zoomed image"
            className="w-[44%] h-[44%] object-contain transition-transform duration-500 transform"
          />
        </div>
      )}
    </>
  );
};

export default ShowDetailsImage;
