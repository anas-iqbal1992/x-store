export const joiErrorFormatter = (rawErrors: { details: any }) => {
  const  errors:any = {};
  const details = rawErrors.details;
  details.map((d: any) => {
      errors[d.path] = [d.message];
  });
  return errors;
};
export const mongooseErrorFormatter = (rawErrors:{ errors: any }) => {
  const errors:any = {}
  const details = rawErrors.errors
  for (const key in details) {
    errors[key] = [details[key].message]
  }
  return errors
}
