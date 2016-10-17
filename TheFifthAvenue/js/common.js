/*  头部广告 */
$(function(){
	$('.advertisement,.manbipei,.look-btn').click(function(){
		$('.ad-box').css({
			display: 'block'
		});
	});
	$('.box-close').click(function(){
		$('.ad-box').css({
			display: 'none'
		});
	});

/* topR-moblie */
	$('.topR-moblie').hover(function() {
		$('.topR-rwm').css({
			display: 'block'
		});
		$(this).addClass('show');
	}, function() {
		$('.topR-rwm').css({
			display: 'none'
		});
		$(this).removeClass('show');
	});

/* topR-my5lux */
	$('.topR-my5lux').hover(function() {
		$('.topR-my5lux dd').css({
			display: 'block'
		});
		$(this).addClass('show');
	}, function() {
		$('.topR-my5lux dd').css({
			display: 'none'
		});
		$(this).removeClass('show');
	});

/* logo-shoppingBag */
	$('.shoppingBox dt').mouseenter(function(){
		$('.shoppingBox-content,.logo-shoppingBag b').css({
			display: 'block'
		});
	});
	$('.shoppingBox').mouseleave(function(){
		$('.shoppingBox-content,.logo-shoppingBag b').css({
			display: 'none'
		});
	});

/* menu-findstore */
	$('.menu-findstore').hover(function() {
		$('.menu-findstore i').css('background-position','-366px -252px');
	}, function() {
		$('.menu-findstore i').css('background-position','-58px -169px');
	});

/* nav-wrap */
	$('.nav-wrap li').hover(function() {
		$(this).stop(true).animate({
			width: 140
		},250).siblings().stop(true).animate({
			width: 30
		},250);
	}, function() {
		$('.nav-wrap li').stop(true).animate({
			width: 30
		},250);
	});

/* goods-type */
	$('.goods-type').hover(function() {
		$('.leftmenu').css({
			display: 'block'
		});
	}, function() {
		$('.leftmenu').css({
			display: 'none'
		});
	});
	$('.leftmenu li').hover(function() {
		$(this).find('i').css({
			display: 'inline'
		});
		$(this).find('.menu-show').addClass('menuhover').siblings().removeClass('menuhover');
	}, function() {
		$(this).find('i').css({
			display: 'none'
		});
		$(this).find('.menu-show').removeClass('menuhover');
	});

/* download */
	$('.download-box a').click(function(){
		$('.download').css({
			display: 'none'
		});
	});
/* right-menu */
	$('.right-menu li').hover(function() {
		$(this).find('.tab-tip').show();
	}, function() {
		$(this).find('.tab-tip').hide();
	});
	$('.menu-top').click(function(){
		$('body').animate({
			scrollTop: 0
		});
	});
});