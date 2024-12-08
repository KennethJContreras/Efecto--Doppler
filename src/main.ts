// Configuration Constants
// Declaraciones de tipos y obtención de elementos del DOM

const velocidadSpan = document.getElementById("footer-velocidad") as HTMLSpanElement | null;
const posicionSpan = document.getElementById("footer-posicion") as HTMLSpanElement | null;
const frecuenciaSpan = document.getElementById("footer-frecuencia") as HTMLSpanElement | null;
const medioSpan = document.getElementById("footer-medio") as HTMLSpanElement | null;
const titulo = document.getElementById("medio-title") as HTMLSpanElement | null;

const btnUsarDatos = document.getElementById("btn-enviar") as HTMLButtonElement | null;

const inputVelocidad = document.getElementById("velocidad") as HTMLInputElement | null;
const inputPosicion = document.getElementById("posicion") as HTMLInputElement | null;
const inputFrecuencia = document.getElementById("frecuencia") as HTMLInputElement | null;

const simulador = document.getElementById("simulador") as HTMLElement | null;
const recept = document.getElementById("receptor") as HTMLElement | null;
const emisor = document.getElementById("emisor") as HTMLElement | null;

const currentMonth = new Date().getMonth();
let medioIndex = 0;

// Tipado para la configuración de medios
interface ConfiguracionMedio {
    minVelocidad: number;
    maxVelocidad: number;
    minFrecuencia: number;
    maxFrecuencia: number;
    posicionX: number;
    pocisionY: number;
}

const configuracionesMedios: Record<string, ConfiguracionMedio> = {
    Ballena: {
        minVelocidad: 1,
        maxVelocidad: 6,
        minFrecuencia: 10,
        maxFrecuencia: 50,
        posicionX: 100,
        pocisionY: 0
    },
    Avion: {
        minVelocidad: 3,
        maxVelocidad: 250,
        minFrecuencia: 20,
        maxFrecuencia: 20000,
        posicionX: 0,
        pocisionY: 0
    },
    Ambulancia: {
        minVelocidad: 22,
        maxVelocidad: 250,
        minFrecuencia: 500,
        maxFrecuencia: 6000,
        posicionX: 100,
        pocisionY: 60
    },
    Estrella: {
        minVelocidad: 50000,
        maxVelocidad: 300000,
        minFrecuencia: 3000000000000,
        maxFrecuencia: 1000000000000000000,
        posicionX: 15,
        pocisionY: 0
    }
};

// Variables globales para configuraciones
let configuracion: ConfiguracionMedio | null = null;

// Listeners
const medioElement = document.getElementById("medio") as HTMLSelectElement | null;

medioElement?.addEventListener("change", function () {
    const medio = this.value; // Obtiene el valor seleccionado
    if (medioSpan && titulo) {
        medioSpan.textContent = medio;
        titulo.textContent = medio;
    }

    switch (medio) {
        case "Aire":
            medioIndex = 0;
            configuracion = configuracionesMedios.Ambulancia;
            break;
        case "Agua":
            medioIndex = 1;
            configuracion = configuracionesMedios.Ballena;
            break;
        case "Vacio":
            medioIndex = 2;
            configuracion = configuracionesMedios.Estrella;
            break;
    }

    cambiarMedio(medioIndex);
    if (configuracion) {
        configurarInputs(configuracion);
    }

    if (posicionSpan) posicionSpan.textContent = "0"; // Restablecer posición
});

// Función para configurar los inputs
function configurarInputs(config: ConfiguracionMedio) {
    if (inputVelocidad && inputFrecuencia && emisor && frecuenciaSpan && velocidadSpan) {
        inputVelocidad.setAttribute("min", config.minVelocidad.toString());
        inputVelocidad.setAttribute("max", config.maxVelocidad.toString());
        inputVelocidad.value = config.minVelocidad.toString();
        velocidadSpan.textContent = config.minVelocidad.toString();

        inputFrecuencia.setAttribute("min", config.minFrecuencia.toString());
        inputFrecuencia.setAttribute("max", config.maxFrecuencia.toString());
        inputFrecuencia.value = config.minFrecuencia.toString();
        frecuenciaSpan.textContent = config.minFrecuencia.toString();

        emisor.style.left = `${config.posicionX}%`;
        emisor.style.top = `${config.pocisionY}%`;
    }
}

// Listeners para inputs
inputVelocidad?.addEventListener("input", function () {
    if (velocidadSpan) {
        velocidadSpan.textContent = inputVelocidad.value;
    }
});

inputPosicion?.addEventListener("input", function () {
    if (posicionSpan) {
        posicionSpan.textContent = inputPosicion.value;
    }
});

inputFrecuencia?.addEventListener("input", function () {
    if (frecuenciaSpan) {
        frecuenciaSpan.textContent = inputFrecuencia.value;
    }
});

// Arrays de imágenes
const emisorImages: string[] = [
    "/img/aire/ambulance.png",
    "/img/agua/whale.png",
    "/img/espacio/star.png",
    "/img/aire/airplane.png"
];

const receptorImages: string[] = [
    "/img/aire/receptor.png",
    "/img/agua/buzo.png",
    "/img/espacio/astronaut.png"
];

const bgImages: string[] = [
    '/img/aire/casa.png',
    '/img/agua/ocean-bg.jpg',
    '/img/espacio/space-bg.jpg',
    '/img/aire/nieve.png'
];


// Función para cambiar el medio
function cambiarMedio(medio: number) {

    if (!simulador || !recept || !emisor) return;
    const isDecember = currentMonth === 11; 
    simulador.style.backgroundImage = medio == 0 ? ( isDecember ? `url(${bgImages[3]})` : `url(${bgImages[0]})`) : `url(${bgImages[medio]})`;
    recept.style.backgroundImage = `url(${receptorImages[medio]})`;
    emisor.style.backgroundImage = `url(${emisorImages[medio]})`;
    console.log(recept)
    console.log(emisor) 
    console.log(medio);
}

// Configuración inicial
cambiarMedio(0);
configuracion = configuracionesMedios.Ambulancia;
if (configuracion) configurarInputs(configuracion);




/*  */
const MAX_VEHICLE_SPEED = 3;



let waveFrequency = inputFrecuencia ? parseFloat(inputFrecuencia.value) : 0; 
let vehicleSpeed = inputVelocidad ? parseFloat(inputVelocidad.value) : 0;
let espectatorPosition = inputPosicion ? parseFloat(inputPosicion.value) : 0;
let radiusIncrementSize = 3;


// Waves array
let waves: SoundWave[] = [];

// Get Canvas Context
const canvas: HTMLCanvasElement = document.getElementById("sim-canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get Audio Context
// const audio_ctx: AudioContext = new window.AudioContext();

// Get Mouse Position to draw waves
// let x = 0;
// let y = 0;

// function handleMouseMove(this: Window, event: MouseEvent) {
//   x = event.clientX;
//   y = event.clientY;
// };

// // Set mouse event to update waves new position on mouse move
// onmousemove = handleMouseMove;

// Define vehicle
const vehicle = new Vehicle(
  window.innerWidth,        // X position on canvas
  window.innerHeight / 2,   // Y position on canvas
  "🚗"
);

// Insert new waves according to the frequency

function waveGenerator() {
  let wave = new SoundWave(vehicle.x, vehicle.y, "#00007f4f", waveFrequency);
  waves.push(wave);
  setTimeout(waveGenerator, waveFrequency);
}

if (inputFrecuencia) {
  inputFrecuencia.addEventListener("input", () => {
    console.log("Frecuencia actualizada", inputFrecuencia.value);
    waveFrequency = parseFloat(inputFrecuencia.value) || 0; // Actualiza waveFrequency
    
  });
}

// Llama al generador de ondas por primera vez

 waveGenerator();
function updateControls() {
  if (inputFrecuencia) {
    waveFrequency = 1000 / (inputFrecuencia.valueAsNumber / 10);
  }
  if (inputVelocidad) {
    vehicleSpeed = MAX_VEHICLE_SPEED * (inputVelocidad.valueAsNumber / 100);
  }
}
// Main sim loop
let endLoop = false;

function loop() {
  if (endLoop) return;
  // Update input from controls
   updateControls();
 
  // Update vehicle position
  vehicle.update(-vehicleSpeed);

  // Update waves size and position
  waves.forEach((wave) => {
    wave.update(radiusIncrementSize)
  });
  ctx.save();

  // Clear previously drawn waves
  ctx.reset();

  vehicle.draw(ctx);
  // Draw the waves
  waves.forEach((wave) => {
    wave.draw(ctx);
  });
  ctx.restore();

  requestAnimationFrame(loop);
}

if (btnUsarDatos) {
  btnUsarDatos.addEventListener('click', () => {
    if (btnUsarDatos.textContent === "Usar datos") {
      btnUsarDatos.textContent = "Parar";
      endLoop = false;
      vehicle.x = window.innerWidth;

      loop();
    } else {
      btnUsarDatos.textContent = "Usar datos";
      
      stopLoop();
    }
  });
}

function stopLoop() {
  endLoop = true;
  waves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

