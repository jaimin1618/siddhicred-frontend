import axios from "axios";

const { REACT_APP_PINATA_JWT, ENVIRONMENT } = process.env;

async function checkPinataStatus() {
  var config = {
    method: "get",
    url: "https://api.pinata.cloud/data/testAuthentication",
    headers: {
      Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
    },
  };

  const res = await axios(config);
  if (ENVIRONMENT === "development") {
    console.log(res);
  }
}

async function pinFile(formData) {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
        },
      }
    );

    console.log(res);

    return response;
  } catch (error) {
    console.log("PINATA FILE UPLOAD ERROR", error);
  }
}

async function pinJson(json) {
  const data = JSON.stringify(json);

  const config = {
    method: "POST",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
    },
    data: data,
  };

  try {
    const res = axios(config);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log("PINATA JSON UPLOAD ERROR", error);
  }
}

async function unpinFile(cid) {
  var config = {
    method: "delete",
    url: `https://api.pinata.cloud/pinning/unpin/${cid}`,
    headers: {
      Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
    },
  };

  const res = await axios(config);
  return res;
}

const _ = {
  checkPinataStatus,
  pinFile,
  unpinFile,
  pinJson,
};

export default _;
