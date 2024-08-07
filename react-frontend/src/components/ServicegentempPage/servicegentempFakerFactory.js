
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
templateLocalFile: faker.lorem.sentence(1),
destFolder: faker.lorem.sentence(1),
destFilename: faker.lorem.sentence(1),
customrelationship: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
