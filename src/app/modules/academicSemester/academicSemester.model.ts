import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemister,
} from './academicsemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IAcademicSemister, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
