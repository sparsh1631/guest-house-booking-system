package com.guesthouse.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
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
    @ToString.Exclude //Prevents infinite recursion in toString() (Bed may point back to Room)
    @Builder.Default // Ensures this list is initialized even when using builder
    private List<Bed> beds = new ArrayList<>();

    // Helper method to associate a bed with this room
    public void addBed(Bed bed) {
        beds.add(bed);
        bed.setRoom(this);
    }
}