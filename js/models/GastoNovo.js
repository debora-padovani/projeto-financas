class GastoNovo {

	constructor (data, valor, descricao, categoria){

		    this._data = data;
        this._valor = parseFloat(valor);
        this._descricao = descricao;
        this._categoria = categoria;

		Object.freeze(this);
	};

	get data () {
		return this._data;
	}

	get valor () {
		return this._valor;
    }
    
    get descricao (){
        return this._descricao;
    }

    get categoria (){

       return this._categoria;
    }

    isEquals(outrogasto) {

		return JSON.stringify(this) == JSON.stringify(outrogasto);
	}
}