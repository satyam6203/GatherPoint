package com.GatherPoint.backend.Ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GeminiService {

    private final RestTemplate restTemplate;
    private final String apiKey;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
    }

    public String chat(String message) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        GeminiRequest.Part part = new GeminiRequest.Part(message);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest request = new GeminiRequest();
        request.setContents(List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<GeminiResponse> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, GeminiResponse.class);

        GeminiResponse body = response.getBody();
        if (body != null && body.getCandidates() != null && !body.getCandidates().isEmpty()) {
            List<GeminiResponse.Part> parts = body.getCandidates().get(0).getContent().getParts();
            if (parts != null && !parts.isEmpty()) {
                return parts.get(0).getText();
            }
        }

        return "Sorry, I couldn't process that request.";
    }
}
