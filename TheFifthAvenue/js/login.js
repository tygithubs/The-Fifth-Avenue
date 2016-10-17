$(function(){
	$('.log-submit').click(function(){
		var login = $.cookie('user') || '{}';
		login = JSON.parse(login);
		console.log(login);
		var phone = $('.username').val();
		var password = $('.password').val();
		if(login.phone == phone && login.password == password){
			// if($('#rember').prop('checked')){
			// 	alert(1);
	  //           $('.username').val(phone);
	  //           $('.password').val(password);
	  //           $('#rember').attr('checked',true);
	  //       }
			window.location.href = 'home.html';
			var userId = {phone: phone};
			$.cookie('userid',JSON.stringify( userId ),{expires: 30,path:'/'});
			//console.log(JSON.parse( $.cookie('userid') ) );
		}else {
			alert('用户名或密码错误！');
			$('.password').val('');
		}
		
	});
});