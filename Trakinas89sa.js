let loadedPlugins = []; 
const splashScreen = document.createElement('splashScreen'); 

// Fonte e estilos
document.head.appendChild(Object.assign(document.createElement("style"),{
    innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}"
}));
document.head.appendChild(Object.assign(document.createElement('style'),{
    innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"
}));

// Favicon antigo restaurado
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

// Event Emitter
class EventEmitter {
    constructor(){ this.events={}; }
    on(t,e){ if(typeof t=="string") t=[t]; t.forEach(t=>{ this.events[t]||(this.events[t]=[]); this.events[t].push(e) }) }
    off(t,e){ if(typeof t=="string") t=[t]; t.forEach(t=>{ this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e)) }) }
    emit(t,...e){ this.events[t]&&this.events[t].forEach(fn=>fn(...e)) }
    once(t,e){ if(typeof t=="string") t=[t]; let s=(...i)=>{ e(...i); this.off(t,s) }; this.on(t,s) }
}
const plppdo = new EventEmitter();
new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); })
.observe(document.body, { childList: true, subtree: true });

// Funções utilitárias
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const findAndClickBySelector = selector => {
    const element = document.querySelector(selector);
    if (element) { element.click(); sendToast(`Ânus de dzaberdzodzo ${selector}...`, 1000); }
};
function sendToast(text, duration=5000, gravity='bottom') {
    Toastify({ text, duration, gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast();
}

// Splash Screen
async function showSplashScreen() {
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;";
    splashScreen.innerHTML = `<div>
        <span style="color:#FFFF33; font-size:50px; text-shadow:0 0 5px #FFFF33,0 0 10px #FFFF33,0 0 15px #FFFF33;">Trakinas</span><br>
        <span style="color:#FFFF33; font-size:20px; text-shadow:0 0 5px #FFFF33,0 0 10px #FFFF33,0 0 15px #FFFF33;">Estava com saudades né?</span>
    </div>`;
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
};
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1700); };

// Loaders
async function loadScript(url, label){ return fetch(url).then(r=>r.text()).then(script=>{ loadedPlugins.push(label); eval(script); }); }
async function loadCss(url){ return new Promise(resolve=>{ const link=document.createElement('link'); link.rel='stylesheet'; link.type='text/css'; link.href=url; link.onload=()=>resolve(); document.head.appendChild(link); }); }

// Funções principais
function setupMain(){
    // QuestionSpoof
    (function () {
        const phrases = [ "Trakinas ama o Dzaberdzoo" ];
        const originalFetch = window.fetch;
        window.fetch = async function(input, init) {
            let body;
            if(input instanceof Request) body = await input.clone().text();
            else if(init && init.body) body = init.body;
            const originalResponse = await originalFetch.apply(this, arguments);
            const clonedResponse = originalResponse.clone();
            try {
                const responseBody = await clonedResponse.text();
                let responseObj = JSON.parse(responseBody);
                if(responseObj?.data?.assessmentItem?.item?.itemData){
                    let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
                    if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                        itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false };
                        itemData.question.content = phrases[Math.floor(Math.random()*phrases.length)] + `[[☃ radio 1]]`;
                        itemData.question.widgets = { "radio 1": { type:"radio", options:{ choices:[ { content:"Resposta correta.", correct:true }, { content:"Resposta incorreta.", correct:false } ] } } };
                        responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                        sendToast("DZABERDZO?", 1000);
                        return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
                    }
                }
            } catch(e){}
            return originalResponse;
        };
    })();

    // VideoSpoof
    (function () {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init){
            let body;
            if(input instanceof Request) body = await input.clone().text();
            else if(init && init.body) body = init.body;
            if(body && body.includes('"operationName":"updateUserVideoProgress"')){
                try{
                    let bodyObj = JSON.parse(body);
                    if(bodyObj.variables && bodyObj.variables.input){
                        const durationSeconds = bodyObj.variables.input.durationSeconds;
                        bodyObj.variables.input.secondsWatched = durationSeconds;
                        bodyObj.variables.input.lastSecondWatched = durationSeconds;
                        body = JSON.stringify(bodyObj);
                        if(input instanceof Request) input = new Request(input,{body});
                        else init.body = body;
                        sendToast("Vídeo gulosativo.",1000)
                    }
                } catch(e){ console.debug(`🚨 Error @ videoSpoof.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    // MinuteFarm
    (function () {
        const originalFetch = window.fetch;
        window.fetch = async function(input, init={}){
            let body;
            if(input instanceof Request) body = await input.clone().text();
            else if(init && init.body) body = init.body;
            if(body && input.url.includes("mark_conversions")){
                try{ if(body.includes("termination_event")) { sendToast("🚫 Limitador de tempo bloqueado.",1000); return; } }
                catch(e){ console.debug(`🚨 Error @ minuteFarm.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    // AutoAnswer
    (function () {
        const baseSelectors = [`[data-testid="choice-icon__library-choice-icon"]`,`[data-testid="exercise-check-answer"]`,`[data-testid="exercise-next-question"]`,`._1udzurba`,`._awve9b`];
        let khanwareDominates = true;
        (async ()=>{
            while(khanwareDominates){
                for(const q of baseSelectors){
                    findAndClickBySelector(q);
                    if(document.querySelector(q+"> div") && document.querySelector(q+"> div").innerText==="Mostrar resumo"){
                        sendToast("DZAAABERRRRDZOOOO🤤",3000);
                        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                    }
                }
                await delay(800);
            }
        })();
    })();
}

// Inject
if(!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)){
    alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)");
