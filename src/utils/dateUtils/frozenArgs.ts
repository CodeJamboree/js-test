let args: DateConstructorArgs = [0];

export const frozenArgs = (newArgs?: DateConstructorArgs): DateConstructorArgs => {
  if (newArgs) args = newArgs;
  return args;
};