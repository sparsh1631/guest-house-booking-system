package com.guesthouse.repository;

import com.guesthouse.model.entity.GuestHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestHouseRepository extends JpaRepository<GuestHouse, Long> {
    List<GuestHouse> findByIsActive(boolean isActive);
    Long countByIsActiveTrue();
}