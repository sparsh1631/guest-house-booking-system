package com.guesthouse.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "guest_houses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    private String description;

    @Column(nullable = false)
    private boolean isActive;

    @OneToMany(mappedBy = "guestHouse", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private List<Room> rooms = new ArrayList<>();

    public void addRoom(Room room) {
        rooms.add(room);
        room.setGuestHouse(this);
    }
}