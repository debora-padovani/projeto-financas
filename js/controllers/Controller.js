var $ = document.querySelector.bind(document);

class Controller {

	constructor (){

        this._inputData = $('[data-form="data"]');
        this._inputValor = $('[data-form="valor"]');
        this._inputDescricao = $('[data-form="descricao"]');
        this._inputCategoria = $('[data-form="categoria"]'); 

        this._inputFiltroCategoria = $('[data-filtro="categorias"]')

        this._listaDeGastos = new ListaGastos(); 
        
        this._service = new GastosService();

        this._view = new View();

        this._view.openAddContainer();

        this._viewUpdate = new ViewUpdate();

        this._viewUpdate.updateList ();

        this._init();

    }

    _init(){
        
        
    }

    adiciona(event) {

        event.preventDefault();

        let gastoNovo = this._criaGasto();

        this._service
            .cadastra(gastoNovo)
            .then(mensagem => {
                this._listaDeGastos.adiciona(gastoNovo);
                this._view.addMessage('Gasto adicionado na tabela!');
                this._limpaFormulario();
            })
            .then(() => this._view.closeContainer())
            .catch(erro => this._view.addMessage(erro))
   

       
            var listaAtual = this._listaDeGastos._listaGastos;
            console.log(`Adiciona: ${listaAtual}`);
       
        this._viewUpdate.updateList (); 


    }

    filtraCategoria(event){
        event.preventDefault();

        let category = this._inputFiltroCategoria.value;

        let itensDaLista = document.querySelectorAll('[data-category]');
        itensDaLista.forEach(item => {
            if(item.hasAttribute(`data-${category}`)){
            item.classList.remove('d-none');
            console.log(`${item}: Item selecionado`);
            } else {
            item.classList.add('d-none');
            console.log(`${item}: Item escondido`);
            }
        });

    }

    alertaGastos(event){
        event.preventDefault();

        this._viewUpdate.verificaGasto();

    }

    _criaGasto () {
       
        return new GastoNovo(
            this._inputData.value,
            this._inputValor.value,
            this._inputDescricao.value,
            this._inputCategoria.value
        );
    }

    _limpaFormulario () {
        
        this._inputData.value = "";
        this._inputValor.value = "";
        this._inputDescricao.value = "";
        this._inputCategoria.value = "padrao";
    }


}


