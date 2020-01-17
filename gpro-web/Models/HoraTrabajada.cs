using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class HoraTrabajada
    {
        public int ProyectoIdProyecto { get; set; }
        public int TareaIdTarea { get; set; }
        public int IdHoraTrabajada { get; set; }
        public int? CatidadHorasTrab { get; set; }
        public DateTime? FechaHorasTrab { get; set; }
        public string EstadoHorasTrab { get; set; }

        public Tarea Tarea { get; set; }
    }
}
