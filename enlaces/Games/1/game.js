//definim les VARIABLES DEL JOC
var player;
var cursors;
var facing='right';
var jumpButton;
var layer;
var text;
var contador=0;
var nivells=0;
var monedes=0;
var seguent=false;
var index = 0;
var line = '';
var puntuacio=0;


//Disseny dels nivells: x: wall, o: coin, !: lava, p: plataforma, w: move-wall
var levels = [
    
    
   
    
    
    
            [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'p                                p',
            'p                 o              p',
            'p         o                  o   p',
            'p                        p  www  p',
            'p     o        p     p   p       p',
            'xxxxxxxxx!!xxxxx!!!!!xxxxp       p',
            'pppppppppppppppppppppppppp       p',
            'p                        p       p',
            'p   d                    p       p',
            'p                                p',
            'p   wwwwwwwwwwwwwwwwwwwwwp       p',
            'p              o         p       p',
            '!!!!!!!!!!!!!!!!!!!!!!!!!p!!!!!!!p'
        ],
        [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'p                                p',
            'p            o                   p',
            'p          !!p!!                 p',
            'pppwwxxxxxxxxxxxxxxxxxxxxxxxxo   p',
            'p!!!!                       pw   p',
            'pm     pw                   pm   p',
            'px     p         m          px   p',
            'p      pw        www        p    p',
            'px     pxxxxxx       ww  o   wxmmp',
            'p           p!!!!!!     xxx    ppp',
            'p           pxxxxxx            xxx',
            'pw           pppppp!!!!!!!!!!!!ppp',
            'p   o  ww         pxxxxxxxxxxxxx d',
            'p                                 ',
            '!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxx'
        ],
        [
    
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'p        wwwwwwwwwwwwwpwwwwwwwwwwwp',
            'p        wwwwwwwwwwwwwpwwwwwwwwwwwp',
            'p        wwwwwwwwwwwwwpwppppppppppp',
            'p        wwppppppwwwwwpwpwwwwpwwwwp',
            'p     o  wwwwwwwwwwwwwpwppowwwpwwwp',
            'xxxxxxxxxwwwwwwwwpppwwwwwwwwwppwwwp',
            'pwwwwwwwwwwwppwwwwwwwwwwwwpwwwwwwwp',
            'pwwwwwwwwwwwwpwwowwwpwwwwwpppppwwwp',
            'pwwwwwwwwwwwwpwwwwwwpwwwwwwpwwwwwwp',
            'pwwwwwwwwwwwwpwwwwwwpwwwwwwpdwwwwwp',
            'pwwwwwwwwwwwwpwwwwwwpwwpwwwp wwwwwp',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        ],
        
        [
                
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'p                                p',
            'p                                p',
            'p                                p',
            'ppp                              p',
            'p                             d  p',
            'p                        o       p',
            'p                      o         p',
            'p   o             o        o     p',
            'p              o         o       p',
            'p         o            o         p',
            'p      o                         p',
            'p                                p',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!s'    
                
            ],

        
        [
    
            '                                   ',
            '         p                         ',
            '         p                        d',
            '         p                o        ',
            'ppp   w  p                  pp    p',
            '      o  p                         ',
            '      w  p                         ',
            '      w                  pp        ',                                
            '      w                    p       ',
            '      m                     p      ',
            '      p   p            m           ',
            '                       p      p    ',
            '             o         p     p     ',
            '             w        ww    p      ',
            '                       w   p       ',
            '               mmm     p  p        ',  
            '               ppp     x           ',
            '                     ppp           ',
            '                                   ',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
        ],
        
         
        
        [
            
            '            c                      ',
            '                                   ',
            '                                   ',
            '                                   ',
            '                                   ',
            '                                   '
            
        
        ]
        
        
]


var mainState = {
    
    //funció per carregar imatges, sons,
    preload: function () {
        
        game.load.crossOrigin = 'anonymous';
        
        //imatges per crear els nivells
        game.load.image('wall', 'assets/terra2.png');
        game.load.image('coin', 'assets/coin2.png');
        game.load.image('enemy', 'assets/lava.png');
        game.load.image('paret', 'assets/paret.png');
        game.load.image('door', 'assets/porta.png');
        game.load.image('enemy2', 'assets/pincho.png');
        game.load.image('background', 'assets/fons1500.png');
        game.load.image('wall2', 'assets/paret.png');
        
        //crédits
        game.load.image('credits', 'assets/credits.png');
        
        // el jugador - sprite
        game.load.spritesheet('player', 'assets/style2.png', 33, 24);
        
        //carregar AUDIO: música i so moneda
        game.load.audio('coin', 'assets/coin.mp3');
        game.load.audio('music', 'assets/music.mp3');
        
       
    },

    create: function () {
        
        //per pujar de nivell
        if(seguent){
            nivells++;
            seguent=false;
        
         }
        
         //creem el fondo
        game.stage.backgroundImage = 'background';
        //habilitem el sistema ARCADE PHYSICS per activar la FÍSICA dels components (pels moviments i col.lisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //habilitem la física per a qualsevol objecte del joc.
        game.world.enableBody = true;
        
        //imatge del fondo
        bg = game.add.tileSprite(0, 0, 1250, 600, 'background');
        bg.fixedToCamera = true;


        //sprite del player     
        this.player= this.game.add.sprite(90,100,'player');
        this.player.frame = 10;
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        //animació del player
        this.player.animations.add('right', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 21, true);
        this.player.animations.add('turn', [10],21, true);
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],21, true);
        game.camera.follow(player);
        
        // Variable per emmagatzemar the arrow key pressed 
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        tecla = game.input.keyboard.addKey(Phaser.Keyboard.r);
       
        //So(moneda) i la música (del joc).
        so = this.game.add.audio('coin');
        music=this.game.add.audio('music');
        game.sound.setDecodedCallback([ music ], function(){
           // Es seguro usar los sonidos
        }, this);
        //para que la música no deje de sonar.
        music.loopFull();
    
         //el score
        scoreString = 'Score : ';
        scoreText = game.add.text(100, 80, scoreString + monedes, { font: '20px Arial', fill: '#fff' });

        //afegir vides
      
       
        //inicialitzem el plugin BEHAVIOR
        behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior); // init the Behavior plugin
        //afegim el sistema de comportament al player: activem el plugin en el jugador.
        behaviorPlugin.enable(this.player); // enable the plugin on the player

        // Add gravity to make it fall
        this.player.behaviors.set('platformer', Phaser.Behavior.Platformer, {
            velocity: 300,
            jumpStrength: 450,
            gravity: 1300
        });
        
        
        // Map Builder: creació dels grups que contindran els objectes
        this.walls = game.add.group();
        this.walls2 = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.enemies2 = game.add.group();
        this.doors = game.add.group();
        this.parets = game.add.group();
        this.retardeds = game.add.group();
        this.credits = game.add.group();
       
        //creació dels nivells
        var level = levels[nivells];
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                // Creem el mur i l'afegim al grup 'wall'
                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'wall');
                    this.walls.add(wall);
                    //per assegurar-nos que les parets no començaran a caure quan el player camini sobre ells.
                    wall.body.immovable = true
                }// Creem la plataforma i l'afegim al grup 'wall2'
                else if (level[i][j] === 'p') {
                    var wall2 = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'wall2');
                    this.walls2.add(wall2);
                    wall2.body.immovable = true;
                }// Creem la moneda i l'afegim al grup 'coin'
                else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'coin');
                    this.coins.add(coin);
                }// Creem la lava i l'afegim al grup 'enemy' 
                else if (level[i][j] === '!') {
                    var enemy = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'enemy');
                    this.enemies.add(enemy);
                }// Creem la porta i l'afegim al grup 'door' 
                else if (level[i][j] === 'd') {
                    var door = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'door');
                    this.doors.add(door);
                    door.body.immovable = true;
                }// Creem la paret i l'afegim al grup 'paret' 
                else if (level[i][j] === 'w') {
                    var paret = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'paret');
                    this.parets.add(paret);
                }// Creem els pintxos i l'afegim al grup 'enemy2' 
                else if (level[i][j] === 'm') {
                    var enemy2 = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'enemy2');
                    this.enemies2.add(enemy2);
                }//insertarem els credits
                else if (level[i][j] === 'c') {
                    var retarded = game.add.sprite(30 + 32 * j, 30 + 32 * i, 'credits');
                    this.credits.add(credits);
                    retarded.body.immovable = true;
                }
            }
        }

        // collision handlers
        this.player.behaviors.set('collide-on-wall', Phaser.Behavior.CollisionHandler, {
            targets: this.walls
        });
        
         this.player.behaviors.set('collide-on-wall2', Phaser.Behavior.CollisionHandler, {
            targets: this.walls2
        });
        
        this.player.behaviors.set('collide-on-paret', Phaser.Behavior.CollisionHandler, {
            targets: this.parets
        });
        
        
        this.player.behaviors.set('collide-on-enemy', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.enemies,
            collideCallback: this.restart
        });

        this.player.behaviors.set('collect-coin', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.coins,
            collideCallback: this.takeCoin
        });
        
        this.player.behaviors.set('collide-on-door', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.doors,
            collideCallback: this.passLevel
        });
        
        this.player.behaviors.set('collide-on-enemy2', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.enemies2,
            collideCallback: this.restart
        });
        this.player.behaviors.set('collide-on-retarded', Phaser.Behavior.CollisionHandler, {
            method: 'overlap',
            targets: this.retardeds,
            collideCallback: this.trampa
        });
    },
    
    
    //funció PER AGAFAR LA MONEDA.
    takeCoin: function (player, coin) {
        //decoficador del mp3-
        game.sound.setDecodedCallback([ so ], function(){
           // Es seguro usar los sonidos
        }, this);
        //per a què soni la moneda (play) quan agafem una moneda (coin.kill())
        so.play();
        coin.kill();
        //marcador
        monedes+=20;
        scoreText.text = scoreString + monedes;
        
    },
    
    //funció PER PASSAR NIVELL
    passLevel: function (player, door){
        seguent=true;
        puntuacio=monedes;
        music.stop();
        game.state.start('main');
        
    },
    
    
    trampa: function (player, retarded) {
        retarded.visibility = true;
    },
    
    //funció per REINICIAR - les monedes es posen a 0
    restart: function () {
        music.stop();
        monedes=puntuacio;
        game.state.start('main');
    },
    
    
     update: function() {
         //Per evitar que el personatge es caigui quan col.lisiona amb el terra.
        game.physics.arcade.collide(this.player, layer);
        
        // Move the player when an arrow key is pressed
           this.player.body.velocity.x = 0;
    
            if (cursors.left.isDown){
               this.player.body.velocity.x = -150;
            
                if (facing != 'left') {
                    this.player.animations.play('left');
                    facing = 'left';
                }
                
            } else if (cursors.right.isDown){
                
                this.player.body.velocity.x = 150;
            
                if (facing != 'right'){
                        this.player.animations.play('right');
                        facing = 'right';
                }
            
            } else {
            
                if (facing != 'idle'){
                    this.player.animations.stop();
            
                        if (facing == 'left'){
                           this.player.frame = 0;
                        } else {
                           this.player.frame = 21;
                        }
   
                        facing = 'idle';
                 }
            }
            
            // Fem saltar al jugador si toca el terra.
            if (jumpButton.isDown && this.player.body.onFloor() && game.time.now > jumpTimer) {
                    this.player.body.velocity.y = -250; //abans era this.player.body.velocity.y = -200; 
                    jumpTimer = game.time.now + 750;
            }
            
            
        }
  
};


var game = new Phaser.Game(1250, 600), behaviorPlugin;
game.state.add('main', mainState);
game.state.start('main');
