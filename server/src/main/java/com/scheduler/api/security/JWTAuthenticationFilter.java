package com.scheduler.api.security;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
/*import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scheduler.api.repositories.UsersRepository;
import com.scheduler.api.models.User;*/

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	/*private AuthenticationManager authenticationManager;
	private UsersRepository userRepository;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
        	Map<String, String> creds = new ObjectMapper()
                    .readValue(req.getInputStream(), Map.class);
        	
        	if (creds.get("remember").equals("true")) {
        		req.setAttribute("remember", true);
        	}
        	else {
        		req.setAttribute("remember", false);
        	}
        	
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.get("username"),
                            creds.get("password"),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (AuthenticationException e) {
        	System.out.println(e.getMessage());
        	try {
				res.getWriter().write("{\"message\": \"false\"}");
				res.getWriter().flush();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
        	return null;
        }
    }
    
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

    	boolean remember = (boolean) req.getAttribute("remember");
    	String token;
    	if (remember == true) {
    			SecureRandom prng;
				try {
					prng = SecureRandom.getInstance("SHA1PRNG");
		    	    String randomNum = Integer.valueOf(prng.nextInt()).toString();
		    	    MessageDigest sha = MessageDigest.getInstance("SHA-1");
		    	    byte[] hashedNum =  sha.digest(randomNum.getBytes());
		    	    System.out.println(randomNum);
		    	    System.out.println(hashedNum);
		    	    String name = ((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername();
		    	    System.out.println(name);
		    	    try {
		    	    	User user = userRepository.findByUsername(name);
		    	    	System.out.println(user.getUsername());
		    	    }
		    	    catch (Exception e) {
		    	    	e.printStackTrace();
		    	    }
					User user = userRepository.findByUsername(name);
					user.setRememberToken(hashedNum.toString());
					token = JWT.create()
			                .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
			                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
			                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
			        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
			        res.getWriter().write("{\"token\": \"" + token.toString() + "\", \"username\":\"" + ((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername() + "\", \"remember\": \"" + randomNum + "\"}");
			        res.getWriter().flush();
				} catch (NoSuchAlgorithmException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    	}
    	else {
    		token = JWT.create()
                    .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                    .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
            res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
            res.getWriter().write("{\"token\": \"" + token.toString() + "\", \"username\":\"" + ((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername() + "\"}");
            res.getWriter().flush();
    	}
    }*/
}
