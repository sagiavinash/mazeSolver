$(document).ready(function(){  
  var $table = $("table.edge-click"),
      bd_class = ["bd-top", "bd-bottom", "bd-left", "bd-right"];
  $table.find("tr").first().find("td").addClass(bd_class[0]);
  $table.find("tr").last().find("td").addClass(bd_class[1]);
  $table.find("tr").each(function(){
    $(this).find("td").first().addClass(bd_class[2]);
    $(this).find("td").last().addClass(bd_class[3]);
  });
  var $cols = $table.find("tr").eq(0).children().length;  
  $appx = 10, //click error tolerance
  $(".error").removeClass("init").hide();
  
  $table.on("click", "td", function(e){
    var $nowy = $table.find("tr").index($(this).parent()),
        $nowx = $table.find("td").index($(this)),
        checkx = "",
        checky = "",    
        $wt = $(this).outerWidth() - (2 * $appx), //width of container
        $ht = $(this).outerHeight() - (2 * $appx), //height of container
        $left = e.pageX - $(this).offset().left - $appx, //click X posiotion inside cell
        $top = e.pageY - $(this).offset().top - $appx, //click Y posiotion inside cell 
        $cols = $("tr").eq(0).children().length;
  
    if(($left >= $wt) && ($top >= 0) && ($top <= $ht)){      //right
      $(this).toggleClass("ec-right");
      $(this).next().toggleClass("ec-left");
    }
    else if (($left <= 0)&&($top >= 0)&&($top <= $ht)){      //left
      $(this).toggleClass("ec-left");
      $(this).prev().toggleClass("ec-right");
    }
    else if (($top <= 0)&&($left >= 0)&&($left <= $wt)){     //top
      $(this).toggleClass("ec-top");
      if($nowx>($cols-1)){
        $("td").eq($nowx-$cols).toggleClass("ec-bottom");
      }
    }
    else if (($top >= $ht)&&($left >= 0)&&($left <= $wt)){   //bottom   
      $(this).toggleClass("ec-bottom");
      $("td").eq($nowx+$cols).toggleClass("ec-top");
    }
    else if (($top >= 0)&&($left >= 0)&&($left <= $wt)&&($top <= $ht)){      
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