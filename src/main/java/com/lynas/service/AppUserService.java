package com.lynas.service;

import com.lynas.model.AppUser;
import org.springframework.stereotype.Service;

/**
 * Created by uuuu on 2/13/2018.
 */
@Service
public interface AppUserService {
    void insertUser(AppUser appUser);
}
