package com.lynas.controller;

import com.lynas.model.AppUser;
import com.lynas.model.LetterPair;
import com.lynas.model.Text;
import com.lynas.service.AppUserService;
import com.lynas.service.LetterPairService;
import com.lynas.service.TextService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by uuuu on 2/13/2018.
 */

@EnableWebMvc
@Controller
public class HomeController {

    @Autowired
    AppUserService appUserService;

    @Autowired
    LetterPairService letterPairService;

    @Autowired
    TextService textService;

    @RequestMapping(value = "/")
    public String home() {
        return "pages/main";
    }

    @RequestMapping(value = "/addUser")
    public String addUser() {
        appUserService.insertUser(new AppUser("Bubas", "Biba"));
        return "pages/main";
    }

    @RequestMapping(value = "/addLetterPair")
    public String addLetterPair() {
        letterPairService.addLetterPair(new LetterPair( 313, "Baba","ab"));
        return "pages/main";
    }

    @RequestMapping(value = "/letters/{lettersTime}/{lettersWord}/{pair}", method = RequestMethod.POST)
    public void addConflict(@PathVariable("lettersTime") int lettersTime,
                            @PathVariable("lettersWord") String lettersWord,
                            @PathVariable("pair") String pair) {
        LetterPair lp = new LetterPair(lettersTime, lettersWord, pair);
        letterPairService.addLetterPair(lp);
        System.out.println(lp);
    }

    @RequestMapping(value = "/getRandomText", method = RequestMethod.GET)
    public @ResponseBody String getRandomText() {
        Random random = new Random();
        //there are 3921 texts in database
        Text tx = textService.getText(random.nextInt(3921));
        System.out.println(tx.getText());
        return tx.getText();
    }
}


//  The Code I've used to add texts to database
//    @RequestMapping(value = "/insertTexts")
//    public void addAllTexts(){
//        try {
//            String text = FileUtils.readFileToString(new File("C:\\Users\\uuuu\\Documents\\klavogonki_English_texts.txt"), "utf-8");
//            Pattern pattern = Pattern.compile("\\d+\\t(.+?)\\r");
//            Matcher matcher = pattern.matcher(text);
//            ArrayList<String> al = new ArrayList<>();
//            while(matcher.find()) {
//                al.add(matcher.group());
//            }
//            ArrayList a2 = new ArrayList();
//            for(String temp: al) {
//                String s = temp.replaceAll("\\d+\\t", "");
//                textService.addText(new Text(s));
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//    }