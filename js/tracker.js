const startBtn = document.getElementById("startBtn");
const video = document.getElementById("video");
const resultText = document.getElementById("result");

const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
  ZXing.BarcodeFormat.EAN_13,  ZXing.BarcodeFormat.UPC_A
]);

const codeReader = new ZXing.BrowserBarcodeReader(hints);

const beep = new Audio("./audio/beep.mp3");

let scanning = false;
startBtn.style.display = "inline-block";
stopBtn.style.display = "none";

// Unlock audio (important for mobile)
document.addEventListener("click", () => {
  beep.play().then(() => {
    beep.pause();
    beep.currentTime = 0;
  });
}, { once: true });

startBtn.addEventListener("click", startScanning);
document.getElementById("stopBtn").onclick = stopScanning;


function startScanning() {
  if (scanning) return;

  scanning = true;
  video.style.display = "block";
  startBtn.style.display = "none";
  stopBtn.style.display = "inline-block";


  codeReader.decodeFromConstraints(
    {
      video: { facingMode: "environment" }
    },
    video,
    (result, err) => {
      if (result) {
        try {
	      beep.play();
		  navigator.vibrate?.([100, 50, 100]);
		} catch (e){
		  console.log(e);
		}
 
        resultText.innerHTML = `
		id: ${result.text}<br>
		Productnaam<br>
		Productlocatie
		`;
		
        stopScanning();
      }
    }
  );
}

function stopScanning() {
  codeReader.reset();

  // Extra safety: stop camera stream
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  video.srcObject = null;

  scanning = false;
  video.style.display = "none";
  startBtn.style.display = "inline-block";
  stopBtn.style.display = "none";
}