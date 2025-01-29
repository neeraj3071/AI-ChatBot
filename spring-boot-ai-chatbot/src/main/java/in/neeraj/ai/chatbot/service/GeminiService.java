package in.neeraj.ai.chatbot.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    private final WebClient webClient;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
    }

    public Mono<String> generateContent(String message) {
        String apiKey = "AIzaSyBFqjDYLD4Y6a1SzvIqbR7UIjvEu8gjWFY";  // Use your API key

        logger.info("Sending request to Gemini API with message: {}", message);

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/gemini-1.5-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .header("Content-Type", "application/json")
                .bodyValue("{\"contents\": [{\"parts\": [{\"text\": \"" + message + "\"}]}]}")
                .retrieve()
                .bodyToMono(String.class)
                .doOnSubscribe(subscription -> logger.debug("Initiating API request to Gemini"))
                .doOnSuccess(response -> logger.info("Successfully received response from Gemini API"))
                .doOnError(WebClientResponseException.class, e -> logger.error("Error response from Gemini API: {}", e.getMessage()))
                .doOnError(e -> logger.error("Unexpected error while communicating with Gemini API: {}", e.getMessage()))
                .onErrorResume(WebClientResponseException.class, e -> {
                    logger.error("Handling WebClientResponseException: {}", e.getMessage());
                    return Mono.just("Error generating content with Gemini API: " + e.getMessage());
                })
                .onErrorResume(e -> {
                    logger.error("Handling unexpected error: {}", e.getMessage());
                    return Mono.just("Unexpected error occurred: " + e.getMessage());
                });
    }
}
