class View {

        constructor () {

        }

        addView (model) {

            return`
            ${model.map(n => 
                `
                <tr class="categ-${n.categoria}">
                    <td>
                        ${n.data}
                    </td>
                    <td>
                        R$ ${n.valor}
                    </td>
                    <td>
                        ${n.descricao} 
                    </td>
                    <td>
                        ${n.categoria}
                    </td>
                </tr>
                `).join('')}`;   
        }

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
}