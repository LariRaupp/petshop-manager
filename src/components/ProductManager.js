import React, { useState } from "react";

class Produto {
    constructor(id, nome, preco, categoria) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidade = 1;
    }
    adicionarUnidade() {
        this.quantidade += 1;
    }
    removerUnidade() {
        if (this.quantidade > 0) {
            this.quantidade -= 1;
        }
    }
};

const ProductManager = () => {    
    const produtosDisponiveis = [
        new Produto(1, "Ração Premium para Gatos", 120, "Alimentação"),
        new Produto(2, "Areia Higiênica", 35, "Higiene"),
        new Produto(3, "Brinquedo Ratinho de Pelúcia", 25, "Brinquedos"),
        new Produto(4, "Arranhador Pequeno", 80, "Acessórios"),
        new Produto(5, "Fonte de Água Automática", 150, "Acessórios"),
        new Produto(6, "Caminha Confortável", 200, "Acessórios")
    ];    
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const adicionarProduto = () => {
        if (!produtoSelecionado) return;
        const produtoEncontrado = produtosDisponiveis.find(p => p.id === parseInt(produtoSelecionado));
        if (!produtoEncontrado) return;
        setProdutos((prevProdutos) => {
            const produtoExistente = prevProdutos.find(produto => produto.id === produtoEncontrado.id);
            if (!produtoExistente) {
                return [...prevProdutos, new Produto(produtoEncontrado.id, produtoEncontrado.nome, produtoEncontrado.preco, produtoEncontrado.categoria)];
            }
            return prevProdutos;
        });
        setProdutoSelecionado(""); 
    };
    const aumentarQuantidade = (id) => {
        setProdutos((prevProdutos) =>
            prevProdutos.map(produto =>
                produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto
            )
        );
    };
    const removerProduto = (id) => {
        setProdutos((prevProdutos) =>
            prevProdutos
                .map(produto =>
                    produto.id === id ? { ...produto, quantidade: produto.quantidade - 1 } : produto
                )
                .filter(produto => produto.quantidade > 0) 
        );
    };
    const total = produtos.reduce((soma, produto) => soma + produto.preco * produto.quantidade, 0);
    return (
        <div className="container">
            <h1>🐾 Gerenciador de Produtos do Pet Shop</h1>

            <div className="formulario">
                <select value={produtoSelecionado} onChange={(e) => setProdutoSelecionado(e.target.value)}>
                    <option value="">Selecione um Produto</option>
                    {produtosDisponiveis
                        .filter(produto => !produtos.some(p => p.id === produto.id))
                        .map((produto) => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome} - R$ {produto.preco.toFixed(2)}
                            </option>
                        ))}
                </select>
                <button onClick={adicionarProduto} disabled={!produtoSelecionado}>➕ Adicionar Produto</button>
            </div>
            <h2>📜 Lista de Produtos</h2>
            {produtos.length === 0 ? <p>📭 Nenhum produto adicionado ainda.</p> : (
                <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                    <span>🛒 {produto.nome} | 💲 {produto.preco.toFixed(2)} | 📦 {produto.categoria} | 🏷️ Quantidade: {produto.quantidade}</span>
                    <div className="botoes">
                        <button className="adicionar" onClick={() => aumentarQuantidade(produto.id)}>➕</button>
                        <button className="remover" onClick={() => removerProduto(produto.id)}>❌</button>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            <p className="total">💰 Total: R$ {total.toFixed(2)}</p>
        </div>
    );
};

export default ProductManager;
