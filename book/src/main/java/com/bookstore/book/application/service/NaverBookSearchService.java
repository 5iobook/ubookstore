package com.bookstore.book.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverBookSearchService {

    @Value("${naver.api.client-id:}")
    private String clientId;

    @Value("${naver.api.client-secret:}")
    private String clientSecret;

    @Value("${naver.api.book-search-url}")
    private String bookSearchUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> searchBooks(String query, int start, int display) {
        try {
            // Naver API 키가 설정되지 않은 경우 샘플 데이터 반환
            if (clientId.isEmpty() || clientSecret.isEmpty() || "YOUR_CLIENT_ID".equals(clientId)) {
                return getSampleBookData(query, start, display);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);

            String url = UriComponentsBuilder.fromHttpUrl(bookSearchUrl)
                    .queryParam("query", query)
                    .queryParam("start", start)
                    .queryParam("display", display)
                    .build()
                    .toUriString();

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return convertNaverResponse(response.getBody(), start, display);
            }
        } catch (Exception e) {
            log.error("Naver API 호출 실패: {}", e.getMessage());
        }

        // API 호출 실패 시 샘플 데이터 반환
        return getSampleBookData(query, start, display);
    }

    private Map<String, Object> convertNaverResponse(Map<String, Object> naverResponse, int start, int display) {
        List<Map<String, Object>> items = (List<Map<String, Object>>) naverResponse.get("items");
        List<Map<String, Object>> books = new ArrayList<>();

        if (items != null) {
            for (Map<String, Object> item : items) {
                Map<String, Object> book = new HashMap<>();
                book.put("isbn", item.get("isbn"));
                book.put("title", removeHtmlTags((String) item.get("title")));
                book.put("author", removeHtmlTags((String) item.get("author")));
                book.put("publisher", removeHtmlTags((String) item.get("publisher")));
                book.put("discount", item.get("discount"));
                book.put("image", item.get("image"));
                book.put("link", item.get("link"));
                book.put("description", removeHtmlTags((String) item.get("description")));
                books.add(book);
            }
        }

        int total = (Integer) naverResponse.getOrDefault("total", 0);
        int totalPages = (int) Math.ceil((double) total / display);

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("totalPages", totalPages);
        pageInfo.put("totalElements", total);
        pageInfo.put("number", (start - 1) / display);
        pageInfo.put("size", display);

        Map<String, Object> bookPage = new HashMap<>();
        bookPage.put("content", books);
        bookPage.put("page", pageInfo);

        Map<String, Object> result = new HashMap<>();
        result.put("bookPage", bookPage);

        return result;
    }

    private String removeHtmlTags(String text) {
        if (text == null) return "";
        return text.replaceAll("<[^>]*>", "");
    }

    private Map<String, Object> getSampleBookData(String query, int start, int display) {
        List<Map<String, Object>> books = new ArrayList<>();

        // 샘플 도서 데이터
        Map<String, Object> book1 = new HashMap<>();
        book1.put("isbn", "9788966262281");
        book1.put("title", "스프링 부트와 AWS로 혼자 구현하는 웹 서비스");
        book1.put("author", "이동욱");
        book1.put("publisher", "프리렉");
        book1.put("discount", 23400);
        book1.put("image", "https://shopping-phinf.pstatic.net/main_3243613/32436139938.20230926071429.jpg");

        Map<String, Object> book2 = new HashMap<>();
        book2.put("isbn", "9791162243685");
        book2.put("title", "스프링 인 액션");
        book2.put("author", "크레이그 월즈");
        book2.put("publisher", "제이펍");
        book2.put("discount", 31500);
        book2.put("image", "https://shopping-phinf.pstatic.net/main_3243613/32436139938.20230926071429.jpg");

        Map<String, Object> book3 = new HashMap<>();
        book3.put("isbn", "9788960777330");
        book3.put("title", "토비의 스프링 3.1");
        book3.put("author", "이일민");
        book3.put("publisher", "에이콘출판사");
        book3.put("discount", 40500);
        book3.put("image", "https://shopping-phinf.pstatic.net/main_3243613/32436139938.20230926071429.jpg");

        Map<String, Object> book4 = new HashMap<>();
        book4.put("isbn", "9791162245385");
        book4.put("title", "자바 ORM 표준 JPA 프로그래밍");
        book4.put("author", "김영한");
        book4.put("publisher", "에이콘출판사");
        book4.put("discount", 36000);
        book4.put("image", "https://shopping-phinf.pstatic.net/main_3243613/32436139938.20230926071429.jpg");

        Map<String, Object> book5 = new HashMap<>();
        book5.put("isbn", "9788966263134");
        book5.put("title", "리액트를 다루는 기술");
        book5.put("author", "김민준");
        book5.put("publisher", "길벗");
        book5.put("discount", 32400);
        book5.put("image", "https://shopping-phinf.pstatic.net/main_3243613/32436139938.20230926071429.jpg");

        books.add(book1);
        books.add(book2);
        books.add(book3);
        books.add(book4);
        books.add(book5);

        // 쿼리 필터링
        if (query != null && !query.trim().isEmpty()) {
            books = books.stream()
                    .filter(book -> ((String) book.get("title")).toLowerCase().contains(query.toLowerCase()))
                    .collect(java.util.stream.Collectors.toList());
        }

        // 페이징 처리
        int totalElements = books.size();
        int totalPages = (int) Math.ceil((double) totalElements / display);
        int startIndex = start - 1;
        int endIndex = Math.min(startIndex + display, totalElements);

        List<Map<String, Object>> pagedBooks = 
            startIndex < totalElements && startIndex >= 0 ? books.subList(startIndex, endIndex) : new ArrayList<>();

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("totalPages", totalPages);
        pageInfo.put("totalElements", totalElements);
        pageInfo.put("number", (start - 1) / display);
        pageInfo.put("size", display);

        Map<String, Object> bookPage = new HashMap<>();
        bookPage.put("content", pagedBooks);
        bookPage.put("page", pageInfo);

        Map<String, Object> result = new HashMap<>();
        result.put("bookPage", bookPage);

        return result;
    }
}