const photos=[
 {title:"Quiet Geometry",category:"architecture",place:"Copenhagen, Denmark",id:"photo-1487958449943-2429e8be8625"},
 {title:"Into the Wild",category:"nature",place:"Dolomites, Italy",id:"photo-1472396961693-142e6e269027"},
 {title:"Concrete Poetry",category:"architecture",place:"Modern forms",id:"photo-1511818966892-d7d671e672a2"},
 {title:"Blue Horizon",category:"travel",place:"Coastal escape",id:"photo-1500375592092-40eb2168fd21"},
 {title:"Forest Light",category:"nature",place:"A slower morning",id:"photo-1448375240586-882707db888b"},
 {title:"City in Motion",category:"travel",place:"Urban diaries",id:"photo-1519608487953-e999c86e7455"},
 {title:"Soft Structure",category:"architecture",place:"Lines & shadows",id:"photo-1518005020951-eccb494ad742"},
 {title:"Open Water",category:"nature",place:"Pacific blue",id:"photo-1469474968028-56623f02e42e"},
 {title:"Far From Here",category:"travel",place:"A place to pause",id:"photo-1464822759023-fed622ff2c3b"},
 {title:"Golden Hour",category:"nature",place:"Last light",id:"photo-1500530855697-b586d89ba3ee"},
 {title:"The Passage",category:"architecture",place:"Built to inspire",id:"photo-1487958449943-2429e8be8625"},
 {title:"Somewhere New",category:"travel",place:"Collected moments",id:"photo-1470770841072-f978cf4d019e"}
];
const grid=document.querySelector("#galleryGrid"),box=document.querySelector("#lightbox"),big=document.querySelector("#lightboxImage");let visible=[],current=0;
const src=(id,w=900)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
function render(filter="all"){grid.innerHTML="";visible=photos.filter(p=>filter==="all"||p.category===filter);visible.forEach((p,i)=>{const card=document.createElement("article");card.className="tile";card.innerHTML=`<img loading="lazy" src="${src(p.id,850)}" alt="${p.title}" /><div class="tile-info"><div><h3>${p.title}</h3><p>${p.place}</p></div><span class="tile-arrow">↗</span></div>`;card.addEventListener("click",()=>open(i));grid.append(card)});}
function open(i){current=i;const p=visible[current];big.src=src(p.id,1600);big.alt=p.title;document.querySelector("#lightboxTitle").textContent=p.title+" — "+p.place;document.querySelector("#lightboxCount").textContent=`${String(current+1).padStart(2,"0")} / ${String(visible.length).padStart(2,"0")}`;box.classList.add("open");box.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function move(n){current=(current+n+visible.length)%visible.length;open(current)}function close(){box.classList.remove("open");box.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");render(b.dataset.filter)}));
document.querySelector(".close").addEventListener("click",close);document.querySelector(".prev").addEventListener("click",()=>move(-1));document.querySelector(".next").addEventListener("click",()=>move(1));box.addEventListener("click",e=>{if(e.target===box)close()});document.addEventListener("keydown",e=>{if(!box.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)});render();