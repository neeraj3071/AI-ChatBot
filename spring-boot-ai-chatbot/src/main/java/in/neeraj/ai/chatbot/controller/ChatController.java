package in.neeraj.ai.chatbot.controller;

import in.neeraj.ai.chatbot.model.ChatRequest;
import in.neeraj.ai.chatbot.service.GeminiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ai/chat")
    public Mono<String> generateContent(@RequestBody ChatRequest chatRequest) {
        return geminiService.generateContent(chatRequest.getMessage());
    }
}
