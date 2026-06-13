package com.GatherPoint.backend.Ai;

import lombok.Data;

import java.util.List;

@Data
public class GeminiRequest {
    private List<Content> contents;

    @Data
    public static class Content {
        private List<Part> parts;

        public Content(List<Part> parts) {
            this.parts = parts;
        }
    }

    @Data
    public static class Part {
        private String text;

        public Part(String text) {
            this.text = text;
        }
    }
}
