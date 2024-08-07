
import { faker } from "@faker-js/faker";
export default (user,count,ChangeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Change: ChangeIds[i % ChangeIds.length],
typeofchanges: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
