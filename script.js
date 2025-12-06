const state = { data:null, section:'projects', tiles:[] };

async function loadContent(){
  const res = await fetch('content.json');
  state.data = await res.json();
}

function randomPos(board,w=300,h=220){
  const bw=board.clientWidth,bh=board.clientHeight||600;
  return {x:Math.random()*(bw-w),y:Math.random()*(bh-h)};
}
function randomVelocity(){
  const speed=0.5+Math.random();const angle=Math.random()*Math.PI*2;
  return {vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed};
}

function createTile(item){
  const div=document.createElement('div');
  div.className='tile';
  div.innerHTML=`${item.image?`<img src="${item.image}">`:''}<strong>${item.title||item.text}</strong><p>${item.desc||''}</p>`;
  return div;
}

function mountTiles(section){
  const board=document.getElementById('board');board.innerHTML='';state.tiles=[];
  const items=state.data[section];
  items.forEach(item=>{
    const div=createTile(item);board.appendChild(div);
    const pos=randomPos(board,300,220);div.style.left=pos.x+'px';div.style.top=pos.y+'px';
    const {vx,vy}=randomVelocity();state.tiles.push({el:div,vx,vy,w:300,h:220});
  });
}

function animateTiles(){
  const board=document.getElementById('board');const bw=board.clientWidth,bh=board.clientHeight||600;
  state.tiles.forEach(t=>{
    const el=t.el;let x=parseFloat(el.style.left)||0,y=parseFloat(el.style.top)||0;
    let nx=x+t.vx,ny=y+t.vy;
    if(nx<=0||nx+t.w>=bw){t.vx*=-1;nx=Math.max(0,Math.min(nx,bw-t.w));}
    if(ny<=0||ny+t.h>=bh){t.vy*=-1;ny=Math.max(0,Math.min(ny,bh-t.h));}
    el.style.left=nx+'px';el.style.top=ny+'px';
  });
  requestAnimationFrame(animateTiles);
}

function initTabs(){
  document.querySelectorAll('.tabs .chip').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tabs .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');state.section=btn.dataset.section;mountTiles(state.section);
    });
  });
}
function initTheme(){document.getElementById('themeToggle').onclick=()=>{document.body.classList.toggle('theme-light');document.body.classList.toggle('theme-dark');};}
function initRandom(){document.getElementById('randomBtn').onclick=()=>{const pool=[...state.data.projects,...state.data.archive,...state.data.fun];const item=pool[Math.floor(Math.random()*pool.length)];alert(item.title||item.text);};}
function initUpload(){
  const form=document.getElementById('uploadForm');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const file=document.getElementById('fileInput').files[0];
    const note=document.getElementById('noteInput').value;
    const tag=document.getElementById('tagInput').value;
    const addItem=(img)=>{const newItem={text:note||'Без текста',tag:tag||'рандом'};if(img)newItem.image=img;state.data.fun.unshift(newItem);mountTiles('fun');};
    if(file){const reader=new FileReader();reader.onload=ev=>addItem(ev.target.result);reader.readAsDataURL(file);}else addItem(null);
    form.reset();
  });
}

(async function init(){
  await loadContent();initTabs();initTheme();initRandom();initUpload();mountTiles(state.section);animateTiles();
})();
