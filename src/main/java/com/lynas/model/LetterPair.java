package com.lynas.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by uuuu on 2/14/2018.
 */

@Entity
public class LetterPair {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(nullable = false)
    int lettersTime;


    @Column(nullable = false)
    String lettersWord;

    @Column(nullable = false)
    String pair;

    public LetterPair(int lettersTime, String lettersWord, String pair) {
        this.lettersTime = lettersTime;
        this.lettersWord = lettersWord;
        this.pair = pair;
    }

    public LetterPair() {
    }

    @Override
    public String toString() {
        return "LetterPair{" +
                "id=" + id +
                ", lettersTime=" + lettersTime +
                ", lettersWord='" + lettersWord + '\'' +
                ", pair='" + pair + '\'' +
                '}';
    }
}
