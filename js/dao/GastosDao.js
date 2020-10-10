class GastosDao {

    constructor (connection) {

        this._connection = connection;
        this._store = 'gastos';
    }

    adiciona(gasto) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(gasto);

            request.onsuccess = e => {

                resolve();
            };
            
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar o gasto');
            };

        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .openCursor();

            let gastos = [];
            
            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) { //se atual não é nulo (ou seja ainda tem elementos no array)

                    let dado = atual.value;

                    gastos.push(new GastoNovo(dado._data, dado._valor, dado._descricao, dado._categoria));

                    atual.continue(); //volta o loop até atual ser nulo (ou seja, finalizou os elementos do array)
                } else {

                    resolve(gastos);
                }


            }

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar os gastos');

            }

        });

        
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .clear();
            
            request.onsuccess = e => resolve('Gastos removidos com sucesso');
            
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover os gastos');
            };
        });
    }    
}