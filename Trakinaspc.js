// TrakinasPC.js

// ==================== Sons e tela inicial ====================
const beep = new Audio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
beep.play().catch(()=>{});

const overlay = document.createElement("div");
overlay.style.cssText = `
  position:fixed; top:0; left:0; width:100%; height:100%;
  background:black; color:#ff0; display:flex; flex-direction:column;
  justify-content:center; align-items:center; font-family:monospace;
  font-size:48px; text-align:center; z-index:999999; transition:opacity .5s;
`;
overlay.innerHTML = `
  <div style="text-shadow:0 0 10px yellow,0 0 20px yellow,0 0 30px yellow;">Trakinas</div>
  <div style="margin-top:10px;font-size:24px;text-shadow:0 0 8px yellow,0 0 16px yellow;">tava com saudades?</div>
`;
document.body.appendChild(overlay);

// ==================== Delay inicial ====================
setTimeout(() => {
  overlay.remove();

  // ==================== Criar GUI ====================
  const gui = document.createElement("div");
  gui.id = "trk_gui";
  gui.style.cssText = `
    position:fixed; top:100px; left:100px;
    background: rgba(0,0,0,0.7); color:#ff0; padding:12px;
    border:2px solid #ff0; border-radius:12px;
    box-shadow:0 0 20px #ff0;
    width:250px; user-select:none; z-index:999999;
    opacity:0; transition:opacity 0.5s ease;
  `;
  document.body.appendChild(gui);

  gui.innerHTML = `
    <style>
      @keyframes pulse {
        0%{box-shadow:0 0 10px #ff0;}
        50%{box-shadow:0 0 20px #ff0;}
        100%{box-shadow:0 0 10px #ff0;}
      }
      #trk_gui * { transition: all 0.3s ease; }
      #trk_btn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
      #toggleBtn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
    </style>
    <div id="trk_header" style="cursor:move;font-weight:bold;margin-bottom:5px;text-align:center;font-size:16px;">Trakinas PC</div>
    <div style="text-align:center;margin-bottom:5px;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd-rV7R8ol927J-dJLHmhnxon9jeb1jV9Lw&s"
      style="width:60px;height:60px;border-radius:50%;border:2px solid #ff0;animation:pulse 2s infinite;">
      <div style="font-size:10px;color:#ff0;margin-top:2px;">Criador: Trakinas</div>
    </div>
    <textarea id="trk_text" style="width:210px;height:60px;background:black;color:#ff0;border:1px solid #ff0;"></textarea><br>
    <button id="trk_btn" style="margin-top:5px;background:black;color:#ff0;border:1px solid #ff0;padding:5px;width:100%;">Auto Digitar</button>
    <div id="trk_status" style="margin-top:5px;height:20px;text-align:center;color:#ff0;"></div>
  `;

  // ==================== Fade-in do GUI ====================
  setTimeout(()=>{gui.style.opacity = "1";}, 50);

  // ==================== Arrastar GUI ====================
  let dragging = false, ox = 0, oy = 0;
  const header = document.getElementById("trk_header");
  function startDrag(e){
    dragging = true;
    ox = (e.touches ? e.touches[0].clientX : e.clientX) - gui.offsetLeft;
    oy = (e.touches ? e.touches[0].clientY : e.clientY) - gui.offsetTop;
    e.preventDefault();
  }
  function drag(e){
    if(dragging){
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;
      gui.style.left = (clientX - ox) + "px";
      gui.style.top = (clientY - oy) + "px";
    }
  }
  function endDrag(){ dragging = false; }
  header.addEventListener("mousedown", startDrag);
  header.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  // ==================== Botão minimizar ====================
  let minimized = false;
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.textContent = "+";
  toggleBtn.style.cssText = `
    position:fixed; top:10px; right:10px; width:40px; height:40px;
    border-radius:8px; background:black; color:#ff0; border:2px solid #ff0;
    font-size:18px; z-index:1000000; cursor:pointer; transition:0.3s;
  `;
  toggleBtn.onclick = ()=>{ minimized = !minimized; gui.style.display = minimized ? "none" : "block"; };
  document.body.appendChild(toggleBtn);

  // ==================== Auto Digitar ====================
  document.getElementById("trk_btn").onclick = ()=>{
    const text = document.getElementById("trk_text").value;
    if(!text) return;
    let status = document.getElementById("trk_status");
    let count = 2.9;
    status.style.color = "#ff0";
    status.textContent = "⏳ "+count.toFixed(1)+"s";
    let timer = setInterval(()=>{
      count -= 0.1;
      status.textContent = "⏳ "+count.toFixed(1)+"s";
      if(count<=0){
        clearInterval(timer);
        status.textContent = "Digitando...";
        setTimeout(()=>{
          let el = document.activeElement, idx=0;
          function type(){
            if(idx<text.length){
              el.value += text[idx];
              el.dispatchEvent(new Event('input',{bubbles:true}));
              idx++;
              setTimeout(type,50);
            } else {
              status.textContent="✅ Concluído";
              setTimeout(()=>status.textContent="",2000);
            }
          }
          type();
        },100);
      }
    },100);
  };

}, 1700);  gui.innerHTML = `
    <style>
      @keyframes pulse {
        0%{box-shadow:0 0 10px #ff0;}
        50%{box-shadow:0 0 20px #ff0;}
        100%{box-shadow:0 0 10px #ff0;}
      }
      #trk_gui * { transition: all 0.3s ease; }
      #trk_btn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
      #toggleBtn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
    </style>
    <div id="trk_header" style="cursor:move;font-weight:bold;margin-bottom:5px;text-align:center;font-size:16px;">Trakinas PC</div>
    <div style="text-align:center;margin-bottom:5px;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd-rV7R8ol927J-dJLHmhnxon9jeb1jV9Lw&s"
      style="width:60px;height:60px;border-radius:50%;border:2px solid #ff0;animation:pulse 2s infinite;">
      <div style="font-size:10px;color:#ff0;margin-top:2px;">Criador: Trakinas</div>
    </div>
    <textarea id="trk_text" style="width:210px;height:60px;background:black;color:#ff0;border:1px solid #ff0;"></textarea><br>
    <button id="trk_btn" style="margin-top:5px;background:black;color:#ff0;border:1px solid #ff0;padding:5px;width:100%;">Auto Digitar</button>
    <div id="trk_status" style="margin-top:5px;height:20px;text-align:center;color:#ff0;"></div>
  `;

  // ==================== Fade-in do GUI ====================
  setTimeout(()=>{gui.style.opacity = "1";}, 50);

  // ==================== Arrastar GUI ====================
  let dragging = false, ox = 0, oy = 0;
  const header = document.getElementById("trk_header");
  function startDrag(e){
    dragging = true;
    ox = (e.touches ? e.touches[0].clientX : e.clientX) - gui.offsetLeft;
    oy = (e.touches ? e.touches[0].clientY : e.clientY) - gui.offsetTop;
    e.preventDefault();
  }
  function drag(e){
    if(dragging){
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;
      gui.style.left = (clientX - ox) + "px";
      gui.style.top = (clientY - oy) + "px";
    }
  }
  function endDrag(){ dragging = false; }
  header.addEventListener("mousedown", startDrag);
  header.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  // ==================== Botão minimizar ====================
  let minimized = false;
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.textContent = "+";
  toggleBtn.style.cssText = `
    position:fixed; top:10px; right:10px; width:40px; height:40px;
    border-radius:8px; background:black; color:#ff0; border:2px solid #ff0;
    font-size:18px; z-index:1000000; cursor:pointer; transition:0.3s;
  `;
  toggleBtn.onclick = ()=>{ minimized = !minimized; gui.style.display = minimized ? "none" : "block"; };
  document.body.appendChild(toggleBtn);

  // ==================== Auto Digitar ====================
  document.getElementById("trk_btn").onclick = ()=>{
    const text = document.getElementById("trk_text").value;
    if(!text) return;
    let status = document.getElementById("trk_status");
    let count = 2.9;
    status.style.color = "#ff0";
    status.textContent = "⏳ "+count.toFixed(1)+"s";
    let timer = setInterval(()=>{
      count -= 0.1;
      status.textContent = "⏳ "+count.toFixed(1)+"s";
      if(count<=0){
        clearInterval(timer);
        status.textContent = "Digitando...";
        setTimeout(()=>{
          let el = document.activeElement, idx=0;
          function type(){
            if(idx<text.length){
              el.value += text[idx];
              el.dispatchEvent(new Event('input',{bubbles:true}));
              idx++;
              setTimeout(type,50);
            } else {
              status.textContent="✅ Concluído";
              setTimeout(()=>status.textContent="",2000);
            }
          }
          type();
        },100);
      }
    },100);
  };

}, 1700);      @keyframes pulse {
        0%{box-shadow:0 0 10px #ff0;}
        50%{box-shadow:0 0 20px #ff0;}
        100%{box-shadow:0 0 10px #ff0;}
      }
      #trk_gui * { transition: all 0.3s ease; }
      #trk_btn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
      #toggleBtn:hover { background:#222; color:#ff0; box-shadow:0 0 10px #ff0; }
    </style>
    <div id="trk_header" style="cursor:move;font-weight:bold;margin-bottom:5px;text-align:center;font-size:16px;">Trakinas PC</div>
    <div style="text-align:center;margin-bottom:5px;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd-rV7R8ol927J-dJLHmhnxon9jeb1jV9Lw&s" style="width:60px;height:60px;border-radius:50%;border:2px solid #ff0;animation:pulse 2s infinite;">
      <div style="font-size:10px;color:#ff0;margin-top:2px;">Criador: Trakinas</div>
    </div>
    <textarea id="trk_text" style="width:210px;height:60px;background:black;color:#ff0;border:1px solid #ff0;"></textarea><br>
    <button id="trk_btn" style="margin-top:5px;background:black;color:#ff0;border:1px solid #ff0;padding:5px;width:100%;">Auto Digitar</button>
    <div id="trk_status" style="margin-top:5px;height:20px;text-align:center;color:#ff0;"></div>
  `;

  // ==================== Fade-in do GUI ====================
  setTimeout(()=>{gui.style.opacity = "1";}, 50);

  // ==================== Arrastar GUI ====================
  let dragging = false, ox = 0, oy = 0;
  const header = document.getElementById("trk_header");
  function startDrag(e){
    dragging = true;
    ox = (e.touches ? e.touches[0].clientX : e.clientX) - gui.offsetLeft;
    oy = (e.touches ? e.touches[0].clientY : e.clientY) - gui.offsetTop;
    e.preventDefault();
  }
  function drag(e){
    if(dragging){
      let clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let clientY = e.touches ? e.touches[0].clientY : e.clientY;
      gui.style.left = (clientX - ox) + "px";
      gui.style.top = (clientY - oy) + "px";
    }
  }
  function endDrag(){ dragging = false; }
  header.addEventListener("mousedown", startDrag);
  header.addEventListener("touchstart", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  // ==================== Botão minimizar ====================
  let minimized = false;
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.textContent = "+";
  toggleBtn.style.cssText = `
    position:fixed; top:10px; right:10px; width:40px; height:40px;
    border-radius:8px; background:black; color:#ff0; border:2px solid #ff0;
    font-size:18px; z-index:1000000; cursor:pointer; transition:0.3s;
  `;
  toggleBtn.onclick = ()=>{ minimized = !minimized; gui.style.display = minimized ? "none" : "block"; };
  document.body.appendChild(toggleBtn);

  // ==================== Auto Digitar ====================
  document.getElementById("trk_btn").onclick = ()=>{
    const text = document.getElementById("trk_text").value;
    if(!text) return;
    let status = document.getElementById("trk_status");
    let count = 2.9;
    status.style.color = "#ff0";
    status.textContent = "⏳ "+count.toFixed(1)+"s";
    let timer = setInterval(()=>{
      count -= 0.1;
      status.textContent = "⏳ "+count.toFixed(1)+"s";
      if(count<=0){
        clearInterval(timer);
        status.textContent = "Digitando...";
        setTimeout(()=>{
          let el = document.activeElement, idx=0;
          function type(){
            if(idx<text.length){
              el.value += text[idx];
              el.dispatchEvent(new Event('input',{bubbles:true}));
              idx++;
              setTimeout(type,50);
            } else {
              status.textContent="✅ Concluído";
              setTimeout(()=>status.textContent="",2000);
            }
          }
          type();
        },100);
      }
    },100);
  };

}, 1700);
