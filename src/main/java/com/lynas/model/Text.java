package com.lynas.model;

import javax.persistence.*;

/**
 * Created by uuuu on 2/16/2018.
 */

@Entity
public class Text {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(nullable = false)
    String text;

    public Text(String text) {
        this.text = text;
    }

    public Text() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
