package com.yg1.yoswebapp.message;

/**
 * ERP 처리 결과
 */
public class Result {
    /** 메시지 코드 */
    private int messageCode;
    /** 메시지 */
    private String Message;

    /**
     * 메시지 코드
     * @return 메시지 코드
     */
    public int getMessageCode() {
        return messageCode;
    }

    /**
     * 메시지 코드
     * @param messageCode 메시지 코드
     */
    public void setMessageCode(int messageCode) {
        this.messageCode = messageCode;
    }

    /**
     * 메시지
     * @return 메시지
     */
    public String getMessage() {
        return Message;
    }

    /**
     * 메시지 
     * @param message 메시지
     */
    public void setMessage(String message) {
        Message = message;
    }
    
}