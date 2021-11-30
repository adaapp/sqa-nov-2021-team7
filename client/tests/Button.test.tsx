import "@testing-library/jest-dom";
import Button from "../src/components/Button";
import * as TestRenderer from "react-test-renderer";
import {ReactTestInstance, ReactTestRenderer} from "react-test-renderer";

describe("Button", () => {
    it("renders correctly", () => {
        const mockFn = () => {
            return null;
        };

        const testRenderer: ReactTestRenderer = TestRenderer.create(<Button onClick={mockFn} />);
        const testInstance: ReactTestInstance = testRenderer.root;

        expect(testInstance.findByType(Button).props.onClick).toBe(mockFn);
    });
});
