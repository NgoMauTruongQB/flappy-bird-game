let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')

canvas.width = 400
canvas.height = 600

const img = new Image()
img.src = './assets/img/pngfind-flappy-bird.png'

let game = 'start'
let frame = 0

const start = {
    draw: function() {
        context.beginPath()
        context.drawImage(img, 768, 89, 29, 37, canvas.width/2-15, 90, 29, 37)
        context.drawImage(img, 458, 90, 152, 36, canvas.width/2-70, 150, 152, 36)
        context.drawImage(img, 469, 139, 79, 82, canvas.width/2-34, 230, 80, 82)
    }
}

const end = {
    draw: function() {
        context.beginPath()
        context.drawImage(img, 616, 90, 152, 33, canvas.width/2 - 70, 100, 152, 33)   
        context.drawImage(img, 0, 401, 183, 95, canvas.width/2 - 90, 200, 183, 95)
        context.drawImage(img, 560, 194, 66, 26, canvas.width/2 - 33, 300, 66, 26)
    }
}

const bg = {
    sX: 0,
    sY: 0,
    sW: 280,
    sH: 400,
    cX: 0,
    cY: 0,
    cW: 270,
    cH: 500,
    draw: function() {
        context.beginPath()
        context.drawImage(img, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
        context.drawImage(img, this.sX, this.sY, this.sW, this.sH, this.cX + 210, this.cY, this.cW, this.cH)
        context.drawImage(img, this.sX, this.sY, this.sW, this.sH, this.cX + 400, this.cY, this.cW, this.cH)
    }
}

// =============================================== GROUND CLASS ===================================================
class Ground {
    constructor(cX, cY) {
        this.sX = 459
        this.sY = 0
        this.sW = 262
        this.sH = 83
        this.cX = cX
        this.cY = cY
        this.cW = 300
        this.cH = 100
        this.dx = -2
    }

    draw() {
        context.beginPath()
        context.drawImage(img, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }
}


let arrGround = []

for(let i = 0; i < 3; i++) {
    let ground = new Ground(i * 258, 500)
    arrGround.push(ground)
}

function drawArrGround() {
    arrGround.forEach(ground => ground.draw())
}

function updateArrGround() {
    arrGround.forEach(ground => {
        ground.cX += ground.dx
    })

    if(arrGround[0].cX <= -262) {
        arrGround.splice(0, 1)
        let ground = new Ground(arrGround[1].cX + 258, 500)
        arrGround.push(ground)
    }
}

// =============================================== PIPES CLASS ===================================================


class Pipes {
    constructor(cX, cY, space) {
        this.cX = cX
        this.cY = cY
        this.cW = 44
        this.cH = 300
        this.space = space
        this.sXt = 87
        this.sYt = 502
        this.sXb = 129
        this.sYb = 502
        this.sW = 44
        this.sH = 252
        this.dx = -2
    }
    draw() {
        context.beginPath()
        context.drawImage(img, this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
        context.drawImage(img, this.sXb, this.sYb, this.sW, this.sH, this.cX, this.cY + this.cH + this.space, this.cW, this.cH)
    }
}

function random(min, max) {
    return Math.ceil(Math.random() * (max-min) + min)
}

let arrPipes = []

function newPipe() {
    for(let i = 1; i < 4; i++) {
        let pipe = new Pipes(random(300, 400)* i, random(0, -180), 180)
        arrPipes.push(pipe)
    }
}

newPipe()

function drawArrPipe() {
    arrPipes.forEach(pipe => pipe.draw())
}

function updateArrPipe() {
    arrPipes.forEach(pipe => {
        pipe.cX += pipe.dx
    })

    if(arrPipes[0].cX <= -44) {
        arrPipes.splice(0, 1)
        let pipe = new Pipes(arrPipes[arrPipes.length - 1].cX + random(200, 280), random(0, -200), random(100, 150))
        arrPipes.push(pipe)
    }
}

// =============================================== SCORE CLASS ===================================================

const arrNumber = [
    {name: 0, sX: 771, sY: 91, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 1, sX: 210, sY: 708, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 2, sX: 454, sY: 248, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 3, sX: 476, sY: 248, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 4, sX: 498, sY: 248, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 5, sX: 520, sY: 248, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 6, sX: 454, sY: 285, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 7, sX: 476, sY: 285, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 8, sX: 498, sY: 285, sW: 23, sH: 35, cW: 23, cH: 35},
    {name: 9, sX: 520, sY: 285, sW: 23, sH: 35, cW: 23, cH: 35},
]

class Score {
    constructor(value, cX, cY) {
        this.value = value
        this.cX = cX
        this.cY = cY
    }
    draw() {
        context.beginPath()
        if(this.value >= 10) {
            this.split = (this.value.toString()).split('')
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, canvas.width/2 -18, 60, number.cW, number.cH)
                }
                if(this.split[1] == number.name) {
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, canvas.width/2 + 2, 60, number.cW, number.cH)
                }
            })
        }
        else {
            this.split = this.value.toString()
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, canvas.width/2 -26, 60, number.cW, number.cH)
                }
            })
        }
    }
    drawSmall() {
        context.beginPath()
        if(this.value >= 10) {
            this.split = (this.value.toString()).split('')
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, this.cX -4, this.cY, number.cW/2, number.cH/2)
                }
                if(this.split[1] == number.name) {
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, this.cX + 4, this.cY, number.cW/2, number.cH/2)
                }
            })
        }
        else {
            this.split = this.value.toString()
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    context.drawImage(img, number.sX, number.sY, number.sW, number.sH, this.cX, this.cY, number.cW/2, number.cH/2)
                }
            })
        }
    }
}

let score = new Score(0, canvas.width/2 + 56, 230)
let maxScore = new Score(0, canvas.width/2 + 56, 262)

// =============================================== BIRD CLASS ===================================================

let endGameAudio = new Audio('./assets/sound/hit.mp3')
let endGameSound = true
let gettingPointAudio = new Audio('./assets/sound/point.mp3')

class Bird {
    constructor(cX, cY) {
        this.animate = [
            {sX: 177, sY: 510},
            {sX: 177, sY: 551},
            {sX: 177, sY: 590},
        ]
        this.sW = 32
        this.sH = 27
        this.cX = cX
        this.cY = cY
        this.cW = 32
        this.cH = 27
        this.i = 0
        this.v = 0
        this.a = 0.3
    }

    draw() {
        context.beginPath()
        if( game == 'start') {
            if(frame % 35 == 0) {
                this.i++
                if(this.i > 2) {
                    this.i = 0
                }
            }
        }
        if(game == 'play') {
            if(frame % 16 == 0) {
                this.i++
                if(this.i > 2) {
                    this.i = 0
                }
            }
        }
        context.drawImage(img, this.animate[this.i].sX, this.animate[this.i].sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }

    update() {
        if(game == 'play' || game == 'end') {
            this.v += this.a
            this.cY += this.v
        }

        // when bird touch the ground
        if(this.cY + this.cH + this.v >= 506) {
            if (endGameSound) {
                endGameAudio.play()
                endGameSound = false
            }
            game = 'end'
            this.v = 0
            this.cY = 506
        }

        // when bird touch pipe
        if( bird.cX + bird.cW > arrPipes[0].cX &&
            bird.cX < arrPipes[0].cX + arrPipes[0].cW &&
            ( bird.cY < arrPipes[0].cY + arrPipes[0].cH || bird.cY + bird.cH > arrPipes[0].cY + arrPipes[0].cH + arrPipes[0].space)
        ) {
            if (endGameSound) {
                endGameAudio.play()
                endGameSound = false
            }
            game = 'end'
        }

        //when getting point
        if( bird.cX == arrPipes[0].cX + 44 || bird.cX == arrPipes[0].cX + 45) {
            score.value++
            gettingPointAudio.play()
            maxScore.value = Math.max(score.value, maxScore.value)
        }

    }
}

let bird = new Bird(128, 220)

// =============================================== MEDAL CLASS ===================================================

class Medal {
    constructor(i) {
        this.sX = 187
        this.sY = [401, 438, 2000]
        this.sW = 39
        this.sH = 38
        this.cX = canvas.width/2 - 68
        this.cY = 234
        this.cW = 39
        this.cH = 38
        this.i = i
    }

    draw() {
        context.beginPath()
        context.drawImage(img, this.sX, this.sY[this.i], this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }

    update() {
        if(score.value == 0) {
            this.i = 2
        }
        if( score.value == maxScore.value) {
            this.i = 1
        } else if(score.value >= maxScore.value / 2 && score.value < maxScore.value) {
            this.i = 0
        } else {
            this.i = 2
        }
    }
}

let medal = new Medal(0)

let swingAudio = new Audio('./assets/sound/sfx_wing.mp3')

// =============================================== HANDLE EVENT ===================================================

canvas.addEventListener('click', function(e) {
    switch (game) {
        case 'start':
            swingAudio.play()
            game = 'play'
            break
        case 'play':
            swingAudio.play()
            bird.v = -6
            break
        case 'end':
            if( e.offsetX > canvas.width/2 - 33 && e.offsetX < canvas.width/2 + 33 && e.offsetY > 300 && e.offsetY < 346) {
                score.value = 0
                arrPipes = []
                newPipe()
                bird.v = 0
                bird.cY = canvas.height / 2
                endGameSound = true
                game = 'start'
            }
            break
    }
})

function draw(){
    bg.draw()
    if(game == 'start') {
        start.draw()
    }
    drawArrPipe()
    drawArrGround()
    if(game == 'play') {
        score.draw()
    }
    bird.draw()
    if(game == 'end') {
        end.draw()
        score.drawSmall()
        maxScore.drawSmall()
        medal.draw()
    }
}

function update() {
    if(game == 'play') {
        updateArrPipe()
        updateArrGround()
    }
    bird.update()
    medal.update()
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    frame++
    draw()
    update()
}

animate()