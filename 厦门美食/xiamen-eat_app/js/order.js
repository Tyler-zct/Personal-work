// 页面初始化的时候,输出cookie信息
console.log($.cookie('shopcart'));
$(function(){
	//当点击a标签的时候,触发事件
	$('.order-detail').click(function(){
		$('.order-prodece').toggle(1500);
	})
	
	//格式化一下购物车的数据
	//把cookie里面存储的数据转化为js对象
	var shopCart = JSON.parse($.cookie('shopcart'));
	var strHtml = ''; //初始化一个空的字符串,用于放置字符串拼接
	var sumPrice = 0; //初始化总价为0
	var sumCount = 0; //初始化总数量为0
	var allP = [];  //用于存储所有的商品数据
	
	arrAllProducts.forEach(function(item){
//		console.log(item);
		allP = allP.concat(item.products); //拼接一下商品数据
	})
	console.log(allP);
	shopCart.forEach(function(item){
		//当前cookie中商品id的对应的商品
		var temProduce = allP.find(function(p){
			return p.id == item.pid;
		})
		
		//总价 = 单价 X 数量
		sumPrice += item.price * item.count;
		//数量自增
		sumCount += item.count;
		
		//字符串拼接一下,显示购物车的商品详情
		strHtml += `
		            <div class="o-p-item">
		                <ul>
		                    <li>
		                        <img class="o-p-img" src="${temProduce.img}" alt="${temProduce.name}>"
		                    </li>
		                    <li>${temProduce.name}</li>
		                    <li class="o-p-price"><em>${item.price.toFixed(2)}</em> x ${item.count}</li>
		                </ul>
		            </div>`
	})
	$('.order-prodece').html(strHtml);
	$('#orderPrice').text(sumPrice.toFixed(2));
	
	var orders = []; //创建一个空数组,将数组保存到localStorage
	if(localStorage.orders){
		//将json对象转化为js字符串
		orders = JSON.parse(localStorage.orders);
	}
})
