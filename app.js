const pointsEl=document.getElementById('points');
const scoreEl=document.getElementById('score');
const message=document.getElementById('message');
const rocket=document.getElementById('rocket');
let points=100, running=false, history=[];
function renderPoints(){pointsEl.textContent=points;}
document.getElementById('launch').addEventListener('click',()=>{
  if(running)return;
  running=true;
  let score=0;
  message.textContent='Rocket launched! Collecting points…';
  rocket.animate([{transform:'translate(0,0) rotate(-25deg)'},{transform:'translate(-18px,-28px) rotate(-25deg)'},{transform:'translate(0,0) rotate(-25deg)'}],{duration:850,iterations:3});
  const timer=setInterval(()=>{
    score+=10; scoreEl.innerHTML=score+' <small>PTS</small>';
    if(score>=50){
      clearInterval(timer); running=false; points+=score; renderPoints();
      history.unshift({score,when:new Date().toLocaleTimeString()});
      message.textContent='Great flight! You earned '+score+' points.';
    }
  },450);
});
const page=document.getElementById('page');
const pageText={
 home:['Welcome to NEXORA','Your rocket arcade dashboard.'],
 game:['Rocket Run','Launch your rocket and collect points.'],
 referral:['Referral','Invite friends to try the arcade. Referral rewards are disabled in this demo.'],
 history:['History',()=>history.length?history.map(x=>`${x.when} — ${x.score} points`).join('<br>'):'No completed flights yet.'],
 leaderboard:['Leaderboard','1. Nova — 1,240 pts<br>2. Sky — 980 pts<br>3. You — '+points+' pts'],
 profile:['Profile','Telegram Mini App demo profile<br>Points: '+points]
};
function showPage(name){
 const data=pageText[name]||pageText.home;
 page.innerHTML='<h3>'+data[0]+'</h3><p class="muted">'+(typeof data[1]==='function'?data[1]():data[1])+'</p>';
 document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
renderPoints();