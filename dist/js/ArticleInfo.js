$(function() 
	{
		$(".stars-16").children("li").hover(function() 
		{ 
			$(this).parent().children("li").css('background-position','0 0'); 
			var a=$(this).parent().children("li").index($(this));
			if (!$(this).hasClass("voted")) $(this).parent().children("li").slice(0,a+1).css('background-position','0 -15px')
		},function() { $(this).parent().children("li").css('background-position','0 0'); });
		
		$(".stars-24").children("li").hover(function() 
		{ 
			$(this).parent().children("li").css('background-position','0 0'); 
			var a=$(this).parent().children("li").index($(this));
			if (!$(this).hasClass("voted")) $(this).parent().children("li").slice(0,a+1).css('background-position','0 -21px')
		},function() { $(this).parent().children("li").css('background-position','0 0'); });
		
		$(".stars-32").children("li").hover(function() 
		{ 
			if (!$(this).hasClass("voted")) 
			{
				$(this).parent().children("li").css('background-position','0 0'); 
				var a=$(this).parent().children("li").index($(this));
				$(this).parent().children("li").slice(0,a+1).css('background-position','0 -27px');
			}
		},function() { $(this).parent().children("li").css('background-position','0 0'); });
		
		/* click */
		$(".stars").children("li:not(.voted)").click(function() 
		{ 
			if (!$(this).hasClass("voted")) 
			{
				var li=$(this);
				var ul=$(this).closest("ul");
				
				var txt=ul.find("span").data("txtoriginal");
				var id=ul.data("id");
				var valor=li.data("vote");
				
				alert("Voy a votar "+id+" con un valor de "+valor+" y el texto original era "+txt);
				$.getJSON( "voto.php", { id: id, voto: valor } )
				.done(function( json ) 
				{
					/* mostramos mensaje */
					ul.find("span").html(json.estado);
					/* actualizamos data */
					ul.find("span").data("txtoriginal",json.value+"/5 en "+json.votes+" votos");
					ul.addClass("ul_voted");
					ul.children("li").addClass("voted");
					/* cambiamos tamaño del div */
					var maximo_posible=5*json.votes;
					var porciento=json.suma*100/maximo_posible;
					porciento=porciento.toFixed(2);
					var txt=ul.find(".voted_percent").css("width",porciento+"%");
					setTimeout(function() { ul.find("span").html(ul.find("span").data("txtoriginal")); }, 3000);
				})
				.fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ', ' + error;
					ul.find("span").text(err);
				});
			}
		});
	});
	
	alert("AH");