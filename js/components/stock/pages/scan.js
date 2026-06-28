export const title = "KLA W32 | Pallet Stock";
export const appBarTitle = "Scan Barcode";


// limit possible barcode types
const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
  ZXing.BarcodeFormat.EAN_13, ZXing.BarcodeFormat.UPC_A
]);

const codeReader = new ZXing.BrowserBarcodeReader(hints);

let currentRoot = null;
let lastBarcode = null;
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

  const resultElement = root.querySelector("#fldBarcode");
  const videoElement = root.querySelector("#video");

  if (videoElement) {
    if (videoElement.srcObject) {
      videoElement.srcObject.getTracks().forEach(track => track.stop());
    }

    codeReader.decodeFromConstraints(
      {
        video: { facingMode: "environment" }
      },
      videoElement,
      (result, err) => {
        if (result) {
          const value = result.text || result;

          // stopScanning();
          if (lastBarcode !== result) {
            lastBarcode = result;
            resultElement.value = result;

            try {
              if (scanning) {
                navigator.vibrate?.([100, 50, 100]);
              }
            } catch (e) {
              console.log(e);
            }
          }
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
      <div class="scan-fld-container">
        <input id="fldBarcode" placeholder="barcode" type="text" inputmode="numeric" pattern="[0-9]*" class="input-fld"></input>
        <button id="btnSearch">Zoek</button>
      </div>
      <div class="scan-input-container">
        <div id="no-video">
          Checking Camera Support<br>
          ...
        </div>
      </div>            
      <button id="btnScan" class="red-btn">Stop Scan</button>
    </div>
  `;
};


export async function init(root) {
  const supported = await isCameraSupported();
  const container = document.querySelector(".scan-input-container");

  container.innerHTML = supported
    ? `<video id="video" style="width: 100%; height: auto;"></video>`
    : `<div id="no-video">No Camera Support</div>`;

  scanning = false;
  window.addEventListener("beforeunload", () => {
    stopScanning();
  });

  root.querySelector("#btnSearch").onclick = () => {
    const result = root.querySelector("#fldBarcode").value;
    window.location.hash = `#/stock/pallet/${result}`;
  };

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

export function destroy(root) {
  currentRoot = root;
  stopScanning();
}