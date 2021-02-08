// Jest testing guide:
// https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });
