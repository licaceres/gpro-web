using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Funcion
    {
        public int Id { get; set; }
        public int IdTipoUsuario { get; set; }
        public bool Abmusuario { get; set; }
        public bool Abmcliente { get; set; }
        public bool Abmproyecto { get; set; }
        public bool Abmtarea { get; set; }

        public TipoUsuario IdTipoUsuarioNavigation { get; set; }
    }
}
