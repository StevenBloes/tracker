import { product_data } from "../../../services/test_data.js";

export const title = "KLA W32 | Pallet Info";
export const appBarTitle = "Pallet Info";


let palletId = null;

function retrievePalletData(id) {

  for (const product of product_data.products) {
    const pallet = product.pallets.find(p => p.palletId === id);

    if (pallet) {
      return {
        name: product.name,
        location: pallet.location,
        amount: pallet.amount,
        delivery_date: pallet.delivery_date
      };
    }
  }

  return null;

}

function insertPalletData(root, palletData) {
  if (palletData) {
    root.querySelector("#product").textContent = palletData.name;
    root.querySelector("#amount").textContent = `${palletData.amount} kg`;
    root.querySelector("#location").textContent = palletData.location;
    root.querySelector("#deliveryDate").textContent = palletData.delivery_date;
  } else {
    root.querySelector("#product").textContent = "product naam";
    root.querySelector("#amount").textContent = "xxx kg";
    root.querySelector("#location").textContent = "locatie";
    root.querySelector("#deliveryDate").textContent = "DD/MM/YYYY";
  }
}

export function render(id) {
  return `
    <div class="pallet-info-card">
      <div class="pallet-info-row">
        <div class="card-label">Pallet ID:</div>
        <div id="barcode" class="card-value">${id}</div>
      </div>
      <div class="pallet-info-row">
        <div class="card-label">Product:</div>
        <div id="product" class="card-value">product naam</div>
      </div>
      <div class="pallet-info-row">
        <div class="card-label">Hoeveelheid:</div>
        <div id="amount" class="card-value">aantal kg</div>
      </div>
      <div class="pallet-info-row">
        <div class="card-label">Locatie:</div>
        <div id="location" class="card-value">opslag locatie</div>
      </div>
      <div class="pallet-info-row">
        <div class="card-label">Leveringsdatum:</div>
        <div id="deliveryDate" class="card-value">DD/MM/YYYY</div>
      </div>
    </div>

    <div class="button-container">
      <button id="btnMap" class="white-btn">Toon Locatie</button>
      <button id="btnMove" class="white-btn">Wijzig Locatie</button>
      <button id="btnStage" class="white-btn">Productievoorraad</button>
    </div>
  `;
};

export function init(root, id) {

  palletId = id;

  const palletData = retrievePalletData(id);
  insertPalletData(root, palletData);

  root.querySelector("#btnMap").onclick = () => {
    console.log("button clicked");
    window.location.hash = `#/stock/map/${id}`;
  };
  root.querySelector("#btnMove").onclick = () => {
    console.log("button clicked");
    window.location.hash = `#/stock/move/${id}`;
  };
  root.querySelector("#btnStage").onclick = () => {
    console.log("button clicked");
    window.location.hash = `#/stock/stage/${id}`;
  }
}

export function destroy() {

}