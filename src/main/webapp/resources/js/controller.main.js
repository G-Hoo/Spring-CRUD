var main=main || {};

/*
========main-context===========
@AUTHOR : Hong jihoo
@CREATE DATE : 2017-05-17
@UPDATE DATE : 2017-05-17
@DESC :
===============================
*/

main.context=(function(){
   var onCreate=function(context){
         $.getScript(context+'/resources/js/domain.session.js',function(){
               $.extend(new Session(context));
               setContentView();
         })
      };
   var setContentView = function(){
         main.member.onCreate();
      };
   return{
         onCreate : onCreate
      };
})();

/*
========main-member============
@AUTHOR : Hong jihoo
@CREATE DATE : 2017-05-17
@UPDATE DATE : 2017-05-19
@DESC :
===============================
*/

main.member=(function(){
   var memberService,memberView,
   loginedId,loginedKorName,loginedEngName,
   loginedEmail,loginedAddr,loginedPhoneNo,loginedPassPortNo;
   var afterLoginSubGnbOnclick=function(){
	   memberView=$.javascript()+'/view.member.js';
	   $.getScript(memberView);
	   $('#wrapper').append(subGnbAfterLogin());
	   $('.kal-after-login-sub-right-menu-mypage').on('click',function(){
		   $('#wrapper').empty();
		   mypageUserInfoPage();
	   });
	   $('.kal-after-login-sub-right-menu-logout').on('click',function(){
		   alert('로그아웃 됩니다.');
		   $('#wrapper').empty();
		   mainPageBeforeLogin();
		   loginedId = $.removeCookie('loginedId');
		   loginedKorName = $.removeCookie('loginedKorName');
		   loginedEngName = $.removeCookie('loginedEngName');
		   loginedEmail = $.removeCookie('loginedEmail');
		   loginedAddr = $.removeCookie('loginedAddr');
		   loginedPhoneNo = $.removeCookie('loginedPhoneNo');
		   loginedPassPortNo = $.removeCookie('loginedPassPortNo');
	   });
	   $('.kal-after-login-sub-right-menu-myregist').on('click',function(){
		   mypageUserReservationPage();
	   });
   };
   var afterLoginMainGnbOnclick=function(){
	   memberView=$.javascript()+'/view.member.js';
	   $.getScript(memberView);
	   $('#wrapper').append(afterLoginMainGnb());
	   $('.after-login-kal-main-right-menu-reservation-btn').on('click',function(){
		   main.reservation.onCreate();
	   });
	   
	   $('.after-kal-service-btn-content-question').on('click',function(){
		   main.boardQna.addQna();
	   });
	   
	   $('.after-login-kal-service-btn-content-faq').on('click',function(){
		   main.boardQna.faq();
	   });
	   
	   $('.kal-main-logo').on('click',function(){
		   mainPageAfterLogin();
	   });
   };
   var mypageGnbOnclick=function(){
	   $('.kal-jh-mypage-subwrapper').append(memberGnb());
	   
	   $('.kal-jh-member-navi-memberinfobtn').on('click',function(){
		   alert('회원정보 보기 버튼 클릭');
		   $('#wrapper').empty();
		   mypageUserInfoPage();
	   });
	   $('.kal-jh-member-navi-membermodifybtn').on('click',function(){
		   alert('회원정보 수정 버튼 클릭');
		   mypageUserUpdatePage();
	   });
	   $('.kal-jh-member-navi-memberreservebtn').on('click',function(){
		   alert('나의예약 보기 버튼 클릭');
		   mypageUserReservationPage();
	   });
	   $('.kal-jh-member-navi-memberquitbtn').on('click',function(){
		   alert('회원정보 탈퇴 버튼 클릭');
		   mypageUserDeletePage();
	   });
   };
   var onCreate = function(){
	  memberService=$.javascript()+'/service.member.js';
	  memberView=$.javascript()+'/view.member.js';
	  
	  setContentView();
   };
   var setContentView = function(){
	   $.when(
			   $.getScript(memberService),
			   $.getScript(memberView),
			   $.Deferred(function( deferred ){
	                 $( deferred.resolve );
	             })
	         ).done(function(){
	        	 mainPageBeforeLogin();
	         });
   };
   var mainPageBeforeLogin=function(){
	    $('#wrapper').empty();
	    $('#wrapper').append(subGnbBeforeLogin());
		$('#wrapper').append(beforeLoginMainGnb());
		$('#wrapper').append(mainBackground());
		window.setInterval(function(){
			var next = ($('.open').index()+1)%('.imgcount').length;
			$('.open').removeClass('open').fadeOut(1500);
			$('.imgcount').eq(next).addClass('open').fadeIn(1000);
		},2500);
		$('#wrapper').append(mainFooter());
		$('.kal-main-right-menu-reservation-btn').on('click',function(){
			alert('로그인이 필요한 기능입니다.');
		});
		$('.kal-service-btn-content-question').on('click',function(){
			alert('로그인이 필요한 기능입니다.');
		});
		$('.kal-service-btn-content-faq').on('click',function(){
			alert('로그인이 필요한 기능입니다.');
		});
		$('.kal-service-btn-content-review').on('click',function(){
			alert('로그인이 필요한 기능입니다.');   
		});
		$('.kal-before-login-sub-right-menu-regist').on('click',function(){
			alert('회원가입 버튼 클릭');
			goRegist();
		});
		goLogin();
   };
   var mainPageAfterLogin=function(){
	   loginedId = $.cookie('loginedId');
	   loginedKorName = $.cookie('loginedKorName');
	   loginedEngName = $.cookie('loginedEngName');
	   loginedEmail = $.cookie('loginedEmail');
	   loginedAddr = $.cookie('loginedAddr');
	   loginedPhoneNo = $.cookie('loginedPhoneNo');
	   loginedPassPortNo = $.cookie('loginedPassPortNo');
	    $('#wrapper').empty();
	    $('#wrapper').append(afterLoginSubGnbOnclick());
		$('#wrapper').append(afterLoginMainGnbOnclick());
		$('#wrapper').append(mainBackground());
		window.setInterval(function(){
			var next = ($('.open').index()+1)%('.imgcount').length;
			$('.open').removeClass('open').fadeOut(1500);
			$('.imgcount').eq(next).addClass('open').fadeIn(1000);
		},2500);
		$('#wrapper').append(mainFooter());
   };
   var mypageUserInfoPage = function(){
	   $('#wrapper').empty();
	   $('#wrapper').append(afterLoginSubGnbOnclick());
	   $('#wrapper').append(afterLoginMainGnbOnclick());
	   $('#wrapper').append(mypageHeader());
	   $('.kal-jh-mypage-subwrapper').append(mypageGnbOnclick);
	   $('.kal-jh-mypage-subwrapper').append(mypageUserInfo(loginedKorName,loginedEngName,
			   loginedEmail,loginedAddr,loginedPhoneNo,loginedPassPortNo));
	   $('#wrapper').append(mainFooter());
   };
   var mypageUserUpdatePage = function(){
	   $('#wrapper').empty();
	   $('#wrapper').append(afterLoginSubGnbOnclick());
	   $('#wrapper').append(afterLoginMainGnbOnclick());
	   $('#wrapper').append(mypageHeader());
	   $('.kal-jh-mypage-subwrapper').append(mypageGnbOnclick);
	   $('.kal-jh-mypage-subwrapper').append(mypageUserUpdate(loginedKorName,loginedEngName,loginedId));
	   $('#wrapper').append(mainFooter());
	   userUpdate();
   };
   var mypageUserReservationPage = function(){
	   $('#wrapper').empty();
	   $('#wrapper').append(afterLoginSubGnbOnclick());
	   $('#wrapper').append(afterLoginMainGnbOnclick());
	   $('#wrapper').append(mypageHeader());
	   $('.kal-jh-mypage-subwrapper').append(mypageGnbOnclick);
	   $('.kal-jh-mypage-subwrapper').append(mypageUserReservation(loginedKorName,loginedEngName));
	   $('#wrapper').append(mainFooter());
   };
   var mypageUserDeletePage = function(){
	   $('#wrapper').empty();
	   $('#wrapper').append(afterLoginSubGnbOnclick());
	   $('#wrapper').append(afterLoginMainGnbOnclick());
	   $('#wrapper').append(mypageHeader());
	   $('.kal-jh-mypage-subwrapper').append(mypageGnbOnclick);
	   $('.kal-jh-mypage-subwrapper').append(mypageUserDelete());
	   $('#wrapper').append(mainFooter());
	   userDelete();
   };
   var userUpdate = function(){
	   
	   /*주소지 찾기 시작*/
	   $('.kal-jh-mypage-userUpdate-addr-btn').postcodifyPopUp();
	   /*주소지 찾기 끝*/
	   
	   $('.kal-jh-mypage-userUpdate-submitBtn').on('click',function(){
		   alert('회원 정보 수정 버튼 클릭');
		   var newPw = $('.kal-jh-mypage-userUpdate-pw').val();
		   var newEmail = $('.kal-jh-mypage-userUpdate-email').val();
		   var newPhoneNo = $('.kal-jh-mypage-userUpdate-phoneno').val();
		   var newAddr = $('.kal-jh-mypage-userUpdate-addr1').val();
		   var newAddrDetail = $('.kal-jh-mypage-userUpdate-addr2').val();
		   /*새 비밀번호 정규식*/
		   if(member.validation.nullCheck(newPw)==false){
			   $('.mypage-update-pw-check-text').html('<span style="color:red;">새 비밀번호를 입력해주세요.</span>');
		   }
		   if(member.validation.nullCheck(newPw)==true){
			   $('.mypage-update-pw-check-text').html('');
		   }
		   /*새 이메일 정규식*/
		   if(member.validation.emailCheck(newEmail)==false){
			   $('.mypage-update-email-check-text').html('<span style="color:red;">이메일 양식에 맞지 않거나 필수 입력값입니다.</span>');
		   }
		   if(member.validation.emailCheck(newEmail)==true){
			   $('.mypage-update-email-check-text').html('');
		   }
		   /*새 연락처 정규식*/
		   if(member.validation.phoneNoCheck(newPhoneNo)==false){
			   $('.mypage-update-phoneno-check-text').html('<span style="color:red;">연락처 양식에 맞지 않거나 필수 입력값입니다.</span>');
		   }
		   if(member.validation.phoneNoCheck(newPhoneNo)==true){
			   $('.mypage-update-phoneno-check-text').html('');
		   }
		   /*새 주소지 정규식*/
		   if(member.validation.nullCheck(newAddr)==false){
			   $('.mypage-update-addr-check-text').html('<span style="color:red;">새 주소지를 입력해주세요.</span>');
		   }
		   if(member.validation.nullCheck(newAddr)==true){
			   $('.mypage-update-addr-check-text').html('');
		   }
		   if(member.validation.nullCheck(newAddrDetail)==false){
			   $('.mypage-update-addr-check-text').html('<span style="color:red;">새 주소지를 입력해주세요.</span>');
		   }
		   if(member.validation.nullCheck(newAddrDetail)==true){
			   $('.mypage-update-addr-check-text').html('');
		   }
		   if(member.validation.nullCheck(newPw)==true &&
			  member.validation.emailCheck(newEmail)==true &&
			  member.validation.phoneNoCheck(newPhoneNo)==true &&
			  member.validation.nullCheck(newAddr)==true &&
			  member.validation.nullCheck(newAddrDetail)==true){
			  $.ajax({
				  url : $.context() + '/memberUpdate',
				  method : 'POST',
				  data : JSON.stringify({
					  id : loginedId,
					  newPw : newPw,
					  newEmail : newEmail,
					  newPhoneNo : newPhoneNo,
					  newAddr : newAddr,
					  newAddrDetail : newAddrDetail
				  }),
				  dataType : "json",
				  contentType : "application/json",
				  success : function(data){
					  if(data.result==='success'){
						  alert('회원 수정이 완료되었습니다.');
						  mainPageBeforeLogin();
					  }else{
						  alert('회원 수정에 실패하였습니다.');
					  }
				  },
				  error : function(xhr,status,msg){
					  alert('회원 수정에 실패하였습니다.');
				  }
			  });
		   }
	   });
   };
   var userDelete=function(){
	   $('.kal-jh-mypage-userDelete-submitBtn').on('click',function(){
		   var pw = $('.kal-jh-mypage-userDelete-pw').val();
		   alert('회원 탈퇴 버튼 클릭');
		   if(member.validation.nullCheck(pw)==false){
			  $('.mypage-delete-pw-check-text').html('<span style="color:red;">비밀번호를 입력해주세요.</span>'); 
		   }
		   if(member.validation.nullCheck(pw)==true){
			   $.ajax({
				   url : $.context() + '/userDelete',
				   method : 'POST',
				   data : JSON.stringify({
					   loginedId : loginedId,
					   pw : pw
				   }),
				   dataType : 'json',
				   contentType : 'application/json',
				   success : function(data){
					   if(data.result==='success'){
						   alert('회원탈퇴가 완료되었습니다.');
						   mainPageBeforeLogin();
					   }else{
						   alert('회원 탈퇴에 실패하였습니다.');
					   }
				   },
				   error : function (xhr,status,msg){
					   alert('회원 탈퇴에 실패하였습니다.');
				   }
			   });
		   }
	   });
   };
   var goRegist=function(){
	   var registIdFlag = false;
	   var emailAuthFlag = false;
	   var tempRandom;
	   /*본인 인증 시작*/
	   var emailAuthContent = function(){
		   $.magnificPopup.open({
				items : {
					src : '<div class="white-popup">'
						+'<p id="emailAuthContent" class="kal-jh-auth-head-text">인증 번호</p>'
						+'<div class="kal-jh-auth-wrapper">'
						+	'<input id="emailAuthNo" class="kal-jh-auth-input" placeholder="인증번호를 입력해주세요." type="text" name="authNo"></br>'
						+	'<button id="emailAuthBtn" class="kal-jh-auth-submit-btn" onSubmit="return check();">인증하기</button>'
						+'</div>'
						+'</div>',
					type: 'inline'
					},
					fixedContentPos: true,  
			        fixedBgPos: true,  
			        overflowY: 'auto',  
			        closeBtnInside: true,  
			        preloader: false,
			        midClick: true,  
			        removalDelay: 300,  
			        closeOnBgClick: false
			}); 
		   $('#emailAuthBtn').on('click',function(){
				var emailAuthNoText=$('#emailAuthNo').val();
				var emailText=$('.kal-jh-regist-inputBox-email').val();
				if(emailAuthNoText.length==0){
					alert('인증번호를 입력해주세요');
					
				}else{
					alert('인증을 거친 본인 인증 버튼 클릭');
					if(emailAuthNoText===tempRandom){
						alert('본인 인증에 성공하셨습니다.');
						emailAuthFlag = true;
						$.magnificPopup.close();
					}else{
						alert('본인 인증에 실패하셨습니다.');
					}
				}
			});
	   };
	   
	   /*본인 인증 끝*/
	   
			$('#wrapper').empty();
			$('#wrapper').append(regist());
			$('.kal-regist-main-logo').on('click',function(){
				alert('메인페이지로 이동');
				mainPageBeforeLogin();
			});
			/*아이디 중복 확인*/
			$('.kal-jh-regist-area1-idcheckBtn').on('click',function(){
				alert('중복 확인 버튼 클릭');
				var userid=$('.kal-jh-regist-inputBox-id').val();
				$.ajax({
					url : $.context() + '/idOverlapCheck',
					method : 'POST',
					data : JSON.stringify({
						id : $('.kal-jh-regist-inputBox-id').val()
					}),
					dataType : 'json',
					contentType : 'application/json',
					success : function(data){
						if(data.result==='success'){
							$('.id-check-text').html('중복된 아이디가 존재합니다.');
							registIdFlag = false;
						}else{
							$('.id-check-text').html('<span style="color:green;">사용하실수 있는 아이디입니다.</span>');
							registIdFlag = true;
						}
					},
					error : function(xhr,status,msg){
						alert('회원가입 실패 이유 : '+msg);
					}
				});
			});
			/*아이디 중복 확인 끝*/
			
			/*이메일 본인 인증*/
			$('.kal-jh-regist-inputBox-email-btn').on('click',function(){
				alert('본인인증 버튼 클릭');
				
				var emailText=$('.kal-jh-regist-inputBox-email').val();
				if(member.validation.emailCheck(emailText)==false){
					alert('이메일 양식을 확인해주시기 바랍니다.');
				}

				if(member.validation.emailCheck(emailText)==true){
					alert('본인 확인 페이지로 넘어갑니다.');
					$.ajax({
						url : $.context() + '/emailAuth',
						method : "POST",
						data : emailText,
						dataType : "json",
						contentType : "application/json",
						success : function(data){
							tempRandom = data.randomNo;
						},
						error : function(){
							
						}
					});
					emailAuthContent();
				}
			});
			/*이메일 본인 인증 끝*/
			
			/*주소지 찾기 시작*/
			$('.kal-jh-regist-inputBox-addr-btn').postcodifyPopUp();
			/*주소지 찾기 끝*/
			
			$('.kal-jh-regist-submit').on('click',function(){
				alert('회원가입 완료 버튼 클릭');
				var id = $('.kal-jh-regist-inputBox-id').val();
				var pw = $('.kal-jh-regist-inputBox-pw').val();
				var korName = $('.kal-jh-regist-inputBox-korname').val();
				var familyName = $('.kal-jh-regist-inputBox-familyname').val();
				var firstName = $('.kal-jh-regist-inputBox-firstname').val();
				var phoneNo = $('.kal-jh-regist-inputBox-phoneno').val();
				var birth = $('.kal-jh-regist-inputBox-birth').val();
				var passportNo = $('.kal-jh-regist-inputBox-passportno').val();
				var email = $('.kal-jh-regist-inputBox-email').val();
				var addr = $('.kal-jh-regist-inputBox-addr1').val();
				var addrDetail = $('.kal-jh-regist-inputBox-addr2').val();
				var gender = $('input[name=gender]:checked').val();
				/*아이디 정규식*/
				if(member.validation.nullCheck(id)==false){
					$('.id-check-text').html('<span style="color:red;">아이디는 필수 입력값입니다.</span>');
				}
				if(member.validation.nullCheck(id)==true){
					$('.id-check-text').html('');
				}
				/*비밀번호 정규식*/
				if(member.validation.nullCheck(pw)==false){
					$('.pw-check-text').html('<span style="color:red;">비밀번호는 필수 입력값입니다.</span>');
				}
				if(member.validation.nullCheck(pw)==true){
					$('.pw-check-text').html('');
				}
				/*korname 정규식*/
				if(member.validation.korNameCheck(korName)==false){
					$('.korname-check-text').html('<span style="color:red;">한글이름 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.korNameCheck(korName)==true){
					$('.korname-check-text').html('');
				}
				/*firstname 정규식*/
				if(member.validation.engNameCheck(familyName)==false){
					$('.familyname-check-text').html('<span style="color:red;">영어이름 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.engNameCheck(familyName)==true){
					$('.familyname-check-text').html('');
				}
				/*firstname 정규식*/
				if(member.validation.engNameCheck(firstName)==false){
					$('.firstname-check-text').html('<span style="color:red;">영어이름 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.engNameCheck(firstName)==true){
					$('.firstname-check-text').html('');
				}
				/*연락처 정규식*/
				if(member.validation.phoneNoCheck(phoneNo)==false){
					$('.phoneno-check-text').html('<span style="color:red;">연락처 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.phoneNoCheck(phoneNo)==true){
					$('.phoneno-check-text').html('');
				}
				/*생년월일 정규식*/
				if(member.validation.nullCheck(birth)==false){
					$('.birth-check-text').html('<span style="color:red;">생년월일은 필수 입력값입니다.</span>');
				}
				if(member.validation.nullCheck(birth)==true){
					$('.birth-check-text').html('');
				}
				/*여권번호 정규식*/
				if(member.validation.postNoCheck(passportNo)==false){
					$('.passportno-check-text').html('<span style="color:red;">여권번호는 필수 입력값입니다.</span>');
				}
				if(member.validation.postNoCheck(passportNo)==true){
					$('.passportno-check-text').html('');
				}
				/*이메일 정규식*/
				if(member.validation.emailCheck(email)==false){
					$('.email-check-text').html('<span style="color:red;">이메일 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.emailCheck(email)==true){
					$('.email-check-text').html('');
				}
				/*주소 정규식*/
				if(member.validation.nullCheck(addr)==false){
					$('.addr-check-text').html('<span style="color:red;">주소 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.nullCheck(addr)==true){
					$('.addr-check-text').html('');
				}
				if(member.validation.nullCheck(addrDetail)==false){
					$('.addr-check-text').html('<span style="color:red;">주소 양식에 맞지 않거나 필수 입력값입니다.</span>');
				}
				if(member.validation.nullCheck(addrDetail)==true){
					$('.addr-check-text').html('');
				}
				/*본인 인증 정규식*/
				if(emailAuthFlag==false){
					$('.emailAuth-check-text').html('<span style="color:red;">본인인증을 해주세요.</span>');
				}
				if(emailAuthFlag==true){
					$('.emailAuth-check-text').html('');
				}
				if(member.validation.nullCheck(id)==true &&
				   member.validation.nullCheck(pw)==true &&
				   member.validation.korNameCheck(korName)==true &&
				   member.validation.engNameCheck(familyName)==true &&
				   member.validation.engNameCheck(firstName)==true &&
				   member.validation.phoneNoCheck(phoneNo)==true &&
				   member.validation.nullCheck(birth)==true &&
				   member.validation.postNoCheck(passportNo)==true &&
				   member.validation.emailCheck(email)==true &&
				   member.validation.nullCheck(addr)==true &&
				   member.validation.nullCheck(addrDetail)==true &&
				   registIdFlag ==true &&
				   emailAuthFlag ==true){
					$.ajax({
						url : $.context() + '/memberRegist',
						method : "POST",
						data : JSON.stringify({
							id : id,
							pw : pw,
							korName : korName,
							familyName : familyName,
							firstName : firstName,
							phoneNo : phoneNo,
							birth : birth,
							passportNo : passportNo,
							email : email,
							addr : addr,
							addrDetail : addrDetail,
							gender : gender
						}),
						dataType : "json",
						contentType : "application/json",
						success : function(data){
							if(data.result==='success'){
								alert('회원가입 완료');
								$('#wrapper').empty();
								mainPageBeforeLogin();
							}else{
								alert('회원가입 실패');
							}
						},
						error : function(xhr,status,msg){
							alert('회원가입 실패');
						}
					});
				}
			});
	};
	var goLogin = function(){
		   $('.kal-before-login-sub-right-menu-login').on('click',function(){
			   alert('로그인진입');
				$('#wrapper').empty();
				$('#wrapper').append(login());
				$('.kal-gg-mainlogo').on('click',function(){
					alert('메인페이지로 이동');
					mainPageBeforeLogin();
				});
				var authId = $.cookie('authId');
				if(authId != undefined){
					$('#userid').val(authId);
					$('#remember').prop("checked",true);
				}
			$('.kal-gg-registbtn').on('click',function(){
				alert('회원가입 버튼 클릭');
				goRegist();
			});
			$('#login-submit-btn').on('click',function(){
					alert('로그인버튼 클릭');
					if($.trim($('#userid').val()) == ""){
						alert('아이디를 입력해 주세요.');
						return;
					}else{
						if($('#remember').prop('checked')){
							$.cookie('authId',$('#username').val());
						}else{
							$.removeCookie('authId');
						}
						/*e.preventDefault();*/
						$.ajax({
							url : $.context() + '/login',
							method : "POST",
							data : JSON.stringify({
								id : $('#userid').val(),
								pw : $('#userpw').val()
							}),
							dataType : "json",
							contentType : "application/json",
							success : function(data){
								if(data.result==='success'){
									alert('환영합니다 '+data.korName+' 님');
									$.cookie('loginedId',data.id);
									$.cookie('loginedKorName',data.korName);
									$.cookie('loginedEngName',data.firstName + ' ' + data.familyName);
									$.cookie('loginedEmail',data.email);
									$.cookie('loginedAddr',data.addr);
									$.cookie('loginedPhoneNo',data.phoneNo);
									$.cookie('loginedPassPortNo',data.passPortNo);
									$('#wrapper').empty();
									mainPageAfterLogin();
									/*reservation 추가될 부분*/
								}if(data.result==='fail'){
									alert('입력하신 ID가 존재하지 않습니다.');
								}
							},
							error: function(xhr,status,msg){
								alert('입력하신 ID가 존재하지 않습니다.');
							}
						});
					}
				});
			});
	   };
   return {
      onCreate : onCreate,
      afterLoginSubGnbOnclick : afterLoginSubGnbOnclick,
      afterLoginMainGnbOnclick : afterLoginMainGnbOnclick,
      mainPageAfterLogin : mainPageAfterLogin
   };
})();
