$(function(){
	var phonecheck = false;
	var pwdcheck = false;
	var pwdagaincheck = false;
	var emailcheck = false;
	var codecheck = false;
	var str = '';
	var register = {
		init: function(){
			this.authCode = $('.auth-code');
			this.input = $('input');
			this.reBtn = $('.re-btn');

			this.authcode();
			this.codeClick();
			this.onFocus();
			this.onBlur();
			this.phoneCheck();
			this.pwdCheck();
			this.pwdagainCheck();
			this.emailCheck();
			this.codeCheck();
			this.btnCheck();
		},
		authcode: function(){
			var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			str = '';
			for(var i=0;i<4;i++){
				var num = Math.round(Math.random()*61);
				str += arr[num];
				this.authCode.html(str);
			}
		},
		codeClick: function(){
			var that = this;
			this.authCode.click(function(){
				that.authcode();
				$('#auth-code').val('');
				$(this).parent().find('.i-status').hide();
			});
		},
		onFocus: function(){
			this.input.focus(function(){
				$(this).parent().find('.msg-tips').css({
					display: 'inline-block'
				});
				$(this).addClass('focus');
				$(this).removeClass('focus1');
				$(this).parent().find('.msg-error').css({
					display: 'none'
				});
			});
		},
		onBlur: function(){
			this.phoneCheck();
			this.pwdCheck();
			this.pwdagainCheck();
			this.emailCheck();
			this.codeCheck();
			var that = this;
			this.reBtn.attr("disabled",true);
			this.input.blur(function(){
				$(this).parent().find('.msg-tips').css({
					display: 'none'
				});
				$(this).removeClass('focus');
				if(phonecheck==true && pwdcheck==true && pwdagaincheck==true && emailcheck==true && codecheck==true){
					that.reBtn.css({
						background: 'red',
						cursor: 'pointer'
					});
					that.reBtn.attr("disabled",false);
				}else {
					that.reBtn.css({
						background: '#999',
						cursor: 'auto'
					});
					that.reBtn.attr("disabled",true);
				}
			});
		},
		phoneCheck: function(){
			$('#phone').blur(function(){
				var val = $(this).val();
				var reg = /^(13|14|15|17|18)\d{9}$/;
				if(val.length == 0){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('手机号不能为空');
					$(this).addClass('focus1');
				}else if(reg.test(val) == false){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('手机号格式错误');
					$(this).addClass('focus1');
				}else {
					$(this).parent().find('.i-status').css({
						display: 'inline-block'
					});
					phonecheck = true;
				}
			});
			$('#phone').keydown(function(){
				$(this).parent().find('.i-status').css({
					display: 'none'
				});
			});
		},
		pwdCheck: function(){
			$('#password').blur(function(){
				var val = $(this).val();
				var reg = /^.{6,20}$/;
				if(val.length == 0){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('密码不能为空');
					$(this).addClass('focus1');
				}else if(reg.test(val) == false){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('长度只能在6-20个字符之间');
					$(this).addClass('focus1');
				}else {
					$(this).parent().find('.i-status').css({
						display: 'inline-block'
					});
					pwdcheck = true;
				}
			});
			$('#password').keydown(function(){
				$(this).parent().find('.i-status').css({
					display: 'none'
				});
			});
		},
		pwdagainCheck: function(){
			
			$('#password-confirm').blur(function(){
				var val = $(this).val();
				if(val.length == 0){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('请再次输入密码');
					$(this).addClass('focus1');
				}else if(val != $('#password').val()){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('两次密码输入不一致');
					$(this).addClass('focus1');
				}else {
					$(this).parent().find('.i-status').css({
						display: 'inline-block'
					});
					pwdagaincheck = true;
				}
			});
			$('#password-confirm').keydown(function(){
				$(this).parent().find('.i-status').css({
					display: 'none'
				});
			});
		},
		emailCheck: function(){
			
			$('#email').blur(function(){
				var val = $(this).val();
				var reg = /^\w+@(126|163|qq)+\.(com|cn|com.cn)$/;
				if(val.length == 0){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('邮箱不能为空');
					$(this).addClass('focus1');
				}else if(reg.test(val) == false){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('邮箱格式错误');
					$(this).addClass('focus1');
				}else {
					$(this).parent().find('.i-status').css({
						display: 'inline-block'
					});
					emailcheck = true;
				}
			});
			$('#email').keydown(function(){
				$(this).parent().find('.i-status').css({
					display: 'none'
				});
			});
		},
		codeCheck: function(){
			$('#auth-code').blur(function(){
				var val = $(this).val();
				if(val.length == 0){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('请输入验证码');
					$(this).addClass('focus1');
				}else if(val.toLowerCase() != str.toLowerCase()){
					$(this).parent().find('.msg-error').css({
						display: 'inline-block'
					});
					$(this).parent().find('.msg-error span').html('验证码错误');
					$(this).addClass('focus1');
				}else {
					$(this).parent().find('.i-status').css({
						display: 'inline-block'
					});
					codecheck = true;
				}
			});
			$('#auth-code').keydown(function(){
				$(this).parent().find('.i-status').css({
					display: 'none'
				});
			});
		},
		btnCheck: function(){
			var that = this;
			this.reBtn.click(function(){
				var register = $.cookie('user') || '{}';
				register = JSON.parse(register);
				var phone = $('#phone').val();
				var password = $('#password').val();
				if(register.phone != phone){
					register = {
						phone: phone,
						password: password
					};
					$.cookie('user',JSON.stringify( register ),{expires: 30,path:'/'});
					console.log(JSON.parse( $.cookie('user') ) );
					alert('注册成功！');
					$('.text').val('');
					$('.i-status').hide();
					phonecheck = false;
					pwdcheck = false;
					pwdagaincheck = false;
					emailcheck = false;
					codecheck = false;
					that.onBlur();
				}else {
					alert('该用户已经注册！');
				}
				that.authcode();
			});
		}
	};
	register.init();
});