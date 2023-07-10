import { SortOrder } from 'mongoose';
import ApiError from '../../../erros/ApiError';
import { IGenericpaginationResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemeterTitleCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemister } from './academicsemester.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import httpStatus from 'http-status-codes';

const craeteAcademicSemester = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  // Checking semester code and semester
  // summer 02 !==03
  if (academicSemeterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code !');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericpaginationResponse<IAcademicSemister[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  craeteAcademicSemester,
  getAllSemesters,
};
