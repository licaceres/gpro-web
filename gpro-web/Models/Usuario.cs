using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int IdEmpleado { get; set; }
        public int IdTipoUsuario { get; set; }
        public string Token { get; set; }

        public Empleado IdEmpleadoNavigation { get; set; }
        public TipoUsuario IdTipoUsuarioNavigation { get; set; }
    }
}
