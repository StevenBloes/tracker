export const title = "KLA W32 | Pallet Stock Home";
export const appBarTitle = "Stock Paletten";


export function render() {
  return `
    <div class="button-container">
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