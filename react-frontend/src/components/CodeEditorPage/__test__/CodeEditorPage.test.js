import React from "react";
import { render, screen } from "@testing-library/react";

import CodeEditorPage from "../CodeEditorPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders codeEditor page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CodeEditorPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("codeEditor-datatable")).toBeInTheDocument();
    expect(screen.getByRole("codeEditor-add-button")).toBeInTheDocument();
});
