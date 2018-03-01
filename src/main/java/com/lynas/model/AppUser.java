package com.lynas.model;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;

/**
 * Created by sazzad on 2/11/16
 */
@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column(nullable = false)
    String userName;
    @Column(nullable = false)
    String password;

    public AppUser(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}