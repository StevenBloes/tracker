export const title = "KLA W32 - Pallet Stock";

export function render() {
  return `
    <h1>Barcode Scanner</h1>
    <button id="btnStopScan" class="big-btn red-btn">Stop</button>
  `;
};

export function init(root) {
  root.querySelector("#btnStopScan").onclick = () => {
    window.location.hash = "#/stock";
  };
}

export function destroy() {

}