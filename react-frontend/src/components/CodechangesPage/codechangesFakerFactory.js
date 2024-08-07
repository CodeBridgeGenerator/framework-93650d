
import { faker } from "@faker-js/faker";
export default (user,count,editorIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
editor: editorIds[i % editorIds.length],
location: faker.lorem.sentence(""),
filename: faker.lorem.sentence(""),
templateLocalFile: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
