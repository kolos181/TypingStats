package com.lynas.service.impl;

import com.lynas.model.LetterPair;
import com.lynas.service.LetterPairService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by uuuu on 2/14/2018.
 */

@Service
public class LetterPairServiceImpl implements LetterPairService {

    @Autowired
    SessionFactory sessionFactory;

    @Transactional
    public void addLetterPair(LetterPair letterPair) {
    sessionFactory.getCurrentSession().save(letterPair);
    }
}
