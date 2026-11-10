'use strict';
/* Data layer: state, IndexedDB storage, analytics, backup. Rendering lives in ui.js. */
const $=s=>document.querySelector(s),E=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),p2=n=>String(n).padStart(2,'0'),uid=()=>crypto.randomUUID();
const iso=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
const NF=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2});
const NFd=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2});
const NF0=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
const M=m=>NF0.format(Math.round(m/100)).replace(/\u2212/g,'-'),pct=(a,b)=>b?Math.round((a-b)/b*1000)/10:null,DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const fd=d=>new Date(d+'T00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),ft=t=>new Date('1970-01-01T'+(t||'00:00')).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true});
const toMinor=v=>{const n=Math.round(parseFloat(String(v).replace(/,/g,''))*100);return n>0?n:0};
/* ---------- categories: every category has its own colour and icon ---------- */
const DEF=[['Food','utensils','#FF7A00','Groceries,Restaurants,Delivery,Coffee/Snacks'],['Transport','car','#1D6FEB','Fuel,Taxi/Ride-hailing,Public transport,Parking,Maintenance'],['Shopping','shopping-bag','#E91E8C','Clothing,Electronics,Household,Online shopping'],
 ['Bills & Utilities','zap','#00B8D9','Electricity,Internet,Mobile,Water,Gas'],['Entertainment','clapperboard','#8E44F0','Movies,Games,Events,Streaming'],['Health','heart-pulse','#E5383B','Medicines,Doctor,Fitness,Personal care'],
 ['Travel','plane','#22B35E','Flights,Hotels,Local transport,Activities'],['Education','graduation-cap','#F2C200','Courses,Books,Fees,Software'],['Subscriptions','repeat','#1E3A8A','Streaming,Software,Memberships'],
 ['Home','house','#A0652D','Rent,Furniture,Repairs,Supplies'],['Personal','sparkles','#0F9D8A','Gifts,Grooming,Miscellaneous'],['Income','banknote','#65A30D','Salary,Freelance,Interest,Refund,Other income']];
const PAL=[...DEF.map(d=>d[2]),'#C026D3','#FF8A7A','#6B7A1F','#5B6B7F','#E11D48','#0284C7','#7C3AED','#B45309'];
const ICONS=['utensils','coffee','pizza','shopping-bag','shopping-cart','shirt','car','bus','train-front','bike','fuel','plane','house','zap','droplets','flame','wifi','smartphone','receipt','tv','clapperboard','gamepad-2','music','popcorn','heart-pulse','pill','stethoscope','dumbbell','scissors','sparkles','gift','baby','paw-print','graduation-cap','book-open','briefcase','wrench','repeat','landmark','piggy-bank','wallet','banknote','trending-up','heart','hand-heart','tag'];
const IK=[[/food|eat|dining|restaurant|meal|grocer|snack/i,'utensils'],[/coffee|cafe|tea/i,'coffee'],[/car|taxi|fuel|petrol|transport|bus|metro|commute|auto/i,'car'],[/shop|cloth|fashion|mall/i,'shopping-bag'],[/bill|util|electric|water|gas/i,'zap'],[/movie|film|game|fun|entertain|music/i,'clapperboard'],
 [/health|medic|doctor|pharm|gym|fitness/i,'heart-pulse'],[/travel|trip|flight|hotel|holiday|vacation/i,'plane'],[/edu|school|course|book|study|college/i,'graduation-cap'],[/subscr|member|recurring/i,'repeat'],[/home|house|rent|furnit|repair/i,'house'],
 [/gift|personal|beauty|groom/i,'sparkles'],[/income|salary|earn|bonus|freelance/i,'banknote'],[/pet|dog|cat/i,'paw-print'],[/saving|invest|bank|loan|emi/i,'piggy-bank'],[/phone|mobile|recharge|internet|wifi/i,'smartphone'],[/kid|baby|child/i,'baby']];
const guessIcon=n=>(IK.find(([r])=>r.test(n))||[0,'tag'])[1];
const hsl=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return'#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('').toUpperCase()};
function nextColor(cfg){const used=new Set((cfg||S.cfg).cats.map(c=>String(c.color||'').toLowerCase())),f=PAL.find(c=>!used.has(c.toLowerCase()));if(f)return f;for(let i=1;i<400;i++){const c=hsl((i*137.508)%360,68,48);if(!used.has(c.toLowerCase()))return c}return'#64748B'}
function fixCfg(c){c.startDay=c.startDay||1;c.schemaVersion=1;c.currency='INR';c.opening=c.opening||0;c.total=c.total||0;c.daily=c.daily||0;c.budgets=c.budgets||{};c.months=c.months||{};c.last=c.last||{};c.goals=c.goals||[];c.accounts=c.accounts||[];delete c.theme;
 const D=Object.fromEntries(DEF.map(d=>[d[0].toLowerCase(),d]));
 c.cats.forEach(k=>{k.subs=k.subs||[];if(k.id==='unc'){k.icon=k.icon||'tag';k.color=k.color||'#94A3B8';k.kind='both';return}const d=D[String(k.name).toLowerCase()];
  if(!k.kind)k.kind=d&&d[0]==='Income'?'income':'expense';if(!k.icon)k.icon=d?d[1]:guessIcon(k.name);if(!k.color)k.color=d?d[2]:nextColor(c)});return c}
const mk=()=>fixCfg({accounts:['Cash','UPI','Bank account'].map(n=>({id:uid(),name:n})),cats:[...DEF.map(([n,i,c,s])=>({id:uid(),name:n,icon:i,color:c,kind:n==='Income'?'income':'expense',subs:s.split(',').map(x=>({id:uid(),name:x}))})),{id:'unc',name:'Uncategorized',icon:'tag',color:'#94A3B8',kind:'both',subs:[]}]});
/* ---------- state ---------- */
let db,S={tx:[],cfg:null,m:null,q:{s:'',type:'',cat:'',sort:'new',f:'',t:'',lim:150}};
const cat=id=>S.cfg.cats.find(c=>c.id===id)||S.cfg.cats.find(c=>c.id==='unc'),col=id=>cat(id).color,sub=(c,id)=>(c.subs.find(s=>s.id===id)||{}).name||'',acct=id=>(S.cfg.accounts.find(a=>a.id===id)||{}).name||'-';
/* ---------- storage (IndexedDB) ---------- */
const open=()=>new Promise((res,rej)=>{const r=indexedDB.open('ledger',1);r.onupgradeneeded=()=>{r.result.createObjectStore('tx',{keyPath:'id'});r.result.createObjectStore('meta')};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const run=fn=>new Promise((res,rej)=>{const t=db.transaction(['tx','meta'],'readwrite');fn(t.objectStore('tx'),t.objectStore('meta'));t.oncomplete=res;t.onerror=()=>rej(t.error)});
const getAll=s=>new Promise((res,rej)=>{const r=db.transaction(s).objectStore(s).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const saveCfg=()=>run((t,m)=>m.put(S.cfg,'cfg'));
async function putTx(t){await run(s=>s.put(t));const i=S.tx.findIndex(x=>x.id===t.id);if(i<0)S.tx.push(t);else S.tx[i]=t}
async function delTx(id){const t=S.tx.find(x=>x.id===id);await run(s=>s.delete(id));S.tx=S.tx.filter(x=>x.id!==id);return t}
async function load(){if(!window.indexedDB)throw new Error('IndexedDB unavailable');db=await open();S.tx=await getAll('tx');
 S.cfg=await new Promise(r=>{const q=db.transaction('meta').objectStore('meta').get('cfg');q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)});
 if(!S.cfg){S.cfg=mk();await saveCfg()}else{const b=JSON.stringify(S.cfg);fixCfg(S.cfg);if(JSON.stringify(S.cfg)!==b)await saveCfg()}}
async function wipe(){await run((s,m)=>{s.clear();m.clear()});S.tx=[];S.cfg=mk();await saveCfg()}
/* ---------- analytics (single source of truth) ---------- */
const X=(r,type='expense')=>S.tx.filter(t=>t.type===type&&t.date>=r[0]&&t.date<=r[1]),sum=a=>a.reduce((s,t)=>s+t.amountMinor,0);
const grp=(a,f)=>{const o={};a.forEach(t=>{const k=f(t);if(k)o[k]=(o[k]||0)+t.amountMinor});return Object.entries(o).sort((x,y)=>y[1]-x[1])};
const sd=()=>(S.cfg&&S.cfg.startDay)||1,dadd=(d,n)=>{const x=new Date(d+'T00:00');x.setDate(x.getDate()+n);return iso(x)},dd=(a,b)=>Math.round((new Date(b+'T00:00')-new Date(a+'T00:00'))/864e5),
 mOf=d=>{let[y,mo,da]=d.split('-').map(Number);if(da<sd()){mo--;if(!mo){mo=12;y--}}return y+'-'+p2(mo)},
 pstart=m=>{const[y,mo]=m.split('-').map(Number);return iso(new Date(y,mo-1,sd()))},pend=m=>{const[y,mo]=m.split('-').map(Number);return iso(new Date(y,mo,sd()-1))};
const curM=()=>mOf(iso(new Date())),ml=k=>{const[y,m]=k.split('-');return new Date(+y,m-1,1).toLocaleDateString('en-US',{month:'long',year:'numeric'})};
const mkeys=()=>Object.keys(S.cfg.months).sort();
const isSet=m=>!!S.cfg.months[m];
const mget=m=>{const k=mkeys(),e=k.filter(x=>x<=m).pop()||k[0];return e?S.cfg.months[e]:null};
function Rm(m){const[y,mo]=m.split('-').map(Number),now=m===curM(),t=iso(new Date()),pk=iso(new Date(y,mo-2,1)).slice(0,7),ps=pstart(pk),pe=pend(pk),pd=dadd(ps,dd(pstart(m),t));
 return{cur:[pstart(m),now?t:pend(m)],prev:[ps,now&&pd<pe?pd:pe],lab:now?'This month so far':ml(m),pl:now?'the same days last month':'the month before'}}
function R(p){return Rm(p==='month'?curM():/^\d{4}-\d{2}$/.test(p)?p:(S.m||curM()))}
function avg3(cid){const[y,m]=curM().split('-').map(Number);let s=0,k=0;for(let i=1;i<=3;i++){const q=iso(new Date(y,m-1-i,1)).slice(0,7),r=[pstart(q),pend(q)];if(S.tx.some(t=>t.date>=r[0]&&t.date<=r[1])){s+=sum(X(r).filter(t=>!cid||t.categoryId===cid));k++}}return k?Math.round(s/k):null}
function BS(cid,m){const k=m||curM(),now=k===curM(),t=iso(new Date()),s=pstart(k),e=pend(k),dim=dd(s,e)+1,d=now?dd(s,t)+1:dim,r=[s,now?t:e],b=cid?S.cfg.budgets[cid]:(mget(k)||{}).budget;if(!b)return null;const sp=sum(X(r).filter(t=>!cid||t.categoryId===cid));return{b,sp,left:b-sp,pct:Math.round(sp/b*100),over:sp>b,proj:now&&d>=7?Math.round(sp/d*dim):null}}
function above(){const r=R('month'),out=[];for(const[id,sp]of grp(X(r.cur),t=>t.categoryId)){const why=[],bs=BS(id),av=avg3(id),top=grp(X(r.cur).filter(t=>t.categoryId===id),t=>t.merchant)[0];
 if(bs&&bs.over)why.push(['Above budget',`${M(sp)} of ${M(bs.b)}, over by ${M(sp-bs.b)}`]);
 if(av&&sp>av*1.2&&sp-av>=10000)why.push(['Above 3-month average',`${M(sp)} so far vs ${M(av)} average full month (+${M(sp-av)})`]);
 if(why.length)out.push({id,why,note:top&&top[1]/sp>.4?`${top[0]} is ${Math.round(top[1]/sp*100)}% of it.`:''})}return out}
function insights(rg){const c=grp(X(rg.cur),t=>t.categoryId),tot=sum(X(rg.cur)),out=[];if(!tot)return['Not enough data yet. Add expenses to see insights.'];
 out.push(`${cat(c[0][0]).name} is your largest category: ${M(c[0][1])} (${Math.round(c[0][1]/tot*100)}% of spending).`);
 const pt=sum(X(rg.prev));if(pt){const ch=pct(tot,pt),pc=Object.fromEntries(grp(X(rg.prev),t=>t.categoryId));out.push(`Spending is ${Math.abs(ch)}% ${ch>=0?'higher':'lower'} than ${rg.pl}.`);
  let b=null;c.forEach(([k,v])=>{const d=v-(pc[k]||0);if(!b||d>b[1])b=[k,d]});if(tot>pt&&b[1]>0)out.push(`${cat(b[0]).name} contributed ${M(b[1])} of the ${M(tot-pt)} increase.`)}else out.push('Not enough historical data yet for comparisons.');
 const bt=BS(null,S.m);if(bt)out.push(bt.over?`You are over your monthly budget by ${M(-bt.left)}.`:`${bt.pct}% of your monthly budget is used; ${M(bt.left)} remains.`+(bt.proj?` Estimate at this pace: ${M(bt.proj)} by month end.`:''));
 const dw=Array(7).fill(0);X(rg.cur).forEach(t=>dw[new Date(t.date+'T00:00').getDay()]+=t.amountMinor);out.push(`Spending was highest on ${DAYS[dw.indexOf(Math.max(...dw))]}s.`);
 const big=X(rg.cur).sort((a,b)=>b.amountMinor-a.amountMinor)[0];out.push(`Your largest expense was ${M(big.amountMinor)}${big.merchant?' at '+big.merchant:''}.`);return out}
/* ---------- backup ---------- */
const dl=(n,txt,type)=>{const u=URL.createObjectURL(new Blob([txt],{type})),a=document.createElement('a');a.href=u;a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(u),5000)};
const stamp=()=>iso(new Date());
function csv(){const q=v=>{v=String(v??'');if(/^[=+\-@]/.test(v))v="'"+v;return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};return['date,time,type,amount,description,category,subcategory,account,merchant,notes,tags',...S.tx.slice().sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||''))).map(t=>{const c=cat(t.categoryId);return[t.date,t.time,t.type,(t.amountMinor/100).toFixed(2),t.description,c.name,sub(c,t.subcategoryId),acct(t.accountId),t.merchant,t.notes,(t.tags||[]).join(';')].map(q).join(',')})].join('\n')}
const exportJson=()=>dl('ledger-backup-'+stamp()+'.json',JSON.stringify({schema:'ledger-backup',schemaVersion:1,appVersion:'2.0.0',exportedAt:new Date().toISOString(),cfg:S.cfg,tx:S.tx},null,1),'application/json');
async function importBackup(file){let d;try{d=JSON.parse(await file.text());if(d.schema!=='ledger-backup'||!Array.isArray(d.tx)||!d.cfg)throw 0;
  const ok=t=>t&&typeof t.id==='string'&&Number.isInteger(t.amountMinor)&&t.amountMinor>0&&['expense','income','transfer'].includes(t.type)&&/^\d{4}-\d{2}-\d{2}$/.test(t.date);if(!d.tx.every(ok))throw 0}
 catch(e){return toast('That file is not a valid Ledger backup. Nothing was changed.','',null,6000)}
 const have=new Set(S.tx.map(t=>t.id)),nw=d.tx.filter(t=>!have.has(t.id));
 if(!await confirmD('Restore backup',`The backup has ${d.tx.length} transactions: ${nw.length} new, ${d.tx.length-nw.length} already here (skipped). Your existing data is kept and the new ones are merged in.`,'Merge',false))return;
 (d.cfg.cats||[]).forEach(c=>{if(!S.cfg.cats.some(x=>x.id===c.id))S.cfg.cats.splice(S.cfg.cats.length-1,0,c)});(d.cfg.accounts||[]).forEach(a=>{if(!S.cfg.accounts.some(x=>x.id===a.id))S.cfg.accounts.push(a)});(d.cfg.goals||[]).forEach(g=>{if(!S.cfg.goals.some(x=>x.id===g.id))S.cfg.goals.push(g)});Object.entries(d.cfg.months||{}).forEach(([k,v])=>{if(!S.cfg.months[k])S.cfg.months[k]=v});fixCfg(S.cfg);
 await run((s,m)=>{nw.forEach(t=>s.put(t));m.put(S.cfg,'cfg')});S.tx=[...S.tx,...nw];route();toast('Imported '+nw.length+' transactions')}
