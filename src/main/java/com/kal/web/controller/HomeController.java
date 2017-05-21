package com.kal.web.controller;

import java.util.Locale;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.kal.web.composite.Complex;

@SessionAttributes("context")
@Controller

public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model,HttpSession session) {
		logger.info("HomeController - home() {}","Enter");
		
		session.setAttribute("context",Complex.ContextFactory.create());
		logger.info("===context===  : {}",Complex.ContextFactory.create());
		return "home";
	}
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model,HttpSession session) {
		logger.info("HomeController - login() {}","Enter");
		return "common/login";
	}
	@RequestMapping(value = "/regist", method = RequestMethod.GET)
	public String regist(Locale locale, Model model,HttpSession session) {
		logger.info("HomeController - regist() {}","Enter");
		return "common/regist";
	}
}
