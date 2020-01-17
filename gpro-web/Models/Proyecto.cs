using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Proyecto
    {
        public Proyecto()
        {
            Tarea = new HashSet<Tarea>();
        }

        public int IdProyecto { get; set; }
        public int ClienteIdCliente { get; set; }
        public string TituloProyecto { get; set; }
        public string DescripcionProyecto { get; set; }
        public string EstadoProyecto { get; set; }

        public Cliente ClienteIdClienteNavigation { get; set; }
        public ICollection<Tarea> Tarea { get; set; }
    }
}
