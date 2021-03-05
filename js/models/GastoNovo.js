class GastoNovo {

	constructor (data, valor, descricao, categoria){

		    this._data = data;
        this._valor = parseFloat(valor);
        this._descricao = descricao;
        this._categoria = categoria;

		Object.freeze(this);
	};

	get data () {
    const arrayData = this._data.split('-');
    const dataFinal = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
		return dataFinal;
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