$(function(){
	/* mengceng */
	setTimeout(function(){
		$('.mengceng,.mc-ad').hide();
	},8000);
	$('.close').click(function(){
		$('.mengceng,.mc-ad').hide();
		var userid = $.cookie('userid') || '{}';
		userid = JSON.parse(userid);
		var phone = userid.phone;
		if(!userid.phone){
			$('.home-login').html('登录');
		}else {
			$('.home-login').html(phone);
		}
		
	});

	/* banner */
	var banner = {
		init: function(){
			this.bannerWrapper = $('.banner-wrapper');
			this.imgWrapper = this.bannerWrapper.find('.img-wrapper');
			this.imgs = this.imgWrapper.find('img');
			this.arrowL = this.bannerWrapper.find('.arrow-left');
			this.arrowR = this.bannerWrapper.find('.arrow-right');
			this.circles = this.bannerWrapper.find('.circle-item');

			var firstImg = this.imgs.first().clone(true);
			var lastImg =this.imgs.last().clone(true);

			this.imgWrapper.prepend(lastImg);
			this.imgWrapper.append(firstImg);
			this.imgLength = $('.img-wrapper img').length;
			this.imgWidth = firstImg.width();
			this.imgWrapper.width(this.imgLength * this.imgWidth);
			this.imgWrapper.css({
				marginLeft: -this.imgWidth
			});
			this.index = 1;
			this.timer = null;

			this.autoPlay();
			this.nextClick();
			this.preClick();
			this.circleHover();
		},
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.index++;
				that.switchImg();
			},5000);
		},
		switchImg: function(){
			var that = this;
			this.imgWrapper.clearQueue().animate({
				marginLeft: -that.imgWidth * that.index
			},400,function(){
				if(that.index >= that.imgLength - 1){
					that.index = 1;
				}
				if(that.index <= 0){
					that.index = that.imgLength - 2;
				}
				that.imgWrapper.css({
					marginLeft: -that.imgWidth * that.index
				});
				that.circles.eq(that.index-1).addClass('active').siblings().removeClass('active');
			});
		},
		nextClick: function(){
			var that = this;
			this.arrowR.click(function(){
				that.index++;
				that.switchImg();
			});
		},
		preClick: function(){
			var that = this;
			this.arrowL.click(function(){
				that.index--;
				that.switchImg();
			});
		},
		circleHover: function(){
			var that = this;
			this.circles.hover(function() {
				that.index = $(this).index() + 1;
				that.switchImg();
				clearInterval(that.timer);
			}, function() {
				that.autoPlay();
			});
		}
	};
	banner.init();

/* brandship */
	$('.brandship-list li').hover(function() {
		$(this).find('.brandship-hide').stop(true).animate({
			top: 0
		},250);
	}, function() {
		$(this).find('.brandship-hide').stop(true).animate({
			top: 100
		},250);
	});
/* hotstore */
	$('.hotflagson').hover(function() {
		$(this).find(".hotson-middle").stop().animate({"opacity":"1"},250)
		$(this).find(".topline").stop().animate({"width":"166px"},250);
		$(this).find(".rightline").stop().animate({"height":"85px"},250);
		$(this).find(".bottomline").stop().animate({"width":"166px"},250);
		$(this).find(".leftline").stop().animate({"height":"85px"},250);
	}, function() {
		$(this).find(".hotson-middle").stop().animate({"opacity":"0"},250)
		$(this).find(".topline").stop().animate({"width":"0"},250);
		$(this).find(".rightline").stop().animate({"height":"0"},250);
		$(this).find(".bottomline").stop().animate({"width":"0"},250);
		$(this).find(".leftline").stop().animate({"height":"0"},250);
	});

/* hotSaleL-son */
	$('.hotSaleL-son').hover(function() {
		$(this).find('.hotSaleL-topTxt').stop().animate({
			left: -20
		},250);
		$(this).find('.hotSaleL-topPic').stop().animate({
			left: 20
		},250);
	}, function() {
		$(this).find('.hotSaleL-topTxt').stop().animate({
			left: 0
		},250);
		$(this).find('.hotSaleL-topPic').stop().animate({
			left: 0
		},250);
	});
/* drawin */
	$('.enter').hover(function() {
		$(this).find('.drawin-hide').css({
			display: 'block'
		});
	}, function() {
		$(this).find('.drawin-hide').css({
			display: 'none'
		});
	});
/* shoppingMall-menu */
	$('.shoppingMall-menu li').hover(function() {
		$(this).find('.menuBox').animate({
			top: -50
		},250);
	}, function() {
		$(this).find('.menuBox').animate({
			top: 0
		},250);
	});
/* promotionB-pic */
	$('.promotionB-pic').hover(function() {
		$(this).find(".topline").stop().animate({"width":"193px"},250);
		$(this).find(".rightline").stop().animate({"height":"64px"},250);
		$(this).find(".bottomline").stop().animate({"width":"193px"},250);
		$(this).find(".leftline").stop().animate({"height":"64px"},250);
		$(".promotionB-picBig").eq($(this).index()).addClass('picShow').siblings().removeClass('picShow');
	}, function() {
		$(this).find(".topline").stop().animate({"width":"0"},250);
		$(this).find(".rightline").stop().animate({"height":"0"},250);
		$(this).find(".bottomline").stop().animate({"width":"0"},250);
		$(this).find(".leftline").stop().animate({"height":"0"},250);
	});
/* shoppingMall-menu */
	$('.shoppingMall-menu li').click(function(){
		var top = $('.shoppingMall-goodsBox').eq($(this).index()).offset().top;
		$('body').scrollTop(top);
	});

});