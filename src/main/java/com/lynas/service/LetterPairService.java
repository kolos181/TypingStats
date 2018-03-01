package com.lynas.service;

import com.lynas.model.LetterPair;
import org.springframework.stereotype.Service;

/**
 * Created by uuuu on 2/14/2018.
 */
@Service
public interface LetterPairService {
    void addLetterPair(LetterPair letterPair);
}
