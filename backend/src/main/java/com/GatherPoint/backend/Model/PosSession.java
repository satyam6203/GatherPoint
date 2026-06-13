package com.GatherPoint.backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PosSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime openedAt;

    private LocalDateTime closedAt;

    private BigDecimal openingAmount;

    private BigDecimal closingAmount;

    @ManyToOne
    private User employee;
}
