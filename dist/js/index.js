$(document).ready(function(){
	
	var correcte = false;
    $('#adalt').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
	
	$('#YES').click(function(){
	var usuari=$(this).closest('.item').data('usuari');
	alert(usuari);
	});
	
	$('#Pag').hide();
	$('.titol').hide();
	$('.item').mouseover(function(){
		$(this).children('.titol').show();
	})
	$('.item').mouseout(function(){
		$(this).children('.titol').hide();
	})
	
	if ($('#comprar').text() == " Comprar carro: 0.00 €") {
		$('.right').hide();
		//ho amago
	}
	
	$(document).on('click','.navbar-collapse.in',function(e) {
	        $(this).collapse('hide');
	});
	
	
	$('#confirm-purchase').click(function(){
		// accept only digits, dashes or spaces
		var value=$('#cardNumber').val();
		if (/[^0-9-\s]+/.test(value)) return false;
		
		// The Luhn Algorithm. It's so pretty.
		    var sum = 0, even = false;
			    value.split("").reverse().forEach(function(dstr){ d = parseInt(dstr);
			        sum += ((even = !even) ? d : (d < 5) ? d * 2 : (d - 5) * 2 + 1);
			      });
			      
			    if(sum % 10 == 0){
			    	alert("Targeta correcte");
			    	correcte = true;
			    	$('#Pag').show();
			    }else{
			    	correcte = false;
			    	alert("Targeta incorrecte");
			    }
		    
	});
})

