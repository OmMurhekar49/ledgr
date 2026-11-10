'use strict';
/* Bank statement import. Everything runs locally in the browser; the file is never uploaded. */
const MON={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
function pd(v){let r='',m;
 if(v instanceof Date&&!isNaN(v)){const mn=v.getHours()*60+v.getMinutes();r=iso(mn>=1430||mn<=10?new Date(v.getTime()+9e5):v)}
 else{v=String(v??'').trim();
  if(m=v.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/))r=m[1]+'-'+p2(m[2])+'-'+p2(m[3]);
  else if(m=v.match(/^(\d{1,2})[-\/. ](\d{1,2})[-\/. ](\d{2,4})/)){let y=+m[3];if(y<100)y+=2000;r=y+'-'+p2(m[2])+'-'+p2(m[1])}
  else if(m=v.match(/^(\d{1,2})[-\/ ]([A-Za-z]{3})[a-z]*[-\/ ,]*(\d{2,4})/)){const mo=MON[m[2].toLowerCase()];let y=+m[3];if(mo){if(y<100)y+=2000;r=y+'-'+p2(mo)+'-'+p2(m[1])}}
  else if(m=v.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}),? (\d{4})/)){const mo=MON[m[1].toLowerCase()];if(mo)r=m[3]+'-'+p2(mo)+'-'+p2(m[2])}}
 if(!r)return'';const d=new Date(r+'T00:00');return isNaN(d)||iso(d)!==r?'':r}
const pn=v=>{if(typeof v==='number')return v;const n=parseFloat(String(v??'').replace(/[₹,\s]/g,'').replace(/^\((.*)\)$/,'-$1').replace(/(cr|dr)\.?$/i,''));return isNaN(n)?0:n};
function csvRows(txt){const head=txt.split('\n').slice(0,30).join('\n'),dl=[',',';','\t','|'].map(d=>[d,head.split(d).length]).sort((a,b)=>b[1]-a[1])[0][0],rows=[];let r=[],c='',q=false;
 for(let i=0;i<txt.length;i++){const ch=txt[i];if(q){if(ch==='"'){if(txt[i+1]==='"'){c+='"';i++}else q=false}else c+=ch}else if(ch==='"')q=true;else if(ch===dl){r.push(c);c=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&txt[i+1]==='\n')i++;r.push(c);c='';rows.push(r);r=[]}else c+=ch}
 r.push(c);rows.push(r);return rows}
async function fileRows(f){const n=f.name.toLowerCase();
 if(n.endsWith('.pdf'))throw new Error('PDF statements cannot be read reliably. Please download the CSV or Excel version from your net banking.');
 if(/\.xlsx?$/.test(n)){if(!window.XLSX)throw new Error('Excel reader did not load. Reload the page and try again.');const wb=XLSX.read(await f.arrayBuffer(),{type:'array',cellDates:true});return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:''})}
 return csvRows((await f.text()).replace(/^\uFEFF/,''))}
function detect(rows){for(let i=0;i<Math.min(rows.length,60);i++){const hr=rows[i].map(x=>String(x??'').trim()),h=hr.map(x=>x.toLowerCase()),f=(re,not)=>h.findIndex((x,k)=>k!==not&&re.test(x));
  const ty=f(/dr.?\/?cr|cr.?\/?dr|indicator|^type$|^txn type|^transaction type/),di=(k=>k>=0?k:f(/date/))(f(/^(txn |transaction |tran |trans |posting )?date$/)),ds=f(/narration|description|particulars|details|remarks|transactio|transaction|particular|detail|remark/),
   dr=f(/debit|withdrawal|paid out|^dr\.?$/,ty),cr=f(/credit|deposit|paid in|^cr\.?$/,ty),am=f(/^amount|txn amount|transaction amount/,ty);
  if(di>=0&&ds>=0&&(dr>=0||cr>=0||am>=0))return{hi:i,di,ds,dr,cr,am,ty,rf:f(/ref|chq|cheque/),hr}}return null}
function parseStmt(rows){const d=detect(rows);if(!d)return null;const list=[];
 for(let i=d.hi+1;i<rows.length;i++){const r=rows[i],date=pd(r[d.di]);if(!date)continue;let a=0,type='expense';
  if(d.dr>=0&&pn(r[d.dr])>0)a=pn(r[d.dr]);else if(d.cr>=0&&pn(r[d.cr])>0){a=pn(r[d.cr]);type='income'}
  else if(d.am>=0){const raw=String(r[d.am]).trim(),v=pn(r[d.am]),t=d.ty>=0?String(r[d.ty]).trim().toLowerCase():'';a=Math.abs(v);type=t?(/^c/.test(t)?'income':'expense'):/cr\.?$/i.test(raw)?'income':/dr\.?$/i.test(raw)?'expense':v<0?'expense':'income'}
  if(!(a>0))continue;list.push({date,desc:String(r[d.ds]??'').replace(/\s+/g,' ').trim(),type,amountMinor:Math.round(a*100),ref:d.rf>=0?String(r[d.rf]??'').trim():''})}
 return{d,list}}
function merch(s){let m=s;const p=s.split(/[-\/]/);if(/^upi$/i.test(p[0].trim()))m=p.find((x,i)=>i>0&&!/^\d+$/.test(x.trim())&&x.trim().length>1)||s;
 else{const q=s.match(/^(?:POS|ECOM|NEFT|IMPS|ACH|NACH|ATW|ATM)[-\/ ]+(?:[A-Z0-9]+[-\/ ]+)?([^-\/]{3,})/i);if(q)m=q[1]}
 return m.replace(/[^\w &.']/g,' ').replace(/\s+/g,' ').trim().slice(0,30).toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}
const RL=[[/swiggy|zomato|eatsure/,'Food','Delivery'],[/zepto|blinkit|bigbasket|dmart|jiomart|instamart|grofers/,'Food','Groceries'],[/restaurant|cafe|dominos|kfc|mcdonald|pizza|starbucks|biryani/,'Food','Restaurants'],
 [/uber|olacabs|\bola\b|rapido|meru/,'Transport','Taxi/Ride-hailing'],[/petrol|hpcl|bpcl|iocl|indian ?oil|fuel|fastag/,'Transport','Fuel'],[/irctc|makemytrip|goibibo|indigo|air ?india|redbus|yatra/,'Travel',''],
 [/amazon|flipkart|myntra|ajio|meesho|nykaa/,'Shopping','Online shopping'],[/netflix|spotify|hotstar|prime ?video|youtube|jiocinema|sonyliv|zee5/,'Subscriptions','Streaming'],
 [/airtel|\bjio\b|vodafone|\bvi\b|bsnl|recharge/,'Bills & Utilities','Mobile'],[/electricity|bescom|mseb|msedcl|tata ?power|adani ?elec|bses/,'Bills & Utilities','Electricity'],[/broadband|fibernet|hathway|wifi/,'Bills & Utilities','Internet'],
 [/apollo|pharmacy|medplus|1mg|netmeds|hospital|clinic|diagnostic/,'Health',''],[/\brent\b/,'Home','Rent'],
 [/salary|payroll|\bsal\b/,'Income','Salary'],[/interest|int\.? ?pd|int\.? ?cr/,'Income','Interest'],[/refund|reversal|cashback/,'Income','Refund']];
const learn=()=>{const m=new Map();S.tx.forEach(t=>{if(t.merchant&&t.merchant.length>=3&&t.categoryId!=='unc'&&t.type!=='transfer')m.set(t.merchant.toLowerCase(),[t.categoryId,t.subcategoryId||''])});return m};
function guess(x,L){const s=x.desc.toLowerCase();for(const[k,v]of L)if(s.includes(k))return v;
 for(const[re,cn,sn]of RL){if((x.type==='income')!==(cn==='Income'))continue;if(re.test(s)){const c=S.cfg.cats.find(c=>c.name.toLowerCase()===cn.toLowerCase());if(c){const sb=c.subs.find(z=>z.name.toLowerCase()===sn.toLowerCase());return[c.id,sb?sb.id:'']}}}
 return['unc','']}
const dk=t=>t.date+'|'+t.type+'|'+t.amountMinor;
let ST=null;
async function stmt(file){let rows;try{rows=await fileRows(file)}catch(e){return toast(e.message,'',null,7000)}
 const p=parseStmt(rows);if(!p)return toast("Couldn't find the columns. The file needs a header row with Date, Description or Narration, and Debit/Credit (or Amount). Nothing was changed.",'',null,8000);
 if(!p.list.length)return toast('No transactions were found under the header row. Nothing was changed.','',null,6000);
 if(!S.cfg.accounts.length)return toast('Add an account in Settings first.');
 const cnt={},L=learn();S.tx.forEach(t=>{const k=dk(t);cnt[k]=(cnt[k]||0)+1});
 p.list.forEach(x=>{const k=dk(x);if(cnt[k]>0){cnt[k]--;x.dup=true;return}x.merchant=merch(x.desc);[x.categoryId,x.subcategoryId]=guess(x,L)});
 ST=p;const nw=p.list.filter(x=>!x.dup),un=nw.filter(x=>x.categoryId==='unc').length,d=p.d,h=d.hr,colz=[['date',d.di],['description',d.ds],['debit',d.dr],['credit',d.cr],['amount',d.am]].filter(x=>x[1]>=0).map(x=>`${x[0]}: ${E(h[x[1]])}`).join(', ');
 openD(`<h2 class="dt">Import bank statement</h2><p class="mut">${E(file.name)}</p><div class="imp3"><span><b>${nw.length}</b><small>new</small></span><span><b>${p.list.length-nw.length}</b><small>already here</small></span><span><b>${un}</b><small>need a category</small></span></div><small>Detected columns: ${colz}</small>
 <label class="fld">This statement is for account<select id="sacc">${S.cfg.accounts.map(a=>`<option value="${a.id}"${a.name==='UPI'?' selected':''}>${E(a.name)}</option>`).join('')}</select></label>
 <div class="pv">${nw.slice(0,6).map(x=>{const c=cat(x.categoryId),sb=sub(c,x.subcategoryId);return`<div class="pvr">${tile(x.categoryId)}<span class="tn"><b>${E(x.merchant||'-')}</b><small>${fd(x.date)} · ${E(c.name)}${sb?' · '+E(sb):''}</small></span><em class="${x.type}">${x.type==='income'?'+':'-'}${M(x.amountMinor)}</em></div>`}).join('')}</div>${nw.length>6?`<small>and ${nw.length-6} more</small>`:''}
 <p class="mut">Check that income and expenses look right. Rows that need a category are shown first after the import so you can fix them. The app learns from your fixes.</p><div class="acts"><button type="button" class="sec" data-act="close">Cancel</button><button type="button" class="btn grow" data-act="stgo"${nw.length?'':' disabled'}>Import ${nw.length}</button></div>`)}
async function stgo(){if(!ST)return;const acc=$('#sacc').value,now=new Date().toISOString(),
 add=ST.list.filter(x=>!x.dup).map(x=>({id:uid(),amountMinor:x.amountMinor,currency:'INR',type:x.type,description:x.desc,merchant:x.merchant,categoryId:x.categoryId,subcategoryId:x.subcategoryId,accountId:acc,toAccountId:'',date:x.date,time:'',timestamp:new Date(x.date+'T00:00').getTime(),notes:'',tags:['imported'],recurring:false,createdAt:now,updatedAt:now,ref:x.ref,src:'import'}));
 try{await run(s=>add.forEach(t=>s.put(t)))}catch(e){return toast('Could not save the import. Nothing was changed.','',null,6000)}
 S.tx=[...S.tx,...add];ST=null;$('#f').close();S.q={s:'',type:'',cat:add.some(t=>t.categoryId==='unc')?'unc':'',sort:'new',f:'',t:'',lim:150};location.hash='#/tx';route();toast('Imported '+add.length+' transactions')}
