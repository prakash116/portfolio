import{r as o,n as G,o as O,W,a3 as q,x as H,Y as U,O as V,a4 as J,j as e,_,H as L,v as K,A as Q,D as A,m as n,a5 as I,a6 as X,a7 as Y,e as Z,a8 as ee,a9 as te,aa as P,ab as z}from"./index-B5-CZELE.js";import{q as se,i as ae,j as re,c as oe,k as ie,S as ne,T as ce,a as le}from"./index-BPQ4qm5A.js";const p=[{id:1,name:"JavaScript",icon:e.jsx(se,{size:36}),description:"Versatile scripting language for web development — both client-side and server-side.",codeExample:`// Arrow function with array methods
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);

console.log(squared); // [1, 4, 9, 16, 25]`,proficiency:95,useCases:["Web interactivity","Server-side programming","Mobile app development"],projectIdeas:["Interactive web games","Form validation scripts","Dynamic content loaders"],color:"#F7DF1E",docsLink:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",githubLink:"https://github.com/tc39/ecma262"},{id:2,name:"React",icon:e.jsx(ae,{size:36}),description:"Declarative component-based UI library for building interactive interfaces.",codeExample:`// Functional component with hooks
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,proficiency:95,useCases:["Single page apps","Interactive dashboards","Progressive web apps"],projectIdeas:["Task management app","Real-time chat interface","Data visualisation dashboard"],color:"#61DAFB",docsLink:"https://react.dev/",githubLink:"https://github.com/facebook/react"},{id:3,name:"Node.js",icon:e.jsx(re,{size:36}),description:"JavaScript runtime built on Chrome's V8 engine for server-side applications.",codeExample:`// Read a file asynchronously
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFile();`,proficiency:90,useCases:["Backend services","CLI tools","Web servers"],projectIdeas:["API gateway","Web scraper","Automation scripts"],color:"#68A063",docsLink:"https://nodejs.org/api/documentation.html",githubLink:"https://github.com/nodejs/node"},{id:4,name:"Express.js",icon:e.jsx(oe,{size:36}),description:"Fast, unopinionated web framework for Node.js — the standard for REST APIs.",codeExample:`// Basic Express server
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, () =>
  console.log('Server running on port 3000')
);`,proficiency:90,useCases:["REST APIs","Server-side rendering","Middleware systems"],projectIdeas:["Authentication service","File upload API","Payment gateway integration"],color:"#a0a0a0",docsLink:"https://expressjs.com/",githubLink:"https://github.com/expressjs/express"},{id:5,name:"MongoDB",icon:e.jsx(ie,{size:36}),description:"NoSQL document database with flexible schemas for modern applications.",codeExample:`// Create & query documents
await db.users.insertOne({
  name: "Prakash Mani",
  email: "p@example.com",
  skills: ["React", "Node.js"],
});

const devs = await db.users
  .find({ skills: "React" })
  .sort({ name: 1 })
  .toArray();`,proficiency:85,useCases:["User profiles","Product catalogs","Content management"],projectIdeas:["Blog with comments","E-commerce database","Real-time analytics"],color:"#4DB33D",docsLink:"https://docs.mongodb.com/",githubLink:"https://github.com/mongodb/mongo"},{id:6,name:"Next.js",icon:e.jsx(ne,{size:36}),description:"React framework for production — SSR, SSG, file-based routing, and API routes in one package.",codeExample:`// App Router page with Server Component
export default async function Page({ params }) {
  const data = await fetch(
    \`https://api.example.com/posts/\${params.id}\`,
    { next: { revalidate: 60 } }
  ).then(r => r.json());

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </article>
  );
}`,proficiency:88,useCases:["Server-side rendering","Static site generation","Full-stack apps"],projectIdeas:["Blog with MDX","E-commerce storefront","SaaS dashboard"],color:"#ffffff",docsLink:"https://nextjs.org/docs",githubLink:"https://github.com/vercel/next.js"},{id:7,name:"React Native",icon:e.jsx(ce,{size:36}),description:"Build native iOS & Android apps using React — one codebase, truly native performance.",codeExample:`// React Native screen with hooks
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity onPress={() => setCount(c => c + 1)}>
        <Text style={styles.btn}>Tap me</Text>
      </TouchableOpacity>
    </View>
  );
}`,proficiency:82,useCases:["Cross-platform mobile apps","Native device APIs","Offline-capable apps"],projectIdeas:["Food delivery app","Fitness tracker","Real-time chat app"],color:"#61DAFB",docsLink:"https://reactnative.dev/docs/getting-started",githubLink:"https://github.com/facebook/react-native"},{id:8,name:"TypeScript",icon:e.jsx(le,{size:36}),description:"Typed superset of JavaScript that compiles to plain JS — catch bugs at compile time, not runtime.",codeExample:`// Typed API response with generics
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`,proficiency:85,useCases:["Large codebases","Team collaboration","Auto-completion & refactoring"],projectIdeas:["Type-safe REST client","CLI tool","Typed React component library"],color:"#3178C6",docsLink:"https://www.typescriptlang.org/docs/",githubLink:"https://github.com/microsoft/TypeScript"}],me=()=>{const[d,u]=o.useState(0),[y,b]=o.useState(1),[m,F]=o.useState(!1),i=o.useRef(null),D=o.useRef(null),j=o.useRef(null),h=o.useRef(null);o.useEffect(()=>{if(!i.current)return;const s=i.current.clientWidth||window.innerWidth,r=i.current.clientHeight||window.innerHeight,x=new G,f=new O(75,s/r,.1,1e3);f.position.z=10;const c=new W({alpha:!0,antialias:!1,powerPreference:"high-performance"});c.setSize(s,r),c.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.current.appendChild(c.domElement),D.current=c;const w=[new q(.5,.15,8,16),new H(.8,.8,.8),new U(.5,12,12),new V(.6),new J(.5,1,12)],k=p.map((a,l)=>{const B=new _({color:new L(a.color),emissive:new L(a.color).multiplyScalar(.5),transparent:!0,opacity:.9}),g=new K(w[l%w.length],B),E=l/p.length*Math.PI*2;return g.position.set(Math.cos(E)*5,Math.sin(E)*3,(Math.random()-.5)*5),g.userData={vx:(Math.random()-.5)*.012,vy:(Math.random()-.5)*.012,rs:(Math.random()-.5)*.012},x.add(g),g});x.add(new Q(16777215,1.2));const C=new A(16777215,1.5);C.position.set(2,2,2),x.add(C);const S=new A(8965375,.8);S.position.set(-2,-1,1),x.add(S);const T=()=>{j.current=requestAnimationFrame(T),k.forEach(a=>{a.position.x+=a.userData.vx,a.position.y+=a.userData.vy,Math.abs(a.position.x)>8&&(a.userData.vx*=-1),Math.abs(a.position.y)>5&&(a.userData.vy*=-1),a.rotation.x+=a.userData.rs,a.rotation.y+=a.userData.rs}),c.render(x,f)};T();const R=()=>{if(!i.current)return;const a=i.current.clientWidth,l=i.current.clientHeight;f.aspect=a/l,f.updateProjectionMatrix(),c.setSize(a,l)};return window.addEventListener("resize",R),()=>{var a;cancelAnimationFrame(j.current),window.removeEventListener("resize",R),w.forEach(l=>l.dispose()),k.forEach(l=>l.material.dispose()),(a=i.current)!=null&&a.contains(c.domElement)&&i.current.removeChild(c.domElement),c.dispose()}},[]),o.useEffect(()=>(h.current=setTimeout(()=>{b(1),u(s=>(s+1)%p.length)},6e3),()=>clearTimeout(h.current)),[d]);const v=o.useCallback(()=>{clearTimeout(h.current),b(1),u(s=>(s+1)%p.length)},[]),N=o.useCallback(()=>{clearTimeout(h.current),b(-1),u(s=>(s-1+p.length)%p.length)},[]),M=o.useCallback(s=>{clearTimeout(h.current),b(s>d?1:-1),u(s)},[d]),$={enter:s=>({x:s>0?380:-380,opacity:0,scale:.96}),center:{x:0,opacity:1,scale:1,transition:{type:"spring",stiffness:280,damping:28}},exit:s=>({x:s<0?380:-380,opacity:0,scale:.96})},t=p[d];return e.jsxs("section",{className:"relative w-full overflow-hidden bg-gradient-to-b from-[#0d0d1a] to-[#080810] py-16 px-4 md:px-8",children:[e.jsx("div",{ref:i,className:"absolute inset-0 z-0 opacity-40"}),e.jsx("div",{className:"absolute inset-0 z-[1] bg-gradient-to-b from-[#0d0d1a]/10 via-transparent to-[#080810]/60"}),e.jsxs("div",{className:"relative z-10 max-w-6xl mx-auto",children:[e.jsxs(n.div,{initial:{opacity:0,y:-12},animate:{opacity:1,y:0},transition:{duration:.4},className:"text-center mb-10",children:[e.jsx("span",{className:"inline-block px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-3",children:"Expertise"}),e.jsx("h2",{className:"text-3xl md:text-4xl font-extrabold text-white",children:"My Tech Arsenal"}),e.jsx("p",{className:"text-white/35 text-base mt-1.5",children:"Technologies I build production apps with"})]}),e.jsxs("div",{className:"relative min-h-[440px] md:min-h-[460px]",children:[e.jsx(I,{custom:y,initial:!1,children:e.jsxs(n.div,{custom:y,variants:$,initial:"enter",animate:"center",exit:"exit",className:"absolute inset-0 flex flex-col md:flex-row rounded-2xl overflow-hidden backdrop-blur-sm",style:{background:"linear-gradient(135deg, rgba(13,13,26,0.92) 0%, rgba(10,10,20,0.95) 100%)",border:`1px solid ${t.color}28`,boxShadow:`0 0 50px ${t.color}12, inset 0 1px 0 rgba(255,255,255,0.04)`},children:[e.jsxs("div",{className:"flex-1 p-6 md:p-8 flex flex-col min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-5",children:[e.jsxs("div",{className:"relative flex-shrink-0",children:[e.jsx("div",{className:"absolute inset-0 rounded-2xl blur-xl opacity-50",style:{backgroundColor:t.color}}),e.jsx("div",{className:"relative w-14 h-14 rounded-2xl flex items-center justify-center",style:{background:`${t.color}18`,border:`1px solid ${t.color}35`},children:e.jsx("span",{style:{color:t.color},children:t.icon})})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-extrabold text-white leading-none mb-0.5",children:t.name}),e.jsx("span",{className:"text-xs font-bold tracking-widest uppercase",style:{color:t.color},children:"Core Technology"})]})]}),e.jsx("p",{className:"text-white/50 text-base leading-relaxed mb-5",children:t.description}),e.jsxs("div",{className:"mb-5",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-xs font-semibold text-white/35 uppercase tracking-widest",children:"Proficiency"}),e.jsxs("span",{className:"text-base font-bold text-white",children:[t.proficiency,"%"]})]}),e.jsx("div",{className:"w-full h-1.5 rounded-full overflow-hidden",style:{background:"rgba(255,255,255,0.06)"},children:e.jsx(n.div,{className:"h-full rounded-full",initial:{width:0},animate:{width:`${t.proficiency}%`},transition:{duration:.9,ease:"easeOut"},style:{background:`linear-gradient(90deg, ${t.color}70, ${t.color})`,boxShadow:`0 0 10px ${t.color}60`}})})]}),e.jsxs("div",{className:"mb-auto",children:[e.jsx("h3",{className:"text-xs font-semibold text-white/30 uppercase tracking-widest mb-2.5",children:"Use Cases"}),e.jsx("ul",{className:"space-y-2",children:t.useCases.map((s,r)=>e.jsxs(n.li,{initial:{opacity:0,x:-8},animate:{opacity:1,x:0},transition:{delay:.1+r*.07},className:"flex items-center gap-2.5 text-base text-white/60",children:[e.jsx(X,{className:"w-3 h-3 flex-shrink-0",style:{color:t.color}}),s]},r))})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-white/[0.05]",children:[e.jsxs("a",{href:t.docsLink,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/55 hover:text-white border border-white/[0.07] transition-all font-medium",children:[e.jsx(Y,{className:"w-3 h-3"})," Docs"]}),e.jsxs("a",{href:t.githubLink,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/55 hover:text-white border border-white/[0.07] transition-all font-medium",children:[e.jsx(Z,{className:"w-3 h-3"})," GitHub"]}),e.jsxs(n.button,{whileTap:{scale:.96},onClick:()=>F(s=>!s),className:"ml-auto flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all font-semibold",style:{background:m?`${t.color}18`:"rgba(255,255,255,0.04)",borderColor:m?`${t.color}45`:"rgba(255,255,255,0.07)",color:m?t.color:"rgba(255,255,255,0.45)"},children:[e.jsx(ee,{className:"w-3 h-3"}),m?"Hide Code":"View Code"]})]})]}),e.jsx("div",{className:"hidden md:block w-px self-stretch my-5",style:{background:`linear-gradient(to bottom, transparent, ${t.color}25, transparent)`}}),e.jsx("div",{className:"flex-1 p-6 md:p-8 bg-black/15 min-w-0 overflow-auto",children:e.jsx(I,{mode:"wait",children:m?e.jsxs(n.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.18},children:[e.jsxs("div",{className:"flex items-center gap-1.5 mb-3",children:[e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-red-500/50"}),e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-yellow-500/50"}),e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-green-500/50"}),e.jsxs("span",{className:"ml-2 text-xs text-white/20 font-mono",children:["example.",t.name.toLowerCase().replace(/[\s.]/g,"")]})]}),e.jsx("pre",{className:"rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-white/[0.05]",style:{background:"rgba(5,5,15,0.7)"},children:e.jsx("code",{className:"text-emerald-300/80",children:t.codeExample})})]},"code"):e.jsxs(n.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.18},className:"h-full flex flex-col",children:[e.jsxs("div",{className:"flex flex-col items-center pt-2 mb-5",children:[e.jsx(n.div,{style:{color:t.color},animate:{scale:[1,1.1,1],rotate:[0,4,-4,0]},transition:{repeat:1/0,duration:5,ease:"easeInOut"},className:"mb-2",children:e.jsx("span",{style:{fontSize:52},children:t.icon})}),e.jsx("h3",{className:"text-lg font-bold text-white mb-0.5",children:"Project Ideas"}),e.jsx("p",{className:"text-xs text-white/30",children:'Click "View Code" for code examples'})]}),e.jsx("div",{className:"space-y-2.5",children:t.projectIdeas.map((s,r)=>e.jsxs(n.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},transition:{delay:r*.07},className:"flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.05] hover:border-white/[0.12] transition-colors group cursor-default",style:{background:"rgba(255,255,255,0.025)"},children:[e.jsx(te,{className:"w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform",style:{color:t.color}}),e.jsx("span",{className:"text-base text-white/60 group-hover:text-white/85 transition-colors",children:s})]},r))})]},"explore")})})]},d)}),e.jsx("button",{onClick:N,className:"absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center text-white/40 hover:text-white border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-sm transition-all z-20",children:e.jsx(P,{className:"w-3.5 h-3.5"})}),e.jsx("button",{onClick:v,className:"absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center text-white/40 hover:text-white border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-sm transition-all z-20",children:e.jsx(z,{className:"w-3.5 h-3.5"})}),e.jsx("button",{onClick:N,className:"absolute left-3 top-1/2 -translate-y-1/2 flex md:hidden w-8 h-8 rounded-full items-center justify-center text-white/40 bg-black/40 border border-white/[0.07] z-20",children:e.jsx(P,{className:"w-3 h-3"})}),e.jsx("button",{onClick:v,className:"absolute right-3 top-1/2 -translate-y-1/2 flex md:hidden w-8 h-8 rounded-full items-center justify-center text-white/40 bg-black/40 border border-white/[0.07] z-20",children:e.jsx(z,{className:"w-3 h-3"})})]}),e.jsx("div",{className:"flex justify-center items-center gap-2 mt-6",children:p.map((s,r)=>e.jsx(n.button,{onClick:()=>M(r),"aria-label":`Go to ${s.name}`,whileHover:{scale:1.25},whileTap:{scale:.8},className:"rounded-full transition-all duration-300",style:{width:r===d?28:8,height:8,backgroundColor:r===d?t.color:"rgba(255,255,255,0.18)",boxShadow:r===d?`0 0 10px ${t.color}70`:"none"}},s.id))})]})]})};export{me as C};
