import config from '../../../config/index';
import ApiError from '../../../erros/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();
  user.id = id;
  //   default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  const createdUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }

  return createdUser;
};

export const UserService = { createUser };
