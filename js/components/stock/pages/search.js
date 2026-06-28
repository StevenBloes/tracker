export const title = "KLA W32 | Zoek Product";
export const appBarTitle = "Zoek Product";


const product_data = {
  "products": [
    {
      "id": "P-1001",
      "name": "Basacote 9Mnd",
      "totalAmount": 120,
      "pallets": [
        {
          "palletId": "PAL-001",
          "location": "A",
          "amount": 40
        },
        {
          "palletId": "PAL-002",
          "location": "A",
          "amount": 80
        }
      ]
    },
    {
      "id": "P-1002",
      "name": "DCM Instant TD",
      "totalAmount": 75,
      "pallets": [
        {
          "palletId": "PAL-010",
          "location": "D",
          "amount": 25
        },
        {
          "palletId": "PAL-011",
          "location": "D",
          "amount": 50
        }
      ]
    },
    {
      "id": "P-1003",
      "name": "Osmocote 8/9Mnd",
      "totalAmount": 310,
      "pallets": [
        {
          "palletId": "PAL-020",
          "location": "A",
          "amount": 100
        },
        {
          "palletId": "PAL-021",
          "location": "A",
          "amount": 90
        },
        {
          "palletId": "PAL-022",
          "location": "B",
          "amount": 120
        }
      ]
    },
    {
      "id": "P-1004",
      "name": "PG-Mix 14/10/18",
      "totalAmount": 48,
      "pallets": [
        {
          "palletId": "PAL-030",
          "location": "C",
          "amount": 20
        },
        {
          "palletId": "PAL-031",
          "location": "C",
          "amount": 28
        }
      ]
    }
  ]
};

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