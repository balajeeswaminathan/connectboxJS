var connUsCtrl = {
	makeAjaxCall: function(config, cbk){
		for(var i = 0; i < config.data.
		$.ajax({
			  type: config.type,
			  url: config.url,
			  data: data;
			  data : "email=" + email + "&password=" + password,  
			  success: function(response){
				  var obj = JSON.parse(response);
				  if(obj.properties.status == 1)
				   {
					    alert(obj.properties.errorMessage);
				   }
				  else
				   {
					  document.cookie = "userId="+obj.properties.user_Id;
					  document.cookie = "userName="+obj.properties.userName;
					  window.location.href = "http://localhost:8080/chatUI/home.jsp";
				   }
			  }
	};
};