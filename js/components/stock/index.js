export const title = "KLA W32 - Pallet Stock";

export function render() {
  return `
    <div id="child-outlet">
      <h1>Pallet Stock</h1>
      <button id="btnProducts" class="big-btn">Zoek pallet op product</button>
      <button id="btnBarcodes" class="big-btn">Scan Barcode</button>  
    </div>
  `;
};

export function init(root) {
root.querySelector("#btnProducts").onclick = () => {
    window.location.hash = "#/stock/search";
  };
  root.querySelector("#btnBarcodes").onclick = () => {
    window.location.hash = "#/stock/scan";
  };
}

export function destroy() {

}