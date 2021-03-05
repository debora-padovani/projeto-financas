class View {

        constructor () {

        }

        addView (model) {

            return`
            ${model.map(n => 
                `
                <div class="categ-${n.categoria} linha-gasto" data-category data-${n.categoria}>
                    <div class="box-icone"><img src="/icons/${n.categoria}.svg"></div>
                    <div>${n.data}</div>
                    <div>R$ ${n.valor}</div>
                    <div>${n.descricao}</div>
                </div>
                `).join('')}`;   
        }
        
        /*filterView (category) {



        }*/


        addMessage (mensagem) {
            
            let campoMensagem =$('#add-mensagem')

            campoMensagem.innerHTML = `<p>${mensagem}</p>`;

            campoMensagem.style.display = "block";

            setTimeout(() => campoMensagem.style.display = "none", 7000);
            
        }


        openAddContainer () {
            $('.add-gasto-btn').onclick = () => {
                if ($('.add-gasto-box').classList.contains('open')){
                    $('.add-gasto-box').classList.remove('open');
                    $('.add-gasto-box').classList.add('fechado');
                } else {
                    $('.add-gasto-box').classList.remove('fechado');
                    $('.add-gasto-box').classList.add('open');
                }
            };
        }

        closeContainer(){
            $('.add-gasto-box').classList.remove('open');
            $('.add-gasto-box').classList.add('fechado');
        }
}