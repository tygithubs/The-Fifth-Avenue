$(function(){
	$('.nav-item').click(function(){
		$('.content-item').eq( $(this).index() ).addClass('active').siblings().removeClass('active');
	});

	$('.vip').mouseenter(function(){
		$('.hide-price').show();
		$('.vip').addClass('border');
	});

	$('.price-right').mouseleave(function(){
		$('.hide-price').hide();
		$('.vip').removeClass('border');
	});

	$('.dd-item').click(function(){
		$(this).addClass('bcolor').siblings().removeClass('bcolor');
	});
	$('.big-one').click(function(){
		$('.big-ram').show();
		$('.small-ram').hide();
	});
	$('.small-one').click(function(){
		$('.big-ram').hide();
		$('.small-ram').show();
	});

	$('.gd-qrcode').hover(function() {
		$('.gd-ewm').show();
	}, function() {
		$('.gd-ewm').hide();
	});

	$('.choice').hover(function() {
		$(this).find('.popularize-hide').show();
	}, function() {
		$(this).find('.popularize-hide').hide();
	});

	$('.tab-right li').click(function(){
		$(this).addClass('f-color').siblings().removeClass('f-color');
		$('.gd-detail').eq( $(this).index() ).addClass('gd-show').siblings().removeClass('gd-show');
		var mainTop = $('.goods-main').offset().top;
		$('body').animate({
			scrollTop: mainTop
		},500);
	});
	var navTop = $('.goods-tab').offset().top;
	$(window).scroll(function(){
		var top = $(this).scrollTop();
		if (top >= navTop) {
			$('.goods-tab').addClass('nav-fixed');
		}else {
			$('.goods-tab').removeClass('nav-fixed');
		}
	});
	//放大镜
	var len;
	var bigLen;
	var magnify = {
		init: function(){
			this.smallPic = $('.small-pic');
			this.largePic = $('.large-pic');
			this.filter = this.smallPic.find('.filter');
			this.filterL = this.filter.width();
			this.largeImg = this.largePic.find('img');
			len = (this.filterL) / 2 + 2;
			bigLen = 480 - len;
			//记录鼠标相对于small-wrapper的位置(滤镜的中心位置)
			this.posX = 0;
			this.posY = 0;

			//记录small-wrapper相对于文档的距离
			this.offset = this.smallPic.offset();
			//console.log(this.offset);

			this.mouseenter();
			this.mousemove();
		},
		//鼠标移入移出小盒子
		mouseenter: function(){
			var that = this;
			this.smallPic.hover(function(e){
				that.getPos(e);
				that.filter.css({
					left: that.posX - len,
					top: that.posY - len
				});
				that.filter.show();
				that.largePic.stop().show(300);
				$(this).addClass('opacity');
			},function(){
				that.filter.hide();
				that.largePic.stop().hide(300);
				$(this).removeClass('opacity');
			});
		},
		mousemove: function(){
			var that  = this;
			this.smallPic.mousemove(function(e){
				that.getPos(e);
				that.filter.css({
					left: that.posX - len,
					top: that.posY - len
				});
				that.largeImg.css({
					left: -(that.posX - len) * 1.67,
					top: -(that.posY - len) * 1.67
				});
			});
		},
		//改变this.posX和this.posY
		getPos: function(e){
			var x = e.pageX - this.offset.left;
			var y = e.pageY - this.offset.top;
			this.posX = (x < len ) ? len : (x > bigLen ? bigLen : x);
			this.posY = (y < len ) ? len : (y > bigLen ? bigLen : y);
		}
	};
	magnify.init();
	var goodsNum = {
		init: function(){
			this.numInput = $('.buy-text');

			this.numAdd();
			this.numReduce();
			this.input();
			this.addCart();
		},
		//增加商品数量
		numAdd: function(){
			var that = this;
			$('.btn-add').click(function(){
				//让num-input的值+1
				var amount = parseInt( that.numInput.val() );//获取到的是一个字符串
				
				//判断库存
				if(amount >= 10){
					alert('对不起该商品的库存已经紧张!');
					return;
				}
				amount++;
				that.numInput.val(amount);
			});
		},
		//减少商品数量
		numReduce: function(){
			var that = this;
			$('.btn-reduce').click(function(){
				//让num-input的值-1
				var amount = parseInt( that.numInput.val() );//获取到的是一个字符串
				
				//判断下边界
				if(amount <= 1){
					return;
				}
				amount--;
				that.numInput.val(amount);
			});
		},
		//直接输入
		input: function(){
			//实时监控文本的值是否发生变化
			this.numInput.on('input propertychange',function(){
				var amount = $(this).val();
				//判断是否超过边界
				if(amount <= 0){
					amount = 1;
				}else if(amount > 10){
					amount = 10;
				}
				//判断输入是否含有非数字字符
				var reg = /^\d+$/;
				if(!reg.test(amount)){
					amount = 1;
				}

				$(this).val(amount);
			});
		},
		//加入购物车
		addCart: function(){
			$('.addCar-btn').click(function(){
				//读取cookie
				var cart = $.cookie('5lu-cart') || '{}';
				cart = JSON.parse(cart);

				var goodsId = $('.ram .dd-item.bcolor').data('gid');
				var amount = $('.buy-text').val();

				//判断cart中是否已经存在当前商品
				if(!cart[goodsId]){
					cart[goodsId] = {
						goodsId: goodsId,
						goodsAmount: parseInt( amount )
					};
				}else{
					cart[goodsId].goodsAmount += parseInt(amount);
				}

				//写到cookie中
				$.cookie('5lu-cart',JSON.stringify( cart ),{expires: 30,path:'/'});
				console.log(JSON.parse( $.cookie('5lu-cart') ) );
				alert('添加成功');
			});
		}
	};
	goodsNum.init();
});