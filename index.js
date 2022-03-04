document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let width = 500;
    let height = 200;
    let player = { x: width/2, 
        y: height -5, 
        width: 5, 
        height: 5, 
        speed: 3, 
        velX: 0, 
        velY: 0,
        jumping: false,
        grounded: false,
    };
    let keys = [];
    let friction = 0.9;
    let gravity = 0.3;

    let boxes = []

    boxes.push({x: 0, y: 0, width: 10, height: height})
    boxes.push({x:0, y: height - 2, width: width, height: 50})
    boxes.push({x: width - 10, y: 0, width: 50, height: height})


    document.body.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    document.body.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    canvas.width = width;
    canvas.height = height;

    (function() {
        let requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;
    })();

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.beginPath();

        player.grounded = false;

        for (let i = 0; i < boxes.length; i++) {
            box = boxes[i]
            ctx.rect(box.x, box.y, box.width, box.height);
            let dir = colissionCheck(player, box);

            if (dir === 'l' || dir === 'r') {
                player.velX = 0;
                player.jumping = false
            } else if (dir === 'b') {
                player.grounded = true;
                player.jumping = false;
            } else if (dir == 't') {
                player.velY *=-1;
            }
        }

        if (player.grounded) {
            player.velY = 0;
        }

        player.x += player.velX;
        player.y += player.velY;

        ctx.fill();

        if (keys[38] || keys[32]) {
            if (!player.jumping && player.grounded) {
                player.jumping = true;
                player.grounded = false;
                player.velY = -player.speed*2
            }
        }

        if (keys['ArrowRight']) {
            
            if (player.velX < player.speed) {
                player.velX++;
            }
        }

        if (keys['ArrowLeft']) {
            
            if (player.velX > -player.speed) {
                player.velX--;
            }
        }

        player.velX *= friction;
        player.velY += gravity;
        // player.x += player.velX;
        // player.y += player.velY;

        // if (player.x >= width - player.width) {
        //     player.x = width-player.width;
        // } else if (player.x <= 0) {
        //     player.x = 0;
        // }

        // if (player.y >= height-player.height) {
        //     player.y = height - player.height;
        //     player.jumping = false;
        // }

        requestAnimationFrame(update);

        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function colissionCheck(shapeA, shapeB) {
        let vectX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width/2));
        let vectY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height/2));
        let halfWidth = (shapeA.width/2) + (shapeB.width/2)
        let halfHeight = (shapeA.height/2) + (shapeB.height/2)
        let colDir = null;

        if (Math.abs(vectX) < halfHeight && Math.abs(vectY) < halfHeight) {
            let oX = halfWidth - Math.abs(vectX)
            let oY = halfHeight - Math.abs(vectY)
            if (oX >= oY) {
                if (vectY > 0) {
                    colDir = 't';
                    shapeA.y += oY
                } else {
                    colDir = 'b';
                    shapeA.y -= oY
                }
            } else {
                if (vectX > 0) {
                    colDir = 'l';
                    shapeA.x += oX;
                } else {
                    colDir = 'r';
                    shapeA.x -= oX;
                }
            }
        }

        return colDir;
        
    }

    update();
})

