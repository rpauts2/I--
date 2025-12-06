// Состояние
const state = {
  data: null, userData: { projects:[], archive:[], fun:[], about:[] },
  section: 'projects', tiles: [],
  chaos: 0.4, presentTimer: null, funPage: 0, activeTags: new Set(),
  audio: null
};

// LocalStorage
const lsKey = 'aleksey-chaos-user';
function saveLocal(){ localStorage.setItem(lsKey, JSON.stringify(state.userData)); }
function loadLocal(){
  try { const raw = localStorage.getItem(lsKey); if(raw) state.userData = JSON.parse(raw); } catch {}
}

// Контент
async function loadContent(){ const res = await fetch('content.json'); state.data = await res.json(); loadLocal(); }
function mergedSection(name){ return [...(state.data[name]||[]), ...(state.userData[name]||[])]; }

// Физика
function randomVelocity(){
  const base = 0.25 + Math.random() * 0.75;
  const speed = base * (0.3 + state.chaos * 1.4);
  const angle = Math.random() * Math.PI * 2;
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}
function pickSize(i){ return ['small','medium','big'][i % 3]; }
function randomPos(board,w=300,h=240){
  const bw=board.clientWidth, bh=board.clientHeight||680;
  const x = Math.max(12, Math.random()*(bw - w - 24));
  const y = Math.max(12, Math.random()*(bh - h - 24));
  return {x,y};
}

// Hero canvas (частицы)
function initHeroCanvas(){
  const cvs = document.getElementById('heroCanvas');
  const ctx = cvs.getContext('2d');
  let particles = [];
  function resize(){
    cvs.width = window.innerWidth;
    cvs.height = Math.max(window.innerHeight*0.6, 520);
    particles = new Array(80).fill(0).map(()=>({
      x: Math.random()*cvs.width,
      y: Math.random()*cvs.height,
      r: 1 + Math.random()*2,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4
    }));
  }
  resize();
  let mx = -999, my = -999;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function tick(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.fillStyle = 'rgba(255,59,48,0.08)';
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>cvs.width) p.vx*=-1;
      if(p.y<0||p.y>cvs.height) p.vy*=-1;
      // притяжение к мыши
      const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx*dx+dy*dy);
      if(d<140){ p.vx += dx/d * -0.03; p.vy += dy/d * -0.03; }
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
  window.addEventListener('resize', resize);
}

// Аудио
function initAudio(){ try{ state.audio = new Audio('assets/glitch.mp3'); state.audio.volume = 0.2; }catch{} }
function playGlitch(){ if(state.audio){ state.audio.currentTime = 0; state.audio.play().catch(()=>{}); } }

// Рендер плитки
function createTile(item, i){
  const div = document.createElement('div');
  const size = pickSize(i);
  div.className = `tile ${size}`;
  const tag = item.tag ? `<div class="meta">${item.tag}</div>` : '';
  const title = item.title ? `<div class="title">${item.title}</div>` : (item.text ? `<div class="title">${item.text}</div>` : '');
  const desc = item.desc ? `<p>${item.desc}</p>` : '';
  const handle = `<div class="handle" title="Переместить">move</div>`;
  const drag = `<div class="drag" title="Изменить размер">resize</div>`;
  div.innerHTML = `${item.image ? `<img src="${item.image}" alt="">` : ''}${tag}${title}${desc}${handle}${drag}`;
  // hover звук
  div.addEventListener('mouseenter', playGlitch);
  // drag move
  let dragging=false, dx=0, dy=0;
  const handleEl = div.querySelector('.handle');
  handleEl.addEventListener('mousedown',(e)=>{
    dragging=true; handleEl.style.cursor='grabbing';
    dx = e.clientX - (parseFloat(div.style.left)||0);
    dy = e.clientY - (parseFloat(div.style.top)||0);
  });
  window.addEventListener('mouseup',()=>{ dragging=false; handleEl.style.cursor='grab'; });
  window.addEventListener('mousemove',(e)=>{
    if(!dragging) return;
    div.style.left = (e.clientX - dx) + 'px';
    div.style.top  = (e.clientY - dy) + 'px';
  });
  // drag resize
  let resizing=false, rw=div.offsetWidth, rh=div.offsetHeight, rx=0, ry=0;
  const dragEl = div.querySelector('.drag');
  dragEl.addEventListener('mousedown',(e)=>{
    resizing=true; rw=div.offsetWidth; rh=div.offsetHeight; rx=e.clientX; ry=e.clientY;
  });
  window.addEventListener('mouseup',()=>{ resizing=false; });
  window.addEventListener('mousemove',(e)=>{
    if(!resizing) return;
    const dw = e.clientX - rx; const dh = e.clientY - ry;
    div.style.width = Math.max(160, rw + dw) + 'px';
    div.style.height = Math.max(140, rh + dh) + 'px';
  });
  return div;
}

// Монтаж
function mountTiles(section){
  const board = document.getElementById('board');
  board.innerHTML = '';
  state.tiles = [];

  let items = mergedSection(section);

  // Поиск
  const q = document.getElementById('search').value.trim().toLowerCase();
  if(q){ items = items.filter(it => (`${it.title||''} ${it.text||''} ${it.desc||''} ${it.tag||''}`.toLowerCase()).includes(q)); }
  // Теги
  if(state.activeTags.size){ items = items.filter(it => it.tag && state.activeTags.has(it.tag.toLowerCase())); }
  // Фигня: странично
  if(section === 'fun'){
    const pageSize = 15;
    items = items.slice(0, (state.funPage+1)*pageSize);
    document.getElementById('funMoreWrap').style.display = items.length < mergedSection('fun').length ? 'flex' : 'none';
  } else { document.getElementById('funMoreWrap').style.display = 'none'; }

  if(section === 'about'){
    const about = items[0]?.text || 'Я — Алексей. Этот сайт — мой живой архив.';
    const div = document.createElement('div');
    div.className = 'tile big';
    const pos = randomPos(board, 340, 240);
    div.style.left = `${pos.x}px`; div.style.top = `${pos.y}px`;
    div.innerHTML = `<div class="title">Манифест</div><p>${about}</p><div class="handle">move</div><div class="drag">resize</div>`;
    board.appendChild(div);
    state.tiles.push({ el: div, ...randomVelocity(), w: 340, h: 240 });
    return;
  }

  items.forEach((item, i) => {
    const div = createTile(item, i);
    board.appendChild(div);
    const rect = div.getBoundingClientRect();
    const w = rect.width || 300;
    const h = rect.height || 240;
    const pos = randomPos(board, w, h);
    div.style.left = `${pos.x}px`;
    div.style.top  = `${pos.y}px`;
    const { vx, vy } = randomVelocity();
    state.tiles.push({ el: div, vx, vy, w, h });
  });
}

// Анимация
function animateTiles(){
  const board = document.getElementById('board');
  const bw = board.clientWidth;
  const bh = board.clientHeight || 680;

  state.tiles.forEach(t=>{
    const el = t.el;
    const x = parseFloat(el.style.left)||0;
    const y = parseFloat(el.style.top)||0;

    let nx = x + t.vx;
    let ny = y + t.vy;

    if(nx <= 12 || nx + t.w >= bw - 12){ t.vx *= -1; nx = Math.max(12, Math.min(nx, bw - t.w - 12)); }
    if(ny <= 12 || ny + t.h >= bh - 12){ t.vy *= -1; ny = Math.max(12, Math.min(ny, bh - t.h - 12)); }
    if(Math.random() < 0.003 + state.chaos*0.006){ const nv = randomVelocity(); t.vx = nv.vx; t.vy = nv.vy; }

    el.style.left = `${nx}px`;
    el.style.top  = `${ny}px`;
  });

  requestAnimationFrame(animateTiles);
}

// Теги
function initTags(){
  const wrap = document.getElementById('tagFilters');
  const known = new Set(['мем','мысль','рандом','aggressive','minimal','graffiti','concept','cinema']);
  known.forEach(tag=>{
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = tag;
    b.addEventListener('click',()=>{
      const t = tag.toLowerCase();
      if(state.activeTags.has(t)){ state.activeTags.delete(t); b.classList.remove('active'); }
      else { state.activeTags.add(t); b.classList.add('active'); }
      mountTiles(state.section);
    });
    wrap.appendChild(b);
  });
}

// Таймлайн
function initTimeline(){
  const body = document.getElementById('timelineBody');
  const items = mergedSection('archive');
  const group = {};
  items.forEach(it=>{
    const d = it.date || '2025-01-01';
    const [y,m] = d.split('-');
    group[y] = group[y] || {};
    group[y][m] = (group[y][m] || 0) + 1;
  });
  body.innerHTML = '';
  Object.keys(group).sort((a,b)=>b-a).forEach(y=>{
    const yEl = document.createElement('div');
    yEl.className = 'timeline-year';
    const months = Object.keys(group[y]).sort((a,b)=>b-a).map(m=>`<span class="timeline-month">${y}-${m}: ${group[y][m]}</span>`).join(' ');
    yEl.innerHTML = `<strong>${y}</strong> ${months}`;
    body.appendChild(yEl);
  });
}

// Фигня больше
function initFunMore(){ document.getElementById('funMoreBtn').addEventListener('click',()=>{ state.funPage += 1; mountTiles('fun'); }); }

// Темы и режимы
function initTheme(){ document.getElementById('themeToggle').addEventListener('click',()=>{ document.body.classList.toggle('theme-light'); document.body.classList.toggle('theme-dark'); }); }
function initMode(){
  const modes = ['mode-cinema','mode-chaos','mode-minimal','mode-comic','mode-graffiti'];
  document.getElementById('modeToggle').addEventListener('click',()=>{
    const body = document.body;
    const i = modes.findIndex(m=>body.classList.contains(m));
    body.classList.remove(...modes);
    body.classList.add(modes[(i+1)%modes.length]);
  });
}

// Поиск, табсы, сюрприз, презентация
function initSearch(){ document.getElementById('search').addEventListener('input',()=> mountTiles(state.section)); }
function initTabs(){
  document.querySelectorAll('.tabs .chip').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tabs .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.section = btn.dataset.section;
      if(state.section === 'fun') state.funPage = 0;
      mountTiles(state.section);
    });
  });
}
function initRandom(){ document.getElementById('randomBtn').addEventListener('click',()=>{
  const pool = [...mergedSection('projects'), ...mergedSection('archive'), ...mergedSection('fun')];
  const item = pool[Math.floor(Math.random()*pool.length)];
  alert(item.title || item.text || 'Сюрприз!');
}); }
function initPresent(){
  const btn = document.getElementById('presentBtn');
  btn.addEventListener('click',()=>{
    if(state.presentTimer){ clearInterval(state.presentTimer); state.presentTimer=null; btn.textContent='▶'; return; }
    state.section='projects'; mountTiles('projects'); btn.textContent='⏸';
    state.presentTimer=setInterval(()=>{ state.chaos=Math.min(1,state.chaos+0.05); mountTiles('projects'); }, 3000);
  });
}

// Хаос‑ползунок
function initChaos(){ document.getElementById('chaosRange').addEventListener('input',(e)=>{ state.chaos = e.target.value/100; }); }

// Загрузка: форма + drag & drop
function initUpload(){
  const form = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const noteInput = document.getElementById('noteInput');
  const tagInput = document.getElementById('tagInput');

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const file = fileInput.files[0];
    const note = (noteInput.value||'').trim();
    const tag = (tagInput.value||'рандом').trim().toLowerCase();

    const addItem = (imageDataUrl)=>{
      const newItem = { text: note || 'Без текста', tag, image: imageDataUrl||undefined, date: new Date().toISOString().slice(0,10) };
      state.userData.fun.unshift(newItem);
      saveLocal();
      state.section='fun'; state.funPage=0; mountTiles('fun'); form.reset();
    };

    if(file){ const reader = new FileReader(); reader.onload = ev => addItem(ev.target.result); reader.readAsDataURL(file); }
    else { addItem(null); }
  });

  const board = document.getElementById('board');
  ['dragenter','dragover'].forEach(evt => board.addEventListener(evt, e => { e.preventDefault(); board.style.outline = '2px dashed var(--accent)'; }));
  ['dragleave','drop'].forEach(evt => board.addEventListener(evt, e => { e.preventDefault(); board.style.outline = 'none'; }));
  board.addEventListener('drop', (e)=>{
    const file = e.dataTransfer.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.userData.fun.unshift({ text:'Дроп с борда', tag:'рандом', image: ev.target.result, date: new Date().toISOString().slice(0,10) });
      saveLocal(); state.section='fun'; state.funPage=0; mountTiles('fun');
    };
    reader.readAsDataURL(file);
  });
}

// Экспорт / импорт
function initExportImport(){
  document.getElementById('exportBtn').addEventListener('click',()=>{
    const all = { projects: mergedSection('projects'), archive: mergedSection('archive'), fun: mergedSection('fun'), about: mergedSection('about') };
    const blob = new Blob([JSON.stringify(all,null,2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chaos-export.json'; a.click();
  });
  document.getElementById('importInput').addEventListener('change',(e)=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => { try {
      const json = JSON.parse(ev.target.result);
      state.userData = { projects: json.projects||[], archive: json.archive||[], fun: json.fun||[], about: json.about||[] };
      saveLocal(); mountTiles(state.section); initTimeline();
    } catch { alert('Ошибка импорта JSON'); } };
    reader.readAsText(file);
  });
}

// Пасхалки + hero
function initEaster(){
  document.getElementById('logoBtn').addEventListener('click',()=>{
    const prev = state.chaos; state.chaos = 1; document.body.classList.add('glitch'); playGlitch();
    setTimeout(()=>{ state.chaos = prev; document.body.classList.remove('glitch'); }, 5000);
  });
  document.getElementById('heroSurprise').addEventListener('click',()=> document.getElementById('randomBtn').click());
  document.getElementById('heroOpen').addEventListener('click',()=>{ switch