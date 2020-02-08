import { Factory } from "miragejs";
import faker from "faker";

const SPECIALTIES = [
  "Dentist",
  "Dermatologist",
  "Surgeon",
  "Orthodontist",
  "Optometrist",
  "General Practitioner"
];

const ProviderFactory = Factory.extend({
  name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  specialty: () => faker.random.arrayElement(SPECIALTIES),
  picture: () => faker.image.avatar(),
  bio: () => faker.lorem.sentence()
});

export { ProviderFactory };
