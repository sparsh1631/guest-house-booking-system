package com.guesthouse.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "room",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"guest_house_id", "room_number"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_house_id", nullable = false)
    @ToString.Exclude
    private GuestHouse guestHouse;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private List<Bed> beds = new ArrayList<>();

    // Helper method to associate a bed with this room
    public void addBed(Bed bed) {
        beds.add(bed);
        bed.setRoom(this);
    }
}



