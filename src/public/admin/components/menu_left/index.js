class MenuLeft extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">

                  <li>
                    <a>
                      <i>
                        <svg class="mr-2 text-gray-500" width="22" height="22" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 1.5 24 24" stroke="currentColor"><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                      </i>
                      Cadastros <span class="fa fa-chevron-down"></span>
                    </a>
                    <ul class="nav child_menu">
                      <li><a href="/admin/parceiros/criar">Cadastro Locatário</a></li>
                      <li><a href="/admin/parceiros/listar">Cadastro Fucionário</a></li>
                    </ul>
                  </li>
                  
                </ul>
              </div>
            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
            <!-- /menu footer buttons -->
        `
    }
}

customElements.define('menu-left', MenuLeft);