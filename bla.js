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
            var elementChanged = false;

            $('*').each(function() {

                var currentElementChanged = false;
                if(Math.random() > 0.001){
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
                    $div.css('width', getRandomArbitrary(0.1, 2) * divWidth);        
                    
                    elementChanged = true;
                    currentElementChanged = true;
                }
                if(divHeight){
                    $div.attr('akif_height', divHeight);
                    $div.css('height', getRandomArbitrary(0.1, 2) * divHeight);

                    elementChanged = true;
                    currentElementChanged = true;
                }

                if(currentElementChanged){
                    $div.attr('akif-border-color', $div.css('border-color'));                    
                    $div.attr('akif-border-width', $div.css('border-width'));                    
                    $div.attr('akif-border-style', $div.css('border-style'));                    

                    $div.css('border-color', "#C1E0FF");                    
                    $div.css('border-width', "10px");                    
                    $div.css('border-style', "solid");                    
                }
            });

            if(elementChanged){
                await window.screenshot(i);
                
                $('*[akif_width],*[akif_height]').each(function() {
                    $div = $(this);
                    
                    if($div.attr('akif_width')){
                        $div.css('width', $div.attr('akif_width'));        
                    }
                    if($div.attr('akif_height')){
                        $div.css('height', $div.attr('akif_height'));        
                    }

                    $div.css('border-color', $div.attr('akif-border-color'));                    
                    $div.css('border-width', $div.attr('akif-border-width'));                    
                    $div.css('border-style', $div.attr('akif-border-style'));
                });

                i++;
            }
        }
    }, 2000);
});

function getRandomArbitrary(min, max) {

    var random = 1;
    while(random < 1.1 && random > 0.9){
        random = Math.random() * (max - min) + min
    }

    if(random <= 0)
        random = 1;

    return random;
}