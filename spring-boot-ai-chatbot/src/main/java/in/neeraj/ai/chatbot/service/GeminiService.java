package in.neeraj.ai.chatbot.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class GeminiService {

    private final WebClient webClient;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com/v1beta")
                                       .build();
    }

    public Mono<String> generateContent(String message) {
        String apiKey = "AIzaSyBFqjDYLD4Y6a1SzvIqbR7UIjvEu8gjWFY";  // Use your API key

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/gemini-1.5-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .header("Content-Type", "application/json")
                .bodyValue("{\"contents\": [{\"parts\": [{\"text\": \"" + message + "\"}]}]}")
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    System.err.println("Error interacting with Gemini API: " + e.getMessage());
                    return Mono.just("Error generating content with Gemini API: " + e.getMessage());
                })
                .onErrorResume(e -> {
                    return Mono.just("Unexpected error occurred: " + e.getMessage());
                });
    }
}
