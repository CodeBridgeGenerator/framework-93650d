
import { faker } from "@faker-js/faker";
export default (user,count,protocolIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
protocol: protocolIds[i % protocolIds.length],
host: faker.lorem.sentence(1),
port: faker.lorem.sentence(1),
user: faker.lorem.sentence(1),
password: "asdf123",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
