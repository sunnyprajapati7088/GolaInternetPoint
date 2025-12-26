 const certificateData = {
  certificateType: "Certificate of Registration",

  issuingOrganization: {
    shortName: "QRA",
    fullName: "Quality Research Accreditation",
    country: "India"
  },

  certifiedInstitute: {
    name: "GOLA COMPUTER EDUCATION & SKILLS DEVELOPMENT FOUNDATION SOCIETY",
    assessedBy: "QRA",
    assessmentType: "Independent Assessment",
    address: {
      street: "R S P Inter College Road",
      area: "Seohara",
      city: "Bijnor",
      state: "Uttar Pradesh",
      postalCode: "246746",
      country: "India"
    }
  },

  isoDetails: {
    standard: "ISO 9001:2015",
    system: "Quality Management System",
    scope: [
      "Computer Education",
      "Coaching",
      "Online Exam",
      "Online Education Work",
      "Mass Education",
      "Jan Sewa Kendra",
      "Government of Uttar Pradesh Work"
    ]
  },

  certificateDetails: {
    certificateNumber: "2304220802065QRA",
    dateOfCertification: "2025-05-26",
    certificateExpiryDate: "2028-05-25",

    surveillanceAudit: {
      firstSurveillanceAuditDue: "2026-05-25",
      secondSurveillanceAuditDue: "2027-05-25"
    },

    validity: {
      validForDays: 1095,
      condition: "Subject to successful surveillance audits"
    }
  },

  authorization: {
    designation: "Head of Certification",
    signaturePresent: true
  },

  verification: {
    qrCodePresent: true,
    verificationMethod: "Online verification via accreditation body website"
  },

  accreditationDetails: {
    accreditationBody: "QRA",
    internationalAffiliations: [
      "ISO",
      "UK Accreditation",
      "Quality Certification"
    ]
  },

  remarks: [
    "This certificate remains the property of the issuing body",
    "Must be returned upon request",
    "Subject to continuous compliance"
  ]
};

// Export if needed (Node / React)
export default certificateData;
