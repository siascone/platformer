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
        jumping: false
    };
    let keys = [];
    let friction = 0.9;
    let gravity = 0.3;


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
        if (keys['ArrowUp']) {
            if (!player.jumping) {
                player.jumping = true;
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
        player.x += player.velX;
        player.y += player.velY;

        if (player.x >= width - player.width) {
            player.x = width-player.width;
        } else if (player.x <= 0) {
            player.x = 0;
        }

        if (player.y >= height-player.height) {
            player.y = height - player.height;
            player.jumping = false;
        }

        requestAnimationFrame(update);

        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    update();
})

