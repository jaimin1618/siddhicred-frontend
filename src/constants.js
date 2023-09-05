const ROLES = {
  ADMIN: "ADMIN",
  ISSUER: "ISSUER",
  EARNER: "EARNER",
  GUEST: "GUEST",
};

const adminNavigations = [
  { name: "Dashboard", href: "/home" },
  { name: "Create Issuer", href: "/create_issuer" },
];
/*================================
Home => Dashboard to view current Issuers
Profile => Admin user account details, name, and more
================================*/

const issuerNavigations = [
  { name: "Dashboard", href: "/home" },
  { name: "Issue", href: "/issue" },
  // { name: "Revoke", href: "/revoke" },
  { name: "Profile", href: "/issuer/profile" },
];
/*================================
Home => Dashboard to view total issued certificates, types of certificate issued
Profile => Admin user account details, name, and more
================================*/

const earnerNavigations = [
  { name: "Dashboard", href: "/home" },
  { name: "Profile", href: "/profile" },
];

const guestNavigations = [];

/*================================
Home => Details about app, number of issued certificate 
Search => Search for certificate and request issuer for that certificate
Issued => showcase all issued soulbound NFTs 
Profile =>  user account details, name, photo, and more
================================*/

const commonPages = [
  { name: "Verify", href: "/verify" },
  { name: "About", href: "/about" },
  { name: "How to", href: "/howto" },
  { name: "Contact us", href: "/contact" },
];

const firstCertificateInfo = {
  imageURL:
    "https://amaranth-concerned-stingray-874.mypinata.cloud/ipfs/QmPxqUxRrajT3b8puyMkoggkZXRiyCWkMbPRic6wp1j2mQ",
  name: "Certificate of SiddhiCred Software joining and usage.",
  description:
    "This is to certify that Jane Doe has successfully joined and used the SiddhiCred - A NFT based certificate issuing software.",
};

const firstCertificateIssuerInfo = {
  address: "Current owner (to themselves)",
  profileImageURL: null,
  issuerName: "Jane Doe",
  organizationName: "NA",
  description: "NA",
  country: "NA",
  contact: "NA",
  website: "NA",
};

module.exports = {
  adminNavigations,
  issuerNavigations,
  earnerNavigations,
  guestNavigations,
  ROLES,
  firstCertificateInfo,
  firstCertificateIssuerInfo,
};
