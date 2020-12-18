// Тоглоомыг бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлъя.
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч

var isNewGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;

// 2 тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores;

// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноог хадгалах хувьсагч
var roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоонд энд хадгалъя
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// Тоглоомын шинээр эхлэхэд бэлтгэнэ.
function initGame(){
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;

    // Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
    activePlayer = 0;

    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0,0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    //Програм эхлэхэд бэлтгэе
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //Тоглогчдын нэрийг буцааж гаргах
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");

    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");

    document.querySelector('.player-0-panel').classList.add("active");

    diceDom.style.display = "none";
}

//Шоо шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function(){
    if(isNewGame){
        // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчинд санамсаргүйгээр үүсгэж өгнө.
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.src = "dice-" + diceNumber + ".png";
            // document.querySelector(".dice").src = "dice-" + diceNumber + ".png";

        // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
        if(diceNumber !== 1){ 
            // 1ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
            roundScore = roundScore + diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
            switchToNextPlayer();
        }
    }else{
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлүүлнэ үү!");
    }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(isNewGame){
        // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноон дээр нь нэмж өгнө.
        scores[activePlayer] = scores[activePlayer] + roundScore;
        // if(activePlayer === 0) {
        //     scores[0] = score[0] + roundScore;
        // }else{
        //     scores[1] = score[1] + roundScore;
        // }

        // Дэлгэц дээр оноог өөрчилнө
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // Уг тоглогч хожсон эсэхийг шалгах
        if(scores[activePlayer] >= 100){
            // Тоглоомыг дууссан төлөвт оруулна
            isNewGame = false;

            // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
        }else{
            // Тоглогчийн ээлжийг солино
            switchToNextPlayer();
        }
    }else{
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлүүлнэ үү!");
    } 
})

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer(){
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ. Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болгоно. Үгүй бол идэвхтэй тоглогчийг 0 болго.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        // if(activePlayer === 0){
        //     activePlayer = 1;
        // }else{
        //     activePlayer = 0;
        // }

    // Улаан цэг болон саарал background ийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

// New Game буюу Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
