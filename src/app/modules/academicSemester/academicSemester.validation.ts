import { z } from 'zod';
import { academicSemesterMonths } from './academicSemester.constant';
//Req validation
//body-> object
//data -> object

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is Required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is Required',
    }),
  }),
});

// await createUserZodSchema.parseAsync(req)

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
