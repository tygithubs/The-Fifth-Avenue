$(function(){
	var cart = {
		init: function(){
			this.selectAllBtn = $('.checkall');

			this.payCart = {};

			this.cart = null;
			this.initGoods();
			this.numAdd();
			this.numReduce();
			this.input();
			this.delete();
			this.checkboxChange();
			this.selectAll();
			this.deleteSelected();
			this.clearAll();
		},
		//初始化购物车数据
		initGoods: function(){
			var that = this;
			$.getJSON('js/data.json',function(result){
				//console.log(result);
				that.getCookie();
				for(var key in that.cart){
					//生成一条数据
					(function(key){
						var goods = $('<tr></tr>').addClass('tr-border');
						goods.load('goodsInfo.html',function(){
							goods.attr('data-id',result[key]['goods-id']);
							goods.find('.goods-name a').html(result[key]['goods-name']);
							goods.find('.goods-price').html((result[key]['goods-price']).toFixed(2));
							goods.find('.goods-style').html(result[key]['goods-style']);
							goods.find('.goods-img img').attr('src',result[key]['goods-img']);
							goods.find('.cart-goods-num input').attr('data-stock',result[key]['goods-stock']).val(that.cart[key].goodsAmount);
							var money = that.cart[key].goodsAmount * result[key]['goods-price'];
							goods.find('.tr-price').html(money.toFixed(2));
							$('.cart-goods tbody').append(goods);
						});

					})(key);
				}
			});
		},
		numAdd: function(){
			var that = this;
			$('.cart-goods tbody').on('click','.cart-add',function(){
				var amount = parseInt( $(this).prev().val() );
				var stock = $(this).prev().data('stock');
				if(amount >= stock){
					alert('对不起该商品的库存已经紧张!');
					return;
				}
				amount++;
				$(this).prev().val(amount);
				that.moneyHandle($(this),amount);
				$(this).parents('.tr-border').find('.selected .cart-tfinput').prop('checked',true);
			});
		},
		numReduce: function(){
			var that = this;
			$('.cart-goods tbody').on('click','.cart-reduce',function(){
				var amount = parseInt( $(this).next().val() );
				if(amount <= 1){
					return;
				}
				amount--;
				$(this).next().val(amount);
				that.moneyHandle($(this),amount);
				$(this).parents('.tr-border').find('.selected .cart-tfinput').prop('checked',true);
			})
		},
		input: function(){
			var that = this;
			$('.cart-goods tbody').on('input propertychange','.cart-goods-num input',function(){
				var amount = parseInt( $(this).val() );
				var stock = $(this).data('stock');
				
				if(amount <= 0){
					amount = 1;
				}else if(amount >= stock){
					amount = stock;
				}
				
				var reg = /^\d+$/;
				if(!reg.test(amount)){
					amount = 1;
				}

				$(this).val(amount);
				that.moneyHandle($(this),amount);
				$(this).parents('.tr-border').find('.selected .cart-tfinput').prop('checked',true);
			});
		},
		moneyHandle: function(obj,amount){
			var goodsId = obj.parents('.tr-border').data('id');
			this.cart[goodsId].goodsAmount = amount;
			this.setCookie();
			var price = obj.parents('.tr-border').find('.goods-price').html();
			var money = amount * price;
			obj.parents('.tr-border').find('.tr-price').html(money.toFixed(2));
			obj.parents('.tr-border').find('.selected .cart-tfinput').change();
			$('.red-number').html(amount);
			$('.totalMoney').html(money.toFixed(2));
		},
		delete: function(){
			var that = this;
			$('.cart-goods tbody').on('click','.cart-remove',function(){
				var goodsId = $(this).parents('.tr-border').data('id');
				if(confirm('确定要操作此项吗？')){
					delete that.cart[goodsId];
					$(this).parents('.tr-border').remove();
					that.setCookie();
				}
			});
		},
		checkboxChange: function(){
			var that = this;
			$('.cart-goods tbody').on('change','.selected .cart-tfinput',function(){
				var id = $(this).parents('.tr-border').data('id');
				if($(this).prop('checked')){
					var obj = {
						id: id,
						amount: $(this).parents('.tr-border').find('.cart-goods-num input').val(),
						price: $(this).parents('.tr-border').find('.goods-price').html()
					};
					that.payCart[id] = obj;
					$('.go-pay').removeAttr('disabled').addClass('can');
				}else {
					delete that.payCart[id];
					that.selectAllBtn.prop('checked',false);
					$('.go-pay').attr('disabled','true').removeClass('can');
				}
				var count = 0;
				var totalMoney = 0;
				for(var key in that.payCart){
					count++;
					totalMoney += that.payCart[key].amount * that.payCart[key].price
				}
				$('.red-number').html(count);
				$('.totalMoney').html(totalMoney.toFixed(2));
				var lengthChecked = $('.tr-border').find('.selected .cart-tfinput:checked').length ;
				var length = $('.tr-border').find('.selected .cart-tfinput').length ;
				if(lengthChecked == length){
					that.selectAllBtn.prop('checked',true);
				}
				if(lengthChecked > 0){
					$('.go-pay').removeAttr('disabled').addClass('can');
				}else{
					$('.go-pay').attr('disabled','true').removeClass('can');
				}

				
			});
			$('.go-pay').click(function(){
					alert('给钱来！！！');
			});
		},
		selectAll: function(){
			this.selectAllBtn.click(function(){
				if($(this).prop('checked')){
					$('.cart-tfinput').prop('checked',true);
				}else{
					$('.cart-tfinput').prop('checked',false);
				}
				$('.cart-tfinput').change();
			});
		},
		deleteSelected: function(){
			var that = this;
			$('.cart-goods-delete').click(function(){
				if(confirm('确定要操作此项吗？')){
					$('.tr-border').each(function(k,v){
						if($(this).find('.selected .cart-tfinput').prop('checked')){
							$(this).remove();
							//从cookie中删除
							var id = $(this).data('id');
							delete that.cart[id];
							that.setCookie();
						}
					});
				}	
			});
		},
		clearAll: function(){
			var that = this;
			$('.cart-goods-empty').click(function(){
				if(confirm('确定要操作此项吗？')){
					$('.tr-border').remove();
					var ids = $('.tr-border').data('id');
					console.log(ids);
					delete that.cart[ids];
					that.setCookie();
				}
			});
		},
		//读取cookie
		getCookie: function(){
			this.cart = $.cookie('5lu-cart') || '{}';
			this.cart = JSON.parse(this.cart);
		},
		//设置cookie
		setCookie: function(){
			$.cookie('5lu-cart',JSON.stringify(this.cart),{expires: 30,path: '/'});
		}
	}
	cart.init();
});