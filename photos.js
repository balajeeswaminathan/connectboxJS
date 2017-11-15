$( document ).ready(function() {
	streamDomain = "//localhost:8080/ConnectingUsData-1.0/";
	photosClass.init();
});


var photosClass = {
	
	init : function()
	{
		var _self = this;		
		_self.RegisterEvents();
	},
	
	RegisterEvents : function()
	{
		var _self = this;
		
		$("#connUs-addPtos-upload").change(function(){
			_self.uploadImage();
		});
		
		$(".connUs-addPtos-btn").off("click").on("click",function(){
			_self.addPhotos();
		});
		
		setTimeout(function(){
			_self.getPhotos();
		},100);
	},
	
	uploadImage : function(){
		var _self = this;
		var userId = _self.getCookie("userId");
		var formData = new FormData(document.getElementById("connUs-addPtos-uploadCont"));
		formData.append("userId", userId);
		formData.append("imgType", "photos");

		var config = {};
		config.callType = "uploadImage"
		config.type = "POST";
		config.enctype = 'multipart/form-data';
		config.processData =  false;
		config.contentType =  false;
		config.data = formData;
		
		var photosImgCbk = function(response){
			var obj = JSON.parse(response);
			$(".connUs-addPtos-imgCont").addClass("active");
			$(".connUs-addPtos-imgDisplay").attr("src", obj.properties.data.imgPath);
		};
		
		_self.makeAjaxCall(config, photosImgCbk);
	},
	
	addPhotos : function(){
		var _self = this;
		var userId = _self.getCookie("userId");
		var desc = $(".connUs-addPtos-desc").val();
		var imgUrl = $(".connUs-addPtos-imgDisplay").attr("src");
		
		var config = {};
		config.callType = "addPhotos"
		config.type = "POST";
		config.data= ({
				"userId" : userId,
				"desc" : desc,
				"imgUrl" : imgUrl
		});
		
		_self.makeAjaxCall(config);
	},
	
	getPhotos : function(){
		var _self = this;
		var userId = _self.getCookie("userId");
		
		var config = {};
		config.callType = "getPhotos"
		config.type = "POST";
		config.data= ({
				"userId" : profileClass.profileData.profileId
		});
		
		var getPhotosCbk = function(response){
			var obj = JSON.parse(response);
			_self.callHandlebar("#viewPhotos-hb-template", ".connUs-ptosList-wrapper", obj.properties);
			
			$(".connUs-viewPtos-innerCont").off("click").on("click",function(events){
				_self.loadImgSlide(events);
			});
			
			$(".connUs-galleryPtos-likeBtn").off("click").on("click",function(events){
				_self.giveFeedLike(events);
			});
			
			$(".connUs-galleryPtos-addCmntsBn").off("click").on("click",function(events){
				_self.addFeedCmnts(events);
			});
			
			$(".connUs-galleryPtos-viewMoreLikesBtn").off("click").on("click",function(events){
				_self.getFeedLikes(events);
			});
			
			$(".connUs-galleryPtos-viewMoreCmntsBtn").off("click").on("click",function(events){
				_self.getFeedCmnts(events);
			});
			_self.slideImgInit();
		}
		
		_self.makeAjaxCall(config, getPhotosCbk);
	},
	
	giveFeedLike : function(events){
		var _self = this;
		var userId = _self.getCookie("userId");
		var imgId = $(".connUs-galleryPtos-cont.active").attr("imgId");
		
		var config = {};
		config.callType = "giveLike";
		config.type = "POST",
		config.data = ({
			"userId" : userId,
			"id" : imgId
		});
		
		_self.makeAjaxCall(config);
	},
	
	addFeedCmnts : function(events){
		var _self = this;
		var userId = _self.getCookie("userId");
		var imgId = $(".connUs-galleryPtos-cont.active").attr("imgId");
		var comments = $(".connUs-galleryPtos-cmntsTxt").val();
		
		var config = {};
		config.callType = "addComment";
		config.type = "POST",
		config.data = ({
			"userId" : userId,
			"id" : imgId,
			"comments" : comments
		});
		
		_self.makeAjaxCall(config);
	},
	
	getFeedLikes : function(events){
		var _self = this;
		var userId = _self.getCookie("userId");
		var imgId = $(".connUs-galleryPtos-cont.active").attr("imgId");
		
		var config = {};
		config.callType = "getLikes";
		config.type = "POST",
		config.data = ({
			"userId" : userId,
			"id" : imgId
		});
		
		getFeedLikeCbk = function(response){
			var obj = JSON.parse(response);
			_self.callHandlebar("#likeListData-hb-template", ".connUs-galleryPtos-likeWrapper", obj.properties);
		};
		
		_self.makeAjaxCall(config, getFeedLikeCbk);
	},
	
	getFeedCmnts : function(events){
		var _self = this;
		var userId = _self.getCookie("userId");
		var imgId = $(".connUs-galleryPtos-cont.active").attr("imgId");
		
		var config = {};
		config.callType = "getComments";
		config.type = "POST",
		config.data = ({
			"userId" : userId,
			"id" : imgId
		});
		
		getFeedCmntsCbk = function(response){
			var obj = JSON.parse(response);
			_self.callHandlebar("#cmntsListData-hb-template", ".connUs-galleryPtos-cmntsWrapper", obj.properties);
		};
		
		_self.makeAjaxCall(config, getFeedCmntsCbk);
	},
	
	loadImgSlide : function(events){
		var _self = this;
		var imgIdx = $(events.target).attr("imgIdx");
		var imgId = $(events.target).closest(".connUs-viewPtos-innerCont").attr("imgId");
		
		$(".connUs-galleryPtos-cont").addClass("active");
		setTimeout(function(){
			$($(".slidesjs-pagination-item a")[imgIdx]).trigger("click");
			$($(".connUs-galleryPtos-details-dynInnerCont")[imgIdx]).addClass("active");
			$(".connUs-galleryPtos-cont").attr("imgId", imgId);
			
			$(".slidesjs-previous, .slidesjs-next").click(function(events){    
				_self.slideImg(events);
			});
			
		},10);
	},
	
	slideImg : function(events){
		var imgSlideIdx = $(".slidesjs-pagination-item a.active").attr("data-slidesjs-item");
		var imgId = $($(".connUs-viewPtos-innerCont")[imgSlideIdx]).attr("imgId");
		
		$(".connUs-galleryPtos-details-dynInnerCont").removeClass("active");
		$($(".connUs-galleryPtos-details-dynInnerCont")[imgSlideIdx]).addClass("active");
		$(".connUs-galleryPtos-cont").attr("imgId", imgId);
		
		$(".connUs-galleryPtos-likeWrapper, .connUs-galleryPtos-cmntsWrapper").html("");
		$(".connUs-galleryPtos-cmntsTxt").val("");
	},
	
	slideImgInit : function(){
		$(function(){
		      $("#imgSlides").slidesjs({
		        width: 940,
		        height: 528
		      });
		 });
	},
	
	makeAjaxCall : function(config, cbk){
		 
		 config.url = streamDomain + config.callType;
		 
		 config.success = cbk;
		 $.ajax(config);
	 },
	
	getCookie : function(cname)
    {
    	var skCookieName = cname + "=";
    	var skAllCookie = document.cookie.split(';');
    	for(var i=0; i<skAllCookie.length; i++) 
    	{
    	  var tempCookie = skAllCookie[i].trim();
    	  if (tempCookie.indexOf(skCookieName)==0) return tempCookie.substring(skCookieName.length,tempCookie.length);
    	}
    	return "";
    },
	 
	callHandlebar : function(handlebarTemp, fillDom, data){
		// Grab the template script
		var theTemplateScript = $(handlebarTemp).html();
		// Compile the template
		var theTemplate = Handlebars.compile(theTemplateScript);
		
		var theCompiledHtml = theTemplate(data);
		 $(fillDom).html(theCompiledHtml);
	}
}