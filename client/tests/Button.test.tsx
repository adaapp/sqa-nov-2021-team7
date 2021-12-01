import "@testing-library/jest-dom";
import { DeleteButton } from "../src/components/Button";
import * as TestRenderer from "react-test-renderer";
import {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";

describe("Button", () => {
    it("renders correctly", () => {
        const mockFn = () => {
            return null;
        };

        const testRenderer: ReactTestRenderer = TestRenderer.create(<DeleteButton onClick={mockFn}  dataTestId={""} value={""}/>);
        const testInstance: ReactTestInstance = testRenderer.root;

        expect(testInstance.findByType(DeleteButton).props.onClick).toBe(mockFn);
    });
});
