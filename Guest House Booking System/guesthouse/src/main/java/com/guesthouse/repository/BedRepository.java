package com.guesthouse.repository;

import com.guesthouse.model.entity.Bed;
import com.guesthouse.model.enums1.BedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByRoomId(Long roomId);
    List<Bed> findByRoomIdAndStatus(Long roomId, BedStatus status);
}