class Tela{
	static obterCodigoHtml(item){
		return `<div class="col-md-3">
					<div class="card" style="width: 100%;" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
					  	<img src=${item.img} name=${item.nome} class="card-img-top" alt="item.nome">
					</div>
				</div>`
	}

	static alterarCodigoHtml(elementoHtml){
		const container = document.getElementById('containerCards');
		container.innerHTML = elementoHtml;
	}

	static gerarStringHtml(itens){
		return itens.map((item)=>{
			return Tela.obterCodigoHtml(item)
		}).join('')
	}

	static atualizarImagens(itens){
		const codigoHTML = Tela.gerarStringHtml(itens);
		Tela.alterarCodigoHtml(codigoHTML);
	}

	static configBtnJogar(funcOnclick){
		const btnIniciar = document.getElementById('btnIniciar');
		btnIniciar.addEventListener('click', funcOnclick);
	}

	static configBtnVerificarSelecao(funcOnclick){
		window.verificarSelecao = funcOnclick
	}

	static mostrarAlerta(objAlerta){
		const alerta = document.getElementById('alert')

		if (alerta.classList.contains('invisible')) {
			alerta.classList.remove('invisible')
		}else if(alerta.classList.contains('alert-danger')){
			alerta.classList.remove('alert-danger')
		}else if (alerta.classList.contains('alert-success')) {
			alerta.classList.remove('alert-success')
		}
		
		alerta.classList.add(objAlerta.classe)
		alerta.innerHTML = objAlerta.mens
	}
}