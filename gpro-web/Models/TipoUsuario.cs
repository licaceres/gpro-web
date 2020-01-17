using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Funcion = new HashSet<Funcion>();
            Usuario = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string TipoUsuario1 { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Funcion> Funcion { get; set; }
        public ICollection<Usuario> Usuario { get; set; }
    }
}
