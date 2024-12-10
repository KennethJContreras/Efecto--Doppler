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
const inputVolumen = document.getElementById("volumen") as HTMLInputElement | null;

const simulador = document.getElementById("simulador") as HTMLElement | null;
const recept = document.getElementById("receptor") as HTMLElement | null;
const emisor = document.getElementById("emisor") as HTMLElement | null;

// Fondos
const aireNavidad = document.getElementById('bg-aire-navidad');
const aire = document.getElementById('bg-aire');
const agua = document.getElementById('bg-agua');
const vacio = document.getElementById('bg-vacio');

const currentMonth = new Date().getMonth();
let medioIndex = 0;

inputPosicion?.addEventListener('input', () => {
  if (recept) {
    // Obtiene el ancho del contenedor y del receptor
    const contenedor = document.getElementById('simulador');
    const anchoContenedor = contenedor!.offsetWidth;
    const anchoReceptor = recept.offsetWidth;

    // Calcula el rango de movimiento permitido para el receptor
    const margenIzquierdo = 0; // Límite izquierdo
    const margenDerecho = anchoContenedor - anchoReceptor; // Límite derecho

    // Mapea los valores de -5 a 5 al rango entre margenIzquierdo y margenDerecho
    const posicionNormalizada = ((parseInt(inputPosicion.value) + 5) / 10) * margenDerecho;

    // Aplica la posición calculada
    recept.style.left = `${posicionNormalizada}px`;
  }
});



// Tipado para la configuración de medios
interface ConfiguracionMedio {
  minVelocidad: number;
  maxVelocidad: number;
  minFrecuencia: number;
  maxFrecuencia: number;
}

const configuracionesMedios: Record<string, ConfiguracionMedio> = {
  Ballena: {
    minVelocidad: 1,
    maxVelocidad: 6,
    minFrecuencia: 10,
    maxFrecuencia: 50,
  },
  Avion: {
    minVelocidad: 33,
    maxVelocidad: 250,
    minFrecuencia: 20,
    maxFrecuencia: 20000,
  },
  Ambulancia: {
    minVelocidad: 22,
    maxVelocidad: 33,
    minFrecuencia: 500,
    maxFrecuencia: 6000,
  },
  Estrella: {
    minVelocidad: 50000,
    maxVelocidad: 300000,
    minFrecuencia: 3000000000000,
    maxFrecuencia: 1000000000000000000,
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
const basePath = window.location.origin;
const emisorImages: string[] = [
  `./public/img/aire/ambulance.png`,
  `./public/img/agua/whale.png`,
  `./public/img/espacio/star.png`,
  `./public/img/aire/airplane.png`
];

const receptorImages: string[] = [
  `https://png.pngtree.com/png-clipart/20230825/original/pngtree-man-raised-hand-rear-back-picture-image_8463680.png`,
  `https://images.vexels.com/content/132061/preview/scuba-diver-silhouette-45a534.png`,
  `https://png.pngtree.com/png-vector/20240619/ourmid/pngtree-cute-astronaut-drawing-png-image_12797433.png`
];

const bgImages: string[] = [
  `./public/img/aire/casa.png`,
  `./public/img/agua/ocean-bg.jpg`,
  `./public/img/espacio/space-bg.jpg`,
  `./public/img/aire/nieve.png`
];


// Función para cambiar el medio
function cambiarMedio(medio: number) {

  if (!simulador || !recept || !emisor) return;
  if (!aireNavidad || !aire || !agua || !vacio) return;

  const isDecember = currentMonth === 12;
  switch (medioIndex) {
    case 0:
      aireNavidad.style.display = 'none';
      aire.style.display = 'flex';
      agua.style.display = 'none';
      vacio.style.display = 'none';
      break;
    case 1:
      aireNavidad.style.display = 'none';
      aire.style.display = 'none';
      agua.style.display = 'flex';
      vacio.style.display = 'none';
      break;
    case 2:
      aireNavidad.style.display = 'none';
      aire.style.display = 'none';
      agua.style.display = 'none';
      vacio.style.display = 'flex';
      break;
    default:
      break;
  }
  simulador.style.backgroundImage = medio == 0 ? (isDecember ? `url(${bgImages[3]})` : `url(${bgImages[0]})`) : `url(${bgImages[medio]})`;
  recept.style.backgroundImage = `url(${receptorImages[medio]})`;
  emisor.style.backgroundImage = `url(${emisorImages[medio]})`;
  // console.log(recept);
  // console.log(emisor);
  // console.log(medio);
}

// Configuración inicial
cambiarMedio(0);
configuracion = configuracionesMedios.Ambulancia;
if (configuracion) configurarInputs(configuracion);


// --- Simulation Code ---

const MAX_VEHICLE_SPEED = 5;
let volume = 0.5;
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
const audioCtx: AudioContext = new window.AudioContext();

// Define vehicle
const vehicle = new Vehicle(
  window.innerWidth,        // X position on canvas
  window.innerHeight - window.innerHeight / 3,   // Y position on canvas
  "🚗"
);

const airplane = new Vehicle(
  window.innerWidth,        // X position on canvas
  window.innerHeight / 2,   // Y position on canvas
  "✈️"
);

const whale = new Vehicle(
  window.innerWidth,        // X position on canvas
  window.innerHeight / 2,   // Y position on canvas
  "🐋"
);

const star = new Vehicle(
  window.innerWidth,        // X position on canvas
  window.innerHeight / 2,   // Y position on canvas
  "⭐"
);
// Insert new waves according to the frequency
let neenaw = "nee";
function waveGenerator() {
  neenaw = neenaw == "nee" ? "naw" : "nee";
  let wave;
  switch (medioIndex) {
    case 0:
      wave = new SoundWave(vehicle.x, vehicle.y, "#00007f4f", waveFrequency, neenaw);
      break;
    case 1:
      wave = new SoundWave(whale.x, whale.y, "#00007f4f", waveFrequency);
      break;
    case 2:
      wave = new SoundWave(star.x, star.y, "#00007f4f", waveFrequency);
      break;
    default:
      break;
  }

  waves.push(wave);
  setTimeout(waveGenerator, medioIndex == 0 ? waveFrequency * 10 : waveFrequency);
}

if (inputFrecuencia) {
  inputFrecuencia.addEventListener("input", () => {
    // console.log("Frecuencia actualizada", inputFrecuencia.value);
    waveFrequency = mapRange(parseFloat(inputFrecuencia.value), configuracion?.minFrecuencia, configuracion?.maxFrecuencia, 0, 10); // Actualiza waveFrequency
    console.log(waveFrequency);
  });
}

// Llama al generador de ondas por primera vez

waveGenerator();
function updateControls() {
  waveFrequency = (1 / inputFrecuencia!.valueAsNumber) * 10000;
  vehicleSpeed = MAX_VEHICLE_SPEED * (inputVelocidad!.valueAsNumber / 100);
  volume = parseInt(inputVolumen!.value) / 100;
}
// Main sim loop
let endLoop = false;

function loop() {
  if (endLoop) return;
  // Update input from controls
  updateControls();

  // Update vehicle position
  switch (medioIndex) {
    case 0:
      vehicle.update(-vehicleSpeed);
      break;
    case 1:
      whale.update(-vehicleSpeed);
      break;
    case 2:
      star.update(-vehicleSpeed);
      break;
    default:
      break;
  }

  // Clear past waves
  if (vehicle.x < 0)
    waves = [];

  // Update waves size and position
  waves.forEach((wave) => {
    wave.update(radiusIncrementSize)
  });
  ctx.save();

  // Clear previously drawn waves
  ctx.reset();

  if (medioIndex == 0) {

  }

  switch (medioIndex) {
    case 0:
      vehicle.draw(ctx);
      break;
    case 1:
      whale.draw(ctx);
      break;
    case 2:
      star.draw(ctx);
      break;
    default:
      break;
  }

  // Get receptor position
  let receptorPosition = recept?.getBoundingClientRect();

  waves.forEach((wave) => {
    // Draw the waves
    wave.draw(ctx);
    // Play the soundwave
    if (euclideanDistance(receptorPosition?.x, receptorPosition?.y, wave.x, wave.y) <= wave.radius) {
      wave.play(audioCtx, 0.05, parseInt(inputVolumen!.value) / 100);
    }
  });
  ctx.restore();


  requestAnimationFrame(loop);
}

if (btnUsarDatos) {
  btnUsarDatos.addEventListener('click', () => {
    if (btnUsarDatos.textContent === "Usar datos") {
      btnUsarDatos.textContent = "Reiniciar";
      endLoop = false;
      switch (medioIndex) {
        case 0:
          vehicle.x = window.innerWidth;
          break;
        case 1:
          whale.x = window.innerWidth;
          break;
        case 2:
          star.x = window.innerWidth;
          break;
        default:
          break;
      }


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

