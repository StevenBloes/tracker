export const title = "KLA W32 - Startpagina";

export function render() {
  return `
    <div class="container">
      <h1>KLA W32</h1>
      <button id=btnStock class="big-btn">Paletten Stock</button>
    </div>
  `;
}

export function init(root) {
  root.querySelector("#btnStock").onclick = () => {
    window.location.hash = "#/stock";
  };
}

export function destroy() { }
