import bcrypt from "bcrypt";

const hashText = async (txtToHash: string) => {
  const hashText = await bcrypt.hash(txtToHash, 10);
  return hashText;
};

const validateHash = async (text: string, hashText: string) => {
  return await bcrypt.compare(text, hashText);
};

export { hashText, validateHash };
