import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js';
import Service from './service.model.js';

export const listServicesService = async ({ category }) => {
  const filter = {};
  if (category) filter.category = category;
  const services = await Service.find(filter).sort({ createdAt: -1 });
  return services;
};

export const getServiceByIdService = async (id) => {
  const service = await Service.findById(id);
  return service;
};

export const createServiceService = async (payload, thumbnail) => {
  if (thumbnail) {
    const upload = await cloudinaryUpload(
      thumbnail[0].path,
      `service-${Date.now()}`,
      'services'
    );
    if (upload && (upload.secure_url || upload.url)) {
      payload.imageUrl = upload.secure_url || upload.url;
    }
  }

  const service = await Service.create(payload);
  return service;
};

export const updateServiceService = async (id, payload) => {
  const service = await Service.findByIdAndUpdate(id, payload, { new: true });
  return service;
};

export const deleteServiceService = async (id) => {
  await Service.findByIdAndDelete(id);
  return { deleted: true };
};
