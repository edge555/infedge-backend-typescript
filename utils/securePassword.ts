import bcrypt from 'bcryptjs';

const securePassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default securePassword;
