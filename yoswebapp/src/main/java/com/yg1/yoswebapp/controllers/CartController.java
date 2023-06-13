package com.yg1.yoswebapp.controllers;

import java.util.List;

import javax.validation.Valid;

import com.yg1.yoswebapp.model.Product;
import com.yg1.yoswebapp.model.CTNOM;
import com.yg1.yoswebapp.model.CartRepository;
import com.yg1.yoswebapp.model.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    /**
     * DB 전체 장바구니 조회
     * 
     * @return
     */
    @GetMapping("/carts")
    public List<CTNOM> getAllCartList() {
        return cartRepository.findAll();
    }

    /**
     * USERID 기준으로 장바구니 조회
     * 
     * @param USERID
     * @return
     * @throws Exception
     */
    @GetMapping("/carts/{id}")
    public List<CTNOM> getCartByUSERID(@PathVariable(value = "id") String USERID) throws Exception {
        try {
            List<CTNOM> cartList = cartService.findUserCart(USERID);
            return cartList;
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * USERID / EDP 기준 장바구니 삭제
     * 
     * @param USERID
     * @param EDP
     * @return
     * @throws Exception
     */
    @DeleteMapping("/carts/{id},{edp}")
    public ResponseEntity<CTNOM> deleteCart(@PathVariable(value = "id") String USERID,
            @PathVariable(value = "edp") String EDP) throws Exception {
        try {
            CTNOM cart = cartService.findByTwo(USERID, EDP);
            if (cart != null) {
                cart.setCART(0);
                final CTNOM updatedCart = cartRepository.save(cart);
                return ResponseEntity.ok(updatedCart);
            } else {
                // 오류 메세지 추가 부분 ?
                return ResponseEntity.ok().body(null);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    @PostMapping("/carts/{id}")
    public ResponseEntity<CTNOM> deleteCart(@PathVariable(value = "id") String USERID,
            @Valid @RequestBody List<CTNOM> CartItems) throws Exception {
        try {
            if (CartItems != null) {
                for (CTNOM ctnom : CartItems) {
                    String EDP = ctnom.getEDP();
                    CTNOM cart = cartService.findByTwo(USERID, EDP);
                    if (cart != null) {
                        cart.setCART(0);
                        cartRepository.save(cart);
                    } else {
                        // 오류 메세지 던져주기
                    }
                }
            }
            return null;

        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * USERID / EDP 기준 장바구니 수정 & 추가
     * 
     * @param USERID
     * @param EDP
     * @param CartItems
     * @return
     * @throws Exception
     */
    @PutMapping("/carts/{id},{edp}")
    public ResponseEntity<CTNOM> updateCart(@PathVariable(value = "id") String USERID,
            @PathVariable(value = "edp") String EDP, @Valid @RequestBody CTNOM CartItems) throws Exception {
        try {
            CTNOM cart = cartService.findByTwo(USERID, EDP);
            if (cart != null) {
                cart.setCART(CartItems.getCART());
                final CTNOM updatedCart = cartRepository.save(cart);
                return ResponseEntity.ok(updatedCart);
            } else {
                final CTNOM insertCart = cartRepository.save(CartItems);

                return ResponseEntity.ok(insertCart);
            }

        } catch (Exception e) {
            throw e;
        }
    }

    // MassOrder 장바구니 추가
    @PostMapping("/carts/mass/{id}")
    public ResponseEntity<CTNOM> UpdateCartByMassOrder(@PathVariable(value = "id") String USERID,
            @Valid @RequestBody List<Product> CartItems) throws Exception {
                try {
                    if (CartItems != null) {
                        cartRepository.deleteByUSERID(USERID);
                        //cartService.updateSEQ(USERID);
                        for (Product prodt : CartItems) {
                           
                            // 없으면 신규 추가
                            CTNOM newInsert = new CTNOM();
                            newInsert.setUSERID(USERID);
                            newInsert.setPRODUCT(prodt.getproduct());
                            newInsert.setSTANDARD(prodt.getstandard());
                            newInsert.setEDP(prodt.getedp());
                            newInsert.setPRICE(Float.parseFloat(String.valueOf(prodt.getprice())));
                            newInsert.setQUANTITY(prodt.getquantity());
                            newInsert.setCURRENCY(prodt.getcurrency());
                            newInsert.setPACKING(String.valueOf(prodt.getpacking()));
                            newInsert.setORDERMARK(prodt.getordermark());
                            newInsert.setCART(prodt.getcart());
                            newInsert.setUSERID(USERID);
                            newInsert.setSEQNUM(CartItems.indexOf(prodt) + 1);
        
                            cartRepository.save(newInsert);
                        }
        
        
        
                        // //기존 로직
                        // cartService.updateSEQ(USERID);
                        // for (Product prodt : CartItems) {
                        //     String EDP = prodt.getedp();
                        //     CTNOM cart = cartService.findByTwo(USERID, EDP);
                        //     if (cart != null) {
                                
                        //         // 기존거 더하기 신규
                        //         Integer summary = cart.getCART() + prodt.getcart();
                        //         cart.setCART(summary);
                        //         cart.setSEQNUM(CartItems.indexOf(prodt) + 1);
        
                        //         cartRepository.save(cart);
                        //     } else {
        
                        //         // 없으면 신규 추가
                        //         CTNOM newInsert = new CTNOM();
                        //         newInsert.setUSERID(USERID);
                        //         newInsert.setPRODUCT(prodt.getproduct());
                        //         newInsert.setSTANDARD(prodt.getstandard());
                        //         newInsert.setEDP(prodt.getedp());
                        //         newInsert.setPRICE(Float.parseFloat(String.valueOf(prodt.getprice())));
                        //         newInsert.setQUANTITY(prodt.getquantity());
                        //         newInsert.setCURRENCY(prodt.getcurrency());
                        //         newInsert.setPACKING(String.valueOf(prodt.getpacking()));
                        //         newInsert.setORDERMARK(prodt.getordermark());
                        //         newInsert.setCART(prodt.getcart());
                        //         newInsert.setUSERID(USERID);
                        //         newInsert.setSEQNUM(CartItems.indexOf(prodt) + 1);
        
                        //         cartRepository.save(newInsert);
                        //     }
                        // }
        
        
        
        
        
                    }
                    return null;
        
                } catch (Exception e) {
                    throw e;
                }
    }

}