export const title = "KLA W32 - Pallet Stock";

// limit possible barcode types
const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
  ZXing.BarcodeFormat.EAN_13, ZXing.BarcodeFormat.UPC_A
]);

const codeReader = new ZXing.BrowserBarcodeReader(hints);

let currentRoot = null;
let scanning = false;


function startScanning(root) {
  if (scanning) return;

  currentRoot = root;
  scanning = true;

  const resultElement = root.querySelector("#result");
  const buttonElement = root.querySelector("#btnScan");
  const videoElement = root.querySelector("#video");

  if (videoElement.srcObject) {
    videoElement.srcObject.getTracks().forEach(track => track.stop());
  }

  resultElement.textContent = "";
  buttonElement.textContent = "Stop Scan";

  codeReader.decodeFromConstraints(
    {
      video: { facingMode: "environment" }
    },
    videoElement,
    (result, err) => {
      if (result) {
        try {
          navigator.vibrate?.([100, 50, 100]);
        } catch (e) {
          console.log(e);
        }

        resultElement.innerHTML = `
		      id: ${result.text}<br>
          Productnaam<br>
		      Productlocatie
		    `;

        stopScanning(root);
      }
    }
  );
}

function stopScanning() {

  const videoElement = currentRoot.querySelector("#video");
  const buttonElement = root.querySelector("#btnScan");
  
  buttonElement.textContent = "Nieuwe Scan";

  codeReader.reset();

  // Extra safety: stop camera stream
  const stream = videoElement.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  videoElement.srcObject = null;

  scanning = false;
  currentRoot = null;
}


export function render() {
  return `
    <div class="container">
      <h1>Barcode Scanner</h1>
      <p id="result"></p>
      <video id="video" style="width: 100%; height: auto;"></video>
      <button id="btnScan" class="big-btn red-btn">Stop Scan</button>
    </div>
  `;
};


export function init(root) {
  window.addEventListener("beforeunload", () => {
    stopScanning();
  });

  root.querySelector("#btnScan").onclick = () => {
    if (scanning) {
      stopScanning();  
    } else {
      startScanning(root);
    }
    
    window.location.hash = "#/stock";
  };

  startScanning(root);
}

export function destroy() {
  stopScanning();
}