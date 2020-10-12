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

    verificaGasto(){

        let gasto = document.querySelector('[data-filtro="gasto"]').value;

        console.log(`Gasto total: ${this._listaDeGastos.gastoTotal}`);
        console.log(`Gasto a filtrar: ${gasto}`);


        if(this._listaDeGastos.gastoTotal > gasto){
            $("[data-msg]").classList.remove('dentro-limite');
            $("[data-msg]").classList.add('fora-limite');
            $("[data-msg]").innerHTML = ('<h4>Cuidado! já gastamos demais</h4>');
            console.log("Gasto excessivo");

        } else {
            $("[data-msg]").classList.remove('fora-limite');
            $("[data-msg]").classList.add('dentro-limite');
            $("[data-msg]").innerHTML = ('<h4>Oba! Ainda podemos gastar</h4>');
            console.log("Gasto dentro do limite");

        }
    }

}