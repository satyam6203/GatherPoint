package com.GatherPoint.backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String discountType;

    private BigDecimal discountValue;

    private String scope;

    private Integer minQuantity;

    private BigDecimal minOrderAmount;

    private boolean active;

    @ManyToOne
    private Product product;
}
