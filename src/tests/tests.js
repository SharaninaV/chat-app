import AuthForm from "../components/AuthForm";
import { AuthWindow } from "../components/AuthWindow";
import {shallow} from "enzyme";

describe('<AuthWindow />', () => {
    it('renders <AuthForm /> component', () => {
        const wrapper = shallow(<AuthWindow />);
        expect(wrapper.find(AuthForm)).toHaveLength(1)
    })
    it('renders one <h1>', () => {
        const wrapper = shallow(<AuthWindow />);
        expect(wrapper.find('h1')).toHaveLength(1)
    })
    it('renders two <a>', () => {
        const wrapper = shallow(<AuthWindow />);
        expect(wrapper.find('a')).toHaveLength(2)
    })
})

describe('<AuthForm />', () => {
    it ('ура', () => {
        const authForm = shallow(<AuthForm />)
        expect(authForm.find('form')).toHaveLength(1)
    })
    it ('renders two <input>', () => {
        const wrapper = shallow(<AuthForm />);
        expect(wrapper.find('input')).toHaveLength(2)
    })
})