class MenuLeft extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="menu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"> 
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </div>

      <div class="menu-left">
        <div>
          <ul class="ul-menu-left">
            <li>
              <a class="ul-menu-link" id="usuarios-toggle">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                  </svg>
                </i>
                Cadastros Usuários
              </a>
              <ul class="sub-menu usuarios-submenu">
                <li><a href="/admin/usuarios/criar">> Cadastrar Usuários</a></li>
                <br>
                <li><a href="/admin/usuarios/listar">> Listar Usuários</a></li>
              </ul>
            </li>
            <li>
              <a class="ul-menu-link" id="veiculos-toggle">
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16">
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                  </svg>
                </i>
              Cadastros Veículos
              </a>
              <ul class="sub-menu veiculos-submenu">
                <li><a href="/admin/grupos_veiculos/criar">> Cadastrar Grupos</a></li>
                <br>
                <li><a href="#">> Listar Grupos</a></li>
                 <br>
                <li><a href="/admin/admin_view_veiculos/cadastroVeiculos.html">> Cadastrar Veiculos</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="overlay"></div>
    `;

    const menuLeft = this.querySelector(".menu-left");
    const overlay = this.querySelector(".overlay");
    const menuIcon = this.querySelector(".menu-icon");

    const usuariosToggle = this.querySelector("#usuarios-toggle");
    const veiculosToggle = this.querySelector("#veiculos-toggle");
    const usuariosSubMenu = this.querySelector(".usuarios-submenu");
    const veiculosSubMenu = this.querySelector(".veiculos-submenu");

    menuIcon.addEventListener("click", () => {
      menuLeft.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      menuLeft.classList.remove("active");
      overlay.classList.remove("active");
    });

    usuariosToggle.addEventListener("click", (event) => {
      event.preventDefault();
      usuariosSubMenu.classList.toggle("active");
      veiculosSubMenu.classList.remove("active");
    });

    veiculosToggle.addEventListener("click", (event) => {
      event.preventDefault();
      veiculosSubMenu.classList.toggle("active");
      usuariosSubMenu.classList.remove("active");
    });
  }
}

customElements.define("menu-left", MenuLeft);
