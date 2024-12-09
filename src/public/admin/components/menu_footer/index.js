class MenuFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
			<footer>
				<div class="pull-right">
					 2024 - Gestão de Contratos - Todos os direitos reservados
				</div>
				<div class="clearfix"></div>
			</footer>
        `
    }
}

customElements.define('menu-footer', MenuFooter);
