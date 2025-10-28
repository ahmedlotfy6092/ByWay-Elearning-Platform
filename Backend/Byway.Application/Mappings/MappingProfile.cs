using AutoMapper;
using Byway.Application.DTOs;
using Byway.Domain.Models;
using Byway.Domain.Models.Enums;

namespace Byway.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
                            CreateMap<Course, CourseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.Name))
                .ForMember(dest => dest.Level, opt => opt.MapFrom(src => src.Level.ToString()));

            CreateMap<CreateCourseDto, Course>()
                .ForMember(dest => dest.Level, opt => opt.MapFrom(src => Enum.Parse<Level>(src.Level.Replace(" ", ""))))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => 0.0))
                .ForMember(dest => dest.EnrollmentsCount, opt => opt.MapFrom(src => 0));

            CreateMap<Instructor, InstructorDto>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.JobTitle.ToString()))
                .ForMember(dest => dest.CoursesCount, opt => opt.MapFrom(src => src.Courses.Count));

            CreateMap<CreateInstructorDto, Instructor>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => Enum.Parse<JobTitle>(src.JobTitle.Replace(" ", ""))))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => 0.0));

            CreateMap<UpdateInstructorDto, Instructor>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => Enum.Parse<JobTitle>(src.JobTitle.Replace(" ", ""))));
        }
    }
}
