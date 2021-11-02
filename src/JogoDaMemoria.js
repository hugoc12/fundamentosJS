//Lógica de iteração com o jogo
class JogoDaMemoria{
	constructor({tela}){
		this.tela = tela
		this.heroisIniciais = [
			{nome:'Batman', img:'./arquivos/batman.png'},
			{nome:'Flash', img:'./arquivos/flash.png'},
			{nome:'Iron', img:'./arquivos/iron.png'},
			{nome:'Thor', img:'./arquivos/thor.png'}
		]

		this.iconePadrao = './arquivos/default.png'
		this.heroisEscondidos = []
		this.heroisSelecionados = []
	}

	randomJogo(arr){
		/*for (var i = 0; i <= arr.length - 1; i++) {
			let novaPosicao = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[novaPosicao]] = [arr[novaPosicao], arr[i]];
		}*/ //OUTRA POSSIBILIDADE
		const arrEmbaralhado = arr.map((e)=>{
			return Object.assign({}, e, {id:Math.random() * 0.5})
		})

		return arrEmbaralhado.sort((a, b)=>{
			return a.id - b.id
		});
	}

	esconderHerois(herois){
		const heroisOcultos = herois.map(({nome, id}) =>(
			{
				nome,
				id,
				img:this.iconePadrao,
			}
		))

		this.tela.atualizarImagens(heroisOcultos)
		this.heroisEscondidos = [];
		this.heroisEscondidos.push(...heroisOcultos)
	}

	inicializar(){
		const copias = this.randomJogo(this.heroisIniciais.concat(this.heroisIniciais));
		this.tela.atualizarImagens(copias)

		setTimeout(()=>{
			this.esconderHerois(copias)
		}, 2000)

		this.tela.configBtnJogar(this.jogar.bind(this)) 
		//Para que o metodo jogar() seja executado nesse contexto(JogoDaMemoria), no momento de click
		//Ou seja para que o configBtnJogar(metodo originário de tela.js), mantenha o contexto atual e idêntifique - this.heroisIniciais e this.tela
		//Quando eu clicar no botão eu digo leva junto com esse método esse contexto.
	
		this.tela.configBtnVerificarSelecao(this.verificarSelecao.bind(this))
	}

	verificarSelecao(id, nome){
		const item = {
			id:id,
			nome:nome
		}
		
		//alert(`${item.id} - ${item.nome}`)
		//alert(heroisSelecionados);

		//console.log(heroisSelecionados.length)

		if (this.heroisSelecionados.length === 0 || this.heroisSelecionados.length === 1) {
			this.heroisSelecionados.push(item);
		}

		if (this.heroisSelecionados.length == 2) {
			if (this.heroisSelecionados[0].nome === this.heroisSelecionados[1].nome && this.heroisSelecionados[0].id != this.heroisSelecionados[1].id) {
				alert('ACERTOU!')
				this.tela.mostrarAlerta({classe:'alert-success', mens:'Acertou a combinação'})

				this.heroisEscondidos = this.heroisEscondidos.map((e)=>{
					if (e.nome === this.heroisSelecionados[0].nome) {
						return {
							nome:e.nome,
							id:e.id,
							img:'./arquivos/' + e.nome.toLowerCase() + '.png'
						}
					}else{
						return e
					}
				})

				//console.log(this.heroisEscondidos)
				//console.log(this.heroisSelecionados)

				this.tela.atualizarImagens(this.heroisEscondidos)
				this.heroisSelecionados = []
				
			}else{
				this.tela.mostrarAlerta({classe:'alert-danger', mens:'Errou a combinação'})
				this.heroisSelecionados = []
			}
		}
		
	}

	jogar(){
		console.log('Clicou!')
		const copias = this.randomJogo(this.heroisIniciais.concat(this.heroisIniciais));
		this.tela.atualizarImagens(copias)

		const timerTimeout = setTimeout(()=>{
			this.esconderHerois(copias)
		}, 2000)

	}

}