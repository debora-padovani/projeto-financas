
var ConnectionFactory = (function (){ //padrão de projetos module pattern

    const stores = ['gastos'];
    const version = 1;
    //const dbName = "listagastos";

    var connection = null;
    var close = null;


    return class ConnectionFactory{

        constructor(){
            throw new Error ('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection(){


            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open('listagastos', version);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {

                    if (!connection){  // connection é false = nulo (também é false quando é undefined, 0, string ou array vazio) - na 1ª vez, o connection é nulo, então vai realizar uma nova conexão

                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        close = function(){ //Monkey Patching
                            throw new Error('Você não pode fechar diretamente a conexão');
                        }
                    }

                    resolve(connection); //abre a conexão


                };

                openRequest.onerror = e => {

                    console.log(e.target.error);
                    reject(e.target.error.name);

                };
            })

        }

        static _createStores(connection) {
        
            stores.forEach(store => {

                if (connection.objectStoreNames.contains(store)){

                    connection.deleteObjectStore(store);

                }

                connection.createObjectStore(store, {autoIncrement: true});
            })
        }

        static closeConnection() {

            if(connection){

                close();
                connection = null; // para poder abrir a conexão denovo
            }
        }
    }
})();