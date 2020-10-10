class ListaGastos {

    constructor(){

        this._listaGastos = [];
        this._categorias = ['comida', 'cinema', 'roupa', 'farmacia', 'shows', 'supermercado', 'outros']

    }

    adiciona (gasto){

		this._listaGastos.push(gasto);

    }

    get listaCategorias () {
      return this._categorias;
    }

    get gastoTotal () {
      
      return this._listaGastos
        .reduce((total, n) =>total + n.valor, 0.0)
        .toFixed(2);
    }

    gastoCategoria (category) {
      
      return this._listaGastos
        .filter(n => n.categoria == category)
        .reduce((total, n) =>total + n.valor, 0.0)
        .toFixed(2);
    }

    porcentagemCategoria (category) {
      return this.gastoCategoria(category)/this.gastoTotal*100;
    }

}