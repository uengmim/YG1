package com.yg1.yoswebapp.model;

import java.util.ArrayList;
import java.util.List;

import com.yg1.yoswebapp.model.UserRepository;
import com.yg1.yoswebapp.model.USRIO;

import org.hibernate.query.criteria.internal.predicate.IsEmptyPredicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	/**
	 * 로그인 처리
	 */
	@Override
	public UserDetails loadUserByUsername(String USRID) throws UsernameNotFoundException {
		USRIO user = userRepository.findByUSRID(USRID);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with USRID: " + USRID);
		}
		return new org.springframework.security.core.userdetails.User(user.getUSRID(), user.getUSRPW(),
				new ArrayList<>());
	}

	/**
	 * 로그인 시 사용자 언어, 권한 가져옴
	 */
	public USRIO getUSRIO(String USRID) {
		USRIO user = userRepository.findByUSRID(USRID);
		USRIO newuser = new USRIO();
		newuser.setUSRAU(user.getUSRAU());
		newuser.setUSRLA(user.getUSRLA());
		newuser.setUSRCO(user.getUSRCO());
		newuser.setUSRPL(user.getUSRPL());
		newuser.setUSRNO(user.getUSRNO());
		newuser.setUSRDC(user.getUSRDC());
		return newuser;
	}

	/**
	 * 사용자 ID 중복체크
	 * 
	 * @param USRID
	 * @return
	 */
	public boolean checkByUSRID(String USRID) {
		Boolean duplicate = false;
		USRIO user = userRepository.findByUSRID(USRID);
		if (user == null) {
			duplicate = true;
			return duplicate;
		} else {
			duplicate = false;
			return duplicate;
		}
	}

	/**
	 * 고객 검색
	 */
	public List<USRIO> getCustomers(String USRPL) {
		List<USRIO> user = userRepository.findByUSRPL(USRPL);
		List<USRIO> newuserList = new ArrayList<USRIO>();
		for (int i = 0; i < user.size(); i++) {
			USRIO newuser = new USRIO();
			if (!(user.get(i).getUSRNO() == null || user.get(i).getUSRNO().isEmpty())) {
				newuser.setUSRID(user.get(i).getUSRID());
				newuserList.add(newuser);
			}
		}
		return newuserList;
	}


	
	/**
	 * 고객  전체 관리 
	 */
	public List<USRIO> getCustomers(String USRCO, String USRPL) {


		boolean isMaster = false;

		// 플랜트 없으면 마스터
		List<USRIO> user;
		if(USRPL.isEmpty()){
			isMaster = true;
			user = userRepository.findByUSRCO(USRCO);

		}else{
			isMaster = false;
			ArrayList<String> USRPLS = new ArrayList<>();
			if(USRPL.equals("4110") || USRPL.equals("4120")) {
				USRPLS.add("4110");
				USRPLS.add("4120");
			} else if(USRPL.equals("4125") || USRPL.equals("4130") || USRPL.equals("4140")) {
				USRPLS.add("4125");
				USRPLS.add("4130");
				USRPLS.add("4140");
			} else {
				USRPLS.add(USRPL);
			}
			user = userRepository.findByUSRCOAndUSRPLS(USRCO,USRPLS);
		}
		List<USRIO> newuserList = new ArrayList<USRIO>();
		
		for (int i = 0; i < user.size(); i++) {
			USRIO newuser = new USRIO();

		if( user.get(i).getUSRPL() == null || user.get(i).getUSRPL().isEmpty()) continue;

		boolean isUsrNoEmpty = (user.get(i).getUSRNO() == null || user.get(i).getUSRNO().isEmpty());
		if(isMaster == false && isUsrNoEmpty == true) continue;
			newuser.setUSRNO(user.get(i).getUSRNO());	
			newuser.setUSRPL(user.get(i).getUSRPL());
			newuser.setUSRID(user.get(i).getUSRID());
			newuser.setUSRNM(user.get(i).getUSRNM());				
			newuser.setUSRLA(user.get(i).getUSRLA());	
			newuserList.add(newuser);
	
		}
		return newuserList;
	}



}
