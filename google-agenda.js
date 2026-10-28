/* Integração opcional com o Google Agenda (entrar com Google e enviar todos os remédios).
   Sem CLIENT_ID, este arquivo não faz nada e os botões 📅 de cada remédio continuam funcionando. */
const GA={CLIENT_ID:'COLE_AQUI_SEU_CLIENT_ID.apps.googleusercontent.com',SCOPE:'https://www.googleapis.com/auth/calendar.events'};
(function(){
if(GA.CLIENT_ID.startsWith('COLE_AQUI'))return;
let tok=null,cl;
const st=m=>{$('#gst').textContent=m;live(m)};
const nxt=(m,t)=>{const n=new Date(),[h,mi]=t.split(':').map(Number);let d=new Date(n.getFullYear(),n.getMonth(),n.getDate(),h,mi);for(let i=0;i<8&&(!m.days.includes(d.getDay())||d<n);i++)d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,h,mi);return d};
const L=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate())+'T'+p2(d.getHours())+':'+p2(d.getMinutes())+':00';
function init(){
cl=google.accounts.oauth2.initTokenClient({client_id:GA.CLIENT_ID,scope:GA.SCOPE,callback:r=>{if(r.access_token){tok=r.access_token;st('Conectado ao Google Agenda.')}else st('Não foi possível entrar.')}});
const b=document.createElement('div');b.className='box';
b.innerHTML='<h3>Google Agenda automático</h3><div class="row"><button class="pri" id="gin">Entrar com Google</button><button id="gsy">Enviar todos os remédios ao Google Agenda</button></div><p id="gst" class="note" role="status"></p>';
$('#gall').insertAdjacentElement('beforebegin',b);
$('#gin').onclick=()=>cl.requestAccessToken();
$('#gsy').onclick=sync}
async function sync(){
if(!tok){st('Entre com o Google primeiro.');return}
const tz=Intl.DateTimeFormat().resolvedOptions().timeZone,sent=ld('rr_g',{});let ok=0,sk=0,er=0;
for(const m of meds)for(const t of m.times){
const key=m.id+'|'+t+'|'+m.name+'|'+m.dose+'|'+m.days.join('');
if(sent[key]){sk++;continue}
const d=nxt(m,t),e=new Date(d.getTime()+9e5);
const body={summary:'💊 '+m.name,description:('Tomar: '+m.dose+' '+m.note).trim()+'\nSiga sempre a receita.',
start:{dateTime:L(d),timeZone:tz},end:{dateTime:L(e),timeZone:tz},
recurrence:['RRULE:'+(m.days.length===7?'FREQ=DAILY':'FREQ=WEEKLY;BYDAY='+m.days.map(i=>RD[i]).join(','))],
reminders:{useDefault:false,overrides:[{method:'popup',minutes:0}]}};
try{const r=await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify(body)});
if(r.ok){sent[key]=1;ok++}else{er++;if(r.status===401)tok=null}}catch(x){er++}}
sv('rr_g',sent);
st(ok+' enviado(s), '+sk+' já estavam na agenda, '+er+' com erro.'+(er?' Entre com o Google de novo e tente outra vez.':' Os avisos tocam na hora marcada.'))}
const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.onload=init;document.head.appendChild(s);
})();
