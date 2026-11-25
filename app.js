var DEF=[
 {e:"🕯️",n:"Velas de mamá",u:""},
 {e:"🎨",n:"Yesos (mío)",u:""},
 {e:"🖌️",n:"Yesos (hermana)",u:""},
 {e:"🗺️",n:"Mapa turístico",u:""},
 {e:"💼",n:"Páginas que hice",u:""},
 {e:"🧠",n:"Notas JARVIS",u:""},
 {e:"🎮",n:"Portal de juegos",u:""}
];
var KEY="poloportal-links",OLD="mipanel-links",links=load(),busy=false;
var st=document.getElementById("stage"),ring=document.getElementById("ring"),hub=document.getElementById("hub");
function safeUrl(u){try{var p=new URL(u);return /^https?:$/.test(p.protocol)?p.href:""}catch(e){return ""}}
function load(){try{var s=localStorage.getItem(KEY)||localStorage.getItem(OLD);if(s){var a=JSON.parse(s);if(Array.isArray(a)&&a.length)return a.slice(0,60).map(function(x){return{e:String(x.e||"⭐").slice(0,4),n:String(x.n||"").slice(0,60),u:safeUrl(x.u)}})}}catch(e){}return DEF.map(function(x){return Object.assign({},x)})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(links))}catch(e){}}
function render(){
  busy=false;document.body.classList.remove("go");
  st.querySelectorAll(".b").forEach(function(b){b.remove()});
  var W=innerWidth,H=innerHeight,s=Math.min(W,H*.82),R=s*.36,n=links.length,cx=W/2,cy=H/2;
  var size=Math.round(Math.min(84,Math.max(46,2*Math.PI*R/n*.78)));
  ring.style.cssText="width:"+2*R+"px;height:"+2*R+"px;left:"+(cx-R)+"px;top:"+(cy-R)+"px";
  hub.style.left=cx+"px";hub.style.top=cy+"px";
  links.forEach(function(l,i){
    var a=i/n*2*Math.PI-Math.PI/2,b=document.createElement("button");
    b.className="b";b.setAttribute("aria-label",l.n);
    b.style.cssText="width:"+size+"px;height:"+size+"px;left:"+(cx+R*Math.cos(a)-size/2)+"px;top:"+(cy+R*Math.sin(a)-size/2)+"px;background:hsl("+Math.round(i/n*340+8)+" 62% 48%);font-size:"+Math.round(size*.42)+"px";
    b.innerHTML=esc(l.e)+"<i>"+esc(l.n)+"</i>";
    b.onclick=function(){go(b,l)};
    st.appendChild(b);
  });
}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function go(el,l){
  if(busy)return;
  if(!l.u){edit();return}
  busy=true;document.body.classList.add("go");el.classList.add("sel");
  var r=el.getBoundingClientRect(),dx=innerWidth/2-(r.left+r.width/2),dy=innerHeight/2-(r.top+r.height/2);
  el.style.transform="translate("+dx+"px,"+dy+"px) scale(1.35)";
  setTimeout(function(){
    var k=2.2*Math.hypot(innerWidth,innerHeight)/r.width;
    el.style.transition="transform .7s cubic-bezier(.7,0,.3,1)";
    el.style.transform="translate("+dx+"px,"+dy+"px) scale("+k+")";
  },680);
  setTimeout(function(){location.href=l.u},1420);
}
addEventListener("pageshow",function(e){if(e.persisted||busy)render()});
addEventListener("resize",function(){if(!busy)render()});
function tick(){var d=new Date(),h=d.getHours();
  document.getElementById("clk").textContent=("0"+h).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
  document.getElementById("hi").textContent=h<12?"Buenos días":h<19?"Buenas tardes":"Buenas noches"}
tick();setInterval(tick,20000);
var dlg=document.getElementById("dlg"),rows=document.getElementById("rows");
function row(l){var d=document.createElement("div");d.className="r";
  d.innerHTML='<input class="e" maxlength="4" aria-label="Emoji" value="'+esc(l.e)+'"><input class="n" placeholder="Nombre" value="'+esc(l.n)+'"><button aria-label="Borrar">✕</button><input class="u" type="url" placeholder="https://…" value="'+esc(l.u)+'">';
  d.querySelector("button").onclick=function(){d.remove()};rows.appendChild(d)}
function edit(){rows.innerHTML="";links.forEach(row);dlg.showModal()}
document.getElementById("gear").onclick=edit;
document.getElementById("add").onclick=function(){row({e:"⭐",n:"",u:""});rows.lastChild.scrollIntoView()};
document.getElementById("rst").onclick=function(){rows.innerHTML="";DEF.forEach(row)};
document.getElementById("save").onclick=function(){
  var a=[];rows.querySelectorAll(".r").forEach(function(d){
    var u=d.querySelector(".u").value.trim();if(u&&!/^[a-z][a-z0-9+.-]*:/i.test(u))u="https://"+u;u=safeUrl(u);
    var n=d.querySelector(".n").value.trim();if(n||u)a.push({e:d.querySelector(".e").value||"⭐",n:n||"Sin nombre",u:u})});
  links=a.length?a:DEF.map(function(x){return Object.assign({},x)});persist();dlg.close();render()};
render();
if("serviceWorker" in navigator)addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});

