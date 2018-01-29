// $(document).ready(function(){
//     var colors = ["#CCCCCC","#333333","#990099"];                
//     $('div').each(function() {
//         var rand = Math.floor(Math.random()*colors.length);
//         $(this).css("color", colors[rand]);
//     });
// });
// this method will proxy your custom method with the original one

$(document).ready(function() {
    setTimeout(async function() {

        var i = 0;
        while(true){
            $('*').each(function() {

                if(Math.random() > 0.1){
                    return;
                }
                
                var docHeight = $(document).height(),
                docWidth = $(document).width(),
                $div = $(this),
                divWidth = $div.width(),
                divHeight = $div.height(),
                heightMax = docHeight - divHeight,
                widthMax = docWidth - divWidth;
            
                if(divWidth){
                    $div.attr('akif_width', divWidth);
                    $div.css('width', getRandomArbitrary(0.5, 2) * divWidth);        
                }
                if(divHeight){
                    $div.attr('akif_height', divHeight);
                    $div.css('height', getRandomArbitrary(0.5, 2) * divHeight);
                }
            });

            await window.screenshot(i);

            $('*[akif_width],*[akif_height]').each(function() {
                $div = $(this);
                
                if($div.attr('akif_width')){
                    $div.css('width', $div.attr('akif_width'));        
                }
                if($div.attr('akif_height')){
                    $div.css('height', $div.attr('akif_height'));        
                }
            });

            i++;
        }
    }, 2000);
});

function getRandomArbitrary(min, max) {

    var random = 1;
    while(random < 1.1 && random > 0.9){
        random = Math.random() * (max - min) + min
    }

    return random;
}