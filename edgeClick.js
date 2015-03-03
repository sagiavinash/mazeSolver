
$(document).ready(function(){  
  var $cols = $("tr").eq(0).children().length;  
  $appx = Number(10), //click error tolerance
  $(".error").removeClass("init").hide();
  
  $("td").on("click",function(e){
    var $nowy = $("tr").index($(this).parent()),
        $nowx = $("td").index($(this)),
        checkx = "",
        checky = "";    
        $wt = $(this).outerWidth(); //width of container
        $ht = $(this).outerHeight(); //height of container
        $left = e.pageX - $(this).offset().left, //click X posiotion inside cell
        $top = e.pageY - $(this).offset().top, //click Y posiotion inside cell 
        $cols = $("tr").eq(0).children().length;    
  
    if(($left >= ($wt - $appx))&&($top >= $appx)&&($top <= ($ht - $appx))){      //right
      $(this).toggleClass("ec-right");
      $(this).next().toggleClass("ec-left");
    }
    else if (($left <= $appx)&&($top >= $appx)&&($top <= ($ht - $appx))){      //left
      $(this).toggleClass("ec-left");
      $(this).prev().toggleClass("ec-right");
    }
    else if (($top <= $appx)&&($left >= $appx)&&($left <= ($wt - $appx))){     //top
      $(this).toggleClass("ec-top");
      if($nowx>($cols-1)){
        $("td").eq($nowx-$cols).toggleClass("ec-bottom");
      }
    }
    else if (($top >= ($ht - $appx))&&($left >= $appx)&&($left <= ($wt - $appx))){   //bottom   
      $(this).toggleClass("ec-bottom");
      $("td").eq($nowx+$cols).toggleClass("ec-top");
    }
    else if (($top >= $appx)&&($left >= $appx)&&($left <= ($wt - $appx))&&($top <= ($ht - $appx))){      
      //nothing
    }
    else {
      console.log("X:"+$left+", Y:"+$top);
      $("#corner").fadeIn("fast",function(){
        $("#corner").delay(2000).fadeOut();
      });
    }
  });
});