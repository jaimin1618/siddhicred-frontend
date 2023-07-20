const ROLES = {
  ADMIN: "ADMIN",
  ISSUER: "ISSUER",
  USER: "USER",
};

const adminNavigations = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage Issuers", href: "/manage_issuers" },
];
/*================================
Home => Dashboard to view current Issuers
Profile => Admin user account details, name, and more
================================*/

const issuerNavigations = [
  { name: "Home", href: "/home" },
  { name: "Issue", href: "/issue" },
  { name: "Revoke", href: "/revoke" },
  { name: "Profile", href: "/issuer/profile" },
];
/*================================
Home => Dashboard to view total issued certificates, types of certificate issued
Profile => Admin user account details, name, and more
================================*/

const defaultNavigations = [
  { name: "Home", href: "/home" },
  { name: "Search Certificate", href: "/search" },
  { name: "Issued", href: "/issued" },
  { name: "Profile", href: "/profile" },
];
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

module.exports = {
  adminNavigations,
  issuerNavigations,
  defaultNavigations,
  ROLES,
};
