export const ServiceCategory = Object.freeze({
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential'
});

export const COMMERCIAL_SERVICES = Object.freeze([
  'New Roof Installation',
  'Roof Replacement',
  'Roof Coating & Restoration',
  'Insurance Claim Support',
  'Drone Inspections & Imaging',
  'Storm Damage Assessments'
]);

export const RESIDENTIAL_SERVICES = Object.freeze([
  'New Roof Installations',
  'Roof Repairs',
  'Storm Damage Assessments',
  'Real Estate Certifications',
  'Gutter Services'
]);

export const ALL_SERVICES = Object.freeze([
  ...COMMERCIAL_SERVICES,
  ...RESIDENTIAL_SERVICES
]);

export default ServiceCategory;


