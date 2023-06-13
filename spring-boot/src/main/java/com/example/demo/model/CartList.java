package com.example.demo.model;

public class CartList{
    private String userid;
    private String product;
    private String edp;
    private String standard;
    private int price;
    private String stock;
    private String packing;
    private int cart;
    private String errmsg;

    public CartList(){
    }
    public String getuserid(){
        return userid;
    }
    public void setuserid(String userid){
        this.userid = userid;
    }
    public String getproduct(){
        return product;
    }
    public void setproduct(String product){
        this.product = product;
    }
    public String getedp(){
        return edp;
    }
    public void setedp(String edp){
        this.edp = edp;
    }
    public String getstandard(){
        return standard;
    }
    public void setstandard(String standard){
        this.standard = standard;
    }
    public int getprice(){
        return price;
    }
    public void setprice(int price){
        this.price = price;
    }
    public String getstock(){
        return stock;
    }
    public void setstock(String stock){
        this.stock = stock;
    }
    public String getpacking(){
        return packing;
    }
    public void setpacking(String packing){
        this.packing = packing;
    }
    public int getcart(){
        return cart;
    }
    public void setcart(int cart){
        this.cart = cart;
    }

    public String getErrMsg(){
        return errmsg;
    }
    public void setErrMsg(String errmsg){
        this.errmsg = errmsg;
    }

     
}