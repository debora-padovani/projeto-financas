class GastosService{

    constructor(){

    }

    cadastra(gasto){

        return ConnectionFactory
            .getConnection()
            .then(connection => new GastosDao(connection))
            .then(dao => dao.adiciona(gasto))
            .then( () => 'Gasto adicionado com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar o gasto')
            })
    }
    
    lista(){
    
        return ConnectionFactory
            .getConnection()
            .then(connection => new GastosDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error ('Não foi possível obter as negociações')
            })
    }
    
    apaga() {
    
      return  ConnectionFactory
      .getConnection()
      .then(connection => new GastosDao(connection))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso')
      .catch(erro => {
          console.log(erro);
          throw new Error('Não foi possível apagar as negociações')
      })
    }
}

