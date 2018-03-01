package com.lynas.service.impl;

import com.lynas.model.AppUser;
import com.lynas.service.AppUserService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by uuuu on 2/13/2018.
 */

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    SessionFactory sessionFactory;

    @Transactional
    public void insertUser(AppUser appUser) {
        sessionFactory.getCurrentSession().save(appUser);
    }
}
