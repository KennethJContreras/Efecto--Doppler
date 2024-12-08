
class SoundWave {

  x: number;
  y: number;
  color: string;
  radius: number = 0;
  frequency: number = 0;

  constructor(x: number, y: number, color: string, frequency: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.frequency = frequency;
    console.log("SoundWave created");
    console.log(this);
  }

  update(radiusIncrement) {
    this.radius += radiusIncrement;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  play() {

  }

}

