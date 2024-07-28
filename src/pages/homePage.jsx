import { useState } from "react";
import { ParallaxImage } from "../components/ParallaxImage";
import { parallaxCollection } from "../shared/collections/parallaxCollection";
import background from "../shared/assets/images/background.png";
import fogBig from "../shared/assets/images/fog-big.png";

export default function HomePage() {
  const [xy, setXY] = useState([0, 0]);

  const handleMouseMove = e => {
    setXY([
      e.clientX - window.innerWidth / 2,
      e.clientY - window.innerHeight / 2,
    ]);
  };

  return (
    <div className="parallax-view" onMouseMove={handleMouseMove}>
      <div className="vignette">
        <img src={background} className="bg-img" alt="Background" />
        <img src={fogBig} className="fog-big" alt="Fog Big" />
        {parallaxCollection.map((element, index) => (
          <ParallaxImage key={index} element={element} xy={xy} />
        ))}
        <div className="parallax parallax-text">
          <h1>Clubs</h1>
          <h2>App</h2>
        </div>
      </div>
    </div>
  );
}
