function y(){}const B=t=>t;function E(t,n){for(const e in n)t[e]=n[e];return t}function j(t){return t()}function C(){return Object.create(null)}function v(t){t.forEach(j)}function q(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let i;function P(t,n){return t===n?!0:(i||(i=document.createElement("a")),i.href=n,t===i.href)}function S(t){return Object.keys(t).length===0}function m(t,...n){if(t==null){for(const r of n)r(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function U(t){let n;return m(t,e=>n=e)(),n}function D(t,n,e){t.$$.on_destroy.push(m(n,e))}function G(t,n,e,r){if(t){const c=k(t,n,e,r);return t[0](c)}}function k(t,n,e,r){return t[1]&&r?E(e.ctx.slice(),t[1](r(n))):e.ctx}function H(t,n,e,r){if(t[2]&&r){const c=t[2](r(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const l=[],d=Math.max(n.dirty.length,c.length);for(let s=0;s<d;s+=1)l[s]=n.dirty[s]|c[s];return l}return n.dirty|c}return n.dirty}function I(t,n,e,r,c,l){if(c){const d=k(n,e,r,l);t.p(d,c)}}function J(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function K(t){return t&&q(t.destroy)?t.destroy:y}let f;function _(t){f=t}function x(){if(!f)throw new Error("Function called outside component initialization");return f}function L(t){x().$$.on_mount.push(t)}function N(t){x().$$.after_update.push(t)}function Q(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(r=>r.call(this,n))}const a=[],g=[];let u=[];const p=[],w=Promise.resolve();let b=!1;function O(){b||(b=!0,w.then(M))}function R(){return O(),w}function z(t){u.push(t)}function T(t){p.push(t)}const h=new Set;let o=0;function M(){if(o!==0)return;const t=f;do{try{for(;o<a.length;){const n=a[o];o++,_(n),A(n.$$)}}catch(n){throw a.length=0,o=0,n}for(_(null),a.length=0,o=0;g.length;)g.pop()();for(let n=0;n<u.length;n+=1){const e=u[n];h.has(e)||(h.add(e),e())}u.length=0}while(a.length);for(;p.length;)p.pop()();b=!1,h.clear(),_(t)}function A(t){if(t.fragment!==null){t.update(),v(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(z)}}function V(t){const n=[],e=[];u.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),u=n}export{j as A,a as B,O as C,N as a,g as b,K as c,G as d,J as e,H as f,U as g,Q as h,q as i,D as j,T as k,P as l,z as m,y as n,L as o,B as p,C as q,v as r,F as s,R as t,I as u,M as v,S as w,V as x,f as y,_ as z};
