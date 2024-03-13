type RectangleSize = [number, number];

type ColorBoxProps = {
  color: string;
  size?: [number, number];
};

const DEFAULT_SIZE: RectangleSize = [64, 64];

const ColorBox = ({ color, size }: ColorBoxProps) => {
  const [width, height] = size ?? DEFAULT_SIZE;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        border: '1px solid black',
      }}
    ></div>
  );
};

export default ColorBox;
