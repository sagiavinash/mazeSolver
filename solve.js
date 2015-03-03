var $record = new Array(),
  	$path = new Array();  // $path[path_index][cell_index]
$(document).ready(function(){
  var $cols = $("tr").eq(0).children().length, 
      $start,
      $end;

	/* Drag and Drop */
  	$("#maze td").on("dragover",function(e){
	    e.preventDefault();
  	});
  	$("#jerry,#cheese").on("dragstart",function(e){
    	e.originalEvent.dataTransfer.setData("Text",e.target.id);
  	});
  	$("#maze td").on("drop",function(e){
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
      		$start = -1;
      		
    	} else if((data=="cheese")&&$(this).hasClass("cheese")){
      		e.target.appendChild(document.getElementById(data));
      		$end = -1;
    	}
  	});

  	/* solver */
  
	$(".solve button").on("click",function(){
    var sol = -1;   
		if(($start+1)&&($end+1)){ 
      		var i=0,
	          	x,y,
    	  		cells = $("td").length;
      
      		$("td").each(function(){
		        var cell_index = $("td").index($(this));        		
        		if(Math.floor(cell_index/$cols) === 0){
          			$(this).addClass("top");
        		} if((cell_index+1)%$cols == 1){
	        		$(this).addClass("left");
        		} if((cell_index+1)%$cols === 0){
	        	  	$(this).addClass("right");
    	    	} if(Math.floor(cell_index/$cols) == ((cells/$cols)-1)){
          			$(this).addClass("bottom");
        		}

        		if(!($.isArray($record[i]))) { $record[i] = []; }

        		if(($(this).hasClass("top"))||($(this).css("border-top-color") == "rgb(0, 0, 0)")){
	          	   	$record[i][0] = false;
    		    } else { $record[i][0] = true; }
        		if(($(this).hasClass("right"))||($(this).css("border-right-color") == "rgb(0, 0, 0)")){
        			$record[i][1] = false;
          		} else { $record[i][1] = true; }
        		if(($(this).hasClass("bottom"))||($(this).css("border-bottom-color") == "rgb(0, 0, 0)")){	          		
            		$record[i][2] = false;
          		} else { $record[i][2] = true }        		
        		if(($(this).hasClass("left"))||($(this).css("border-left-color") == "rgb(0, 0, 0)")){          		
            		$record[i][3] = false;
          		} else { $record[i][3] = true; }        		
        		i++;
      		});
      		//console.log("record[2][0] : "+$record[2][0]);    
    	

    		/* finding paths */

	   		var ipath=0,icell=0,
	        	fresh=old=0,
       			$path = {};
   			if(!$.isArray($path[0])) { $path[0] = []; }
   			$path = [[$start]];
   			
   			for(a=0;a<=ipath;a++){
   				var newpath,
          			same,
   					wc=0;   				
       			do {
       				old = $path[a].length;
   				
   					if(!$.isArray($path[a])) { $path[a] = []; }
		        	if($path[a].length){
		       	  		icell = $path[a].length-1;
       	  			} else {icell=0;}

       	  			//console.log("ipath:"+ipath+",a:"+a+",icell:"+icell+",$path[a][icell]:"+$path[a][icell]);
          			
          			newpath = 0;
          			if($path[a][icell] != $end){
            			if($record[$path[a][icell]][0]){
	            			//console.log("endcheck:"+($path[a][icell] == $end));
	            			same = false;
            				for(m=0;m<=icell;m++){
	            				if($path[a][m] == ($path[a][icell] - $cols)){
            						same = true;
            					}
            				}
            				if(!same){			        	
		            			$path[a][icell+1] = $path[a][icell] - $cols; // moving top
               					//console.log("$path[a][icell+1]: "+$path[a][icell+1]);
               					newpath++;
               				}
            			} else {}            		
            			if ($record[$path[a][icell]][1]){
	            			//console.log("endcheck:"+($path[a][icell] == $end));
            				same = false;
            				for(m=0;m<=icell;m++){
	            				if($path[a][m] == ($path[a][icell] + 1)){
            						same = true;
            					}
            				}
            				if(!same){
				        		if(newpath){
				        			ipath++;
				        			console.log("a:"+a+",wc:"+wc+",j:1,newpath:"+newpath);				        			
				        			console.log("--copying--");
		           					for(k=0;k<=icell;k++){
	            						if(!$.isArray($path[ipath])) { $path[ipath] = []; }
		           						$path[ipath][k] = $path[a][k];		               					
		           					}
		           					$path[ipath][icell+1] = $path[a][icell] + 1;  // moving right
               					} else {
	            				$path[a][icell+1] = $path[a][icell] + 1;  // moving right
		               				//console.log("$path[a][icell+1]: "+$path[a][icell+1]);               						
               					}
               					newpath++;
               				} else {}
						} else {}
						if ($record[$path[a][icell]][2]){
							//console.log("endcheck:"+($path[a][icell] == $end));
							same = false;
            				for(m=0;m<=icell;m++){
	            				if($path[a][m] == ($path[a][icell] + $cols)){
            						same = true;
            					}
            				}
            				if(!same){
					       		if(newpath){
				        			ipath++;
				        			console.log("a:"+a+",wc:"+wc+",j:2,newpath:"+newpath);				        			
				        			console.log("--copying--");
		           					for(k=0;k<=icell;k++){
	            						if(!$.isArray($path[ipath])) { $path[ipath] = []; }
		          						$path[ipath][k] = $path[a][k];		               					
		           					}		               				
               						$path[ipath][icell+1] = $path[a][icell] + $cols; // moving bottom                           
               					} else {
				            		$path[a][icell+1] = $path[a][icell] + $cols; // moving bottom                           
    	           					//console.log("$path[a][icell+1]: "+$path[a][icell+1]);	
               					}
	            				newpath++;
	            			} else {}
            			} else {}
            			if ($record[$path[a][icell]][3]){
	            			//console.log("endcheck:"+($path[a][icell] == $end));
	            			same = false;
            				for(m=0;m<=icell;m++){
	            				if($path[a][m] == ($path[a][icell] - 1)){
            						same = true;
            					}
            				}
	            			if(!same){
            					if(newpath){
					        		ipath++;
				        			console.log("a:"+a+",wc:"+wc+",j:3,newpath:"+newpath);				        			
				        			console.log("--copying--");
			        				for(k=0;k<=icell;k++){		           								           			
		           						if(!$.isArray($path[ipath])) { $path[ipath] = []; }
			           					$path[ipath][k] = $path[a][k];	               					
			           				}
		           					$path[ipath][icell+1] = $path[a][icell] - 1;  // moving left
            					} else {
				            		$path[a][icell+1] = $path[a][icell] - 1;  // moving left	
            						//console.log("$path[a][icell+1]: "+$path[a][icell+1]);
            					}
		            			newpath++;
		            			console.log("newpath:"+newpath);
    	        			} else {}
            			} else {}     			
       					
       					wc++;   					
					}
          fresh = $path[a].length; 
				} while (!(old==fresh));
     			console.log("loop a end, ipath:"+ipath);
     		}
       		
          
        var firstsol=true; 	
        console.log(sol);
     		for(n=0;n<$path.length;n++){
     			//console.log("sol loop running");     			
     			if($path[n][$path[n].length-1] == $end){
     				if(firstsol){
     					sol = n;
     					firstsol=false;
     					console.log("firstsol:"+sol);       					
     				} else if($path[n].length < $path[sol].length){
     					sol = n;
     					console.log("sol:"+sol);
     				} else{ console.log("else");}
     			}
     		}
        
        if(sol+1){
          $("td").each(function(){
            for(i=0;i<$("#maze td").length;i++){               
                $("td").eq(i).css("background-color","white");
            }
   					console.log("length:"+$path.length);				   				
   					var step = (255/$path[sol].length+1);
 						for(i=0;i<$path[sol].length;i++){	   						
 							console.log(255-Math.floor((i+1)*step));
   						$("td").eq($path[sol][i]).css("background-color","rgb(255,"+(255-Math.floor((i+1)*step))+","+(255-Math.floor((i+1)*step)));
   					}
     			});
        } else {
          alert("No Solution!");
        }
   			
   			for(i=0;i<$path.length;i++){
   				var $cells="$path["+i+"]: ";;
   				for(j=0;j<$path[i].length;j++){   					
   					$cells += $path[i][j]+", ";
   				}
   				console.log($cells);
   			}   			

   		} else {
		 	  $("#both").fadeIn("fast",function(){
        		$("#both").delay(2000).fadeOut();
      		});
    	}
  
	});
});