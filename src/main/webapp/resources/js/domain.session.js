function Session(x) {
	sessionStorage.setItem('context',x);
	sessionStorage.setItem('javascript',x+'/resources/js');
	sessionStorage.setItem('style',x+'/resources/css');
	sessionStorage.setItem('image',x+'/resources/img');
	return { 
			context: function(){return sessionStorage.getItem('context');}, 
			javascript:function(){return sessionStorage.getItem('javascript');},
			style:function(){return sessionStorage.getItem('style');},
			image:function(){return sessionStorage.getItem('image');} 
	};
}