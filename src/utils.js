export function isValidSubmission(submission) {
  return (
    typeof submission === "object" &&
    submission !== null &&
    submission.hasOwnProperty("id") &&
    submission.hasOwnProperty("data")
  );
}
