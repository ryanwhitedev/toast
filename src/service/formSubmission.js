import { fetchLikedFormSubmissions } from "./mockServer";

// Make a best effort attempt to load the data. There is a very small
// chance (~0.0001%) that 6 consecutive calls to the "server" fail (based
// on 10% failure rate in mockServer.js).
//
// TODO: add a delay between failed calls to help prevent overloading the
// server in production.
export async function fetchData(setState) {
  const maxRetries = 5;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const resp = await fetchLikedFormSubmissions();

      if (resp.status === 200) {
        setState(resp.formSubmissions);
        break;
      }
    } catch (err) {
      console.error(err); // Log error
      if (i === maxRetries) {
        console.error("Max retries exceeded:");
      }
    }
  }
}
