import { createCanvas, loadImage } from "canvas";

const getMaskedCanvasImage = async (url: string) => {
  const canvas = createCanvas(500, 300);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#498dc9";
  ctx.fillRect(0, 0, 500, 300);

  ctx.font = "30px Impact";
  ctx.fillText("hello~~", 0, 50);

  ctx.save();

  const image = await loadImage("https://via.placeholder.com/50x200");

  ctx.beginPath();
  // ctx.arc(
  //   image.width / 2,
  //   100 + image.height / 2,
  //   image.width / 2,
  //   0,
  //   2 * Math.PI
  // );
  ctx.ellipse(
    image.width / 2,
    100 + image.height / 2,
    image.width / 2,
    image.height / 2,
    0,
    0,
    2 * Math.PI
  );
  ctx.clip();

  ctx.drawImage(image, 0, 100);

  ctx.restore();

  ctx.drawImage(image, 300, 100);

  return canvas.toBuffer();
};

export default getMaskedCanvasImage;
