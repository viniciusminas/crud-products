package com.example.produtos.produtos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "produtos")
@Entity(name = "produtos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Produtos {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //para aplicações seguras, utilizar UUID, ambientes de prod
    private Long id;

    private String name;

    private String description;

    private Double price;

    public Produtos(ProdutosRequestDTO data) {
        this.name = data.name();
        this.description = data.description();
        this.price = data.price();
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
