package com.example.produtos.produtos;

public record ProdutosResponseDTO(Long id, String name, String description, double price) {
    public ProdutosResponseDTO(Produtos produtos) {
        this(produtos.getId(), produtos.getName(), produtos.getDescription(), produtos.getPrice());
    }
}
