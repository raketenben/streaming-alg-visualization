import{ab as E,W as b,ac as P,L as O,aa as M,R as Y,ad as q,O as B,ae as T,a6 as C,af as $,ag as z,ah as L,c as w,s as A,a as F,g as p,ai as G,aj as J,ak as K,al as Q,am as U,an as X,a9 as Z,f as x,i as rr,h as R,j as tr,v as er}from"./CdacCZTE.js";import{b as ar}from"./CJyYlKNc.js";const nr=["touchstart","touchmove"];function sr(r){return nr.includes(r)}let D=!1;function ir(){D||(D=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var t;if(!r.defaultPrevented)for(const e of r.target.elements)(t=e.__on_r)==null||t.call(e)})},{capture:!0}))}function I(r){var t=P,e=O;E(null),b(null);try{return r()}finally{E(t),b(e)}}function lr(r,t,e,i=e){r.addEventListener(t,()=>I(e));const n=r.__on_r;n?r.__on_r=()=>{n(),i(!0)}:r.__on_r=()=>i(!0),ir()}const V=new Set,S=new Set;function or(r,t,e,i={}){function n(a){if(i.capture||g.call(t,a),!a.cancelBubble)return I(()=>e==null?void 0:e.call(this,a))}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?Y(()=>{t.addEventListener(r,n,i)}):t.addEventListener(r,n,i),n}function dr(r,t,e,i,n){var a={capture:i,passive:n},u=or(r,t,e,a);(t===document.body||t===window||t===document)&&M(()=>{t.removeEventListener(r,u,a)})}function _r(r){for(var t=0;t<r.length;t++)V.add(r[t]);for(var e of S)e(r)}function g(r){var k;var t=this,e=t.ownerDocument,i=r.type,n=((k=r.composedPath)==null?void 0:k.call(r))||[],a=n[0]||r.target,u=0,_=r.__root;if(_){var l=n.indexOf(_);if(l!==-1&&(t===document||t===window)){r.__root=t;return}var v=n.indexOf(t);if(v===-1)return;l<=v&&(u=l)}if(a=n[u]||r.target,a!==t){q(r,"currentTarget",{configurable:!0,get(){return a||e}});var m=P,f=O;E(null),b(null);try{for(var s,o=[];a!==null;){var c=a.assignedSlot||a.parentNode||a.host||null;try{var d=a["__"+i];if(d!==void 0&&!a.disabled)if(B(d)){var[j,...H]=d;j.apply(a,[r,...H])}else d.call(a,r)}catch(y){s?o.push(y):s=y}if(r.cancelBubble||c===t||c===null)break;a=c}if(s){for(let y of o)queueMicrotask(()=>{throw y});throw s}}finally{r.__root=t,delete r.currentTarget,E(m),b(f)}}}function vr(r,t){var e=t==null?"":typeof t=="object"?t+"":t;e!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=e,r.nodeValue=e==null?"":e+"")}function ur(r,t){return W(r,t)}function hr(r,t){T(),t.intro=t.intro??!1;const e=t.target,i=R,n=p;try{for(var a=C(e);a&&(a.nodeType!==8||a.data!==$);)a=z(a);if(!a)throw L;w(!0),A(a),F();const u=W(r,{...t,anchor:a});if(p===null||p.nodeType!==8||p.data!==G)throw J(),L;return w(!1),u}catch(u){if(u===L)return t.recover===!1&&K(),T(),Q(e),w(!1),ur(r,t);throw u}finally{w(i),A(n)}}const h=new Map;function W(r,{target:t,anchor:e,props:i={},events:n,context:a,intro:u=!0}){T();var _=new Set,l=f=>{for(var s=0;s<f.length;s++){var o=f[s];if(!_.has(o)){_.add(o);var c=sr(o);t.addEventListener(o,g,{passive:c});var d=h.get(o);d===void 0?(document.addEventListener(o,g,{passive:c}),h.set(o,1)):h.set(o,d+1)}}};l(U(V)),S.add(l);var v=void 0,m=X(()=>{var f=e??t.appendChild(Z());return x(()=>{if(a){rr({});var s=er;s.c=a}n&&(i.$$events=n),R&&ar(f,null),v=r(f,i)||{},R&&(O.nodes_end=p),a&&tr()}),()=>{var c;for(var s of _){t.removeEventListener(s,g);var o=h.get(s);--o===0?(document.removeEventListener(s,g),h.delete(s)):h.set(s,o)}S.delete(l),f!==e&&((c=f.parentNode)==null||c.removeChild(f))}});return N.set(v,m),v}let N=new WeakMap;function pr(r,t){const e=N.get(r);return e?(N.delete(r),e(t)):Promise.resolve()}export{ir as a,_r as d,dr as e,hr as h,lr as l,ur as m,vr as s,pr as u};
