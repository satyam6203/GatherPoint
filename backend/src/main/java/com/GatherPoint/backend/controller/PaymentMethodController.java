package com.GatherPoint.backend.controller;

import com.GatherPoint.backend.Model.PaymentMethod;
import com.GatherPoint.backend.Repo.PaymentMethodRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {

    private final PaymentMethodRepo paymentMethodRepo;

    @GetMapping
    public List<PaymentMethod> getAll() {
        return paymentMethodRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethod> getById(@PathVariable Long id) {
        return paymentMethodRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PaymentMethod create(@RequestBody PaymentMethod pm) {
        return paymentMethodRepo.save(pm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> update(@PathVariable Long id, @RequestBody PaymentMethod details) {
        return paymentMethodRepo.findById(id).map(pm -> {
            pm.setName(details.getName());
            pm.setEnabled(details.isEnabled());
            pm.setUpiId(details.getUpiId());
            return ResponseEntity.ok(paymentMethodRepo.save(pm));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<PaymentMethod> toggle(@PathVariable Long id) {
        return paymentMethodRepo.findById(id).map(pm -> {
            pm.setEnabled(!pm.isEnabled());
            return ResponseEntity.ok(paymentMethodRepo.save(pm));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!paymentMethodRepo.existsById(id)) return ResponseEntity.notFound().build();
        paymentMethodRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
