package com.snehil.portfolio.controller;

import com.snehil.portfolio.service.LikeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    private final LikeService likeService;

    public PageController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("initialLikes", likeService.getCount());
        return "index";
    }
}
