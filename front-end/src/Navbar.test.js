
import { render } from '@testing-library/react'
import Navbar from './component/Navbar'


describe(Navbar, ()=>{
  it("Navbar displayed correct name",()=>{
    const {getByTestId} = render(<Navbar name='chand' />);
    const name = getByTestId('name').textContent;
    expect(name).toBe("chand");
  })
})