import{r as v,w as L,z as b,a as g,e as k,o as s,f as r,F as h,E as p,A as y,u as m,N as w,k as l,i as x,H as C,h as $,b as B,p as D}from"./entry.8152d56b.js";import{_ as N}from"./_plugin-vue_export-helper.c27b6911.js";const R={class:"py-4 sm:py-8 text-center"},T={key:0},A={key:1},I=["src","alt"],S=l("br",null,null,-1),O={__name:"MonsterCard",props:{card:{type:Object,required:!0},animation:{type:String,required:!1}},emits:["animationDone"],setup(n,{emit:c}){const i=n,t="/horumon_gosh/",a=v(null),e=v([]),o=()=>{c("animationDone"),_()},_=()=>{a.value.removeEventListener("webkitAnimationEnd",o),a.value.removeEventListener("animationend",o),a.value.removeEventListener("oanimationend",o)},f=()=>{a.value.addEventListener("webkitAnimationEnd",o),a.value.addEventListener("animationend",o),a.value.addEventListener("oanimationend",o)};L(()=>i.animation,d=>{d?(e.value.push("animate__bounceOut"),d==="capture-failed"?setTimeout(()=>{e.value.splice(0,1,"animate__bounceIn"),b(f)},Math.floor(Math.random()*3e3)+3e3):setTimeout(()=>{c("animationDone")},5e3)):e.value.splice(0,e.value.length)});const E=g(()=>i.card.cardImage?`${t}horumon/${i.card.cardImage}`:new URL(""+new URL("default_horumon.5ace48ab.png",import.meta.url).href,self.location).href);return k(_),(d,j)=>(s(),r("div",R,[n.card.cardLevel===5?(s(),r("div",T,[(s(!0),r(h,null,p(n.card.cardLevel,u=>(s(),r("span",{key:u.index,style:y({color:m(w)[u-1]})},"★",4))),128))])):(s(),r("div",A,[(s(!0),r(h,null,p(n.card.cardLevel,u=>(s(),r("span",{key:u.index},"★"))),128))])),l("img",{class:x(["mx-auto animate__animated",m(e)]),src:m(E),alt:n.card.cardName,ref_key:"monsterRef",ref:a},null,10,I),l("div",null,C(n.card.cardName),1),S,$(d.$slots,"default")]))}};const M={class:"relative w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 pointer-events-none"},z={class:"absolute w-screen h-10 left-1/2 top-0 -translate-x-1/2 flex justify-center"},U={class:"perspective w-10 h-10 relative"},W={__name:"BallThrowing",props:{delay:{type:Number,default:100},color:{type:String,default:"#dc2626"}},emits:["animationDone"],setup(n,{emit:c}){const i=n,t=v(null),a=v(!1),e=()=>{c("animationDone"),o()},o=()=>{t.value.removeEventListener("webkitAnimationEnd",e),t.value.removeEventListener("animationend",e),t.value.removeEventListener("oanimationend",e)};return B(()=>{setTimeout(()=>{a.value=!0,b(()=>{t.value.addEventListener("webkitAnimationEnd",e),t.value.addEventListener("animationend",e),t.value.addEventListener("oanimationend",e)})},i.delay)}),k(o),(_,f)=>(s(),r("div",M,[l("div",z,[l("div",U,[m(a)?(s(),r("div",{key:0,class:"absolute w-10 h-10 rounded-full ball",style:y({"background-color":n.color}),ref_key:"ballRef",ref:t},null,4)):D("",!0)])])]))}},V=N(W,[["__scopeId","data-v-eabe2994"]]);export{O as _,V as a};