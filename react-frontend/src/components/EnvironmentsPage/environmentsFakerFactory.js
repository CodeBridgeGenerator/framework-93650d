
import { faker } from "@faker-js/faker";
export default (user,count,envIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
env: envIds[i % envIds.length],
type: "prod",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
