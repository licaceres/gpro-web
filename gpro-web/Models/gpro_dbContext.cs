using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace gpro_web.Models
{
    public partial class gpro_dbContext : DbContext
    {
        public gpro_dbContext()
        {
        }

        public gpro_dbContext(DbContextOptions<gpro_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<Empleado> Empleado { get; set; }
        public virtual DbSet<Funcion> Funcion { get; set; }
        public virtual DbSet<HoraTrabajada> HoraTrabajada { get; set; }
        public virtual DbSet<Perfil> Perfil { get; set; }
        public virtual DbSet<PerfilEmpleado> PerfilEmpleado { get; set; }
        public virtual DbSet<Proyecto> Proyecto { get; set; }
        public virtual DbSet<Tarea> Tarea { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:servgpro.duckdns.org,49172; Database=gpro_db; User Id=gpro; Password=Pubdigitalix0;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.IdCliente);

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.ApellidoCliente)
                    .HasColumnName("apellidoCliente")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DireccionCliente)
                    .IsRequired()
                    .HasColumnName("direccionCliente")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmailCliente)
                    .IsRequired()
                    .HasColumnName("emailCliente")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCliente)
                    .HasColumnName("nombreCliente")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RazonSocialCliente)
                    .HasColumnName("razonSocialCliente")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonoCliente)
                    .IsRequired()
                    .HasColumnName("telefonoCliente")
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Empleado>(entity =>
            {
                entity.HasKey(e => e.IdEmpleado);

                entity.Property(e => e.IdEmpleado).HasColumnName("idEmpleado");

                entity.Property(e => e.ApellidoEmpleado)
                    .IsRequired()
                    .HasColumnName("apellidoEmpleado")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaIngreso)
                    .HasColumnName("fechaIngreso")
                    .HasColumnType("date");

                entity.Property(e => e.NombreEmpleado)
                    .IsRequired()
                    .HasColumnName("nombreEmpleado")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Funcion>(entity =>
            {
                entity.Property(e => e.Abmcliente).HasColumnName("ABMCliente");

                entity.Property(e => e.Abmproyecto).HasColumnName("ABMProyecto");

                entity.Property(e => e.Abmtarea).HasColumnName("ABMTarea");

                entity.Property(e => e.Abmusuario).HasColumnName("ABMUsuario");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Funcion)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Funcion_TipoUsuario");
            });

            modelBuilder.Entity<HoraTrabajada>(entity =>
            {
                entity.HasKey(e => new { e.ProyectoIdProyecto, e.TareaIdTarea, e.IdHoraTrabajada });

                entity.Property(e => e.ProyectoIdProyecto).HasColumnName("Proyecto_idProyecto");

                entity.Property(e => e.TareaIdTarea).HasColumnName("Tarea_idTarea");

                entity.Property(e => e.IdHoraTrabajada).HasColumnName("idHoraTrabajada");

                entity.Property(e => e.CatidadHorasTrab).HasColumnName("catidadHorasTrab");

                entity.Property(e => e.EstadoHorasTrab)
                    .IsRequired()
                    .HasColumnName("estadoHorasTrab")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.FechaHorasTrab)
                    .HasColumnName("fechaHorasTrab")
                    .HasColumnType("date");

                entity.HasOne(d => d.Tarea)
                    .WithMany(p => p.HoraTrabajada)
                    .HasForeignKey(d => new { d.ProyectoIdProyecto, d.TareaIdTarea })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HoraTrabajada_Tarea");
            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.HasKey(e => e.IdPerfil);

                entity.Property(e => e.IdPerfil).HasColumnName("idPerfil");

                entity.Property(e => e.DescripcionPerfil)
                    .IsRequired()
                    .HasColumnName("descripcionPerfil")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PerfilEmpleado>(entity =>
            {
                entity.HasKey(e => new { e.PerfilEmpleadoIdPerfil, e.PerfilEmpleadoIdEmpleado });

                entity.Property(e => e.PerfilEmpleadoIdPerfil).HasColumnName("PerfilEmpleado_idPerfil");

                entity.Property(e => e.PerfilEmpleadoIdEmpleado).HasColumnName("PerfilEmpleado_idEmpleado");

                entity.HasOne(d => d.PerfilEmpleadoIdEmpleadoNavigation)
                    .WithMany(p => p.PerfilEmpleado)
                    .HasForeignKey(d => d.PerfilEmpleadoIdEmpleado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_idEmpleadp");

                entity.HasOne(d => d.PerfilEmpleadoIdPerfilNavigation)
                    .WithMany(p => p.PerfilEmpleado)
                    .HasForeignKey(d => d.PerfilEmpleadoIdPerfil)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PerfilEmpleado_Perfil");
            });

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.HasKey(e => e.IdProyecto);

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.Property(e => e.ClienteIdCliente).HasColumnName("cliente_idCliente");

                entity.Property(e => e.DescripcionProyecto)
                    .IsRequired()
                    .HasColumnName("descripcionProyecto")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.EstadoProyecto)
                    .IsRequired()
                    .HasColumnName("estadoProyecto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TituloProyecto)
                    .IsRequired()
                    .HasColumnName("tituloProyecto")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ClienteIdClienteNavigation)
                    .WithMany(p => p.Proyecto)
                    .HasForeignKey(d => d.ClienteIdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_idCliente");
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => new { e.ProyectoIdProyecto, e.IdTarea });

                entity.Property(e => e.ProyectoIdProyecto).HasColumnName("Proyecto_idProyecto");

                entity.Property(e => e.IdTarea).HasColumnName("idTarea");

                entity.Property(e => e.DescripcionTarea)
                    .IsRequired()
                    .HasColumnName("descripcionTarea")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HorasEstimadasTarea).HasColumnName("horasEstimadasTarea");

                entity.Property(e => e.HorasOverbudgetTarea).HasColumnName("horasOverbudgetTarea");

                entity.Property(e => e.PerfilEmpleadoIdEmpleado).HasColumnName("PerfilEmpleado_idEmpleado");

                entity.Property(e => e.PerfilEmpleadoIdPerfil).HasColumnName("PerfilEmpleado_idPerfil");

                entity.HasOne(d => d.ProyectoIdProyectoNavigation)
                    .WithMany(p => p.Tarea)
                    .HasForeignKey(d => d.ProyectoIdProyecto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_idProyecto");

                entity.HasOne(d => d.PerfilEmpleado)
                    .WithMany(p => p.Tarea)
                    .HasForeignKey(d => new { d.PerfilEmpleadoIdPerfil, d.PerfilEmpleadoIdEmpleado })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tarea_PerfilEmpleado");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.Property(e => e.Descripcion)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TipoUsuario1)
                    .IsRequired()
                    .HasColumnName("TipoUsuario")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEmpleadoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdEmpleado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuario_Empleado");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuario_TipoUsuario");
            });
        }
    }
}
