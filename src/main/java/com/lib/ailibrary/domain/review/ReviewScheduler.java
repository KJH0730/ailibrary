package com.lib.ailibrary.domain.review;

import com.lib.ailibrary.domain.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewScheduler {

    private final BookService bookService;
    private final ReviewService reviewService;
    private final ReviewApiService reviewApiService;

    @Scheduled(fixedRate = 60000) //fixedRate = 60000 (1분마다) cron = "0 0 12 * * *"
    public void reviewSummary() {
        //int[] allBookId = bookService.findAllBookId();  // 모든 도서 번호 가져 오기

        //for (int i : allBookId) {
            List<ReviewResponse> reviewList = reviewService.findReviewByBookId(11); // 각 도서별 리뷰 가져 오기

//            if (reviewList.isEmpty()) { // 리뷰 없으면 다음 도서
//                continue;
//            }


            StringBuilder stringBuilder = new StringBuilder();
            for (ReviewResponse review : reviewList) {
                String cleanedReview = review.getReview().replaceAll("[\\r\\n]+", " ");
                stringBuilder.append(cleanedReview).append(" "); // 리뷰 합치기
            }
            String reviews = stringBuilder.toString();
            String reviewSummary = reviewApiService.sendPostRequest(reviews); // 합친 리뷰 GPT 전송
            ReviewDto dto = new ReviewDto();
            dto.setReviewSummary(reviewSummary);
            dto.setBookId(11);
            bookService.updateReviewSummary(dto);     // 요약한 리뷰 db에 저장
        }
    }

