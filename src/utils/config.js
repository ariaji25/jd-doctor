const apiURL = process.env.REACT_APP_API_URL;
const icd9ApiURL = process.env.ICD9_API_URL;

let config = () => {
  return {
    apiURL,
    icd9ApiURL
  };
};

export default config();