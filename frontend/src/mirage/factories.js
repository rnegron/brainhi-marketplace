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
  address: () =>
    `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}, ${faker.address.city()} ${faker.address.state()}`,
  bio: () => faker.lorem.sentence(),
  name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  phoneNumber: () => faker.phone.phoneNumber(),
  picture: () => faker.image.avatar(),
  specialty: () => faker.random.arrayElement(SPECIALTIES)
});

export { ProviderFactory };
