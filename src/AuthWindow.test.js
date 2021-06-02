import React from "react";
import AuthForm from "./components/AuthForm";
import { AuthWindow } from "./components/AuthWindow";
import {shallow} from "enzyme";

describe('<AuthWindow />', () => {
  it('renders <AuthForm /> component', () => {
    const wrapper = shallow(<AuthWindow />);
    expect(wrapper.find(AuthForm)).toHaveLength(1)
  })
  it('renders <h1> once', () => {
    const wrapper = shallow(<AuthWindow />);
    expect(wrapper.find('h1')).toHaveLength(1)
  })
  it('renders <a> twice', () => {
    const wrapper = shallow(<AuthWindow />);
    expect(wrapper.find('a')).toHaveLength(2)
  })
  })

