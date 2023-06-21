class Produto {

    //Construtor do Produto  
      constructor() {
          this.arrayProdutos = [];
          this.editId = null;
      }
    // Método responsável por salvar um novo produto ou atualizar um produto existente
      salvar() {
        let produto = this.lerDados(); 
    
        if (this.validaCampos(produto)) { // Verifica se os campos do produto são válidos
            if(this.editId == null){ // Se o editId for nulo, adiciona o produto ao array de produtos
                this.adicionar(produto);}
                else{ // Se não, atualiza o produto no array de produtos
                    this.atualizar(this.editId, produto);
                    this.editId = null; // Redefine o valor de editId para null após a atualização
                }
            }
    
        this.listaTabela();  // Atualiza a tabela com os produtos
        this.cancelar();  // Apaga o que foi digitado nos campos
    }
    
    // Método responsável por listar os produtos na tabela
    listaTabela() {
      let tbody = document.getElementById("tbody");
      tbody.innerText = "";
    
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        let tr = tbody.insertRow();
    
        
        let td_id = tr.insertCell();
        let td_produto = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acoes = tr.insertCell();
    
        // Insere o id, nome do produto e preço nas células da linha da tabela
        td_id.innerText = this.arrayProdutos[i].id;
        td_produto.innerText = this.arrayProdutos[i].nomeProduto;
        td_valor.innerText = this.arrayProdutos[i].preco;
    
    
        // Adiciona o símbolo "R$" à célula de valor
        td_valor.innerHTML = "R$ ";
        td_valor.innerHTML += this.arrayProdutos[i].preco;
    
        // Centraliza o conteudo das celulas ID,preço e ações
        td_id.classList.add("center");
        td_valor.classList.add("center");
        td_acoes.classList.add("center");
    
        // Cria um elemento de imagem (lapis) para editar o produto
        let imgEdit = document.createElement("img");
        imgEdit.src = "img/edit.png";
        imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");
    
        // Cria um elemento de imagem (lixeira) para excluir o produto
        let imgDelete = document.createElement("img");
        imgDelete.src = "img/excluir.png";
        imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");
    
        // Adiciona as imagens de edição e exclusão à célula de ações
        td_acoes.appendChild(imgEdit);
        td_acoes.appendChild(imgDelete);
    
        }
      }
    
    
    adicionar(produto) {
      this.arrayProdutos.push(produto);
      }
    
    // Método responsável por atualizar um produto existente na lista
    atualizar(id, produto){
      for(let i = 0; i < this.arrayProdutos.length; i++){
          if(this.arrayProdutos[i].id == id){
              this.arrayProdutos[i].id = produto.id;
              this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
              this.arrayProdutos[i].preco = produto.preco;
          }
        }
      }
    
    // Método responsável por preparar a edição de um produto existente
    preparaEdicao(dados){
      this.editId = dados.id;
      document.getElementById("id").value = dados.id;
      document.getElementById("produto").value = dados.nomeProduto;
      document.getElementById("preco").value = dados.preco;
    
    
      alert("Modo Editar Ativado");
    
      return false;
    }   
    
    
    // Método resposável por ler os dados que o usuário inseriu nos campos de entrada
    lerDados() {
      let produto = {};
    
      produto.id = document.getElementById("id").value;
      produto.nomeProduto = document.getElementById("produto").value;
      produto.preco = document.getElementById("preco").value;
    
      return produto;
    }
    
    
    // Método responsável por validar se os campos estiverem vazios
    validaCampos(produto) {
      let msg = "";
      
      if (produto.id == "") {
        msg += "- informe o número de identificação \n";
      }
      if (produto.nomeProduto == "") {
        msg += "- informe o nome do produto \n";
      }
      if (produto.preco == "") {
        msg += "- informe o valor do produto \n";
      }
      if (msg != "") {
        alert(msg);
        return false;
      }
      return true;
    }
    
    // Caso o usuário clique no botão "Cancelar", limpa os dados inseridos nos campos
    cancelar() {
      document.getElementById("id").value = "";
      document.getElementById("produto").value = "";
      document.getElementById("preco").value = "";
    }
    
    //Método responsável por deletar o produto da lista
    deletar(id){
      if(confirm('Deseja realmente deletar o produto do ID: '+ id)){   //if que verifica se quer deletar mesmo.
      let tbody = document.getElementById("tbody");
    
      for(let i = 0; i < this.arrayProdutos.length; i++){ // se o if acima for sim, então deleta a linha da tabela
          if(this.arrayProdutos[i].id == id){
              this.arrayProdutos.splice(i, 1);
              tbody.deleteRow(i); //deleta a linha
          }
         }
        }
      }
    }
    
    // Instacia produtos novos
    
    var produto = new Produto();