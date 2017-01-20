var wSilder = wSilder || 
{ 
	version: "1.0.1",
	element: 
	{
		timeInterval: 3000,
		typeMove: 'left'
	},
	main: {
		element: {
			indexImg		: 0,
			SilderMain		: null,
			listImg			: []
		},
		getImgPushArray: function() {
			var tmp = this.element.SilderMain.find('img');
			for(var i = 0; i < tmp.length; i++) {
				this.element.listImg.push(tmp[i]);
			}
			this.element.SilderMain.children().remove();
			return true;
		},
		top: function() {
			this.element.SilderMain = $('#wSilder');
			if(this.getImgPushArray() == true) {
				wSilder.animate.top(this.element);
			}
		}
	},
	animate: {
		element: {
			idSetInterval	: null
		},
		top: function(element) {
			this.moveAnimate(element, wSilder.element.typeMove);
			this.element.idSetInterval = setInterval(function() {
				wSilder.animate.resetAll(element);
				wSilder.animate.moveAnimate(element, wSilder.element.typeMove);
			}, wSilder.element.timeInterval, element);
		},
		resetAll: function(element) {
			element.SilderMain.children().remove();
		},
		actionMove: function(htmlElement, typeMove, typeElement, element) {
			var AnimateMoveLeft = 0, AnimateMoveRight = 0;
			if(typeMove == 'left') {
				AnimateMoveLeft = element.SilderMain.width();
				AnimateMoveRight = element.SilderMain.width() * -1;
			}
			else{
				AnimateMoveLeft = element.SilderMain.width() * -1;
				AnimateMoveRight = element.SilderMain.width();
			}
			$(htmlElement)
				.css({
					'overflow': 'hidden',
					'position': 'absolute',
					'z-index' : 500,
					'height'  : 600
				})
				.append(element.listImg[element.indexImg])
				.appendTo(element.SilderMain);
			if(typeElement == 'out') {
				$(htmlElement).children()
				.css({
					'margin-left': 0,
					'opacity' : 1,
					'width'   : element.SilderMain.width(),
					'height'  : 'auto'
				})
				.animate({
					'margin-left': AnimateMoveLeft,
					'opacity'	 : 0
				}, 1000);
			}
			else{
				$(htmlElement).children()
				.css({
					'margin-left': AnimateMoveRight,
					'opacity'	 : 0,
					'width'   : element.SilderMain.width(),
					'height'  : 'auto'
				})
				.animate({
					'margin-left': 0,
					'opacity'	 : 1
				}, 1000);
			}
		},
		moveAnimate: function(element, typeMove) {
			var divGoOut = document.createElement('div');
			this.actionMove(divGoOut, typeMove, 'out', element);
			element.indexImg = ++element.indexImg < element.listImg.length ? element.indexImg : 0;	
			
			var divGoIn = document.createElement('div');
			this.actionMove(divGoIn, typeMove, 'in', element);
		}
	}
};