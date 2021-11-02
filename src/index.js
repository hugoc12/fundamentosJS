window.addEventListener('load', (e)=>{
	const dependecias = {
		tela:Tela // A classe Tela é global
	}
	const jogoDaMemoria = new JogoDaMemoria(dependecias);

	jogoDaMemoria.inicializar();
})