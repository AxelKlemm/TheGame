class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    x = 0;
    y = 0;
    xinertia = 0;
    yinertia = 0;
    images = [];
    width = 1;
    height = 1;
}


function init() {

    const c = document.getElementById('myCanvas');
    const context = c.getContext('2d');


    return {
        canvas: c,
        ctx: context,
        tree: [new Point(10, 10), new Point(1400, 350), new Point(100, 300), new Point(300, 300), new Point(450, 400), new Point(900, 350)]
    };
}

function input(e, cfg) {

    switch (e.which) {
        // space
        case 32:
            cfg.tree[0].yinertia -= 20;
            if (cfg.tree[0].yinertia < -20)
                cfg.tree[0].yinertia = -20;

            return;

            // arrow left
        case 37:
            cfg.tree[0].xinertia -= 20;
            if (cfg.tree[0].xinertia < -50)
                cfg.tree[0].xinertia = -50;

            return;

            // arrow right
        case 39:

            cfg.tree[0].xinertia += 20;
            if (cfg.tree[0].xinertia > 50)
                cfg.tree[0].xinertia = 50;
            return;
    }
}


function calc(cfg) {

    let gravity = 9;


    if (cfg.tree[0].x + cfg.tree[0].xinertia > 0)
        if ((cfg.tree[0].x + cfg.tree[0].xinertia) < (cfg.canvas.width - 50))
            cfg.tree[0].x += cfg.tree[0].xinertia;

    if (cfg.tree[0].y + cfg.tree[0].yinertia < (cfg.canvas.height - 50))
        cfg.tree[0].y += cfg.tree[0].yinertia;
    else {
        cfg.tree[0].yinertia = 0;
        cfg.tree[0].y = (cfg.canvas.height - 50);
    }


    if (cfg.tree[0].y + gravity < (cfg.canvas.height - 50) && (cfg.tree[0].y + gravity > -20))
        cfg.tree[0].y += gravity;
    else {
        gameover = true;
    }


    if (cfg.tree[0].xinertia > 1 || cfg.tree[0].xinertia < -1)
        cfg.tree[0].xinertia *= 0.95;
    else
        cfg.tree[0].xinertia = 0;

    if (cfg.tree[0].yinertia > 1 || cfg.tree[0].yinertia < -1)
        cfg.tree[0].yinertia *= 0.95;
    else
        cfg.tree[0].yinertia = 0;

    // collsion
    for (let i = 1; i < cfg.tree.length; i++) {
        if (collide(cfg.tree[0], cfg.tree[i]))
            gameover = true;
    }

    if (!gameover)
        for (let i = 1; i < cfg.tree.length; i++) {

            cfg.tree[i].x -= 2;
            if (i === 1)
                cfg.tree[i].x -= 2;
            if (cfg.tree[i].x < -100) {
                cfg.tree[i].x = cfg.canvas.width;

                cfg.tree[i].y = 10 + Math.random() * 350;
                if (i > 1)
                    cfg.tree[i].y = 300 + Math.random() * 150;
            }
        }


}

let highscore = 0;
let gameover = false;

function collide(a, b) {

    // left bottom a   

    if ((a.x > b.x) && (a.x < (b.x + b.width))) {

        if ((a.y > b.y) && (a.y < (b.y + (b.height)))) {
            return true;
        }
    }


    // right bottom a
    let an = a.x + a.width - 5;
    if ((an > b.x) && (an < (b.x + b.width)))
        if ((a.y > b.y) && (a.y < (b.y + b.height)))
            return true;

    return false;
}

function draw(cfg) {


    calc(cfg);

    cfg.ctx.clearRect(0, 0, cfg.canvas.width, cfg.canvas.height);

    cfg.ctx.beginPath();
    cfg.ctx.rect(0, 0, cfg.canvas.width, cfg.canvas.height);
    cfg.ctx.fillStyle = "#6495ED";
    cfg.ctx.fill();



    cfg.ctx.fillStyle = "black";
    cfg.ctx.font = "50px Arial";
    cfg.ctx.fillText(highscore, cfg.canvas.width - (parseInt(highscore / 1000) + 1) * 120, 50)

    if (gameover) {
        cfg.ctx.fillStyle = "black";
        cfg.ctx.font = "60px Arial";
        cfg.ctx.fillText("GAME OVER", cfg.canvas.width / 2 - 182, 205)
    }
    if (gameover) {
        cfg.ctx.fillStyle = "red";
        cfg.ctx.font = "60px Arial";
        cfg.ctx.fillText("GAME OVER", cfg.canvas.width / 2 - 180, 200)
    }
    //cfg.ctx.fillStyle = "#FF0000"
    //cfg.ctx.fillRect(cfg.tree[0].x, cfg.tree[0].y, 50, 50);
    cfg.ctx.drawImage(cfg.tree[0].images[0], 0, 0, 50, 50, cfg.tree[0].x, cfg.tree[0].y, 50, 50);

    cfg.ctx.drawImage(cfg.tree[1].images[0], 0, 0, 100, 50, cfg.tree[1].x, cfg.tree[1].y, 100, 50);

    for (let i = 2; i < cfg.tree.length; i++) {
        cfg.ctx.drawImage(cfg.tree[i].images[0], 0, 0, 100, 200, cfg.tree[i].x, cfg.tree[i].y, 100, 200);
    }
    cfg.ctx.beginPath();
    cfg.ctx.moveTo(0, 0);
    cfg.ctx.lineTo(cfg.canvas.width, 0);
    cfg.ctx.lineTo(cfg.canvas.width, cfg.canvas.height);
    cfg.ctx.lineTo(0, cfg.canvas.height);
    cfg.ctx.lineTo(0, 0);
    cfg.ctx.stroke();
}


(function main() {

    window.addEventListener('DOMContentLoaded', (event) => {
        console.log('loaded');
        const config = init();
        const Char = window.document.getElementById('char');
        const Obstacle = window.document.getElementById('obstacle');
        const Comet = window.document.getElementById('comet');

        config.tree[0].width = 50;
        config.tree[0].height = 50;

        config.tree[0].images[0] = Char;

        config.tree[1].width = 100;
        config.tree[1].height = 50;
        config.tree[1].images[0] = Comet;

        config.tree[5].width = 100;
        config.tree[5].height = 200;
        config.tree[5].images[0] = Obstacle;

        config.tree[2].width = 100;
        config.tree[2].height = 200;
        config.tree[2].images[0] = Obstacle;

        config.tree[3].width = 100;
        config.tree[3].height = 200;
        config.tree[3].images[0] = Obstacle;

        config.tree[4].width = 100;
        config.tree[4].height = 200;
        config.tree[4].images[0] = Obstacle;



        window.addEventListener('keydown', (event) => {
            input(event, config);
        });
        setInterval(draw, 10, config);
        setInterval(() => {
            if (!gameover) highscore += 1
        }, 1000);
    });
}());