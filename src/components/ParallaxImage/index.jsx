import { useSpring, animated } from "react-spring";

export const ParallaxImage = ({ element, xy }) => {
  const { src, speedx, speedy, speedz, rotation, className } = element;
  const [xValue, yValue] = xy;
  const zValue = xValue * 0.1;

  const props = useSpring({
    transform: `perspective(2300px) translateZ(${zValue * speedz}px) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) rotateY(${(xValue / (window.innerWidth / 2)) * 20 * rotation}deg)`,
  });

  return (
    <animated.img
      src={src}
      className={className}
      style={props}
      alt={className}
    />
  );
};
