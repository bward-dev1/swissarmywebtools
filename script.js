// --- AUTH ---
let loginMode = true;
function toggleAuthMode() {
    loginMode = !loginMode;
    document.getElementById('auth-title').innerText = loginMode ? "Welcome" : "Sign Up";
    document.getElementById('login-btns').innerHTML = loginMode ? 
        `<button onclick="handleAuth('login')" style="width: 100%;">Login</button><p onclick="toggleAuthMode()" style="margin-top:15px; font-size:0.8rem; cursor:pointer; color:var(--accent)">New? Create Account</p>` :
        `<button onclick="handleAuth('signup')" style="width: 100%;">Create Account</button><p onclick="toggleAuthMode()" style="margin-top:15px; font-size:0.8rem; cursor:pointer; color:var(--accent)">Have account? Login</p>`;
}

function handleAuth(t) {
    const u = document.getElementById('username').value, p = document.getElementById('password').value;
    if(!u || !p) return;
    if(t==='signup'){ 
        localStorage.setItem('u_'+u, p); 
        alert('Account Created!'); 
        toggleAuthMode(); 
    }
    else { 
        if(localStorage.getItem('u_'+u) === p) { 
            document.getElementById('auth-page').style.display='none'; 
            document.getElementById('app').style.display='flex'; 
            initScanner(); 
        } else alert('Invalid Credentials'); 
    }
}

// --- NAVIGATION ---
document.querySelectorAll('#nav-list li').forEach(li => {
    li.addEventListener('click', () => {
        document.querySelectorAll('#nav-list li').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
        li.classList.add('active');
        document.getElementById(li.dataset.tool).classList.add('active');
    });
});

// --- QR SCANNER ---
function initScanner() {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render((text) => {
        document.getElementById('qr-scanned-result').innerHTML = `<strong>Decoded:</strong><br>${text}`;
    });
}

// --- CLOCK ---
setInterval(() => {
    const d = new Date();
    document.getElementById('clk-time').innerText = d.toLocaleTimeString([], {hour12:false});
    document.getElementById('clk-date').innerText = d.toDateString().toUpperCase();
}, 1000);

// --- STOPWATCH ---
let swT = 0, swI;
function swStart(){ 
    clearInterval(swI); 
    swI = setInterval(() => { 
        swT++; 
        const s=swT%60, m=Math.floor(swT/60)%60, h=Math.floor(swT/3600); 
        document.getElementById('sw-time').innerText=`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`; 
    }, 1000); 
}
function swStop(){ clearInterval(swI); }
function swReset(){ swStop(); swT=0; document.getElementById('sw-time').innerText="00:00:00"; }

// --- TIMER ---
let tmI;
function tmStart(){ 
    let v=document.getElementById('tm-input').value; 
    clearInterval(tmI); 
    tmI=setInterval(()=>{ 
        v--; 
        document.getElementById('tm-display').innerText=v; 
        if(v<=0){clearInterval(tmI); alert('Timer Finished!');} 
    },1000); 
}

// --- CALCULATOR ---
let cD = document.getElementById('calc-display');
function cIn(v){ cD.value += v; }
function cClear(){ cD.value = ""; }
function cCalc(){ try{ cD.value = eval(cD.value); } catch { cD.value="Error"; } }

// --- PASSWORD GEN ---
function pwGen() {
    const len = document.getElementById('pw-len').value;
    const mode = document.getElementById('pw-mode').value;
    let res = "";
    if(mode === 'random') {
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(document.getElementById('pw-num').checked) charset += "0123456789";
        if(document.getElementById('pw-sym').checked) charset += "!@#$%^&*()";
        for(let i=0; i<len; i++) res += charset.charAt(Math.floor(Math.random()*charset.length));
    } else {
        const words = ["Peak","Wave","Iron","Glitch","Bolt","Swift","Neon"];
        while(res.length < len) res += words[Math.floor(Math.random()*words.length)];
        res += Math.floor(Math.random()*99);
    }
    document.getElementById('pw-output').innerText = res;
}

// --- QR GENERATE ---
function qrGenerate(){
    const v = document.getElementById('qr-input').value;
    const b = document.getElementById('qrcode');
    b.innerHTML = "";
    if(v) { 
        new QRCode(b, {text:v, width:180, height:180}); 
        document.getElementById('qr-dl').style.display='block'; 
    }
}
function qrDownload(){ 
    const img=document.querySelector('#qrcode img'); 
    const l=document.createElement('a'); 
    l.href=img.src; 
    l.download='qr.png'; 
    l.click(); 
}

// --- MISC ---
function wSearch() { 
    document.getElementById('w-info').innerText = `${document.getElementById('w-city').value}: 22°C - Sunny (Mock API)`; 
}

function tdAdd(){
    const v = document.getElementById('td-input').value; if(!v) return;
    const li = document.createElement('li');
    li.style = "background:#0f172a; padding:10px; margin-bottom:5px; border-radius:8px; display:flex; justify-content:space-between;";
    li.innerHTML = `<span>${v}</span><i class="fas fa-trash" style="color:var(--danger); cursor:pointer" onclick="this.parentElement.remove()"></i>`;
    document.getElementById('todo-list').appendChild(li);
    document.getElementById('td-input').value = "";
}

function txCount(){ 
    const v = document.getElementById('tx-input').value; 
    document.getElementById('tx-result').innerText = `Words: ${v.trim()?v.trim().split(/\s+/).length:0} | Chars: ${v.length}`; 
}
