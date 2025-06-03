package com.guesthouse.repository;

import com.guesthouse.model.entity.Room;
import com.guesthouse.model.enums1.BedStatus;
import com.guesthouse.model.enums1.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByGuestHouseId(Long guestHouseId);

    @Query("SELECT COUNT(b) FROM Room r JOIN r.beds b")
    Long sumTotalBeds();

    @Query("SELECT COUNT(b) FROM Room r JOIN r.beds b WHERE b.status = :status")
    Long countBedsByStatus(@Param("status") BedStatus status);

    // Count rooms by status
    Long countByStatus(RoomStatus status);

    // Convenience methods for specific statuses
    default Long countAvailableBeds() {
        return countBedsByStatus(BedStatus.AVAILABLE);
    }

    default Long countOccupiedBeds() {
        return countBedsByStatus(BedStatus.OCCUPIED);
    }
}