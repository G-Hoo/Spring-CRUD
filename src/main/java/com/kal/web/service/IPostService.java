package com.kal.web.service;

import java.util.Map;
import org.springframework.stereotype.Service;


@Service
@FunctionalInterface
public interface IPostService {
	public int execute(Map<String, Object> map) throws Exception;
}
