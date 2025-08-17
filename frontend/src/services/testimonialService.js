const API_URL = "http://localhost:5000/api/testimonials";

export const getTestimonials = async () => {
  const res = await fetch(API_URL);
  return res.json();
};


