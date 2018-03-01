package com.lynas.service;

import com.lynas.model.Text;
import org.springframework.stereotype.Service;

/**
 * Created by uuuu on 2/16/2018.
 */

@Service
public interface TextService {
    void addText(Text string);
    Text getText(int id);
}
