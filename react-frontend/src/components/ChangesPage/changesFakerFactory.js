
import { faker } from "@faker-js/faker";
export default (user,count,changeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
change: changeIds[i % changeIds.length],
typeofchange: faker.lorem.sentence(""),
changefrom: faker.lorem.sentence(""),
changeto: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
