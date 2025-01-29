package in.neeraj.ai.chatbot.controller;

import in.neeraj.ai.chatbot.model.ChatRequest;
import in.neeraj.ai.chatbot.service.GeminiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ai/chat")
    public Mono<String> generateContent(@RequestBody ChatRequest chatRequest) {
        logger.info("Received chat request: {}", chatRequest);

        return geminiService.generateContent(chatRequest.getMessage())
                .doOnSubscribe(subscription -> logger.debug("Processing request for message: {}", chatRequest.getMessage()))
                .doOnSuccess(response -> logger.info("Successfully generated content for request: {}", chatRequest))
                .doOnError(error -> logger.error("Error while generating content for request: {}", chatRequest, error));
    }
}
