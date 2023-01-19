
namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode {get; set;}
        public string Message {get; set;}

        public ApiResponse(int statusCode, string message = null) {
            this.StatusCode = statusCode;
            this.Message = message ?? getDefaultStatusCodeMessage(statusCode);
        }

        private string getDefaultStatusCodeMessage(int statusCode)
        {
            return statusCode switch {
                400 => "Bad request",
                401 => "Unauthorized",
                404 => "Resource not found",
                500 => "Server error",
                _ => null
            };
        }
    }
}