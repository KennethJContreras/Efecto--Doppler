
class Vehicle {
  x: number;
  y: number;
  illustration: string;

  constructor(x, y, illustration) {
    this.x = x;
    this.y = y;
    this.illustration = illustration;
  }

  update(dx, dy = 0) {
    if (this.x < 0)
      this.x = window.innerWidth;
    this.x += dx;
    this.y += dy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.font = "200px sans"
    ctx.strokeText(this.illustration, this.x, this.y);
    ctx.stroke();
  }
}

