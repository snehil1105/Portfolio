package com.snehil.portfolio.repository;

import com.snehil.portfolio.entity.LikeCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<LikeCounter, Long> {

    @Modifying
    @Query("UPDATE LikeCounter c SET c.count = c.count + 1 WHERE c.id = 1")
    void incrementCount();

    @Query("SELECT c.count FROM LikeCounter c WHERE c.id = 1")
    long getCount();
}
