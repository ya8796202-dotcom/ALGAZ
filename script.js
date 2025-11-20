// أسئلة المراحل
const puzzles = [
    { stage:1, question:"إذا كان 5 رجال يحتاجون 5 دقائق لصنع 5 كراسي، فكم دقيقة يحتاج 10 رجال لصنع 10 كراسي؟", options:["5 دقائق","10 دقائق","15 دقائق","20 دقائق"], answer:0 },
    { stage:1, question:"ما هو الرقم التالي في التسلسل: 1,1,2,3,5,8,13,...؟", options:["18","21","23","25"], answer:1 },
    { stage:2, question:"اختر الشكل المختلف: ◼ ◻ ▲ ●", options:["◼","◻","▲","●"], answer:3 },
    { stage:2, question:"أي زوج لا ينتمي للمجموعة: 🟦🟧 🟩🟥 🟪🟨", options:["🟦🟧","🟩🟥","🟪🟨","لا شيء"], answer:3 },
    { stage:3, question:"ما هو العدد الذي يكمل النمط بسرعة؟ 2,4,8,16,...", options:["24","32","30","28"], answer:1 },
    { stage:3, question:"أي الرقم التالي أكبر سرعة في التفكير؟ 7,14,21,28,...", options:["32","35","36","40"], answer:1 }
];

let currentPuzzle=0, score=0, timeLeft=60, timer, gameActive=false;

const startScreen=document.getElementById('start-screen');
const gameScreen=document.getElementById('game-screen');
const endScreen=document.getElementById('end-screen');
const startBtn=document.getElementById('start-btn');
const restartBtn=document.getElementById('restart-btn');
const scoreValue=document.getElementById('score-value');
const timerValue=document.getElementById('timer-value');
const stageNumber=document.getElementById('stage-number');
const questionElement=document.getElementById('question');
const optionsElement=document.getElementById('options');
const resultMessage=document.getElementById('result-message');
const finalScore=document.getElementById('final-score');
const totalScore=document.getElementById('total-score');
const performanceElement=document.getElementById('performance');
const celebrationElement=document.getElementById('celebration');
const progressBar=document.getElementById('progress');

const correctSound=document.getElementById('correct-sound');
const wrongSound=document.getElementById('wrong-sound');
const backgroundMusic=document.getElementById('background-music');

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function startGame(){
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    currentPuzzle=0; score=0; timeLeft=60; gameActive=true;
    updateScore(); updateTimer(); loadPuzzle(); backgroundMusic.play();
    timer=setInterval(updateTimer,1000);
}

function restartGame(){
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
    backgroundMusic.pause(); backgroundMusic.currentTime=0;
}

function updateTimer(){
    if(!gameActive) return;
    timeLeft--;
    timerValue.textContent=timeLeft;
    progressBar.style.width=`${((60-timeLeft)/60)*100}%`;
    if(timeLeft<=0) endGame();
}

function updateScore(){ scoreValue.textContent=score; }

function loadPuzzle(){
    if(currentPuzzle>=puzzles.length){ endGame(); return; }
    const puzzle=puzzles[currentPuzzle];
    questionElement.textContent=puzzle.question;
    stageNumber.textContent=puzzle.stage;
    optionsElement.innerHTML=''; resultMessage.textContent=''; resultMessage.className='result-message';
    puzzle.options.forEach((option,index)=>{
        const optionElement=document.createElement('div');
        optionElement.className='option'; optionElement.textContent=option;
        optionElement.addEventListener('click',()=>checkAnswer(index));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex){
    if(!gameActive) return;
    const puzzle=puzzles[currentPuzzle];
    const options=document.querySelectorAll('.option');
    options.forEach(option=>{ option.style.pointerEvents='none'; });
    if(selectedIndex===puzzle.answer){
        options[selectedIndex].classList.add('correct'); resultMessage.textContent='إجابة صحيحة! +10 نقاط'; resultMessage.classList.add('correct-message'); score+=10; updateScore(); correctSound.play();
    } else {
        options[selectedIndex].classList.add('wrong'); options[puzzle.answer].classList.add('correct'); resultMessage.textContent='إجابة خاطئة!'; resultMessage.classList.add('wrong-message'); wrongSound.play();
    }
    setTimeout(()=>{ currentPuzzle++; if(currentPuzzle<puzzles.length && timeLeft>0){ loadPuzzle(); }else{ endGame(); } },2000);
}

function endGame(){
    gameActive=false; clearInterval(timer); gameScreen.classList.remove('active'); endScreen.classList.add('active');
    finalScore.textContent=score; totalScore.textContent=puzzles.length*10;
    let performanceText='';
    if(score>=50){ performanceText='مستوى عبقري! أحسنت!'; createFireworks(); }
    else if(score>=30){ performanceText='أداء جيد! لديك مهارات ممتازة.'; }
    else { performanceText='تحتاج إلى تطوير مهاراتك.'; }
    performanceElement.textContent=performanceText;
    backgroundMusic.pause(); backgroundMusic.currentTime=0;
}

function createFireworks(){
    celebrationElement.innerHTML='';
    for(let i=0;i<50;i++){
        const firework=document.createElement('div');
        firework.className='firework'; firework.style.backgroundColor=getRandomColor();
        firework.style.animationDelay=`${Math.random()*1.5}s`; celebrationElement.appendChild(firework);
    }
}

function getRandomColor(){
    const colors=['#ff9a3c','#ff6b6b','#4ecdff','#6bff6b','#ff4cd9'];
    return colors[Math.floor(Math.random()*colors.length)];
}
