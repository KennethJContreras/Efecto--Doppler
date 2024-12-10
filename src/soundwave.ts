
class SoundWave {

  x: number;
  y: number;
  color: string;
  radius: number = 0;
  frequency: number = 0;
  soundVariation: string;
  played: boolean = false;

  constructor(x: number, y: number, color: string, frequency: number, soundVariation: string = "") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.frequency = frequency;
    this.soundVariation = soundVariation;
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

  play(audioCtx: AudioContext, duration: number = 0.05, volume: number) {
    if (this.played) return;

    const gainNode = audioCtx.createGain();           // Create gain node to control volume
    const oscilator = audioCtx.createOscillator();    // Create Oscilator to generate sound
    oscilator.type = "sawtooth";

    // Siren sound simulation
    if (this.soundVariation) {
      oscilator.frequency.setValueAtTime(this.soundVariation == "nee" ? 500 : 700, audioCtx.currentTime);
    } else {
      oscilator.frequency.setValueAtTime(this.frequency, audioCtx.currentTime);
    }

    oscilator.connect(gainNode);      // Link oscilator with gain node
    gainNode.connect(audioCtx.destination);

    oscilator.start();
    oscilator.stop(audioCtx.currentTime + duration);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    this.played = true;
  }

}

