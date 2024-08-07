import React from "react";
import { render, screen } from "@testing-library/react";

import SecondframeworkPage from "../SecondframeworkPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders secondframework page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SecondframeworkPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("secondframework-datatable")).toBeInTheDocument();
    expect(screen.getByRole("secondframework-add-button")).toBeInTheDocument();
});
