//globals
var fontsize = 0;
var currentPage="#age0";
var inverted = "false";
var language = "DE";
//

function colorateLinks(){
	$("a[href^='http']").each(function(){
		if($(this).hasClass( "icon" )==false){
			$(this).prepend("<span class='small glyphicon glyphicon-new-window myglyph'></span>");
      $(this).attr("targe","_blank");
		}
	});
  $("a[href^='']").each(function(){
    if($(this).hasClass( "icon" )==false){
      $(this).prepend("<span class='glyphicon glyphicon-arrow-right myglyph'></span>");
    }
  });
	$("a[href^='/static/fileadmin']").each(function(){
    if($(this).hasClass( "icon" )==false){
      $(this).prepend("<span class='small glyphicon glyphicon-download myglyph'></span>");
    }
  });
}

function isRight(text,pattern){
	if(text!="" && text!=null){
		return pattern.test(text);
	}
	return null;
}

function colorateBox(ret,element){
	if(!ret){
		element.css('background-color', '#F5A9A9');
	}else if(ret){
		element.css('background-color', '#BCF5A9');
	}
	if(ret==null){
		element.css('background-color', 'white');
	}
}

function fontsizeBigger(){
  if(fontsize<3){
    fontsize+=parseInt(1);
    makefontbigger();
    saveDataInStorage();
  }
}

function makefontsmaller(){
  $('p, a, h1,h2,h3, .headline').each(function(){
    var oldsize = $(this).css('font-size');
    oldsize = oldsize.replace("px","");
    var newsize = parseFloat(oldsize)-parseFloat(3.5);
    $(this).css({'font-size':newsize+"px"});
  });
}

function makefontbigger(){
  $('p, a, h1,h2,h3, .headline').each(function(){
  var oldsize = $(this).css('font-size');
  oldsize = oldsize.replace("px","");
  var newsize = parseFloat(oldsize)+parseFloat(3.5);
  $(this).css({'font-size':newsize+"px"});
  });
}

function fontsizeSmaller(){
  if(fontsize>-3){
    fontsize-=parseInt(1);
    makefontsmaller();
    saveDataInStorage();
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function generateBreadCrumbs(){
  //Get Pfad
  var url = window.location.href;
  url = url.split("/");
  var root_ = url[0]+"/";
  url.shift();
  url.pop();
  console.log(url);
  //Generiere Elemente
  var crumbs = document.createElement('nav');
  $(crumbs).addClass("breadcrumb");
  var schlange = root_;
  for(var i=1;i<url.length;i++){
    schlange+="/"+url[i];
    var text = replaceAll(url[i],"%20"," ");
		url[i]="Start"
		if(i>1){
			$(crumbs).append("<span> > </span>")
		}
		$(crumbs).append("<a class='breadcrumb-item' href='"+schlange+
			"'>"+text+"</a>");
  }
  console.log(crumbs);
  $(crumbs).children().last().children().addClass("active");
  $(crumbs).children().first().html("Home");
  //Füge Elemente ein
  $('#breadcrumbs').append(crumbs);
}

function fontsizeNormal(){
  fontsize=parseInt(0);
  saveDataInStorage();
	location.reload();
}

function invertColors(){
  if(inverted=='false'){
	  $('body').addClass("inverted");
	  $('body').css({'background-color':'black'});
    inverted = 'true';
  } else{
    inverted = 'false';
    saveDataInStorage();
    location.reload();
  }
  saveDataInStorage();
}

function saveDataInStorage(){
  window.sessionStorage.setItem("fontsize",fontsize);
  window.sessionStorage.setItem("inverted",inverted);
  window.sessionStorage.setItem("currentPage",currentPage);
  window.sessionStorage.setItem("language",language);
}

function setActivePage(active){
  console.log(active);
  currentPage = active;
  saveDataInStorage();
}


function initHints(){
    var availableTags = [
        "zhaw"
    ];

    $( "#tipue_search_input" ).autocomplete({
      source: availableTags
    });
		$("#DesktopSearch").autocomplete({
			source: availableTags
		});
    $('.ui-autocomplete').css('z-index', 99999999999999);
}

function initSearch(){
  $('#tipue_search_input').tipuesearch();
  $('#tipue_search_input').click(function(e){
    if(window.location.href.search("Search")==-1){
      window.open ('/Search','_self',false);
      $("#tipue_search_input").focus();
    }
  });
  initHints();
}

function init(){
  //Inition method
  //initSearch();
  //colorateLinks();
  generateBreadCrumbs();
}

generateBreadCrumbs();
