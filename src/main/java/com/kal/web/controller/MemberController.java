package com.kal.web.controller;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kal.web.domain.Member;
import com.kal.web.mapper.MemberMapper;
import com.kal.web.service.MemberService;
import com.kal.web.util.EmailAuthUtil;

@RestController
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired MemberMapper mapper;
	@Autowired Member member;
	@Autowired MemberService memberService;
	
	@RequestMapping(value="/login",
					method=RequestMethod.POST,
					consumes="application/json")
	public @ResponseBody Map<?,?> login(@RequestBody Map<String,Object> paramMap) throws Exception {
		logger.info("MemberController-login() {}","ENTER");
		Map<String,Object> map = new HashMap<>();
		String id = (String) paramMap.get("id");
		String pw = (String) paramMap.get("pw");
		System.out.println("넘어온 id :" + id);
		System.out.println("넘어온 pw :" + pw);
		paramMap.put("value1", id);
		paramMap.put("value2", pw);
		Member member=memberService.login(paramMap);
		if(member.getUserId().equals(id) && member.getUserPass().equals(pw)){
			System.out.println("=========맵퍼를 거치고 들어왔음=========");
			map.put("result", "success");
			map.put("korName", member.getKorName());
			map.put("id", member.getUserId());
			map.put("familyName", member.getFamilyName());
			map.put("firstName", member.getFirstName());
			map.put("email", member.getUserEmail());
			map.put("addr", member.getUserAddr());
			map.put("phoneNo", member.getPhoneNo());
			map.put("passPortNo", member.getUserPostNum());
		}else{
			map.put("result", "fail");
		}
		return map;
	}
	
	@RequestMapping(value="/idOverlapCheck",
					method=RequestMethod.POST,
					consumes="application/json")
	public @ResponseBody Map<?,?> idOverlapCheck(@RequestBody Map<String,Object> paramMap) throws Exception {
		logger.info("MemberController-idOverlapCheck() {}","ENTER");
		Map <String,Object> map = new HashMap<>();
		String id = (String) paramMap.get("id");
		System.out.println("넘어온 id :" + id);
		paramMap.put("value", id);
		int check=memberService.idOverlapCheck(paramMap);
		if(check==1){
			System.out.println("==========맵퍼를 거치고 들어왔음===========");
			map.put("result", "success");
		}else{
			map.put("result", "fail");
		}
		return map;
	}
	
	@RequestMapping(value="/memberRegist",
			method=RequestMethod.POST,
			consumes="application/json")
	public @ResponseBody Map<?,?> memberRegist(@RequestBody Map<String,Object> paramMap) throws Exception {
	logger.info("MemberController-memberRegist() {}","ENTER");
	Map <String,Object> map = new HashMap<>();
	String id = (String) paramMap.get("id");
	String pw = (String) paramMap.get("pw");
	String korName = (String) paramMap.get("korName");
	String familyName = (String) paramMap.get("familyName");
	String firstName = (String) paramMap.get("firstName");
	String phoneNo = (String) paramMap.get("phoneNo");
	String birth = (String) paramMap.get("birth");
	String passportNo = (String) paramMap.get("passportNo");
	String email = (String) paramMap.get("email");
	String addr = (String) paramMap.get("addr");
	String addrDetail = (String) paramMap.get("addrDetail");
	String gender = (String) paramMap.get("gender");
	System.out.println("넘어온 회원가입 정보 :" + id + ' ' + pw + ' ' + korName + ' '  + familyName + ' ' 
			+ firstName + ' ' + phoneNo + ' ' + birth + ' ' + passportNo + ' ' + email + ' ' + addr + ' ' 
			+ addrDetail + ' ' + gender);
	
	paramMap.put("id", id);
	paramMap.put("pass", pw);
	paramMap.put("familyName", familyName);
	paramMap.put("firstName", firstName);
	paramMap.put("korName", korName);
	paramMap.put("phoneNo", phoneNo);
	paramMap.put("birthDate", birth);
	paramMap.put("gen", gender);
	paramMap.put("email", email);
	paramMap.put("addr", addr + ' ' +addrDetail);
	paramMap.put("postNum", passportNo);

	int check=memberService.addMember(paramMap);
	if(check==1){
		System.out.println("==========맵퍼를 거치고 들어왔음===========");
		map.put("result", "success");
	}else{
		map.put("result", "fail");
	}
	return map;
	}
	
	@RequestMapping(value="/memberUpdate",
					method=RequestMethod.POST,
					consumes="application/json")
	public @ResponseBody Map <?,?> memberUpdate(@RequestBody Map<String,Object> paramMap) throws Exception{
		logger.info("MemberController-memberUpdate() {}","ENTER");
		Map <String,Object> map = new HashMap<>();
		String id = (String) paramMap.get("id");
		String newPw = (String) paramMap.get("newPw");
		String newEmail = (String) paramMap.get("newEmail");
		String newPhoneNo = (String) paramMap.get("newPhoneNo");
		String newAddr = (String) paramMap.get("newAddr");
		String newAddrDetail = (String) paramMap.get("newAddrDetail");
		System.out.println("넘어온 회원수정 정보 : " + id + ' ' + newPw + ' ' + newEmail + ' ' + newPhoneNo 
							+ ' ' + newAddr + ' ' + newAddrDetail);
		paramMap.put("id", id);
		paramMap.put("newPw", newPw);
		paramMap.put("newEmail", newEmail);
		paramMap.put("newPhoneNo", newPhoneNo);
		paramMap.put("newAddr", newAddr + ' ' + newAddrDetail);
		int check=memberService.updateMember(paramMap);
		if(check==1){
			System.out.println("==========맵퍼를 거치고 들어왔음===========");
			map.put("result", "success");
		}else{
			map.put("result", "fail");
		}
		return map;
	}
	
	@RequestMapping(value="/userDelete",
					method=RequestMethod.POST,
					consumes="application/json")
	public @ResponseBody Map<?,?> memberDelete(@RequestBody Map<String,Object> paramMap) throws Exception {
		logger.info("MemberController-memberDelete() {}","ENTER");
		Map <String,Object> map = new HashMap<>();
		String loginedId = (String) paramMap.get("loginedId");
		String pw = (String) paramMap.get("pw");
		System.out.println("넘어온 회원탈퇴 정보 : " + loginedId + ' ' + pw);
		paramMap.put("loginedId", loginedId);
		paramMap.put("pw", pw);
		int check=memberService.deleteMember(paramMap);
		if(check==1){
			System.out.println("==========맵퍼를 거치고 들어왔음===========");
			map.put("result", "success");
		}else{
			map.put("result", "fail");
		}
		return map;
	}
	
	@RequestMapping(value="/emailAuth",
					method=RequestMethod.POST,
					consumes="application/json")
	public @ResponseBody Map<?,?> emailAuth(@RequestBody Map<String,Object> paramMap) throws Exception {
		logger.info("MemberController-emailAuth() {}","ENTER");
		EmailAuthUtil auth = new EmailAuthUtil();
		Map<String,String> map = new HashMap<>();
		String email = (String) paramMap.get("authNo");
		String authNum = "";
		
		authNum = auth.RandomNum();
		auth.sendEmail(email.toString(), authNum);
		
		map.put("email", email);
		map.put("authNum", authNum);
		
		return map;
	}
}
