export const title = "KLA W32 - Pallet Stock";

let palletId = null;

export function render(id) {
  return `
    <h1>${id}</h1>
    <button id="btnMap" class="big-btn">Toon op Kaart</button>
    <button id="btnMove" class="big-btn">Verplaats pallet</button>
    <button id="btnStage" class="big-btn">Neem zakken af voor productievoorraad</button>
  `;
};

export function init(root, id) {

  palletId = id;

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