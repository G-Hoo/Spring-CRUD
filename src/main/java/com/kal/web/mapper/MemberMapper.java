package com.kal.web.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.kal.web.domain.Member;
@Repository
public interface MemberMapper {
	public int addMember(Map<String, Object> map) throws Exception;
	public int findNumberOfMembers() throws Exception;
	public int idOverlapCheck(Map<String, Object> map) throws Exception;
	public Member findMember(Map<String,Object> paramMap) throws Exception;
	public List<Member> findMembers(Map<String,Object> paramMap) throws Exception; 
	public int updateMember(Map<String,Object> paramMap) throws Exception;
	public int deleteMember(Map<String,Object> paramMap) throws Exception;
}