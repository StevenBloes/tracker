import { product_data } from "../../../services/test_data.js";

export const title = "KLA W32 | Zoek Product";
export const appBarTitle = "Zoek Product";


function loadData(root) {
  const productList = root.querySelector("#productList");

  product_data.products.forEach(product => {

    const productItem = document.createElement("div");

    productItem.classList.add("product-item");

    const productHeader = document.createElement("div");

    productHeader.classList.add("product-header");
    productHeader.innerHTML = `
      <span class="product-header-name">${product.name}</span>
      <span class="product-header-amount">${product.totalAmount} kg</span>`;

    productItem.appendChild(productHeader);

    const palletList = document.createElement("div");

    palletList.classList.add("pallet-list");
    palletList.classList.add("hidden");

    product.pallets.forEach(pallet => {
      const palletItem = document.createElement("div");

      palletItem.classList.add("pallet-item")
      palletItem.id = pallet.palletId;
      palletItem.innerHTML = `
        <span class="pallet-item-id">${pallet.palletId}</span>
        <span class="pallet-item-location">${pallet.location}</span>
        <span class="pallet-item-amount">${pallet.amount} kg</span>`;
      palletItem.onclick = () => { window.location.hash = `#/stock/pallet/${palletItem.id}`; };

      palletList.appendChild(palletItem);
    });

    productItem.appendChild(palletList);

    productList.appendChild(productItem);
  });

  document.querySelectorAll('.product-header').forEach(header => {
    header.addEventListener('click', () => {
      const palletList = header.nextElementSibling;
      palletList.classList.toggle("hidden");
    });
  });
}

export function render(root) {
  return `
    <input class="input-fld"></input>
    <div id=productList class="product-list"></div>
  `;
};

export function init(root) {
  loadData(root);
}

export function destroy() {

}