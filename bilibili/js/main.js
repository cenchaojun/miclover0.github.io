
$(function(){

	"use strict";
	
	// generat navigation
	$(".row-fluid h4").each(function(){
		var id=this.id;
		var text=$(this).text();
		$(".nav-list").append('<li><a href="#'+id+'"><i class="icon-bookmark"></i>'+text+'</a></li>');	
	});

	// navigation
	$(".nav-list > li").click(function(){
		if($(this).hasClass("help"))
			return;
		$(this).parent()
			.find(".active")
			.removeClass("active")
			.find("i").removeClass("icon-white");;
		$(this).addClass("active");
		$(this).find("i").addClass("icon-white");
		
		var tar=$($(this).find("a")[0].hash);
		$('body,html').animate({
			scrollTop: tar.offset().top-55
		}, "fast");
		return false;
	});

	//encode html
	$(".cv").each(function(){
		var tar=$(this);
		var r=tar.html()
			.replace(/</g,"&lt;")
			.replace(/>/g,"&gt;")
			.replace(/\"/g,"&quot;");
		tar.html(r);
	});
});