const RegexPatterns = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
} as const;

type RegexPatterns = typeof RegexPatterns[keyof typeof RegexPatterns];
export default RegexPatterns;
