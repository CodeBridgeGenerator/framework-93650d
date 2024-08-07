
import { faker } from "@faker-js/faker";
export default (user,count,settingsIds,domainIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
settings: settingsIds[i % settingsIds.length],
domain: domainIds[i % domainIds.length],
debug: faker.lorem.sentence(""),
url: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
