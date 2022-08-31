using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private StoreContext context;

        public BuggyController(StoreContext context) {
            this.context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFound() {

            return NotFound(new ApiResponse(404));
        }

         [HttpGet("servererror")]
        public ActionResult GetServerError() {

            var thing = context.Products.Find(1000);
            var thingAction = thing.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest() {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequest(int id) {
            return Ok();
        }
    }
}