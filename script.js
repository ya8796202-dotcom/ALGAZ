const puzzles=[
{question:"إذا كان 5 رجال يحتاجون 5 دقائق لصنع 5 كراسي، فكم دقيقة يحتاج 10 رجال لصنع 10 كراسي؟",options:["5 دقائق","10 دقائق","15 دقائق","20 دقائق"],answer:0},
{question:"ما هو الرقم التالي في التسلسل: 1, 1, 2, 3, 5, 8, 13, ...؟",options:["18","21","23","25"],answer:1},
{question:"أب عمره 45 سنة وابنه عمره 15 سنة. بعد كم سنة يصبح عمر الأب ضعف عمر الابن؟",options:["10 سنوات","15 سنوات","20 سنوات","25 سنوات"],answer:1},
{question:"إذا كان سعر كتاب 20 دولاراً بعد خصم 20%، فما كان سعره الأصلي؟",options:["22 دولار","24 دولار","25 دولار","28 دولار"],answer:2},
{question:"ما هو الشكل المختلف في المجموعة التالية: مربع، مثلث، دائرة، مكعب؟",options:["مربع","مثلث","دائرة","مكعب"],answer:3},
{question:"إذا كان اليوم الأربعاء، فما اليوم بعد 100 يوم من الآن؟",options:["الخميس","الجمعة","السبت","الأحد"],answer:1},
{question:"أي كلمة لا تنتمي للمجموعة: تفاح، موز، برتقال، جزر؟",options:["تفاح","موز","برتقال","جزر"],answer:3},
{question:"ما هو الرقم المفقود: 2, 6, 12, 20, 30, ?",options:["40","42","44","46"],answer:1}
];

let currentPuzzle=0,score=0,timeLeft=60,timer,gameActive=false;
const startScreen=document.getElementById('start-screen'),
      gameScreen=document.getElementById('game-screen'),
      endScreen=document.getElementById('end-screen'),
      startBtn=document.getElementById('start-btn'),
      restartBtn=document.getElementById('restart-btn'),
      scoreValue=document.getElementById('score-value'),
      timerValue=document.getElementById('timer-value'),
      questionElement=document.getElementById('question'),
      optionsElement=document.getElementById('options'),
      resultMessage=document.getElementById('result-message'),
      finalScore=document.getElementById('final-score'),
      performanceElement=document.getElementById('performance'),
      celebrationElement=document.getElementById('celebration'),
      progressBar=document.getElementById('progress'),
      flash=document.getElementById('flash'),
      bgMusic=document.getElementById('bg-music');

startBtn.addEventListener('click',startGame);
restartBtn.addEventListener('click',()=>{endScreen.classList.remove('active');startScreen.classList.add('active');});

function startGame(){
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    currentPuzzle=0; score=0; timeLeft=60; gameActive=true;
    updateScore(); updateTimer(); loadPuzzle();
    timer=setInterval(updateTimer,1000);
    bgMusic.play().catch(()=>{});
}

function updateTimer(){
    timeLeft--;
    timerValue.textContent=timeLeft;
    progressBar.style.width=((60-timeLeft)/60)*100+'%';
    if(timeLeft<=0) endGame();
}

function updateScore(){scoreValue.textContent=score;}

function loadPuzzle(){
    if(currentPuzzle>=puzzles.length){endGame();return;}
    const puzzle=puzzles[currentPuzzle];
    questionElement.textContent=puzzle.question;
    optionsElement.innerHTML=''; resultMessage.textContent=''; resultMessage.className='result-message';
    puzzle.options.forEach((option,index)=>{
        const optionElement=document.createElement('div');
        optionElement.className='option';
        optionElement.textContent=option;
        optionElement.addEventListener('click',()=>checkAnswer(index));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex){
    if(!gameActive) return;
    const puzzle=puzzles[currentPuzzle];
    const options=document.querySelectorAll('.option');
    options.forEach(option=>option.style.pointerEvents='none');
    if(selectedIndex===puzzle.answer){
        options[selectedIndex].classList.add('correct');
        resultMessage.textContent='إجابة صحيحة! +10 نقاط';
        resultMessage.classList.add('correct-message');
        score+=10; updateScore();
    }else{
        options[selectedIndex].classList.add('wrong');
        options[puzzle.answer].classList.add('correct');
        resultMessage.textContent='إجابة خاطئة!';
        resultMessage.classList.add('wrong-message');
    }
    setTimeout(()=>{currentPuzzle++; if(currentPuzzle<puzzles.length && timeLeft>0) loadPuzzle(); else endGame();},2000);
}

function endGame(){
    gameActive=false;
    clearInterval(timer);
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');
    finalScore.textContent=score;
    let performanceText='';
    if(score>=70){performanceText='مستوى عبقري! أنت ذكي حقاً!'; createFireworks();}
    else if(score>=50){performanceText='أداء جيد! لديك مهارات تفكير منطقي ممتازة.';}
    else if(score>=30){performanceText='ليس سيئاً! يمكنك تحسين مهاراتك بالممارسة.';}
    else{performanceText='تحتاج إلى تطوير مهارات التفكير المنطقي لديك.';}
    performanceElement.textContent=performanceText;
}

function createFireworks(){
    celebrationElement.innerHTML='';
    for(let i=0;i<50;i++){
        const firework=document.createElement('div');
        firework.className='firework';
        firework.style.backgroundColor=getRandomColor();
        firework.style.animationDelay=Math.random()*1.5+'s';
        celebrationElement.appendChild(firework);
    }
}

function getRandomColor(){
    const colors=['#ff9a3c','#ff6b6b','#4ecdff','#6bff6b','#ff4cd9'];
    return colors[Math.floor(Math.random()*colors.length)];
}

function flashEffect(){flash.classList.add('active'); setTimeout(()=>flash.classList.remove('active'),400);}

document.addEventListener('click',()=>{
    const clickSound=new Audio('sounds/click.mp3');
    clickSound.currentTime=0; clickSound.play().catch(()=>{});
},{capture:true});
