/* Sincronização com o Google Agenda (versão 2): cria, atualiza e remove eventos usando o ID de cada evento.
   Sem CLIENT_ID este arquivo não faz nada; os botões 📅 de cada remédio continuam funcionando. */
const GA={CLIENT_ID:'COLE_AQUI_SEU_CLIENT_ID.apps.googleusercontent.com',SCOPE:'https://www.googleapis.com/auth/calendar.events'};
(function(){
if(GA.CLIENT_ID.startsWith('COLE_AQUI'))return;
let tok=null,cl,busy=false,last='',prev='';
const U='https://www.googleapis.com/calendar/v3/calendars/primary/events';
const st=m=>{$('#gst').textContent=m;live(m)};
const nxt=(m,t)=>{const n=new Date(),[h,mi]=t.split(':').map(Number);let b=new Date(n.getFullYear(),n.getMonth(),n.getDate());if(m.ds){const[y,o,a]=m.ds.split('-').map(Number),z=new Date(y,o-1,a);if(z>b)b=z}let d=new Date(b.getFullYear(),b.getMonth(),b.getDate(),h,mi);for(let i=0;i<400&&(!m.days.includes(d.getDay())||d<n);i++)d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,h,mi);return d};
const L=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())+'T'+p2(d.getHours())+':'+p2(d.getMinutes())+':00';
const want=()=>{const o={};meds.forEach(m=>m.times.forEach(t=>o[m.id+'|'+t]={m,t,sig:JSON.stringify([m.name,m.dose,m.note,m.days,t,m.ds||'',m.de||''])}));return o};
const sig=()=>JSON.stringify(Object.entries(want()).map(([k,v])=>k+v.sig));
const body=(m,t)=>{const d=nxt(m,t),e=new Date(d.getTime()+9e5),tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
return{summary:'💊 '+m.name,description:('Tomar: '+m.dose+' '+m.note).trim()+'\nSiga sempre a receita.',start:{dateTime:L(d),timeZone:tz},end:{dateTime:L(e),timeZone:tz},
recurrence:['RRULE:'+(m.days.length===7?'FREQ=DAILY':'FREQ=WEEKLY;BYDAY='+m.days.map(i=>RD[i]).join(','))+(m.de?';UNTIL='+(([y,o,a])=>new Date(y,o-1,a,23,59,59).toISOString().replace(/[-:]/g,'').replace(/\.\d+Z$/,'Z'))(m.de.split('-').map(Number)):'')],
reminders:{useDefault:false,overrides:[{method:'popup',minutes:0}]},extendedProperties:{private:{relogioMed:m.id,relogioHora:t}}}};
const api=(me,id,b)=>fetch(U+(id?'/'+id:''),{method:me,headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:b?JSON.stringify(b):undefined});
async function sync(){
if(busy)return;
if(!tok){st('Entre com o Google para sincronizar.');return}
if(!navigator.onLine){st('Sem internet. Os horários continuam salvos no aplicativo e a sincronização fica pendente.');return}
busy=true;const ev=ld('rr_g2',{}),w=want();let er=0,n=0;
try{
for(const k in w){const{m,t,sig:s}=w[k],e=ev[k];
if(e&&e.sig===s)continue;
try{let r=e?await api('PATCH',e.id,body(m,t)):null;
if(!r||r.status===404||r.status===410)r=await api('POST','',body(m,t));
if(r.status===401){tok=null;throw 401}
if(!r.ok)throw r.status;
const j=await r.json();ev[k]={id:j.id,sig:s};n++}catch(x){er++;if(x===401)break}}
if(tok)for(const k in ev){if(w[k])continue;
try{const r=await api('DELETE',ev[k].id);
if(r.ok||r.status===404||r.status===410){delete ev[k];n++}else if(r.status===401){tok=null;er++;break}else er++}catch(x){er++}}
}finally{busy=false}
sv('rr_g2',ev);last=sig();
const h=hm(new Date());
st(!tok?'A conexão expirou. Toque em Entrar com o Google.':er?'Pendente: '+er+' alteração(ões) não chegaram ao Google Agenda. Toque em Sincronizar agora.':'✔ Sincronizado às '+h+(n?' ('+n+' alteração(ões)).':'. Nada a alterar.')+' Os avisos tocam na hora marcada.')}
function init(){
cl=google.accounts.oauth2.initTokenClient({client_id:GA.CLIENT_ID,scope:GA.SCOPE,callback:r=>{if(r.access_token){tok=r.access_token;st('Conectado. Sincronizando...');sync()}else st('Não foi possível entrar com o Google.')}});
const b=document.createElement('div');b.className='box';
b.innerHTML='<h3>Google Agenda automático</h3><p class="note">Ao cadastrar, editar ou excluir um remédio, o evento correspondente é criado, atualizado ou removido. Precisa estar conectado e com internet.</p><div class="row"><button class="pri" id="gin">Entrar com Google</button><button id="gsy">Sincronizar agora</button></div><p id="gst" class="note" role="status">Não conectado.</p>';
$('#gall').insertAdjacentElement('beforebegin',b);
$('#gin').onclick=()=>cl.requestAccessToken();$('#gsy').onclick=sync;
addEventListener('online',()=>{if(tok)sync()});
setInterval(()=>{const s=sig();if(tok&&!busy&&s!==last&&s===prev)sync();prev=s},4000)}
const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.onload=init;document.head.appendChild(s);
})();
