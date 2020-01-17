using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Empleado
    {
        public Empleado()
        {
            PerfilEmpleado = new HashSet<PerfilEmpleado>();
            Usuario = new HashSet<Usuario>();
        }

        public int IdEmpleado { get; set; }
        public string ApellidoEmpleado { get; set; }
        public string NombreEmpleado { get; set; }
        public DateTime FechaIngreso { get; set; }

        public ICollection<PerfilEmpleado> PerfilEmpleado { get; set; }
        public ICollection<Usuario> Usuario { get; set; }
    }
}
