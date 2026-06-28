export function render() {
  return `
    <div id="app-bar">
      <div id="backButton" class="back-button-container">
        <img src="./img/back.svg" alt="back button" width="100%" height="100%">
      </div>
      <div id="app-bar-title"></div>
      <div class="back-button-container"></div>
    </div>
    <div id="child-outlet" class="container"></div>
  `;
};

export function init(root) {
  root.querySelector("#backButton").onclick = (e) => {history.back();}; 
}

export function destroy() {

}