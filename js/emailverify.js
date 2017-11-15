$( document ).ready(function() {
	streamDomain = "//localhost:8080/ConnectingUsData-1.0/";
	emailVerifyClass.init();
});

var emailVerifyClass = {
		
	init : function()
	{
		var _self = this;
		_self.RegisterEvents();
	},
	
    RegisterEvents : function()
	{
		var _self = this;
		
		_self.activateUser();
		$(".emailVerify-btn").off("click").on("click",function(){
			window.location.href = "http://localhost:8080/chatUI/home.jsp";
		});
	},
	
	activateUser : function()
	{
		var _self = this;
		var userId = utilClass.getQueryParam("pId");
		
		var config = {};
		config.callType = "activateUser"
		config.type = "POST";
		config.data= ({
				"userId" : userId
		});
		
		utilClass.makeAjaxCall(config);
	}
}