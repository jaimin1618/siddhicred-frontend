// template: New Certificate / Update Certificate
class Certificate {
  constructor({ imageURL, name, description, issuer, issued }) {
    this.imageURL = imageURL;
    this.name = name;
    this.description = description;
    this.issueDate = new Date();
    this.expiryDate = new Date(
      this.issueDate.getFullYear() + 1,
      this.issueDate.getMonth(),
      this.issueDate.getDate()
    );
    this.issuedBy = new Issuer(issuer);
    this.issuedTo = {
      name: issued.name,
      address: issued.address,
    };
  }
}

// template: New Issuer / Update Issuer
class Issuer {
  constructor({
    address,
    profileImageURL,
    issuerName,
    organizationName,
    description,
    country,
    contact,
    website,
  }) {
    this.address = address;
    this.profileImageURL = profileImageURL;
    this.issuerName = issuerName;
    this.organizationName = organizationName;
    this.description = description;
    this.country = country;
    this.organizationContactEmail = contact;
    this.organizationWebsite = website;
    this.becameIssuerOn = new Date();
  }
}

const _ = {
  Certificate,
  Issuer,
};
