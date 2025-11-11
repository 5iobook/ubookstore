package com.bookstore.book.presentation.controller.v1;

import com.bookstore.book.domain.book.vo.Book;
import com.bookstore.book.domain.book.vo.NaverResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.util.List;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@RequestMapping("/book")
public class BookController {

  @GetMapping("/list")
  public String list(@RequestParam(required = false) String text, Model model) {
    if (text == null || text.isBlank()) {
      text = "spring"; // 기본 검색어 설정
    }
    // 네이버 검색 API 요청
    String clientId = "eY6Xy4XmnZ5hwEmYepFa";
    String clientSecret = "54LEsfYv0V";

    //String apiURL = "https://openapi.naver.com/v1/search/blog?query=" + text;    // JSON 결과
    URI uri = UriComponentsBuilder
        .fromUriString("https://openapi.naver.com")
        .path("/v1/search/book.json")
        .queryParam("query", text)
        .queryParam("display", 10)
        .queryParam("start", 1)
        .queryParam("sort", "sim")
        .encode()
        .build()
        .toUri();

    // Spring 요청 제공 클래스
    RequestEntity<Void> req = RequestEntity
        .get(uri)
        .header("X-Naver-Client-Id", clientId)
        .header("X-Naver-Client-Secret", clientSecret)
        .build();

    // Spring 제공 restTemplate
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> resp = restTemplate.exchange(req, String.class);
    System.out.println("응답: " + resp.getStatusCode());
    System.out.println("본문: " + resp.getBody());

    // JSON 파싱 (Json 문자열을 객체로 만듦, 문서화)
    ObjectMapper om = new ObjectMapper();
    NaverResult resultVO = null;

    try {
      resultVO = om.readValue(resp.getBody(), NaverResult.class);
    } catch (JsonMappingException e) {
      e.printStackTrace();
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    List<Book> books = resultVO != null ? resultVO.getItems() : List.of();  // books를 list.html에 출력 -> model 선언
    model.addAttribute("books", books);

    return "book/list";
  }
}

