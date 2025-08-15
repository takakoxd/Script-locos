// Verifica se a GUI já existe
if (!document.getElementById("trk_gui")) {

  // === Tela preta inicial (splash) ===
  const splash = document.createElement("div");
  splash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    color: #ff0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: monospace;
    font-size: 48px;
    text-align: center;
    z-index: 999999;
    transition: opacity 0.5s;
  `;
  splash.innerHTML = `
    <div style="font-size:60px;font-weight:bold;text-shadow:0 0 10px #ff0">Trakinas</div>
    <div style="margin-top:20px;font-size:30px;text-shadow:0 0 8px #ff0">Tava com saudades né?</div>
  `;
  document.body.appendChild(splash);

  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.remove();
      initGui();
    }, 500);
  }, 1700);

  // === Inicializa GUI ===
  function initGui() {
    // Estilos
    const style = document.createElement("style");
    style.innerHTML = `
      #trk_gui {
        position: fixed;
        top: 50px;
        left: 50px;
        width: 250px;
        height: 250px;
        background: rgba(0,0,0,0.85);
        border: 2px solid #ff0;
        border-radius: 12px;
        box-shadow: 0 0 15px #ff0;
        color: #ff0;
        font-family: monospace;
        z-index: 99999;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.3s ease;
        user-select: none;
        overflow: hidden;
      }
      #trk_img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #ff0;
        margin-bottom: 10px;
      }
      #trk_title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 2px;
      }
      #trk_credits {
        font-size: 12px;
        color: #ffeb3b;
        margin-bottom: 10px;
      }
      #trk_btns {
        display: flex;
        flex-direction: column;
        width: 90%;
      }
      #trk_btns button {
        background: #000;
        border: 1px solid #ff0;
        color: #ff0;
        border-radius: 8px;
        padding: 6px;
        margin: 4px;
        cursor: pointer;
        transition: 0.2s;
      }
      #trk_btns button:hover {
        background: #222;
      }
      #trk_min {
        position: fixed;
        top: 10px;
        left: 10px;
        background: #000;
        border: 2px solid #ff0;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #ff0;
        font-size: 24px;
        box-shadow: 0 0 10px #ff0;
        z-index: 99998;
      }
    `;
    document.head.appendChild(style);

    // HTML da GUI
    document.body.insertAdjacentHTML("beforeend", `
      <div id="trk_gui">
        <img id="trk_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpvy6dOcEctXK6BMdTVyC6lb5vsaWX74gg5jk2cRr1tte1IDiqOyRmd6k&s=10">
        <div id="trk_title">Trakinas VS sociedade</div>
        <div id="trk_credits">Criado por Trakinas</div>
        <div id="trk_btns">
          <button id="trk_copy">Forçar Copia</button>
          <button id="trk_paste">Forçar Cola</button>
        </div>
      </div>
      <div id="trk_min">+</div>
    `);

    const gui = document.getElementById("trk_gui");
    const minBtn = document.getElementById("trk_min");

    // === Arrastar GUI ===
    let dx, dy, dragging = false;
    gui.addEventListener("mousedown", e => {
      if (e.target.tagName !== "BUTTON") {
        dragging = true;
        dx = e.clientX - gui.offsetLeft;
        dy = e.clientY - gui.offsetTop;
      }
    });
    document.addEventListener("mousemove", e => {
      if (dragging) {
        gui.style.left = e.clientX - dx + "px";
        gui.style.top = e.clientY - dy + "px";
      }
    });
    document.addEventListener("mouseup", () => dragging = false);

    gui.addEventListener("touchstart", e => {
      dragging = true;
      dx = e.touches[0].clientX - gui.offsetLeft;
      dy = e.touches[0].clientY - gui.offsetTop;
    }, {passive:true});
    document.addEventListener("touchmove", e => {
      if (dragging) {
        gui.style.left = e.touches[0].clientX - dx + "px";
        gui.style.top = e.touches[0].clientY - dy + "px";
      }
    }, {passive:true});
    document.addEventListener("touchend", () => dragging = false);

    // === Minimizar / Maximizar ===
    function toggleGui() {
      if (gui.style.display === "none") {
        gui.style.display = "flex";
        setTimeout(() => {
          gui.style.opacity = "1";
          gui.style.transform = "scale(1)";
        }, 10);
      } else {
        gui.style.opacity = "0";
        gui.style.transform = "scale(0.8)";
        setTimeout(() => { gui.style.display = "none"; }, 300);
      }
    }
    minBtn.onclick = toggleGui;
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && gui.style.display !== "none") toggleGui();
    });

    // === Forçar Copia ===
    document.getElementById("trk_copy").onclick = async () => {
      let sel = window.getSelection().toString();
      if (!sel) {
        alert("⚠️ Nenhum texto selecionado!");
        return;
      }
      try {
        await navigator.clipboard.writeText(sel);
        alert("📋 Copiado: " + sel);
      } catch {
        // fallback antigo
        const ta = document.createElement("textarea");
        document.body.appendChild(ta);
        ta.value = sel;
        ta.select();
        document.execCommand("copy");
        ta.remove();
        alert("📋 Copiado: " + sel);
      }
    };

    // === Forçar Cola ===
    document.getElementById("trk_paste").onclick = async () => {
      const active = document.activeElement;
      if (!active || !("value" in active)) {
        alert("⚠️ Clique em um campo de texto para colar!");
        return;
      }
      try {
        const text = await navigator.clipboard.readText();
        active.focus();
        active.value += text;
      } catch {
        alert("⚠️ Não foi possível colar automaticamente!");
      }
    };
  }
      }
