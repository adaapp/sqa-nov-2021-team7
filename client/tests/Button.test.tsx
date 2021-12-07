import "@testing-library/jest-dom";
import {CreateButton, DeleteButton} from "../src/components/Button";
import * as TestRenderer from "react-test-renderer";
import {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";

describe("Button", () => {
    it("should render the create button correctly", () => {
        const mockFn = () => {
            return null;
        };

        const testRenderer: ReactTestRenderer = TestRenderer.create(<CreateButton onClick={mockFn}  dataTestId={""} value={"Create"}/>);
        const testInstance: ReactTestInstance = testRenderer.root;

        expect(testInstance.findByType(CreateButton).props.onClick).toBe(mockFn);
        expect(testInstance.findByType(CreateButton).props.value).toBe("Create");
    });

    it("should render the delete button correctly", () => {
        const mockFn = () => {
            return null;
        };

        const testRenderer: ReactTestRenderer = TestRenderer.create(<DeleteButton onClick={mockFn}  dataTestId={""} value={""}/>);
        const testInstance: ReactTestInstance = testRenderer.root;

        expect(testInstance.findByType(DeleteButton).props.onClick).toBe(mockFn);
    });
});
