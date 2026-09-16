package com.snehil.portfolio.controller;

import com.snehil.portfolio.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api")
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value = "/sse/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeGeneral() {
        return sseService.subscribe();
    }

    @GetMapping(value = "/coding-activity/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeCodingActivity() {
        return sseService.subscribe();
    }

    @GetMapping(value = "/portfolio/updates", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribePortfolioUpdates() {
        return sseService.subscribe();
    }
}
