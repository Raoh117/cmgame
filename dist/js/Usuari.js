
$(document).ready(function(){
    var proba;
    var prov;
    $('#ensenyels').hide();
    //borrar
    $('.clicat').click(function() {
        $(".amagat").hide();
        proba=$(this).closest(".item"); 
        $('.pesao').click(function(){
            $(".amagat").slideDown();
            $('.OK').click(function(){
                $(proba).remove();
            });
        });
    });
    //vendre
       $('.prova').click(function() {
        prov=$(this);
        proba=$(this).closest(".item"); 
        $('#YES').click(function(){
            $(proba).addClass("amagat");
            $(proba).fadeTo( "slow" , 0.5, function() {
                // Animation complete.
            });
            $(prov).css("background-color", "red");
            $(prov).attr("disabled", true);
            $(proba).children('.clicat').hide();
            $(proba).find('a').bind('click', false);
        })
    });
    $('#amagals').click(function() {
        $('.amagat').hide();
        $(this).hide();
        $('#ensenyels').show();
    })
    $('#ensenyels').click(function() {
        $('.amagat').show();
        $(this).hide();
        $('#amagals').show();
    })
    
    $(document).mouseover(function(){
        $('.amagat').children('.prova').css("background-color", "red");
    })
    
    
});







/*
    $(document).on('click','#amagals',function() {
        $('.amagat').hide();
        $(this).hide();
        $('#ensenyels').show();
    })
    $(document).on('click','#ensenyels',function() {
        $('.amagat').show();
        $(this).hide();
        $('#amagals').show();
    })
*/