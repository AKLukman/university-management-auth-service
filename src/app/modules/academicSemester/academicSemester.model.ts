import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemister,
} from './academicsemester.interface';
import { academicSemesterMonths } from './academicSemester.constant';
import ApiError from '../../../erros/ApiError';
import status from 'http-status-codes';

const academicSemesterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  { timestamps: true }
);

// Handlong same year and same semester issue
// Data check -> same year && same semester

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester already exist !');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemister, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
