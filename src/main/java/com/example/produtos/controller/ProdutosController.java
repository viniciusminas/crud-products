package com.example.produtos.controller;

import com.example.produtos.produtos.Produtos;
import com.example.produtos.produtos.ProdutosRepository;
import com.example.produtos.produtos.ProdutosRequestDTO;
import com.example.produtos.produtos.ProdutosResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("produtos")
public class ProdutosController {

    @Autowired
    private ProdutosRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*") //permitir acesso total para front
    @PostMapping
    public void saveProdutos(@RequestBody ProdutosRequestDTO data) {
        Produtos produtosData = new Produtos(data);
        repository.save(produtosData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ProdutosResponseDTO> getAll(){

        List<ProdutosResponseDTO> produtosList = repository.findAll().stream().map(ProdutosResponseDTO::new).toList();
        return produtosList;
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody ProdutosRequestDTO data) {
        Produtos existingProduto = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado nesse id"));

        existingProduto.setName(data.name());
        existingProduto.setDescription(data.description());
        existingProduto.setPrice(data.price());

        repository.save(existingProduto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
    }
}
