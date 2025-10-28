using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Byway.Application.Interfaces;
using Byway.Application.DTOs;

namespace Byway.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstructorsController : ControllerBase
    {
        private readonly IInstructorService _instructorService;

        public InstructorsController(IInstructorService instructorService)
        {
            _instructorService = instructorService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<InstructorDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int size = 10,
            [FromQuery] string? search = null)
        {
            var instructors = await _instructorService.GetAllAsync(page, size, search);
            return Ok(instructors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(InstructorDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var instructor = await _instructorService.GetByIdAsync(id);
                return Ok(instructor);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

       // [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(typeof(InstructorDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateInstructorDto dto)
        {
            try
            {
                var instructor = await _instructorService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = instructor.Id }, instructor);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

       // [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(InstructorDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateInstructorDto dto)
        {
            try
            {
                var instructor = await _instructorService.UpdateAsync(id, dto);
                return Ok(instructor);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

      //  [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _instructorService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
