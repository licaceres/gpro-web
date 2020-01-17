using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
//using gpro_web.Entities;
using gpro_web.Models;
using gpro_web.Helpers;
using gpro_web.Controllers;

namespace gpro_web.Services
{

    public interface IUserService
    {

        Usuario Authenticate(string username, string password);
        IEnumerable<Usuario> GetAll();
    }

    public class UserService : IUserService
    {
        /*****************************************************************************/
        /* ACA CREO QUE DEBERIAMOS CARGAR LOS USUARIOS DE LA BASE EN LA LISTA _users */

        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Usuario> _users = new List<Usuario>
        {
           new Usuario { Id = 1, Username = "test", Password = "test", IdEmpleado = 1, IdTipoUsuario = 1 }
        };
        
       

    private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public Usuario Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<Usuario> GetAll()
        {
            // return users without passwords
            return _users.Select(x => {
                x.Password = null;
                return x;
            });
        }
    }
}