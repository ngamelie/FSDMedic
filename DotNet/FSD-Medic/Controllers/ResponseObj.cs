namespace FSD_Medic.Controllers
{
    public class ResponseObj
    {
        public int Status { get; set; }
        public object Obj { get; set; }

        public ResponseObj(int status)
        {
            Status = status;
        }
    }
}
