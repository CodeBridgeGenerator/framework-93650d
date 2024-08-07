
import { faker } from "@faker-js/faker";
export default (user,count,reporterIds,assigneeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ticket: faker.lorem.sentence("8"),
project: faker.lorem.sentence("8"),
title: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
priority: faker.lorem.sentence(""),
type: faker.lorem.sentence(""),
reporter: reporterIds[i % reporterIds.length],
assignee: assigneeIds[i % assigneeIds.length],
closed: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
