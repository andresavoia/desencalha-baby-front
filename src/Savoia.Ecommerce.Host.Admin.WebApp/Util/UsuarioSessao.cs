using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Savoia.Novo.WebMvc.Util
{
    public class UsuarioSessaoWeb
    {
        public int IdUsuario { get; set; }
        public int CodEmpresaSelecionada { get; set; }
        public string NomeEmpresaSelecionada { get; set; }
        public int CodSistemaSelecionado { get; set; }
        public string NomeSistemaSelecionada { get; set; }
        public string CodSistemaPerfilSelecionado { get; set; }
        public string NomePerfilSelecionado { get; set; }

        public string Nome { get; set; }
        public DateTime DataLogin { get; set; }
        public string Login { get; set; }
    }
}
