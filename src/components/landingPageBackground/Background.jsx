import "./Background.css";
import image1 from "../../Assets/image1.png";
import image2 from "../../Assets/image2.png";
import image3 from "../../Assets/image3.png";

export const Background = ({ heroCount }) => {
  const images = [image1, image2, image3];
  return (
    <img
      src={images[heroCount]}
      className="background"
      alt={`Slide ${heroCount + 1}`}
    />
  );
};
