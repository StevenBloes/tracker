export const title = "KLA W32 | Pallet Stock";
export const appBarTitle = "Scan Barcode";


// limit possible barcode types
const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
  ZXing.BarcodeFormat.EAN_13, ZXing.BarcodeFormat.UPC_A
]);

const codeReader = new ZXing.BrowserBarcodeReader(hints);

let currentRoot = null;
let scanning = false;


async function isCameraSupported() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    return Promise.resolve(false);
  }

  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
      return videoInputDevices.length > 0;
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      return false;
    });
}

function startScanning(root) {

  if (scanning) return;

  currentRoot = root;
  scanning = true;

  const resultElement = root.querySelector("#result");
  const videoElement = root.querySelector("#video");
  if (videoElement) {
    if (videoElement.srcObject) {
      videoElement.srcObject.getTracks().forEach(track => track.stop());
    }

    resultElement.textContent = "";

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
          stopScanning();
          window.location.hash = `#/stock/pallet/${result}`;
        }
      }
    );
  }
}

function stopScanning() {

  const videoElement = currentRoot.querySelector("#video");

  if (videoElement) {
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
}


export function render() {
  return `
    <div class="container">
      <label>Barcode<label>
      <input id="result" placeholder="barcode"></input>
      <div class="scan-input-container">
        <div id="no-video">
          Checking Camera Support<br>
          ...
        </div>
      </div>            
      <button id="btnScan" class="big-btn red-btn">Stop Scan</button>
    </div>
  `;
};


export async function init(root) {
  const supported = await isCameraSupported();
  console.log(supported);
  const container = document.querySelector(".scan-input-container");

  container.innerHTML = supported
    ? `<video id="video" style="width: 100%; height: auto;"></video>`
    : `<div id="no-video">No Camera Support</div>`;

  scanning = false;
  window.addEventListener("beforeunload", () => {
    stopScanning();
  });

  root.querySelector("#btnScan").onclick = () => {
    if (scanning) {
      stopScanning();
      window.location.hash = "#/stock";
    } else {
      startScanning(root);
    }
  };

  startScanning(root);
}

export function destroy() {
  stopScanning();
}