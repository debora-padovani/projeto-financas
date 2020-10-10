class ViewUpdate {

    constructor() {
        this._service = new GastosService();
        this._listaDeGastos = new ListaGastos(); 
        this._view = new View();
    }

    updateList () {
        this._service
        .lista()
        .then(gastos =>
            gastos.filter(gasto =>
                !this._listaDeGastos._listaGastos.some(gastoExistente => 
                    gasto.isEquals(gastoExistente)))
            .forEach(gasto => 
            this._listaDeGastos.adiciona(gasto)))
        .then ( () => $('[data-tabela]')
            .innerHTML = this._view.addView(this._listaDeGastos._listaGastos))
        .then ( () =>  this.updateGastoTotal())
        .then ( () =>  this.updateGastoCategorias())
        .then ( () =>  this.updateCategoriasBar())       
        .catch(erro => this._view.addMessage(erro));
    }
     
    updateGastoTotal () {
        document.querySelectorAll("[data-gasto-total]")
            .forEach( (espacoGasto) => espacoGasto.innerHTML = `R$ ${this._listaDeGastos.gastoTotal}` )
    }

    updateGastoCategorias () {
        this._listaDeGastos.listaCategorias
            .forEach((category) => {
                let categoryId = `[data-gasto-category="${category}"]`;
                document.querySelector(categoryId).innerHTML = `R$ ${this._listaDeGastos.gastoCategoria(category)}`;
            });
    }

    updateCategoriasBar () {
        this._listaDeGastos.listaCategorias
        .forEach((category) => {
            let barClass = `[data-barra-fill="${category}"]`;
            if(this._listaDeGastos.porcentagemCategoria(category) != 0) 
            document.querySelector(barClass).style.width = `${this._listaDeGastos.porcentagemCategoria(category)}%`;
        });

    }

}