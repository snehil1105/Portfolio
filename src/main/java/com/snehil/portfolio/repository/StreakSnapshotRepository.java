package com.snehil.portfolio.repository;

import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreakSnapshotRepository extends JpaRepository<StreakSnapshot, Platform> {
}
