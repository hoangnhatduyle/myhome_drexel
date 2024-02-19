using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class NewPaymentDto
    {
        [Required] public double Amount { get; set; }
        [Required] public int PayMonth { get; set; }
        [Required] public string Method { get; set; }
        [Required] public DateOnly PayDate { get; set; }
    }
}