'use strict';
/* UI: views, dialogs and routing. Data and analytics live in app.js. */
const st=d=>`<path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
const P={chev:st('M6 9l6 6 6-6'),chevr:st('M9 6l6 6-6 6'),back:st('M19 12H5M12 5l-7 7 7 7'),plus:st('M12 5v14M5 12h14'),upr:st('M7 17L17 7M8 7h9v9'),
 info:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>'+st('M12 11v5M12 8h.01'),bell:st('M6 17v-6a6 6 0 1 1 12 0v6l1.5 2h-15zM10 21h4'),
 spark:'<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',pin:st('M9 4h6l-1 6 3 3H7l3-3zM12 13v7'),hist:st('M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2'),bar:st('M6 20V10M12 20V4M18 20v-7'),
 pie:'<path d="M11 3.2A9 9 0 1 0 20.8 13H11z"/><path d="M13 2.2A9 9 0 0 1 21.8 11H13z"/>',dots:'<circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0z"/>',
 bag:'<path d="M10 3h4l-1 2.5h-2zM9.5 7.5h5C18 9.5 20 13 20 16a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5c0-3 2-6.5 5.5-8.5z"/>',wal:'<path fill-rule="evenodd" d="M5 6h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm11 8a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/>',
 home:'<path d="M12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"/>',rep:'<path fill-rule="evenodd" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 7v7h2v-7zm3 3v4h2v-4zm3-6v10h2V7z"/>',
 plan:'<path d="M7 3h10a4 4 0 0 1 4 4v10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="7" width="14" height="14" rx="3"/>',
 gear:'<path fill-rule="evenodd" d="M10.3 2h3.4l.5 2.4 1.7.7 2-1.3 2.4 2.4-1.3 2 .7 1.7 2.4.5v3.4l-2.4.5-.7 1.7 1.3 2-2.4 2.4-2-1.3-1.7.7-.5 2.4h-3.4l-.5-2.4-1.7-.7-2 1.3-2.4-2.4 1.3-2-.7-1.7L2 13.7v-3.4l2.4-.5.7-1.7-1.3-2L6.2 3.7l2 1.3 1.7-.7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>'};
P.bellf='<path d="M12 3a6 6 0 0 0-6 6v4l-1.6 2.6A1 1 0 0 0 5.3 17h13.4a1 1 0 0 0 .9-1.4L18 13V9a6 6 0 0 0-6-6zM9.8 19a2.3 2.3 0 0 0 4.4 0z"/>';
const AV='<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="pgrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#bae6fd"/><stop offset="50%" stop-color="#fbcfe8"/><stop offset="100%" stop-color="#fed7aa"/></linearGradient></defs><circle cx="24" cy="24" r="24" fill="url(#pgrad)" fill-opacity="0.6"/><circle cx="24" cy="19" r="6" fill="#6d3fb5"/><path d="M13 36c0-6.2 5-9.5 11-9.5s11 3.3 11 9.5z" fill="#6d3fb5"/></svg>';
const ic=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const ci=n=>`<svg class="i ci" viewBox="0 0 24 24" aria-hidden="true">${LU[n]||LU.tag}</svg>`;
const tileI=(icon,c)=>`<span class="tl" style="background:${c}22;color:${c}">${ci(icon)}</span>`;
const tile=(id,c)=>{const k=cat(id);return tileI(k.icon,c||k.color)};
const NF2=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2});
const Mh=m=>NF0.format(Math.round(m/100)).replace(/\u2212/g,'-');
const flow=t=>t.type==='income'?t.amountMinor:t.type==='expense'?-t.amountMinor:0;
function bal(to){to=to||'9999-12-31';const m=mOf(to),k=mkeys();if(!k.length)return(S.cfg.opening||0)+S.tx.filter(t=>t.date<=to).reduce((s,t)=>s+flow(t),0);if(!isSet(m))return 0;const e=m;return S.cfg.months[e].opening+S.tx.filter(t=>t.date>=pstart(e)&&t.date<=to).reduce((s,t)=>s+flow(t),0)}
const weekNet=()=>{const a=iso(new Date(Date.now()-6*864e5));return S.tx.filter(t=>t.date>=a).reduce((s,t)=>s+flow(t),0)};
const key=t=>t.date+(t.time||'')+(t.createdAt||'');
const balMap=()=>{const o={},d={},c={},bd={},s=S.tx.slice().sort((x,y)=>key(x).localeCompare(key(y)));s.forEach(t=>d[t.date]=(d[t.date]||0)+flow(t));s.forEach(t=>{bd[t.date]=bd[t.date]??bal(t.date);c[t.date]=(c[t.date]||0)+flow(t);o[t.id]=bd[t.date]-(d[t.date]-c[t.date])});return o};
const fdl=d=>{const D=new Date(d+'T00:00'),f=o=>D.toLocaleDateString('en-GB',o);return`${f({weekday:'long'})}, ${D.getDate()} ${f({month:'long'})}, ${D.getFullYear()}`};
const chg=(a,b)=>{const c=pct(a,b);return c===null?'no earlier data':(c>=0?'▲ +':'▼ ')+c+'%'};
const mpill=()=>`<button type="button" class="mp" data-act="mpick" aria-label="Choose month"><span>${ml(S.m)}</span>${ic('chev')}</button>`;
const nb=()=>isSet(S.m)?'':'<a class="nb" href="#/setup"><span>'+ic('info')+'<span>Not set for this month. Set balance and budget</span></span>'+ic('chevr')+'</a>';
const hdr=(t,r='',back='#/')=>`<header class="hd"><a class="bk" href="${back}" aria-label="Back">${ic('back')}</a><h1>${t}</h1>${r}</header>`;
/* ---------- feedback: toast and confirm dialogs ---------- */
let tmr;
function toast(msg,label,fn,ms=4200){const t=$('#toast');clearTimeout(tmr);t.innerHTML=`<span>${E(msg)}</span>${label?`<button type="button">${E(label)}</button>`:''}`;t.classList.add('on');
 if(label)t.querySelector('button').onclick=()=>{t.classList.remove('on');fn&&fn()};tmr=setTimeout(()=>t.classList.remove('on'),ms)}
function confirmD(title,msg,ok='Delete',danger=true){return new Promise(res=>{const d=$('#c');d.returnValue='';
 d.innerHTML=`<h2 class="dt">${E(title)}</h2><p class="mut">${E(msg)}</p><div class="acts"><button type="button" class="sec" value="0">Cancel</button><button type="button" class="${danger?'danger solid':'btn'}" value="1">${E(ok)}</button></div>`;
 d.onclose=()=>res(d.returnValue==='1');d.querySelectorAll('button').forEach(b=>b.onclick=()=>d.close(b.value));d.showModal()})}
function typeD(title,msg,word){return new Promise(res=>{const d=$('#c');d.returnValue='';
 d.innerHTML=`<h2 class="dt">${E(title)}</h2><p class="mut">${E(msg)}</p><label class="fld">Type ${word} to confirm<input id="tw" autocomplete="off"></label><div class="acts"><button type="button" class="sec" value="0">Cancel</button><button type="button" class="danger solid" value="1" disabled>Delete everything</button></div>`;
 const ok=d.querySelector('[value="1"]');d.querySelector('#tw').oninput=e=>{ok.disabled=e.target.value.trim()!==word};d.onclose=()=>res(d.returnValue==='1');d.querySelectorAll('button').forEach(b=>b.onclick=()=>d.close(b.value));d.showModal()})}
/* ---------- shared rows ---------- */
const row=t=>{const c=cat(t.categoryId),nm=t.merchant||t.description||c.name,tr=t.type==='transfer',b=window.BAL&&BAL[t.id];
 return`<button class="tx" data-id="${t.id}">${tr?tileI('repeat','#64748B'):tile(t.categoryId)}<span class="tn"><b>${E(nm)}</b><small>${tr?'Transfer · '+E(acct(t.accountId)):E(t.subcategoryId?sub(c,t.subcategoryId):c.name)+' · '+E(acct(t.accountId))}${t.time?' · '+ft(t.time):''}</small></span><span class="ta"><em class="${t.type}">${t.type==='income'?'+':tr?'':'-'}${M(t.amountMinor)}</em>${b==null?'':`<small>${M(b)}</small>`}</span></button>`};
/* ---------- Home: daily budget meter ---------- */
function daily(){const lim=(mget(curM())||{}).daily||0,days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=iso(d);days.push({k,d,sp:sum(S.tx.filter(t=>t.type==='expense'&&t.date===k))})}
 const td=days[6],sp=td.sp,head=`<div class="sh"><h2>Daily Budget</h2>${lim?'<button class="lnk" data-act="dlim">Edit limit</button>':'<span class="tagp">Today</span>'}</div>`;
 if(!lim)return head+`<div class="card db empty">${tileI('target','#8B5CF6')}<p>Set a daily spending limit. The meter fills as you spend and turns red when you go over.</p><button class="btn sm" data-act="dlim">Set daily limit</button></div>`;
 const left=lim-sp,over=sp>lim,p=Math.min(sp/lim,1),cl=over?'#EF4444':sp/lim>=.8?'#F59E0B':'#22C55E',a=Math.PI*(1-p),xe=130+100*Math.cos(a),ye=122-100*Math.sin(a);
 const scale=Math.max(lim*1.4,...days.map(d=>d.sp)),okd=days.filter(d=>d.sp<=lim).length;
 return head+`<div class="card db"><div class="gz"><svg viewBox="0 0 260 138" role="img" aria-label="${M(sp)} spent of your ${M(lim)} daily limit"><path class="gt" d="M30 122A100 100 0 0 1 230 122"/>${p>0?`<path class="gf" stroke="${cl}" d="M30 122A100 100 0 0 1 ${xe.toFixed(2)} ${ye.toFixed(2)}"/>`:''}<circle cx="${xe.toFixed(2)}" cy="${ye.toFixed(2)}" r="9" fill="#fff" stroke="${cl}" stroke-width="4"/></svg>
<div class="gm"><div class="gv ${over?'bad':'good'}">${over?'-':'+'}${M(Math.abs(left))}</div><small>${over?'over the limit today':'left to spend today'}</small></div></div>
<div class="gs"><span><small>Spent today</small><b>${M(sp)}</b></span><span><small>Daily limit</small><b>${M(lim)}</b></span></div>
<div class="wkb" role="img" aria-label="Spending for the last 7 days against your daily limit"><i class="ll" style="bottom:${(lim/scale*100).toFixed(1)}%"></i>${days.map(d=>`<div class="wb"><i style="height:${d.sp?Math.max(d.sp/scale*100,5).toFixed(1):0}%;background:${d.sp>lim?'#EF4444':'#22C55E'}"></i></div>`).join('')}</div>
<div class="wkl">${days.map((d,i)=>`<small class="${i===6?'tdy':''}">${'SMTWTFS'[d.d.getDay()]}</small>`).join('')}</div><small class="wkn">${okd} of 7 days within your limit</small></div>`}

/* ---------- Home ---------- */
function dash(){const rg=Rm(S.m),e=sum(X(rg.cur)),i=sum(X(rg.cur,'income')),w=weekNet(),tl=S.tx.filter(t=>t.date>=rg.cur[0]&&t.date<=rg.cur[1]).sort((a,b)=>key(b).localeCompare(key(a)));
 let h=`<header class="hero"><div class="hr1"><a class="avw" href="#/s" aria-label="Profile and settings">${AV}<i class="bdg">${ic('wal')}</i></a>${mpill()}<a class="bellb" href="#/i" aria-label="Insights">${ic('bellf')}${S.tx.length?'<i></i>':''}</a></div><div class="bal"><small>${S.m===curM()?'Current Balance':'Balance at month end'}</small><div class="bn">${Mh(bal(rg.cur[1]))}</div>${S.m===curM()?`<span class="chip">${w<0?'-':'+'}${M(Math.abs(w))} than last week</span>`:''}</div></header>
<section class="sheet">${nb()}<div class="sh"><h2>Your Money ${ic('info')}</h2><a class="pill" href="#/r">Details ${ic('chevr')}</a></div><div class="two"><div class="mc"><span class="tl" style="background:#e4f0ff;color:#2f8cf0">${ic('bag')}</span><span class="mt"><small>Income ${ic('info')}</small><b>${M(i)}</b></span></div><div class="mc"><span class="tl" style="background:#ffe8e4;color:#ff5a45">${ic('wal')}</span><span class="mt"><small>Expenses ${ic('info')}</small><b>${M(e)}</b></span></div></div>
${daily()}<a class="ins" href="#/i">${ic('spark')}<span>${S.tx.length?'Your insight is ready':'Add a transaction for insights'}</span><em>View ${ic('chevr')}</em></a>
<div class="sh"><h2>Transactions</h2><span class="ic2"><a href="#/tx" aria-label="Search transactions">${ic('pin')}</a><a href="#/tx" aria-label="All transactions">${ic('hist')}</a><a class="pill lav" href="#/tx">For the Period</a></span></div>`;
 if(!S.tx.length)h+='<div class="card pc"><h2>Welcome. Your data stays on this device.</h2><p class="mut">Add your first transaction, or import a bank statement to get started.</p><div class="acts left"><button class="btn" data-act="add">Add transaction</button><button class="sec" data-act="stmt">Import bank statement (CSV)</button></div></div>';
 else if(!tl.length)h+='<p class="mut">No transactions in this month.</p>';
 else{let d='';tl.slice(0,25).forEach(t=>{if(t.date!==d){d=t.date;h+=`<div class="dh"><span>${fdl(d)}</span><span>Total <b>${M(sum(tl.filter(x=>x.date===d&&x.type==='expense')))}</b></span></div>`}h+=row(t)});if(tl.length>25)h+='<a class="more" href="#/tx">See all transactions</a>'}
 return h+'</section>'}
/* ---------- Report: interactive donut ---------- */
function donut(c,tot,nm,a){S.dn=[];S.dlock=null;
 if(!tot)return`<div class="dn"><svg viewBox="0 0 260 260" aria-hidden="true"><circle cx="130" cy="130" r="100" fill="none" stroke="#eeeef3" stroke-width="34.5"/></svg><div class="dc"><small>Total ${nm}</small><b>${Mh(0)}</b></div></div>`;
 const cnt=id=>a.filter(t=>t.categoryId===id).length,rest=c.slice(4),rs=rest.reduce((s,x)=>s+x[1],0),sg=c.slice(0,4).map(([id,v])=>({name:cat(id).name,amt:v,n:cnt(id),color:col(id)}));
 if(rs)sg.push({name:'Others',amt:rs,n:rest.reduce((s,[id])=>s+cnt(id),0),sub:rest.length+(rest.length===1?' category':' categories'),color:'url(#ht)'});
 const gap=sg.length>1?21:0,r=100,Pt=g=>[130+r*Math.cos(g*Math.PI/180),130+r*Math.sin(g*Math.PI/180)];let a0=-90,out='';
 sg.forEach((s,k)=>{const sw=sg.length===1?359.9:Math.max(s.amt/tot*360-gap,2),a1=a0+gap/2,a2=a1+sw,[x1,y1]=Pt(a1),[x2,y2]=Pt(a2),[tx,ty]=Pt((a1+a2)/2);s.pct=Math.round(s.amt/tot*100);s.tx=tx;s.ty=ty;
  out+=`<path class="sg" data-i="${k}" tabindex="0" role="button" aria-label="${E(s.name)}: ${M(s.amt)}, ${s.pct}% of total" d="M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${sw>180?1:0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${s.color}" stroke-linecap="${sg.length>1?'round':'butt'}"/>`;a0+=s.amt/tot*360});
 S.dn=sg;S.dtot=tot;S.dnm=nm;
 return`<div class="dn"><svg viewBox="0 0 260 260" role="group" aria-label="${nm} by category"><defs><pattern id="ht" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#eeeef2"/><rect width="2.6" height="7" fill="#d3d3dc"/></pattern></defs>${out}</svg><div class="dc"><small id="dl">Total ${nm}</small><b id="dv">${Mh(tot)}</b><small id="ds"></small></div><span class="tip" id="tp" style="left:${(sg[0].tx/2.6).toFixed(1)}%;top:${(sg[0].ty/2.6).toFixed(1)}%">${sg[0].pct}%</span></div><small class="hint">Tap or hover a slice to see its details</small>`}
function dsel(i){const d=S.dn&&S.dn[i];if(!d||!$('#dl'))return;document.querySelectorAll('.sg').forEach(p=>p.classList.toggle('on',+p.dataset.i===i));
 $('#dl').textContent=d.name;$('#dv').innerHTML=Mh(d.amt);$('#ds').textContent=d.pct+'% of total · '+(d.sub||d.n+(d.n===1?' transaction':' transactions'));
 const t=$('#tp');t.textContent=d.pct+'%';t.style.left=(d.tx/2.6).toFixed(1)+'%';t.style.top=(d.ty/2.6).toFixed(1)+'%';document.querySelectorAll('.cc[data-k]').forEach(c=>c.classList.toggle('hl',+c.dataset.k===i))}
function dclr(){if(!$('#dl')||!S.dn||!S.dn.length)return;document.querySelectorAll('.sg').forEach(p=>p.classList.remove('on'));$('#dl').textContent='Total '+S.dnm;$('#dv').innerHTML=Mh(S.dtot);$('#ds').textContent='';
 const d=S.dn[0],t=$('#tp');t.textContent=d.pct+'%';t.style.left=(d.tx/2.6).toFixed(1)+'%';t.style.top=(d.ty/2.6).toFixed(1)+'%';document.querySelectorAll('.cc.hl').forEach(c=>c.classList.remove('hl'))}
function bars(a,rg){const m={};a.forEach(t=>m[t.date]=(m[t.date]||0)+t.amountMinor);const ks=[];for(let d=new Date(rg.cur[0]+'T00:00'),e=new Date(rg.cur[1]+'T00:00');d<=e;d.setDate(d.getDate()+1))ks.push(iso(d));
 const v=ks.map(k=>m[k]||0),mx=Math.max(...v,1),w=300/ks.length;
 return`<div class="dn bars"><svg viewBox="0 0 300 160" role="img" aria-label="Daily amounts, peak ${M(mx)}">${v.map((y,i)=>`<rect x="${(i*w+w*.15).toFixed(2)}" y="${(150-y/mx*140).toFixed(2)}" width="${(w*.7).toFixed(2)}" height="${y?Math.max(y/mx*140,2).toFixed(2):0}" rx="${Math.min(w*.35,5).toFixed(2)}" fill="#8b5cf6"/>`).join('')}<line x1="0" y1="150" x2="300" y2="150" stroke="#eeeef3"/></svg><small>Per day · peak ${M(mx)}</small></div>`}
function rep(){const rg=Rm(S.m),ty=S.rt||'expense',a=X(rg.cur,ty),tot=sum(a),c=grp(a,t=>t.categoryId),pc=Object.fromEntries(grp(X(rg.prev,ty),t=>t.categoryId)),inc=ty==='income',nm=inc?'Income':'Expenses',pv=S.rv||'pie';
 const chart=pv==='pie'?donut(c,tot,nm,a):bars(a,rg);
 return hdr('Report',mpill())+`<div class="pad"><div class="seg2" role="group" aria-label="Report type">${['expense','income'].map(k=>`<button data-act="rt" data-v="${k}" aria-pressed="${ty===k}">${k==='expense'?'Expenses':'Income'}</button>`).join('')}</div>
<div class="sh"><h2>${nm} Report</h2><span class="tg">${[['bar','Bar chart'],['pie','Donut chart']].map(([k,l])=>`<button data-act="rv" data-v="${k}" aria-label="${l}" aria-pressed="${pv===k}">${ic(k)}</button>`).join('')}</span></div>
${chart}<div class="sh"><span class="mut">All ${nm}</span><span>Total <b>${M(tot)}</b></span></div>
${c.length?c.map(([id,v],i)=>{const cl=col(id),p=pct(v,pc[id]),good=p!==null&&(inc?p>=0:p<=0),k=pv==='pie'?(i<4?i:(S.dn.length>4?4:-1)):-1;
 return`<a class="cc" href="#/c/${id}" data-k="${k}" style="--c:${cl}"><div class="ct">${tile(id)}<span class="cn"><b>${E(cat(id).name)}</b><small>${Math.round(v/tot*100)}% of total</small></span><span class="ca"><b>${M(v)}</b><span><i class="dp ${p===null?'':good?'g':'r'}">${p===null?'new':(p>=0?'+':'')+Math.round(p)+'%'}</i> <small class="inl">vs last month</small></span></span></div><div class="pb" style="background:${cl}22"><i style="width:${Math.round(v/tot*100)}%;background:${cl}"></i></div></a>`}).join(''):'<p class="mut">No data for this month.</p>'}</div>`}
/* ---------- Plan ---------- */
function goalCard(g){const pf=Math.min(g.saved/g.target,1);let ex=null;if(g.date&&g.created){const a=new Date(g.created+'T00:00'),b=new Date(g.date+'T00:00');ex=b>a?Math.min(Math.max((Date.now()-a)/(b-a),0),1):1}
 const bh=ex!==null&&ex>pf?Math.round((ex-pf)*100):0,left=Math.max(g.target-g.saved,0);
 return`<div class="gc"><div class="gb"><div class="ct">${tileI('target','#FF6A4D')}<span class="cn"><b>${E(g.name)}</b><small>${g.date?'By '+fd(g.date):'No target date'}</small></span><button class="dots" data-act="goal" data-id="${g.id}" aria-label="Edit goal">${ic('dots')}</button></div>
<div class="ga"><b>${Mh(g.saved)}</b> <small class="inl">Out of ${M(g.target)}</small></div><div class="gp"><i class="f" style="width:${pf*100}%"></i>${bh?`<i class="s" style="left:${pf*100}%;width:${bh}%"></i>`:''}<u style="left:${pf*100}%"></u></div><div class="gl"><small>Your Progress</small><small><b class="dk">${M(left)} Left</b></small></div></div>
${ex!==null?(bh?`<div class="gx">${ic('info')} You're ${bh}% behind schedule and off target.</div>`:`<div class="gx ok">${ic('info')} You're on track.</div>`):''}</div>`}
function plan(){const G=S.cfg.goals||[];
 let h=hdr('My Plan',`<button class="cb" data-act="goal" aria-label="New goal">${ic('plus')}</button>`)+'<div class="pad">';
 h+=`<div class="sh"><h2>Goals</h2>${G.length>1?`<button class="lnk" data-act="allg">${S.allg?'Show less':'View All'}</button>`:''}</div>`;
 h+=G.length?G.slice(0,S.allg?99:1).map(goalCard).join(''):'<div class="card pc pe"><p class="mut">Save towards something: a laptop, a trip, an emergency fund.</p><button class="btn" data-act="goal">New goal</button></div>';
 h+='<div class="sh"><h2>Budgets</h2><a class="lnk" href="#/s">Edit</a></div>';
 const B=[[null,'Total monthly budget'],...S.cfg.cats.filter(c=>S.cfg.budgets[c.id]).map(c=>[c.id,c.name])].map(([id,n])=>[id,n,BS(id,S.m)]).filter(x=>x[2]);
 h+=B.length?B.map(([id,n,b])=>{const cl=b.over?'#EF4444':id?col(id):'#8B5CF6',p=Math.min(b.pct,100),C=2*Math.PI*20;
  return`<a class="cc" href="${id?'#/c/'+id:'#/s'}"><div class="ct">${id?tile(id):tileI('wallet','#8B5CF6')}<span class="cn"><b>${E(n)}</b><small><b class="dk">${M(b.sp)}</b> of ${M(b.b)}</small></span><svg class="ring" viewBox="0 0 48 48" role="img" aria-label="${b.pct}% used"><circle cx="24" cy="24" r="20" fill="none" stroke="${cl}22" stroke-width="4"/><circle cx="24" cy="24" r="20" fill="none" stroke="${cl}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(C*p/100).toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 24 24)"/><text x="24" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="${cl}">${b.pct}%</text></svg></div></a>`}).join(''):'<div class="card pc pe"><p class="mut">No budgets yet. Set a budget on any category in Settings.</p><a class="btn" href="#/s">Set budgets</a></div>';
 return h+'</div>'}
/* ---------- Insights and category page ---------- */
function insp(){const rg=Rm(S.m),ab=above();return hdr('Insights',mpill())+`<div class="pad"><div class="card pc">${insights(rg).map(x=>`<p class="ip">${E(x)}</p>`).join('')}</div><h3>Above normal this month</h3><div class="card">${ab.length?ab.map(o=>`<a class="row" href="#/c/${o.id}"><b>${E(cat(o.id).name)}</b>${o.why.map(w=>`<small><span class="tag">${w[0]}</span>${w[1]}</small>`).join('')}${o.note?`<small>${E(o.note)}</small>`:''}</a>`).join(''):'<p class="mut pc">Nothing above budget or your 3-month average. (Needs budgets or earlier months.)</p>'}</div></div>`}
function catv(id){const c=cat(id),rg=Rm(S.m),a=X(rg.cur).filter(t=>t.categoryId===id),b=X(rg.prev).filter(t=>t.categoryId===id),s=sum(a),ps=sum(b),tot=sum(X(rg.cur)),av=avg3(id),bs=BS(id,S.m);let why='';
 if(b.length&&a.length){const A=s/a.length,B=ps/b.length;why=`${a.length} transactions vs ${b.length}; average ${M(Math.round(A))} vs ${M(Math.round(B))}. ${s>ps?(a.length>b.length&&A<=B?'The increase comes from more transactions.':A>B&&a.length<=b.length?'The increase comes from larger transactions.':'Both count and size changed.'):''}`}
 return`<header class="hd"><a class="bk" href="#/r" aria-label="Back to report">${ic('back')}</a><h1>${E(c.name)}</h1>${mpill()}</header><div class="pad"><div class="card pc"><div class="ct">${tile(id)}<span class="cn"><div class="big">${Mh(s)}</div><small>${chg(s,ps)} vs ${rg.pl} (${M(ps)})</small></span></div><small class="gap">${tot?Math.round(s/tot*100):0}% of all spending · ${av?'3-month average '+M(av):'Not enough historical data yet'}</small>${why?`<p class="mut">${why}</p>`:''}</div>
${bs?`<div class="card pc"><b>Budget</b> ${M(bs.sp)} / ${M(bs.b)} (${bs.pct}%)<div class="bar ${bs.over?'over':''}"><i style="width:${Math.min(bs.pct,100)}%"></i></div><small>${bs.over?'Over budget by '+M(-bs.left):M(bs.left)+' left'}${bs.proj?' · Estimated month-end: '+M(bs.proj):''}</small></div>`:''}
<h3>Subcategories</h3><div class="card">${grp(a,t=>t.subcategoryId?sub(c,t.subcategoryId):'Other').map(([n,v])=>`<div class="row"><div><span>${E(n)}</span><span>${M(v)} · ${Math.round(v/s*100)}%</span></div></div>`).join('')||'<p class="mut pc">No spending.</p>'}</div>
<h3>Top merchants</h3><div class="card">${grp(a,t=>t.merchant).slice(0,5).map(([n,v])=>`<div class="row"><div><span>${E(n)}</span><span>${M(v)}</span></div></div>`).join('')||'<p class="mut pc">No merchants recorded.</p>'}</div>
<h3>Transactions</h3>${a.sort((x,y)=>key(y).localeCompare(key(x))).slice(0,30).map(row).join('')||'<p class="mut">Nothing yet.</p>'}</div>`}
/* ---------- Transactions list ---------- */
function txv(){const q=S.q,more=q.cat||q.f||q.t||q.sort!=='new';
 return`<div class="srch">${ci('search')}<input id="qs" type="search" placeholder="Search merchant, note or tag" aria-label="Search transactions" value="${E(q.s)}"></div>
<div class="seg2 sm" role="group" aria-label="Type">${[['','All'],['expense','Expenses'],['income','Income']].map(([k,n])=>`<button data-act="qt" data-v="${k}" aria-pressed="${q.type===k}">${n}</button>`).join('')}</div>
<details class="more"${more?' open':''}><summary>More filters</summary><div class="two2"><label class="fld">Category<select id="qc"><option value="">All categories</option>${S.cfg.cats.map(c=>`<option value="${c.id}"${q.cat===c.id?' selected':''}>${E(c.name)}</option>`).join('')}</select></label><label class="fld">Sort by<select id="qo">${[['new','Newest first'],['old','Oldest first'],['hi','Highest amount'],['lo','Lowest amount']].map(([k,n])=>`<option value="${k}"${q.sort===k?' selected':''}>${n}</option>`).join('')}</select></label><label class="fld">From<input id="qf" type="date" value="${q.f}"></label><label class="fld">To<input id="qd" type="date" value="${q.t}"></label></div></details><div id="list"></div>`}
function fill(){const q=S.q,L=$('#list');if(!L)return;const so={new:(x,y)=>key(y).localeCompare(key(x)),old:(x,y)=>key(x).localeCompare(key(y)),hi:(x,y)=>y.amountMinor-x.amountMinor,lo:(x,y)=>x.amountMinor-y.amountMinor};
 const a=S.tx.filter(t=>(!q.type||t.type===q.type)&&(!q.cat||t.categoryId===q.cat)&&(!q.f||t.date>=q.f)&&(!q.t||t.date<=q.t)&&(!q.s||[t.description,t.merchant,t.notes,(t.tags||[]).join(' '),cat(t.categoryId).name].join(' ').toLowerCase().includes(q.s))).sort(so[q.sort]);
 const act=q.s||q.type||q.cat||q.f||q.t||q.sort!=='new';
 if(!a.length){L.innerHTML='<p class="mut empty2">'+(S.tx.length?'No transactions match these filters.':'No transactions yet. Tap the + button to add one.')+'</p>'+(act&&S.tx.length?'<button class="sec" data-act="clear">Clear filters</button>':'');return}
 let h=`<div class="dh"><span>${a.length} transaction${a.length===1?'':'s'}</span>${act?'<button class="lnk" data-act="clear">Clear filters</button>':''}</div>`,d='';
 a.slice(0,q.lim).forEach(t=>{if(q.sort==='new'||q.sort==='old'){if(t.date!==d){d=t.date;h+=`<div class="dh day"><span>${fdl(d)}</span></div>`}}h+=row(t)});
 L.innerHTML=h+(a.length>q.lim?'<button class="sec full" data-act="more">Show more</button>':'')}
/* ---------- Settings ---------- */
function setv(){const c=S.cfg,mny=(id,l,v,h)=>`<label class="fld">${l}<span class="in2"><i>₹</i><input id="${id}" inputmode="decimal" value="${v?v/100:''}" placeholder="0"></span>${h?`<small>${h}</small>`:''}</label>`;
 return`<div class="card pc"><h2>Money</h2><small>Balance, budget and daily limit are set for each month.</small><label class="fld">Month starts on day<select id="sday">${Array.from({length:28},(_,i)=>`<option value="${i+1}"${sd()===i+1?' selected':''}>${i+1}</option>`).join('')}</select><small>Use your salary day, e.g. 25. Your "November" then runs 25 Nov to 24 Dec.</small></label><a class="btn full" href="#/setup">Edit ${ml(S.m)} setup</a></div>
<div class="card pc"><h2>Categories</h2><div class="sl">${c.cats.filter(k=>k.id!=='unc').map(k=>`<button class="srow" data-act="catedit" data-id="${k.id}">${tile(k.id)}<span class="sx"><b>${E(k.name)}</b><small>${k.subs.length} subcategor${k.subs.length===1?'y':'ies'}${k.kind==='income'?' · income':''}</small></span><span class="sv">${c.budgets[k.id]?M(c.budgets[k.id])+'/mo':''}</span>${ic('chevr')}</button>`).join('')}</div><button class="sec full" data-act="catnew">${ci('plus')} New category</button></div>
<div class="card pc"><h2>Accounts</h2><small>Labels only. Nothing is connected to a bank.</small><div class="sl">${c.accounts.map(a=>`<button class="srow" data-act="accedit" data-id="${a.id}">${tileI('wallet','#64748B')}<span class="sx"><b>${E(a.name)}</b><small>${M(sum(S.tx.filter(t=>t.type==='expense'&&t.accountId===a.id)))} spent in total</small></span>${ic('chevr')}</button>`).join('')}</div><button class="sec full" data-act="accnew">${ci('plus')} New account</button></div>
<div class="card pc"><h2>Import and backup</h2><button class="btn full" data-act="stmt">${ci('receipt')} Import bank statement</button><small class="gap">CSV or Excel from net banking. Columns are detected automatically and duplicates are skipped.</small>
<div class="two2 gap"><button class="sec" data-act="xjson">Export backup</button><button class="sec" data-act="xcsv">Export CSV</button></div><button class="sec full" data-act="imp">Restore from backup</button><button class="danger full" data-act="wipe">Delete all data</button></div>
<div class="card pc"><h2>About</h2><p class="mut">Ledger keeps everything on this device. There is no account, no server and no tracking. Clearing your browser data erases it, so export a backup now and then and keep it private.</p><small>Version 2.0.0 · Font: Inter · Icons: Lucide</small></div>`}
/* ---------- Dialogs ---------- */
function openD(html){const f=$('#f');f.innerHTML=html;f.showModal();return f}
function txForm(id){const t=id?S.tx.find(x=>x.id===id):null,n=new Date(),L=S.cfg.last||{};S.edit=t?t.id:null;const hasA=a=>S.cfg.accounts.some(x=>x.id===a);
 const s={type:t&&t.type==='income'?'income':'expense',cat:t?t.categoryId:(L.c||''),sub:t?t.subcategoryId||'':'',acc:t&&hasA(t.accountId)?t.accountId:(hasA(L.a)?L.a:((S.cfg.accounts.find(a=>a.name==='UPI')||S.cfg.accounts[0]||{}).id)),touched:!!t},x=t||{date:S.m===iso(n).slice(0,7)?iso(n):S.m+'-01',time:p2(n.getHours())+':'+p2(n.getMinutes())};
 const f=openD(`<h2 class="dt">${t?'Edit transaction':'Add transaction'}</h2><form id="ff" novalidate>
<div class="seg" role="radiogroup" aria-label="Type">${['expense','income'].map(k=>`<label><input type="radio" name="type" value="${k}"${s.type===k?' checked':''}><span>${k==='expense'?'Expense':'Income'}</span></label>`).join('')}</div>
<label class="amt"><span>₹</span><input name="amt" inputmode="decimal" autocomplete="off" placeholder="0" aria-label="Amount" value="${t?t.amountMinor/100:''}"></label><p id="err" role="alert"></p><p id="aerr" role="alert"></p>
<div class="fl">Category</div><div class="cg" id="cg"></div><div id="sw"><div class="fl">Subcategory</div><div class="chs" id="sg"></div></div>
<div class="fl" id="al">${s.type==='income'?'Received in':'Paid via'}</div><div class="chs">${S.cfg.accounts.slice().sort((x,y)=>(y.name==='UPI')-(x.name==='UPI')).map(a=>`<label class="chp"><input type="radio" name="acc" value="${a.id}"${a.id===s.acc?' checked':''}><span>${E(a.name)}</span></label>`).join('')}</div>
<div class="two2"><label class="fld">Date<input type="date" name="date" value="${x.date}"></label><label class="fld">Time<input type="time" name="time" value="${x.time||''}"></label></div>
<label class="fld">Merchant or payee<input name="mer" autocomplete="off" placeholder="e.g. Swiggy" value="${E(t?t.merchant:'')}"></label>${t&&t.description?`<small class="narr">Bank narration: ${E(t.description)}</small>`:''}
<details class="more"><summary>More details</summary><label class="fld">Notes<input name="notes" value="${E(t?t.notes:'')}"></label><label class="fld">Tags (comma separated)<input name="tags" value="${E(t?(t.tags||[]).join(', '):'')}"></label></details>
<div class="acts"><button type="button" class="sec" data-act="close">Cancel</button>${t?'<button type="button" class="danger" data-act="rm">Delete</button>':''}<button class="btn grow">Save</button></div></form>`);
 const F=$('#ff'),catsFor=()=>{const a=S.cfg.cats.filter(c=>s.type==='income'?c.kind==='income':c.kind!=='income'&&(c.id!=='unc'||s.cat==='unc'));return a.length?a:S.cfg.cats};
 const drawSubs=()=>{const c=cat(s.cat);$('#sw').hidden=!c.subs.length;$('#sg').innerHTML=c.subs.length?`<label class="chp"><input type="radio" name="sub" value=""${!s.sub?' checked':''}><span>None</span></label>`+c.subs.map(u=>`<label class="chp"><input type="radio" name="sub" value="${u.id}"${u.id===s.sub?' checked':''}><span>${E(u.name)}</span></label>`).join(''):''};
 const drawCats=()=>{const a=catsFor();if(!a.some(c=>c.id===s.cat)){s.cat=a[0].id;s.sub=''}$('#cg').innerHTML=a.map(c=>`<label class="cgi" style="--c:${c.color}"><input type="radio" name="cat" value="${c.id}"${c.id===s.cat?' checked':''}><span class="cgt">${tileI(c.icon,c.color)}<small>${E(c.name)}</small></span></label>`).join('');drawSubs()};
 drawCats();
 F.addEventListener('change',e=>{const el=e.target;if(el.name==='type'){s.type=el.value;$('#al').textContent=s.type==='income'?'Received in':'Paid via';drawCats()}else if(el.name==='cat'){s.cat=el.value;s.sub='';s.touched=true;drawSubs()}else if(el.name==='sub')s.sub=el.value;else if(el.name==='acc')s.acc=el.value});
 F.mer.addEventListener('blur',()=>{if(t||s.touched)return;const v=F.mer.value.trim().toLowerCase(),m=v&&S.tx.find(y=>y.merchant&&y.merchant.toLowerCase()===v&&(y.type==='income')===(s.type==='income'));if(m){s.cat=m.categoryId;s.sub=m.subcategoryId||'';drawCats()}});
 F.addEventListener('submit',async e=>{e.preventDefault();const a=toMinor(F.amt.value),er=m=>{$('#err').textContent=m};
  if(!a)return er('Enter an amount greater than zero.');if(!/^\d{4}-\d{2}-\d{2}$/.test(F.date.value))return er('Choose a valid date.');if(!s.acc)return er('Add an account in Settings first.');if(s.type==='expense'){const m=F.date.value.slice(0,7),c=S.cfg.months[m],spent=S.tx.filter(y=>y.type==='expense'&&y.date.slice(0,7)===m&&y.id!==(t&&t.id)).reduce((n,y)=>n+y.amountMinor,0),income=S.tx.filter(y=>y.type==='income'&&y.date.slice(0,7)===m&&y.id!==(t&&t.id)).reduce((n,y)=>n+y.amountMinor,0);if(c&&c.opening+income-spent-a<0)return er(`Transaction exceeds available balance. Available: ${M(c.opening+income-spent)}.`);}
  if(s.type==='expense'&&bal(F.date.value)+(t&&t.type==='expense'?t.amountMinor:0)<a)return er('Insufficient balance.');
  const now=new Date().toISOString(),o={id:t?t.id:uid(),amountMinor:a,currency:'INR',type:s.type,description:t&&t.description||'',merchant:F.mer.value.trim(),categoryId:s.cat,subcategoryId:s.sub,accountId:s.acc,toAccountId:'',date:F.date.value,time:F.time.value||'',timestamp:new Date(F.date.value+'T'+(F.time.value||'00:00')).getTime(),notes:F.notes.value.trim(),tags:F.tags.value.split(',').map(z=>z.trim()).filter(Boolean),createdAt:t?t.createdAt:now,updatedAt:now};
  if(t&&t.ref)o.ref=t.ref;if(t&&t.src)o.src=t.src;S.cfg.last={c:s.cat,a:s.acc};
  try{await run((st,m)=>{st.put(o);m.put(S.cfg,'cfg')})}catch(err){return er('Could not save. Storage error.')}
  const i=S.tx.findIndex(y=>y.id===o.id);if(i<0)S.tx.push(o);else S.tx[i]=o;f.close();toast(t?'Changes saved':'Transaction added');route()});
 if(!t)setTimeout(()=>F.amt.focus(),60)}
function goalForm(id){const g=(S.cfg.goals||[]).find(x=>x.id===id)||{};S.gid=id||null;
 openD(`<h2 class="dt">${id?'Edit goal':'New goal'}</h2><form id="gf" novalidate><label class="fld">Goal name<input name="n" value="${E(g.name)}" placeholder="e.g. Laptop"></label><label class="fld">Target amount<span class="in2"><i>₹</i><input name="t" inputmode="decimal" value="${g.target?g.target/100:''}"></span></label><label class="fld">Saved so far<span class="in2"><i>₹</i><input name="s" inputmode="decimal" value="${g.saved?g.saved/100:''}"></span></label><label class="fld">Target date (optional)<input type="date" name="d" value="${g.date||''}"></label><div class="acts"><button type="button" class="sec" data-act="close">Cancel</button>${id?'<button type="button" class="danger" data-act="gdel">Delete</button>':''}<button class="btn grow">Save</button></div></form>`)}
function limitDialog(){const c=S.cfg.months[curM()];if(!c){location.hash='#/setup';return}const sug=c.budget?Math.round(c.budget/30):0;
 const f=openD(`<h2 class="dt">Daily spending limit</h2><p class="mut">The meter on Home fills as you spend and turns red when you go over.</p><form id="lf" novalidate><label class="fld">Limit per day<span class="in2"><i>₹</i><input name="d" inputmode="decimal" value="${c.daily?c.daily/100:''}" placeholder="e.g. 1000"></span></label>${sug?`<button type="button" class="sec sm" id="sgl">Use ${M(sug)} (monthly budget ÷ 30)</button>`:''}<p id="err" role="alert"></p><div class="acts"><button type="button" class="sec" data-act="close">Cancel</button>${c.daily?'<button type="button" class="danger" id="lr">Remove</button>':''}<button class="btn grow">Save</button></div></form>`);
 const F=$('#lf');if(sug)$('#sgl').onclick=()=>{F.d.value=sug/100};if(c.daily)$('#lr').onclick=async()=>{c.daily=0;await saveCfg();f.close();toast('Daily limit removed');route()};
 F.addEventListener('submit',async e=>{e.preventDefault();const v=toMinor(F.d.value);if(!v)return $('#err').textContent='Enter an amount greater than zero.';c.daily=v;await saveCfg();f.close();toast('Daily limit saved');route()})}
function catDialog(id){const old=id?cat(id):null;if(old&&old.id==='unc')return;
 const c=old?{...old,subs:old.subs.map(x=>({...x}))}:{name:'',icon:'tag',color:nextColor(),kind:'expense',subs:[]};let subs=c.subs.slice(),color=c.color,icon=c.icon;const removed=new Set();
 const f=openD(`<h2 class="dt">${old?'Edit category':'New category'}</h2><form id="cf" novalidate><label class="fld">Name<input name="n" value="${E(c.name)}" placeholder="e.g. Pets" maxlength="30"></label>
<div class="seg" role="radiogroup" aria-label="Type">${[['expense','Expense'],['income','Income']].map(([k,n])=>`<label><input type="radio" name="k" value="${k}"${(c.kind==='income'?'income':'expense')===k?' checked':''}><span>${n}</span></label>`).join('')}</div>
<div class="fl">Icon</div><div class="ig" id="ig" style="--c:${color}">${ICONS.map(n=>`<label><input type="radio" name="ic" value="${n}"${n===icon?' checked':''}><span>${ci(n)}</span></label>`).join('')}</div>
<div class="fl">Colour</div><div class="cs">${PAL.map(p=>`<label style="--c:${p}"><input type="radio" name="co" value="${p}"${p.toLowerCase()===color.toLowerCase()?' checked':''}><span style="background:${p}"></span></label>`).join('')}<label class="cus" title="Custom colour"><input type="color" name="cu" value="${color.slice(0,7)}"></label></div>
<label class="fld" id="bw"${c.kind==='income'?' hidden':''}>Monthly budget (optional)<span class="in2"><i>₹</i><input name="b" inputmode="decimal" value="${old&&S.cfg.budgets[old.id]?S.cfg.budgets[old.id]/100:''}" placeholder="0"></span></label>
<div class="fl">Subcategories</div><div class="chs" id="sc"></div><div class="addr"><input name="ns" placeholder="Add a subcategory" maxlength="30"><button type="button" class="sec sm" id="sa">Add</button></div>
<p id="err" role="alert"></p><div class="acts"><button type="button" class="sec" data-act="close">Cancel</button>${old?'<button type="button" class="danger" id="cd">Delete</button>':''}<button class="btn grow">Save</button></div></form>`);
 const F=$('#cf'),draw=()=>{$('#sc').innerHTML=subs.length?subs.map(u=>`<span class="rch">${E(u.name)}<button type="button" data-rm="${u.id}" aria-label="Remove ${E(u.name)}">${ci('x')}</button></span>`).join(''):'<small>No subcategories yet</small>'};draw();
 const addSub=()=>{const n=F.ns.value.trim();if(!n)return;if(subs.some(u=>u.name.toLowerCase()===n.toLowerCase()))return $('#err').textContent='That subcategory already exists.';$('#err').textContent='';subs.push({id:uid(),name:n});F.ns.value='';draw()};
 $('#sa').onclick=addSub;F.ns.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addSub()}});
 F.addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b){removed.add(b.dataset.rm);subs=subs.filter(u=>u.id!==b.dataset.rm);draw()}});
 F.addEventListener('change',e=>{const el=e.target;if(el.name==='co'){color=el.value;F.cu.value=color;$('#ig').style.setProperty('--c',color)}else if(el.name==='cu'){color=el.value.toUpperCase();F.querySelectorAll('[name=co]').forEach(r=>r.checked=r.value.toLowerCase()===color.toLowerCase());$('#ig').style.setProperty('--c',color)}else if(el.name==='ic')icon=el.value;else if(el.name==='k')$('#bw').hidden=el.value==='income'});
 if(old)$('#cd').onclick=async()=>{const nt=S.tx.filter(t=>t.categoryId===old.id).length;if(!await confirmD('Delete category',`"${old.name}" will be removed.${nt?` Its ${nt} transactions move to Uncategorized.`:''}`))return;
  const mv=S.tx.filter(t=>t.categoryId===old.id).map(t=>({...t,categoryId:'unc',subcategoryId:''}));S.cfg.cats=S.cfg.cats.filter(x=>x.id!==old.id);delete S.cfg.budgets[old.id];if(S.cfg.last.c===old.id)delete S.cfg.last.c;
  await run((s,m)=>{mv.forEach(t=>s.put(t));m.put(S.cfg,'cfg')});S.tx=S.tx.map(t=>mv.find(x=>x.id===t.id)||t);f.close();toast('Category deleted');route()};
 F.addEventListener('submit',async e=>{e.preventDefault();const n=F.n.value.trim(),er=m=>{$('#err').textContent=m};if(!n)return er('Give the category a name.');
  if(S.cfg.cats.some(x=>x.id!==(old&&old.id)&&x.name.toLowerCase()===n.toLowerCase()))return er('You already have a category with that name.');
  const k=F.k.value;let tg=old;if(!old){tg={id:uid(),subs:[]};const u=S.cfg.cats.findIndex(x=>x.id==='unc');S.cfg.cats.splice(u<0?S.cfg.cats.length:u,0,tg)}
  Object.assign(tg,{name:n,icon,color,kind:k,subs});const b=toMinor(F.b.value);if(b&&k!=='income')S.cfg.budgets[tg.id]=b;else delete S.cfg.budgets[tg.id];
  const fix=S.tx.filter(t=>t.categoryId===tg.id&&t.subcategoryId&&removed.has(t.subcategoryId)).map(t=>({...t,subcategoryId:''}));
  await run((s,m)=>{fix.forEach(t=>s.put(t));m.put(S.cfg,'cfg')});S.tx=S.tx.map(t=>fix.find(x=>x.id===t.id)||t);f.close();toast('Category saved');route()});
 if(!old)setTimeout(()=>F.n.focus(),60)}
function accDialog(id){const a=id?S.cfg.accounts.find(x=>x.id===id):null;
 const f=openD(`<h2 class="dt">${a?'Edit account':'New account'}</h2><form id="af" novalidate><label class="fld">Name<input name="n" value="${E(a?a.name:'')}" placeholder="e.g. HDFC Credit Card" maxlength="30"></label><p id="err" role="alert"></p><div class="acts"><button type="button" class="sec" data-act="close">Cancel</button>${a&&S.cfg.accounts.length>1?'<button type="button" class="danger" id="ad">Delete</button>':''}<button class="btn grow">Save</button></div></form>`);
 const F=$('#af');F.addEventListener('submit',async e=>{e.preventDefault();const n=F.n.value.trim();if(!n)return $('#err').textContent='Give the account a name.';
  if(S.cfg.accounts.some(x=>x.id!==(a&&a.id)&&x.name.toLowerCase()===n.toLowerCase()))return $('#err').textContent='You already have an account with that name.';
  if(a)a.name=n;else S.cfg.accounts.push({id:uid(),name:n});await saveCfg();f.close();toast('Account saved');route()});
 if(a&&S.cfg.accounts.length>1)$('#ad').onclick=()=>{const others=S.cfg.accounts.filter(x=>x.id!==a.id),n=S.tx.filter(t=>t.accountId===a.id).length;
  f.innerHTML=`<h2 class="dt">Delete ${E(a.name)}?</h2><p class="mut">${n?`It has ${n} transactions. Choose where to move them.`:'It has no transactions.'}</p>${n?`<label class="fld">Move transactions to<select id="mv">${others.map(o=>`<option value="${o.id}">${E(o.name)}</option>`).join('')}</select></label>`:''}<div class="acts"><button type="button" class="sec" data-act="close">Cancel</button><button type="button" class="danger solid" id="ay">Delete account</button></div>`;
  $('#ay').onclick=async()=>{const to=n?$('#mv').value:null,mv=n?S.tx.filter(t=>t.accountId===a.id).map(t=>({...t,accountId:to})):[];S.cfg.accounts=S.cfg.accounts.filter(x=>x.id!==a.id);if(S.cfg.last.a===a.id)delete S.cfg.last.a;
   await run((s,m)=>{mv.forEach(t=>s.put(t));m.put(S.cfg,'cfg')});S.tx=S.tx.map(t=>mv.find(x=>x.id===t.id)||t);f.close();toast('Account deleted');route()}};
 if(!a)setTimeout(()=>F.n.focus(),60)}
function monthD(){const[y0,m0]=curM().split('-').map(Number),o=[];for(let i=0;i<24;i++){const d=new Date(y0,m0-1-i,1);o.push([iso(d).slice(0,7),d])}
 let y='',h='<h2 class="dt">Select month</h2><div class="mlist">';
 o.forEach(([k,d])=>{const yr=d.getFullYear();if(yr!==y){y=yr;h+=`<div class="my">${yr}</div>`}h+=`<button type="button" class="mo${k===S.m?' on':''}" data-m="${k}"><span>${d.toLocaleDateString('en-US',{month:'long'})}</span>${k===S.m?ci('check'):''}</button>`});
 const f=openD(h+'</div>');
 f.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{S.m=b.dataset.m;f.close();route()});
 const on=f.querySelector('.on');on&&on.scrollIntoView({block:'center'})}
function setup(){const m=S.m,s=S.cfg.months[m],p=mget(m),k=mkeys(),d=new Date(m+'-01'),prev=dadd(pstart(m),-1),pm=mOf(prev),prevBal=S.cfg.months[pm]?S.cfg.months[pm].opening+S.tx.filter(t=>t.date>=pstart(pm)&&t.date<=prev).reduce((s,t)=>s+flow(t),0):0,carried=s?.carryForward||0,op=s?Math.max(0,s.opening-carried):0,bu=s?s.budget:(p?p.budget:S.cfg.total),dl=s?s.daily:(p?p.daily:S.cfg.daily),hasPrev=!!S.cfg.months[pm];const f=(id,l,v,h)=>`<label class="fld">${l}<span class="in2"><i>₹</i><input id="${id}" inputmode="decimal" value="${v?v/100:''}" placeholder="0"></span><small>${h}</small></label>`;return hdr('Set up '+ml(m))+`<div class="pad"><div class="card pc"><p class="mut">${fd(pstart(m))} to ${fd(pend(m))}. ${s?'Update this month.':'Not set yet. Takes a minute and is saved for good.'}</p>${f('so','Balance at start of month',op,'What your bank showed at the start of this month.')}${hasPrev?`<label class="carry"><input type="checkbox" id="carryMonth"${carried?' checked':''}><span>Carry Forward previous month’s balance <b>(${M(prevBal)})</b></span></label>`:''}${f('sb','Monthly budget',bu,'Total you plan to spend this month.')}${f('sd','Daily spending limit',dl,'Powers the Home meter.')}<p id="err" role="alert"></p><button class="btn full" data-act="msave">Save</button></div></div>`}
function setStart(n){const old=sd(),no={};mkeys().forEach(k=>{const s=S.cfg.months[k],[y,mo]=k.split('-').map(Number),a=iso(new Date(y,mo-1,old)),b=iso(new Date(y,mo-1,n)),lo=a<b?a:b,hi=a<b?b:a,d=S.tx.filter(t=>t.date>=lo&&t.date<hi).reduce((s,t)=>s+flow(t),0);no[k]=s.opening+(b>a?d:-d)});S.cfg.startDay=n;mkeys().forEach(k=>S.cfg.months[k].opening=no[k])}
/* ---------- routing ---------- */
function route(){const[a,b]=location.hash.slice(2).split('/');if(!S.m)S.m=curM();
 if(a!=='setup'&&S.cfg&&!isSet(curM())){S.m=curM();location.replace('#/setup');return}
 window.BAL=balMap();
 const f=({'':dash,r:rep,p:plan,i:insp,tx:txv,s:setv,setup:setup,c:()=>catv(b)})[a]||dash;let h=f();
 if(a==='tx'||a==='s')h=hdr(a==='tx'?'Transactions':'Settings')+'<div class="pad">'+h+'</div>';
 $('#v').innerHTML=h;if(a==='tx')fill();const k=({c:'r',tx:'',i:''})[a]??a;document.querySelectorAll('nav a').forEach(l=>l.toggleAttribute('aria-current',l.dataset.n===k));try{if(a==='s')localStorage.sv=1;document.body.classList.toggle('sv',!!localStorage.sv)}catch(e){}}
$('nav').innerHTML=[['','Home','home'],['r','Report','rep']].map(n=>`<a href="#/${n[0]}" data-n="${n[0]}">${ic(n[2])}${n[0]==='s'?'<i class="nd"></i>':''}<span>${n[1]}</span></a>`).join('')+`<button class="fab" data-act="add" aria-label="Add transaction">${ic('plus')}</button>`+[['p','Plan','plan'],['s','Settings','gear']].map(n=>`<a href="#/${n[0]}" data-n="${n[0]}">${ic(n[2])}${n[0]==='s'?'<i class="nd"></i>':''}<span>${n[1]}</span></a>`).join('');
/* ---------- events ---------- */
const pick=el=>el&&el.closest?el.closest('.sg'):null;
document.addEventListener('pointerover',e=>{const p=pick(e.target);if(p&&e.pointerType==='mouse'&&S.dlock==null)dsel(+p.dataset.i)});
document.addEventListener('pointerout',e=>{const p=pick(e.target);if(p&&e.pointerType==='mouse'&&S.dlock==null&&!pick(e.relatedTarget))dclr()});
document.addEventListener('focusin',e=>{const p=pick(e.target);if(p&&S.dlock==null)dsel(+p.dataset.i)});
document.addEventListener('focusout',e=>{const p=pick(e.target);if(p&&S.dlock==null&&!pick(e.relatedTarget))dclr()});
document.addEventListener('keydown',e=>{const p=pick(e.target);if(p&&(e.key==='Enter'||e.key===' ')){e.preventDefault();const i=+p.dataset.i;S.dlock=S.dlock===i?null:i;S.dlock==null?dclr():dsel(i)}});
$('#f').addEventListener('click',e=>{const d=e.currentTarget;if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});
document.addEventListener('click',async e=>{const sg=pick(e.target);
 if(sg){const i=+sg.dataset.i;S.dlock=S.dlock===i?null:i;S.dlock==null?dclr():dsel(i);return}
 if(S.dlock!=null&&!e.target.closest('.dn')){S.dlock=null;dclr()}
 const b=e.target.closest('[data-act],.tx');if(!b)return;if(b.classList.contains('tx')&&!b.dataset.act)return txForm(b.dataset.id);const a=b.dataset.act,id=b.dataset.id;
 switch(a){
  case'add':txForm();break;case'close':$('#f').close();break;
  case'mpick':monthD();break;
  case'rm':{const t=await delTx(S.edit);$('#f').close();route();toast('Transaction deleted','Undo',async()=>{await putTx(t);route()});break}
  case'rt':S.rt=b.dataset.v;route();break;case'rv':S.rv=b.dataset.v;route();break;case'allg':S.allg=!S.allg;route();break;
  case'goal':goalForm(id);break;
  case'gdel':if(await confirmD('Delete goal','This goal will be removed.')){S.cfg.goals=S.cfg.goals.filter(g=>g.id!==S.gid);await saveCfg();$('#f').close();toast('Goal deleted');route()}break;
  case'dlim':limitDialog();break;case'catedit':catDialog(id);break;case'catnew':catDialog();break;case'accedit':accDialog(id);break;case'accnew':accDialog();break;
  case'msave':{const o=parseFloat(String($('#so').value).replace(/,/g,''));if(isNaN(o))return $('#err').textContent='Enter your starting balance (0 is fine).';const ex=S.tx.filter(t=>t.type==='expense'&&t.date>=pstart(S.m)&&t.date<=pend(S.m)).reduce((s,t)=>s+t.amountMinor,0);if(Math.round(o*100)<ex)return $('#err').textContent=`Balance added is less than expenses already recorded (${M(ex)}). Please check your starting balance.`;S.cfg.months[S.m]={opening:Math.round(o*100),budget:toMinor($('#sb').value),daily:toMinor($('#sd').value)};await saveCfg();toast('Saved');location.hash='#/';route();break}
  case'qt':S.q.type=b.dataset.v;route();break;case'clear':S.q={s:'',type:'',cat:'',sort:'new',f:'',t:'',lim:150};route();break;case'more':S.q.lim+=150;fill();break;
  case'xjson':exportJson();toast('Backup file downloaded');break;case'xcsv':dl('ledger-transactions-'+stamp()+'.csv',csv(),'text/csv');toast('CSV downloaded');break;
  case'imp':$('#file').click();break;case'stmt':$('#sfile').click();break;case'stgo':stgo();break;
  case'wipe':if(await typeD('Delete all data','This permanently erases every transaction, category, goal and setting on this device. Export a backup first if you might need it.','DELETE')){await wipe();S.m=curM();toast('All data deleted');route()}break}});
document.addEventListener('input',e=>{if(e.target.id==='qs'){S.q.s=e.target.value.toLowerCase();fill()}});
document.addEventListener('change',async e=>{const i=e.target,q=S.q,m={qc:'cat',qo:'sort',qf:'f',qd:'t'};
 if(i.id==='mp'){S.m=i.value;route()}else if(i.id==='cf'){$('#so').value=i.checked?(Number($('#cp').value)/100):''}else if(m[i.id]){q[m[i.id]]=i.value;fill()}
 else if(i.id==='ob'){S.cfg.opening=Math.round(parseFloat(String(i.value).replace(/,/g,''))*100)||0;await saveCfg();toast('Saved')}
 else if(i.id==='sday'){setStart(+i.value);S.m=curM();await saveCfg();toast('Month now starts on day '+i.value);route()}
 else if(i.id==='tot'){S.cfg.total=toMinor(i.value);await saveCfg();toast('Saved');route()}
 else if(i.id==='dl'){S.cfg.daily=toMinor(i.value);await saveCfg();toast('Saved')}
 else if(i.id==='file'&&i.files[0]){await importBackup(i.files[0]);i.value=''}
 else if(i.id==='sfile'&&i.files[0]){await stmt(i.files[0]);i.value=''}});
document.addEventListener('submit',async e=>{if(e.target.id!=='gf')return;e.preventDefault();const F=e.target,t=toMinor(F.t.value),n=F.n.value.trim(),er=m=>{$('#err').textContent=m};
 if(!n)return er('Give the goal a name.');if(!t)return er('Enter a target amount greater than zero.');
 const G=S.cfg.goals||(S.cfg.goals=[]),old=G.find(g=>g.id===S.gid),g={id:old?old.id:uid(),name:n,target:t,saved:toMinor(F.s.value)||0,date:F.d.value,created:old?old.created:iso(new Date())};
 if(old)Object.assign(old,g);else G.push(g);await saveCfg();$('#f').close();toast('Goal saved');route()});
window.addEventListener('hashchange',()=>{S.dlock=null;scrollTo(0,0);route()});
(async()=>{try{await load();route();if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js').catch(()=>{});
 const inst=matchMedia('(display-mode: standalone)').matches||navigator.standalone;if(!inst)setTimeout(()=>{toast('Add Ledgr to your Home Screen to avoid data getting cleared. Browser Menu(⋮) → Add to Home Screen.','',null,6000)},1200)}
 catch(e){console.error('Ledgr startup/storage error:',e);$('#v').innerHTML=`<div class="pad"><h1>Storage unavailable</h1><p>Ledgr couldn't access this browser's local database.</p><small>${E(e?.name||'Unknown error')}: ${E(e?.message||String(e))}</small></div>`}})();
