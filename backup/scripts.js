$(document).ready(function(){
  var $cols = $("tr").eq(0).children().length;  
  /* border click */ 
  $appx = Number(10), //click error tolerance
  $(".error").hide();
  
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
    var $cols = $("tr").eq(0).children().length,  
      $start,
      $end;

  /* Drag and Drop */
  $(".edge-click td").on("dragover",function(e){
    e.preventDefault();
  });
  $("#jerry,#cheese").on("dragstart",function(e){
    e.originalEvent.dataTransfer.setData("Text",e.target.id);
  });
  $(".edge-click td").on("drop",function(e){
    e.preventDefault();
    if($(this).html()==""){
      var data=e.originalEvent.dataTransfer.getData("Text");
      e.target.appendChild(document.getElementById(data));
      if(data=="jerry"){
        $start = $("td").index($(this));
        console.log("start: "+$start);
      } else {
        $end = $("td").index($(this));
        console.log("end: "+$end);
      }
    } else {
      $("#overlap").fadeIn("fast",function(){
        $("#overlap").delay(2000).fadeOut();
      });
    }
  });
  $(".drag div").on("dragover",function(e){
    e.preventDefault();
  });
  $(".drag div").on("drop",function(e){
    e.preventDefault();
    var data=e.originalEvent.dataTransfer.getData("Text");
    if((data=="jerry")&&$(this).hasClass("jerry")){
      e.target.appendChild(document.getElementById(data));
    } else if((data=="cheese")&&$(this).hasClass("cheese")){
      e.target.appendChild(document.getElementById(data));
    }
  });

  /* solver */
  var $record = new Array(),
      i=0,
      x,y,
      tp,rt,bt,lt;
      
      $record.prop = 'tp';
      $record.prop = 'rt';
      $record.prop = 'bt';
      $record.prop = 'lt';
  $("td").each(function(){      
    console.log("x:"+(Math.floor(i/$cols))+",y:"+(i%$cols)); 
    x = Math.floor(i/4),
    y = i%4;
    if(!$.isArray($record[x])) { $record[x] = []; }
    if (!$.isPlainObject($record[x][y])){ $record[x][y] = {}; }   
    if($(this).css("border-top-color") == "black"){
      $record[x][y].tp = true;
    } else { $record[x][y].tp = false; }
    if($(this).css("border-right-color") == "black"){
      $record[x][y].rt = true;
    } else { $record[x][y].rt = false; }
    if($(this).css("border-bottom-color") == "black"){
      $record[x][y].bt = true;
    } else { $record[x][y].bt = false; }
    if($(this).css("border-left-color") == "black"){
      $record[x][y].lt = true;
    } else { $record[x][y].lt = false; }
    i++;
  });
});