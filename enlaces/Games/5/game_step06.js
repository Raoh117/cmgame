window.onload = function() {
	
	var player;
	var beast;
	var door;
	var muerto;
	var wallsBitmap;
	var floor;
	var lightAngle = Math.PI/4;
	var numberOfRays = 20;
	var rayLength = 100;
	var music;
	var scream;
	var done=true;
	function onPreload() {
		game.load.image("floor","floor.png");
		game.load.image("walls","walls.png");
		game.load.image("player","player.png");
		game.load.image("beast","BeastSS.png");
		game.load.image("porta","porta.png");
		game.load.image("muerto","maxresdefault.png");
		game.load.audio('music', 'music.mp3');
		game.load.audio('scream', 'scream.mp3');
	}

	function goFullScreen(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);
	}

	function onCreate() {
		goFullScreen();
		floor = game.add.sprite(0,0,"floor");
		wallsBitmap = game.make.bitmapData(1280,720);
		wallsBitmap.draw("walls");
		wallsBitmap.update();
		game.add.sprite(0,0,wallsBitmap);
		player = game.add.sprite(80,80,"player"); //80 80
		player.anchor.setTo(0.5,0.5);
		beast = game.add.sprite(1200,500,"beast"); //(1200,500,"beast");
		beast.anchor.setTo(0.9,0.9);
		door = game.add.sprite(1225,270,"porta"); //1225 270
		door.anchor.setTo(0.9,0.9);
		muerto = game.add.sprite(1150,650,"muerto"); //1225 270
		muerto.anchor.setTo(0.9,0.9);
		cursors = game.input.keyboard.createCursorKeys();
		maskGraphics = this.game.add.graphics(0, 0);
		floor.mask=maskGraphics
		player.mask=maskGraphics
		door.mask=maskGraphics
		beast.mask=maskGraphics
        music=this.game.add.audio('music');
        scream=this.game.add.audio('scream');
        music.play();
        muerto.visible = false;

        //para que la música no deje de sonar.
		
	}

	function onUpdate() {
		var xSpeed = 0;
		var ySpeed = 0;
		if(cursors.up.isDown){
			ySpeed -=1;
		}
		if(cursors.down.isDown){
			ySpeed +=1;
		}
		if(cursors.left.isDown){
			xSpeed -=1;
		}
		if(cursors.right.isDown){
			xSpeed +=1;
		}
		if(Math.abs(xSpeed)+Math.abs(ySpeed)<2 && Math.abs(xSpeed)+Math.abs(ySpeed)>0){
			var color = wallsBitmap.getPixel32(player.x+xSpeed+player.width/2,player.y+ySpeed+player.height/2);
			color+= wallsBitmap.getPixel32(player.x+xSpeed-player.width/2,player.y+ySpeed+player.height/2);
			color+=wallsBitmap.getPixel32(player.x+xSpeed-player.width/2,player.y+ySpeed-player.height/2)
			color+=wallsBitmap.getPixel32(player.x+xSpeed+player.width/2,player.y+ySpeed-player.height/2)
			if(color==0){
				player.x+=xSpeed;
				player.y+=ySpeed;
			}		
		}
		if(beast.x != player.x || beast.y != player.y){
			if(beast.x > player.x){
				beast.x -= 0.5;
			}
			if(beast.x < player.x){
				beast.x += 0.5;
			}
			if(beast.y > player.y){
				beast.y -= 0.5;
			}
			if(beast.y < player.y){
				beast.y += 0.5;
			}
		}else{
        	scream.play();
        	muerto.visible = true;
        	beast.x = 1200;
			beast.y = 500;
		}
		
		if(player.x  <= 1225 && player.x > 1200){
			if(player.y  <= 270 && player.y > 220){
				if (done){
					done=false;
					game.paused=true
	    			$.get("/Usuari/proba/5",
				        function(data,status){
				        	window.location.href = 'https://cmgames-raoh.c9users.io/Usuari/biblio/';
				            alert(data);
				      });
				}
				
			}
		}
		
		var k = game.input.keyboard;
        	if(k.isDown(13)){
        		muerto.visible = false;
        		restart();
        	}
		function restart(){
			player.x = 80;
			player.y = 80;
			beast.x = 1200;
			beast.y = 500;
		}
		var mouseAngle = Math.atan2(player.y-game.input.y,player.x-game.input.x);
		maskGraphics.clear();
		maskGraphics.lineStyle(2, 0xffffff, 1);
		maskGraphics.beginFill(0xffff00);
		maskGraphics.moveTo(player.x,player.y);	
		for(var i = 0; i<numberOfRays; i++){	
			var rayAngle = mouseAngle-(lightAngle/2)+(lightAngle/numberOfRays)*i
			var lastX = player.x;
			var lastY = player.y;
			for(var j= 1; j<=rayLength;j+=1){
          		var landingX = Math.round(player.x-(2*j)*Math.cos(rayAngle));
          		var landingY = Math.round(player.y-(2*j)*Math.sin(rayAngle));
          		if(wallsBitmap.getPixel32(landingX,landingY)==0){
					lastX = landingX;
					lastY = landingY;	
				}
				else{
					maskGraphics.lineTo(lastX,lastY);
					break;
				}
			}
			maskGraphics.lineTo(lastX,lastY);
		}
		maskGraphics.lineTo(player.x,player.y); 
     	maskGraphics.endFill();
		floor.alpha = 0.5+Math.random()*0.5;	
	}	
	
		var game = new Phaser.Game(1280,720,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});     
}