var card_1 =null;
var card_2 =null;   
var lock = false;
var score = 0;
var tries = 0;
var len = 16;
const cards = document.querySelectorAll('.game-card'); 
cards.forEach(card => {
    card.addEventListener('click', () => {
        
      //  console.log(length);
        if(card.classList.contains('flip')){  
           //     console.log("opened");
        return;
        }
        if (lock){
            return;
        }   

        
        card.classList.add('flip');
        if(card_1 === null){
            card_1 = card;
        }else if(card_2 === null){
            card_2 = card;
            lock = true;  
        }   

        if(card_1 !== null && card_2 !== null){      
            var img_1 = card_1.firstElementChild.src;
            var img_2 = card_2.firstElementChild.src;
            
            if(img_1 === img_2){
                lock = false;
                card_1=null;
                card_2=null;
                score++;
                if(score === len/2){
                    showWins();
                }

            }else{
                setTimeout(() => {    
                    card_1.classList.remove('flip');
                    card_2.classList.remove('flip');
                    card_1=null;
                    card_2=null;
                    lock =false;
                    wrongTries();
                }, 500 );
            }
        }    
     
    });  
});

/// restart game  
const restart = document.querySelector('.restart-btn');

restart.addEventListener('click', restartGame);
function restartGame(){
    lock = true;
    card_1 = null;
    card_2 = null;
    score = 0;
    tries = 0;

    cards.forEach(card => {
        card.classList.remove("flip");
    });

    wrongT.textContent = tries;
        setTimeout(() => {
            shuffle(len);
            lock = false;
        }, 500);
}

function  showWins(){
    setTimeout(() => { 
        var win=  confirm("You won the game! Do you want to restart?");
        if(win){
            restartGame();
        }
    }, 1000);
}

const wrongT = document.querySelector('.tries-messages span');
function wrongTries(){
    tries ++;
    wrongT.textContent = tries; 
}


// SHUFFLE CARDS
function shuffle(length=16)
{
            cards.forEach(card => {
            var order = Math.floor(Math.random() * length);
            card.style.order = order;   
        });

}

shuffle();


///////////////// for level 2  

const level2 = document.querySelector('.level2-btn');
level2.addEventListener('click', level2Game);  

function level2Game(){
    len= 24;
    restartGame();
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.c2').style.display = 'grid';
    document.querySelector('.level1-btn').style.display = 'inline-block';
    document.querySelector('.level2-btn').style.display = 'none';

}

const level1 = document.querySelector('.level1-btn');
level1.addEventListener('click', level1Game);  
function level1Game(){
    len = 16;
    restartGame();
    document.querySelector('.main-container').style.display = 'grid';
    document.querySelector('.c2').style.display = 'none';
    document.querySelector('.level1-btn').style.display = 'none';
    document.querySelector('.level2-btn').style.display = 'inline-block';

}   
