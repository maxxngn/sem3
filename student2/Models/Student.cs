namespace student2.Models
{
    public class Student
    {

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? RollNumber { get; set; }
        public bool IsAbsent { get; set; }
        public bool IsNotAbsent { get; set; }
        public string? Comment { get; set; }
    }
}
