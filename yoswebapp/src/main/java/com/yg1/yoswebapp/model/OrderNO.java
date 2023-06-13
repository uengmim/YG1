package com.yg1.yoswebapp.model;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.StoredProcedureParameter;

/**
 * JPA TEST TABLE
 */
@Entity
@NamedStoredProcedureQuery(name = "order", procedureName = "GET_ORDERNO", parameters = { 
    @StoredProcedureParameter( mode = ParameterMode.IN, type = String.class, name = "@COMP" ),
    @StoredProcedureParameter( mode = ParameterMode.IN, type = String.class, name = "@TDAT")
    }, resultSetMappings = "mapping")
@SqlResultSetMapping(name = "mapping", classes = {
    @ConstructorResult(targetClass = OrderNO.class, columns = {               
       @ColumnResult(name = "ORDERNO", type = String.class)
    })
 })
public class OrderNO {
    /**
     * 오더번호
     */
    @Id
    private String ORDERNO;

    public String getORDERNO(){
        return this.ORDERNO;
    }

    public void setORDERNO(String ORDERNO){
        this.ORDERNO = ORDERNO;
    }
}