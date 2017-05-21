var member=member || {};

/*
========member-validation======
@AUTHOR : Hong jihoo
@CREATE DATE : 2017-05-14
@UPDATE DATE : 2017-05-14
@DESC :
===============================
*/

member.validation={
		/*공백값 체크 정규식*/
		nullCheck : function(x){
			if(x.length == 0){
				return false;
			}
			return true;
		},
		/*
		 * [01 숫자로 시작해야 하며 그다음에 오는 숫자는 6-9 사이]
		 * 그 다음에 '-'가 와야함
		 * [0-9 까지 숫자의 3글자 에서 4글자까지]
		 * 그 다음에 '-'가 와야함
		 * [0-9 까지 숫자의 4글자까지]
		 */
		phoneNoCheck : function(x){
			var validationCode = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
			if(x.length == 0){
				return false;
			}
			if(!x.match(validationCode)){
				return false;
			}
			return true;
		},
		/*
		 * [영어 알파벳 소문자 a-z 와 영어 알파벳 대문자 A-Z 를 사용할수 있음] : 영어만 가능
		 */
		engNameCheck : function(x){
			var validationCode = /^[a-zA-Z]*$/;
			if(x.length == 0){
				return false;
			}
			if(!x.match(validationCode)){
				return false;
			}
			return true;
		},
		/*
		 * [한글 가 부터 힣 까지 를 사용할수 있음] : 한글만 가능
		 */
		korNameCheck : function(x){
			var validationCode = /^[가-힣]*$/;
			if(x.length == 0){
				return false;
			}
			if(!x.match(validationCode)){
				return false;
			}
			return true;
		},
		/*
		 * [숫자 0-9] : 1글자 이상 5글자 이하 숫자만 가능
		 */
		postNoCheck : function(x){
			var validationCode = /^[\d]{1,5}$/;
			if(x.length == 0){
				return false;
			}
			if(!x.match(validationCode)){
				return false;
			}
			return true;
		},
		/*
		 * [영어 알파벳 a-z 와 영어 알파벳 A-Z 와 숫자 0-9]
		 * 가운데 @ 꼭 포함되어야 함
		 * [영어 알파벳 a-z 와 영어 알파벳 A-Z 와 숫자 0-9]
		 * .이 포함되어야 함
		 * [영어 알파벳 a-z 와 영어 알파벳  A-Z]
		 */
		emailCheck : function(x){
			var validationCode = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
			if(x.length == 0){
				return false;
			}
			if(!x.match(validationCode)){
				return false;
			}
			return true;
		}
	};

/*
========member-cookie==========
@AUTHOR : Hong jihoo
@CREATE DATE : 2017-05-14
@UPDATE DATE : 2017-05-14
@DESC :
===============================
*/

member.cookie={
		setCookie:	function (name,value) {
		 	document.cookie = name + "=" + value;
		},
		getCookie: function(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
		    return null;
		},
		removeCookie: function(name) {
		    createCookie(name,"",-1);
		}
};