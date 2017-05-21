package com.kal.web.service;

import java.util.Map;
import org.springframework.stereotype.Service;

@Service
@FunctionalInterface
public interface IDeleteService {
	public int execute(Map<String,Object> paramMap) throws Exception;
}
