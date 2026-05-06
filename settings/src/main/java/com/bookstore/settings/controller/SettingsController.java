package com.bookstore.settings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SettingsController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/profile")
    public String profile() {
        return "index";
    }

    @GetMapping("/preferences")
    public String preferences() {
        return "index";
    }

    @GetMapping("/notifications")
    public String notifications() {
        return "index";
    }

    @GetMapping("/privacy")
    public String privacy() {
        return "index";
    }
}