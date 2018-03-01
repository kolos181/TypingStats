package com.lynas.service.impl;

import com.lynas.model.Text;
import com.lynas.service.TextService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by uuuu on 2/16/2018.
 */

@Service
public class TextServiceImpl implements TextService {

    @Autowired
    SessionFactory sessionFactory;

    @Transactional
    public void addText(Text text) {
        sessionFactory.getCurrentSession().save(text);
    }

    @Transactional
    public Text getText(int id) {
        return sessionFactory.getCurrentSession().get(Text.class, id);
    }
}
