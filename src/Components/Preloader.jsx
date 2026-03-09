import React, { useRef, useEffect } from "react";
import "./Preloader.css";
import herovideo from "../assets/Images/herovideo.mp4";

const Preloader = ({ fadeOut }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setStartTime = () => {
        video.currentTime = 5;
      };
      video.addEventListener("loadeddata", setStartTime);
      return () => {
        video.removeEventListener("loadeddata", setStartTime);
      };
    }
  }, []);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      {/* Background Video */}
      <video
        ref={videoRef}
        className="preloader-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={herovideo} type="video/mp4" />
      </video>

      {/* Overlay Loader */}
      <div className="preloader-overlay">
      </div>
    </div>
  );
};

export default Preloader;
