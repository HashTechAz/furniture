import Palette from "../Palette/Palette";

type ThirdPaletteProps = {
  category?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
};

const ThirdPalette = (props: ThirdPaletteProps) => {
  return <Palette {...props} layout="textRight" />;
};

export default ThirdPalette;


