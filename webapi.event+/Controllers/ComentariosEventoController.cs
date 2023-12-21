using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        ComentariosEventoRepository comentario = new ComentariosEventoRepository();

        // armazena dados da API externa(IA - Azure)
        private readonly ContentModeratorClient _contentModeratorClient;

        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _contentModeratorClient = contentModeratorClient;
        }

        [HttpPost("CadastroIA")]
        public async Task<IActionResult> Post(ComentariosEvento comentariosEvento)
        {
            try
            {
                //Se a descrição do comentario n for passado no objeto
                if (string.IsNullOrEmpty(comentariosEvento.Descricao))
                {
                    return BadRequest("O texto a ser analisado/moderado não pode ser vazio");
                }

                using var stream  = new MemoryStream(Encoding.UTF8.GetBytes(comentariosEvento.Descricao));

                //realiza a moderação do conteúdo(descrição do comentário)
                var moderationResult = await _contentModeratorClient.TextModeration.ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                if (moderationResult.Terms != null)
                {
                    comentariosEvento.Exibe = false;

                    comentario.Cadastrar(comentariosEvento);
                }
                else
                {
                    comentariosEvento.Exibe = true;

                    comentario.Cadastrar(comentariosEvento);
                }

                return Ok(comentario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]

        public IActionResult Get()
        {
            try
            {
                return Ok(comentario.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarExibe")]

        public IActionResult GetIA()
        {
            try
            {
                return Ok(comentario.ListarExibe());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("BuscarPorIdUsuario/{id}/{idEvento}")]

        public IActionResult GetByIdUser(Guid id, Guid idEvento)
        {
            try
            {
                return Ok(comentario.BuscarPorIdUsuario(id, idEvento));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);   
            }
        }

        [HttpPost]

        public IActionResult PostComentario(ComentariosEvento novoComentario)
        {
            try
            {
                comentario.Cadastrar(novoComentario);
                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(Guid id)
        {
            try
            {
                comentario.Deletar(id);
                
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
