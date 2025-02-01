var ka=Object.defineProperty;var Da=(t,a,l)=>a in t?ka(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;var U=(t,a,l)=>Da(t,typeof a!="symbol"?a+"":a,l);import{a as z,t as j}from"../chunks/CJyYlKNc.js";import{h as _a,i as ia,t as H,j as la,k as i,n as r,o as e,q as s,D as fa,C as na,u as Na,l as k,m as P,ap as Ta}from"../chunks/CdacCZTE.js";import{b as L,a as ga,p as Q}from"../chunks/BtJpnK8n.js";import{s as D,e as Aa,d as Ca}from"../chunks/Cp7KXPpH.js";import{i as X}from"../chunks/BqY8ZO7V.js";import{o as oa}from"../chunks/03ghFZSj.js";import{C as $,b as Y,r as Z,P as Ia}from"../chunks/iDyR8z4Q.js";function ya(t){var a,l,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t)){var d=t.length;for(a=0;a<d;a++)t[a]&&(l=ya(t[a]))&&(n&&(n+=" "),n+=l)}else for(l in t)t[l]&&(n&&(n+=" "),n+=l);return n}function Fa(){for(var t,a,l=0,n="",d=arguments.length;l<d;l++)(t=arguments[l])&&(a=ya(t))&&(n&&(n+=" "),n+=a);return n}function Sa(t){return typeof t=="object"?Fa(t):t??""}function za(t,a,l){var n=t.__className,d=Pa(a,l);_a&&t.className===d?t.__className=d:(n!==d||_a&&t.className!==d)&&(t.className=d,t.__className=d)}function Pa(t,a){return(t??"")+(" "+a)}var ja=j('<h2><span>Genauer Wert: <span class="important"> </span></span></h2>'),Ga=j('<h2><span>Geschätzter Wert: <span class="important"> </span></span></h2>'),Wa=j('<h2><span>Abweichung Absolut: <span class="important"> </span></span></h2> <h2><span>Abweichung Prozentual: <span class="important"> </span></span></h2>',1),qa=j("<span>-</span>"),Ba=j('<div class="panel"><h1>F2 Vergleich</h1> <!> <!> <!> <details><summary>Graph</summary> <canvas></canvas></details></div>');function Va(t,a){ia(a,!0);var l;let n=[],d=na(()=>a.accurate_f2-a.predicted_f2),c=na(()=>i(d)/a.accurate_f2*100),b=na(()=>isNaN(i(c))||i(c)===void 0||i(c)===null);oa(()=>{let p=new $(l,{type:"line",data:{labels:Array.from({length:100},(f,g)=>g+1),datasets:[{data:[{x:0,y:0}],label:"Abweichung Prozentual"}]},options:{animation:!1,scales:{x:{type:"linear",position:"bottom",ticks:{display:!0},grid:{display:!1,drawTicks:!1}},y:{type:"linear",suggestedMax:1,suggestedMin:-1}},elements:{point:{radius:0}}}}),h=new Date().getTime()/1e3;function _(){if(i(c)!==void 0&&isNaN(i(c))===!1&&i(b)===!1){let g=new Date().getTime()/1e3-h;n.push({x:g,y:i(c)}),n=n.filter(V=>V.x>g-10),p.data.datasets[0].data=n,p.update()}}setInterval(()=>{_()},100)});var x=Ba(),M=r(e(x),2);{var u=p=>{var h=ja(),_=e(h),f=r(e(_)),g=e(f,!0);s(f),s(_),s(h),H(()=>D(g,a.accurate_f2)),z(p,h)};X(M,p=>{a.accurate_f2&&p(u)})}var N=r(M,2);{var I=p=>{var h=Ga(),_=e(h),f=r(e(_)),g=e(f,!0);s(f),s(_),s(h),H(()=>D(g,a.predicted_f2)),z(p,h)};X(N,p=>{a.predicted_f2&&p(I)})}var F=r(N,2);{var W=p=>{var h=Wa(),_=fa(h),f=e(_),g=r(e(f)),V=e(g,!0);s(g),s(f),s(_);var S=r(_,2),J=e(S),o=r(e(J)),m=e(o);s(o),s(J),s(S),H(w=>{D(V,i(d)),D(m,`${w??""}%`)},[()=>i(c).toFixed(2)]),z(p,h)},q=p=>{var h=qa();z(p,h)};X(F,p=>{i(d)!==void 0&&isNaN(i(c))===!1?p(W):p(q,!1)})}var B=r(F,2),T=r(e(B),2);L(T,p=>l=p,()=>l),s(B),s(x),H(()=>za(T,Sa(i(b)?"hidden":""),"svelte-2e2o1w")),z(t,x),la()}var Ea=j('<div class="panel"><h1>Datenquelle</h1> <h2> </h2> <div class="row svelte-g771hu"><label>Datenpunkte pro Sekunde:</label> <input type="range" min="1" max="10000" class="svelte-g771hu"> <span> </span></div> <div class="row svelte-g771hu"><button>Clear Data</button></div> <details><summary>Datenstrom</summary> <div><canvas></canvas></div></details> <details><summary>Verteilung</summary> <div><canvas></canvas></div></details> <details><summary>Bias</summary> <div class="row svelte-g771hu"><label>Nach:</label> <input type="range" min="0" max="1" step="0.01" class="svelte-g771hu"> <span> </span></div> <div class="row svelte-g771hu"><label>Wie stark:</label> <input type="range" min="0" max="0.8" step="0.01" class="svelte-g771hu"> <span> </span></div></details> <details><summary>Berechnete F2</summary> <h2><span>F2: <span class="important"> </span></span></h2></details></div>');function Ra(t,a){ia(a,!0);let l=ga(a,"prediction",15);var n,d;let c=null,b=P(1),x=P(0),M=P(0),u=[],N=new Array(100).fill(0),I=P(.5),F=P(0);function W(v=0,C=0){let G=Math.floor(Math.random()*100),sa=v*100,ra=G*(1-C)+sa*C;return Math.floor(ra)}function q(){u=[],N=new Array(100).fill(0)}oa(()=>{let v=new $(n,{type:"bar",data:{datasets:[{label:"Random Data",data:[{x:0,y:0}]}]},options:{animation:!1,scales:{x:{type:"linear",position:"bottom",ticks:{display:!0},grid:{display:!1,drawTicks:!1}}}}}),C=new $(d,{type:"bar",data:{labels:Array.from({length:100},(K,R)=>R+1),datasets:[{data:N,label:"Distribution"}]},options:{animation:!1,scales:{x:{type:"linear",position:"bottom",ticks:{display:!0},grid:{display:!1,drawTicks:!1}}}}}),G=new Date().getTime()/1e3;function sa(){let K=new Date().getTime()/1e3-G,R=W(i(I),i(F));k(x,Q(R)),a.data(i(x)),N[R]+=1,k(M,Q(B(N))),l(i(M)),u.push({x:K,y:R}),u=u.filter(wa=>wa.x>K-5)}function ra(){let K=new Date().getTime()/1e3-G;v.data.datasets[0].data=u;let R=5;v.options.scales.x.min=Math.max(K-R,0),v.options.scales.x.max=Math.max(K,0),v.options.scales.y.min=0,v.options.scales.y.max=100,v.update(),C.data.datasets[0].data=N,C.update()}Na(()=>{c!=null&&clearInterval(c),c=setInterval(sa,1e3/i(b))}),setInterval(ra,100)});function B(v){let C=0;for(let G=0;G<v.length;G++)C+=Math.pow(v[G],2);return C}var T=Ea(),p=r(e(T),2),h=e(p,!0);s(p);var _=r(p,2),f=r(e(_),2);Z(f);var g=r(f,2),V=e(g);s(g),s(_);var S=r(_,2),J=e(S);s(S);var o=r(S,2),m=r(e(o),2),w=e(m);L(w,v=>n=v,()=>n),s(m),s(o);var y=r(o,2),A=r(e(y),2),E=e(A);L(E,v=>d=v,()=>d),s(A),s(y);var O=r(y,2),aa=r(e(O),2),ta=r(e(aa),2);Z(ta);var da=r(ta,2),ba=e(da,!0);s(da),s(aa);var pa=r(aa,2),ea=r(e(pa),2);Z(ea);var ca=r(ea,2),xa=e(ca);s(ca),s(pa),s(O);var va=r(O,2),ua=r(e(va),2),ha=e(ua),ma=r(e(ha)),Ma=e(ma,!0);return s(ma),s(ha),s(ua),s(va),s(T),H((v,C)=>{D(h,i(x)),D(V,`${i(b)??""}/s`),D(ba,v),D(xa,`${C??""}%`),D(Ma,l())},[()=>Math.floor(i(I)*100),()=>Math.round(i(F)*100)]),Y(f,()=>i(b),v=>k(b,v)),Aa("click",J,q),Y(ta,()=>i(I),v=>k(I,v)),Y(ea,()=>i(F),v=>k(F,v)),z(t,T),la({clear_data:q})}class Ua{constructor(){U(this,"p3");U(this,"p2");U(this,"p1");U(this,"p0");U(this,"bp");U(this,"counter",0)}async init(){this.bp=251,this.p3=Math.floor(Math.random()*this.bp),this.p2=Math.floor(Math.random()*this.bp),this.p1=Math.floor(Math.random()*this.bp),this.p0=Math.floor(Math.random()*this.bp)}hash(a){return(this.p3*Math.pow(a,3)+this.p2*Math.pow(a,2)+this.p1*a+this.p0)%this.bp%2==0?1:-1}predict(a){let l=this.hash(a);return this.counter+=l,Math.pow(this.counter,2)}clear(){this.p3=Math.floor(Math.random()*this.bp),this.p2=Math.floor(Math.random()*this.bp),this.p1=Math.floor(Math.random()*this.bp),this.p0=Math.floor(Math.random()*this.bp),this.counter=0}}var Ha=j('<h2><span>Schätzung F2: <span class="important"> </span></span></h2>'),Ja=j('<div class="panel"><h1>F2 Schätzer</h1> <!> <br> <div class="panel"><input type="number" class="svelte-1vapt35"> <button class="svelte-1vapt35">Update</button> <br> <div class="status svelte-1vapt35"><span> </span> <br> <!></div> <details><summary>Änderungsrate</summary> <canvas></canvas></details></div></div>');function Ka(t,a){ia(a,!0);let l,n=P(1),d=ga(a,"prediction",15),c=[],b=P("");async function x(){if(k(b,`Initalisiere ${i(n)} Schätzer...`),await Ta(),i(n)>c.length)for(let o=c.length;o<i(n);o++){let m=new Ua;await m.init(),c.push(m)}else c=c.slice(0,i(n));k(b,`Initialisierung von ${i(n)} Schätzern abgeschlossen.`);for(const o of c)o.clear();a.updated()}let M=[],u=0;function N(o,m){let w=[];for(let y=0;y<o.length-m;y++){let A=0;for(let E=0;E<m;E++)A+=o[y+E].y;w.push({x:o[y].x,y:A/m})}return w}let I=new Date().getTime()/1e3;const F=o=>{let m=0;for(const O of c)m+=O.predict(o);u=d(),d(Math.round(m/c.length));let y=new Date().getTime()/1e3-I,E=(d()-u)/d();M.push({x:y,y:E})};oa(()=>{let o=new $(l,{type:"line",data:{datasets:[{data:[{x:0,y:0}],label:"Änderungsrate"}]},options:{animation:!1,scales:{x:{type:"linear",position:"bottom",ticks:{display:!0},grid:{display:!1,drawTicks:!1}},y:{type:"linear",suggestedMax:1e-4,suggestedMin:0}},elements:{point:{radius:0}}}});function m(){let y=new Date().getTime()/1e3-I;M=M.filter(A=>A.x>y-10),o.data.datasets[0].data=N(M,100),o.update()}setInterval(m,100)});var W=Ja(),q=r(e(W),2);Ia(q,{get estimator_count(){return i(n)},set estimator_count(o){k(n,Q(o))}});var B=r(q,4),T=e(B);Z(T);var p=r(T,2);p.__click=x;var h=r(p,4),_=e(h),f=e(_,!0);s(_);var g=r(_,4);{var V=o=>{var m=Ha(),w=e(m),y=r(e(w)),A=e(y,!0);s(y),s(w),s(m),H(()=>D(A,d())),z(o,m)};X(g,o=>{d()&&o(V)})}s(h);var S=r(h,2),J=r(e(S),2);return L(J,o=>l=o,()=>l),s(S),s(B),s(W),H(()=>D(f,i(b))),Y(T,()=>i(n),o=>k(n,o)),z(t,W),la({handle_data:F})}Ca(["click"]);var La=j("<!> <!> <!>",1);function et(t){let a,l,n=P(0),d=P(0);var c=La(),b=fa(c);L(Ra(b,{data:u=>{a.handle_data(u)},get prediction(){return i(n)},set prediction(u){k(n,Q(u))}}),u=>l=u,()=>l);var x=r(b,2);L(Ka(x,{updated:()=>{l.clear_data()},get prediction(){return i(d)},set prediction(u){k(d,Q(u))}}),u=>a=u,()=>a);var M=r(x,2);Va(M,{get accurate_f2(){return i(n)},get predicted_f2(){return i(d)}}),z(t,c)}export{et as component};
