import{_ as x}from"./Grass.0a050bd0.js";import{_ as h}from"./nuxt-link.864d56f8.js";import{r as i,w as C,p as w,e as b,h as u,i as o,F as k,q as g,u as d,t as y,v as B,y as _,E as N,C as G,o as c,c as I,G as V}from"./entry.34a77091.js";import"./MonsterCard.6d557599.js";import"./_plugin-vue_export-helper.c27b6911.js";const j={class:"flex flex-wrap h-screen w-full justify-center items-center"},E={class:"w-full"},F={class:"flex justify-center w-full"},L={class:"w-full text-center mt-16"},A={__name:"battlemode",setup(T){const{plus:m}=N(),{lockCard:f,removeCard:r}=G(),t=i([]),a=i(0);C(a,e=>{e>2&&w("/battle")});const p=e=>{const l=t.value.findIndex(s=>s.cardId===e);t.value[l].hide=!0,a.value===0?r(e,!0):r(e),a.value++};return b(()=>{m(),t.value=f(3,{maxChance:.03,highChance:.15})}),(e,l)=>{const s=x,v=h;return c(),u("div",j,[o("div",E,[o("div",F,[(c(!0),u(k,null,g(d(t),n=>(c(),I(s,{key:n.cardId,class:_(["w-1/5 mx-4",[n.hide&&"invisible"]]),card:n,onGetCard:p},null,8,["class","card"]))),128))]),o("div",L,[y(v,{class:_(["inline-block px-4 py-2 bg-slate-400",[d(a)===0&&"invisible"]]),to:"/battle"},{default:B(()=>[V("不繼續取得")]),_:1},8,["class"])])])])}}};export{A as default};
