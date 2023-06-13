package com.yg1.yoswebapp.controllers;

import java.util.Objects;

import com.yg1.yoswebapp.config.JwtTokenUtil;
import com.yg1.yoswebapp.model.JwtRequest;
import com.yg1.yoswebapp.model.JwtResponse;
import com.yg1.yoswebapp.model.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;


	@RequestMapping(value = "api/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUSRID(), authenticationRequest.getUSRPW());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUSRID());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
