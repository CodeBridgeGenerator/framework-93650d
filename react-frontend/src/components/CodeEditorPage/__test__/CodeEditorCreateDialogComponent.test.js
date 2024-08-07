import React from "react";
import { render, screen } from "@testing-library/react";

import CodeEditorCreateDialogComponent from "../CodeEditorCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders codeEditor create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CodeEditorCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("codeEditor-create-dialog-component")).toBeInTheDocument();
});
