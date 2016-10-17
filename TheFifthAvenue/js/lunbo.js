$(function(){
	function SlideLunbo(obj){
		this.wrapper = obj;
		this.box = this.wrapper.find('.box');
		this.lis = this.box.find('li');
		this.arrowL = this.wrapper.find('.btn-pre');
		this.arrowR = this.wrapper.find('.btn-next');
		this.circles = this.wrapper.find('.circle-item');
		this.liLength = this.box.find('li').length;
		this.liWidth = this.box.find('li').width();
		var bgc = this.box.find('.bgc');
	}
	SlideLunbo.prototype = {
		init: function(){
			this.box.width(this.liLength * this.liWidth);
			this.index = 0;

			this.nextClick();
			this.preClick();
			this.circleHover();
		},
		switchLi: function(){
			var that = this;
			this.box.stop(true,true).animate({
				left: -that.liWidth * that.index
			},300);
			that.circles.eq(that.index).addClass('bgc').siblings().removeClass('bgc');
		},
		nextClick: function(){
			var that = this;
			this.arrowR.click(function(){
				that.index++;
				if(that.index >= 2){
					that.index = 2;
				}
				that.switchLi();
			});
		},
		preClick: function(){
			var that = this;
			this.arrowL.click(function(){
				that.index--;
				if(that.index <= 0){
					that.index = 0;
				}
				that.switchLi();
			});
		},
		circleHover: function(){
			var that = this;
			this.circles.mouseenter(function() {
				that.index = $(this).index();
				that.switchLi();
			});
		}
	};
	$('.wrapper').each(function(){
		new SlideLunbo($(this)).init();
	});
});

