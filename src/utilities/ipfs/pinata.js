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

    return {
      Status: "Success",
      Message: "File uploaded to IPFS successfully",
      IpfsHash: res.data.IpfsHash,
    };
  } catch (error) {
    if (process.env.REACT_APP_ENVIRONMENT === "development") console.log(error);
    return {
      Status: "Error",
      Message: "Uploading file to IPFS failed",
    };
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
    data,
  };

  try {
    const res = await axios(config);
    // console.log(res.data);

    return {
      Status: "Success",
      Message: "JSON uploaded to IPFS successfully",
      IpfsHash: res.data.IpfsHash,
    };
  } catch (error) {
    return {
      Status: "Error",
      Message: "Uploading JSON to IPFS failed",
    };
  }
}

async function unpinFile(CID) {
  var config = {
    method: "delete",
    url: `https://api.pinata.cloud/pinning/unpin/${CID}`,
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
